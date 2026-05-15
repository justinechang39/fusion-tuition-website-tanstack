import { env as cloudflareEnv } from 'cloudflare:workers'
/**
 * Public API for June holiday à la carte class order enquiries.
 *
 * The marketing page does not collect payment. This endpoint validates the
 * selected catalogue items, stores each enquiry in D1 via Prisma, and then
 * sends follow-up notifications when email / Telegram configuration exists.
 */
import alaCarteData from '@/data/ala-carte-classes.json'
import { PrismaD1 } from '@prisma/adapter-d1'
import { createFileRoute } from '@tanstack/react-router'

import { PrismaClient } from '@/generated/prisma/client'

interface CartItemPayload {
  itemId: string
  quantity: number
  instruction?: string
}

interface CustomerPayload {
  name: string
  email?: string
  phone?: string
  studentLevel?: string
  notes?: string
}

interface OrderPayload {
  customer: CustomerPayload
  cartItems: CartItemPayload[]
}

const catalogItems = new Map(alaCarteData.items.map((item) => [item.id, item]))
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const emailAssetOrigin =
  process.env.VITE_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  'https://fusiontuition.com'
const emailLogoUrl = `${emailAssetOrigin}/fusion_tuition_logo_horizontal.png`

export const Route = createFileRoute('/api/ala-carte-orders')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const payload = (await request.json().catch(() => null)) as unknown
        const validation = validatePayload(payload)

        if (!validation.ok) {
          return Response.json({ error: validation.error }, { status: 400 })
        }

        const order = buildOrder(validation.payload)

        try {
          await persistOrder(order, validation.payload)
        } catch (error) {
          console.error('Failed to persist à la carte order', {
            orderId: order.id,
            error,
          })
          return Response.json(
            { error: 'Could not save order' },
            { status: 500 },
          )
        }

        const message = buildTelegramMessage(order)
        await Promise.allSettled([
          sendInternalEmail(order),
          sendCustomerConfirmationEmail(order),
          notifyTelegram(message),
        ]).then((results) => {
          results.forEach((result, index) => {
            if (result.status === 'rejected') {
              console.error('À la carte notification failed', {
                orderId: order.id,
                channel: ['internal-email', 'customer-email', 'telegram'][
                  index
                ],
                reason: result.reason,
              })
            }
          })
        })

        return Response.json({ success: true, orderId: order.id })
      },
    },
  },
})

type ValidationResult =
  | { ok: true; payload: OrderPayload }
  | { ok: false; error: string }

function validatePayload(payload: unknown): ValidationResult {
  if (!payload || typeof payload !== 'object') {
    return { ok: false, error: 'Invalid order payload' }
  }

  const maybePayload = payload as Partial<OrderPayload>
  const customer = maybePayload.customer

  if (!customer || typeof customer.name !== 'string' || !customer.name.trim()) {
    return { ok: false, error: 'Name is required' }
  }

  const email = typeof customer.email === 'string' ? customer.email.trim() : ''
  const phone = typeof customer.phone === 'string' ? customer.phone.trim() : ''

  if (!email && !phone) {
    return { ok: false, error: 'Email or phone is required' }
  }

  if (email && !emailPattern.test(email)) {
    return { ok: false, error: 'Email address is invalid' }
  }

  if (
    !Array.isArray(maybePayload.cartItems) ||
    maybePayload.cartItems.length === 0
  ) {
    return { ok: false, error: 'Please select at least one class' }
  }

  const seenItemIds = new Set<string>()

  for (const cartItem of maybePayload.cartItems) {
    if (!cartItem || typeof cartItem !== 'object') {
      return { ok: false, error: 'Invalid cart item' }
    }

    if (typeof cartItem.itemId !== 'string' || !cartItem.itemId.trim()) {
      return { ok: false, error: 'Invalid cart item' }
    }

    if (seenItemIds.has(cartItem.itemId)) {
      return { ok: false, error: 'Each class can only be selected once' }
    }

    seenItemIds.add(cartItem.itemId)

    const catalogItem = catalogItems.get(cartItem.itemId)
    if (!catalogItem?.isActive) {
      return { ok: false, error: 'Selected class is no longer available' }
    }

    if (!Number.isInteger(cartItem.quantity) || cartItem.quantity !== 1) {
      return { ok: false, error: 'Each class quantity must be exactly one' }
    }
  }

  return { ok: true, payload: maybePayload as OrderPayload }
}

function buildOrder(payload: OrderPayload) {
  const createdAt = new Date()
  const customer = {
    name: payload.customer.name.trim(),
    email: payload.customer.email?.trim() || null,
    phone: payload.customer.phone?.trim() || null,
    studentLevel: payload.customer.studentLevel?.trim() || null,
    notes: payload.customer.notes?.trim() || null,
  }

  const items = payload.cartItems
    .map((cartItem) => {
      const item = catalogItems.get(cartItem.itemId)

      if (!item) {
        return null
      }

      return {
        itemId: item.id,
        title: item.title,
        subject: item.subject,
        level: item.level,
        durationMinutes: item.durationMinutes,
        price: item.price,
        currency: item.currency,
        instruction: cartItem.instruction?.trim() || null,
      }
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item))

  const total = items.reduce((sum, item) => sum + item.price, 0)

  return {
    id: crypto.randomUUID(),
    createdAt,
    customer,
    items,
    total,
    campaignSlug: alaCarteData.campaign.slug,
  }
}

async function persistOrder(
  order: ReturnType<typeof buildOrder>,
  payload: OrderPayload,
) {
  const adapter = new PrismaD1(cloudflareEnv.DB)
  const prisma = new PrismaClient({ adapter })

  try {
    await prisma.alaCarteOrder.create({
      data: {
        id: order.id,
        createdAt: order.createdAt,
        customerName: order.customer.name,
        customerEmail: order.customer.email,
        customerPhone: order.customer.phone,
        studentLevel: order.customer.studentLevel,
        notes: order.customer.notes,
        campaignSlug: order.campaignSlug,
        rawPayload: JSON.stringify(payload),
        items: {
          create: order.items.map((item) => ({
            id: crypto.randomUUID(),
            itemId: item.itemId,
            title: item.title,
            level: item.level,
            subject: item.subject,
            durationMin: item.durationMinutes,
            price: item.price,
            currency: item.currency,
            instruction: item.instruction,
          })),
        },
      },
    })
  } finally {
    await prisma.$disconnect()
  }
}

function formatDuration(minutes: number) {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return mins === 0 ? `${hours}h` : `${hours}h ${mins}m`
}

function buildTelegramMessage(order: ReturnType<typeof buildOrder>) {
  const itemLines = order.items
    .map(
      (item) =>
        `• ${item.title} (${item.level} ${item.subject}, ${formatDuration(
          item.durationMinutes,
        )}, ${item.currency} ${item.price})\n  Instruction: ${item.instruction ?? 'None'}`,
    )
    .join('\n')

  return [
    'New À La Carte Order',
    `Order ID: ${order.id}`,
    '',
    `Name: ${order.customer.name}`,
    `Email: ${order.customer.email ?? 'Not provided'}`,
    `Phone: ${order.customer.phone ?? 'Not provided'}`,
    `Student level: ${order.customer.studentLevel ?? 'Not provided'}`,
    `Notes: ${order.customer.notes ?? 'Not provided'}`,
    '',
    'Selected classes:',
    itemLines,
    '',
    `Estimated total: SGD ${order.total}`,
    'Payment is not collected online. Call to arrange timing and send invoice/payment info.',
  ].join('\n')
}

function buildInternalEmail(order: ReturnType<typeof buildOrder>) {
  const selectedClasses = order.items
    .map(
      (item) =>
        `• ${item.title} (${item.level} ${item.subject}, ${formatDuration(
          item.durationMinutes,
        )}, ${item.currency} ${item.price})\n  Instruction: ${item.instruction ?? 'None'}`,
    )
    .join('\n')

  const text = [
    'New Ala-carte Class Enquiry',
    '',
    `Order ID: ${order.id}`,
    `Created: ${order.createdAt.toISOString()}`,
    `Campaign: ${order.campaignSlug}`,
    '',
    `Name: ${order.customer.name}`,
    `Email: ${order.customer.email ?? 'Not provided'}`,
    `Phone: ${order.customer.phone ?? 'Not provided'}`,
    `Student level: ${order.customer.studentLevel ?? 'Not provided'}`,
    `Notes: ${order.customer.notes ?? 'Not provided'}`,
    '',
    'Selected classes:',
    selectedClasses,
    '',
    `Estimated total: SGD ${order.total}`,
    'Payment is not collected online. Follow up to arrange timing and send invoice/payment info.',
  ].join('\n')

  return {
    subject: 'New Ala-carte Class Enquiry',
    text,
    html: buildInternalEmailHtml(order),
  }
}

function buildCustomerEmail(order: ReturnType<typeof buildOrder>) {
  const selectedClasses = order.items
    .map(
      (item) =>
        `• ${item.title} (${item.level} ${item.subject}, ${formatDuration(
          item.durationMinutes,
        )})`,
    )
    .join('\n')

  const text = [
    `Hi ${order.customer.name},`,
    '',
    'Thank you for submitting your Fusion Tuition ala-carte class request. We have received it and will contact you to arrange a suitable timing.',
    '',
    'Selected classes:',
    selectedClasses,
    '',
    'Payment is not collected online. Invoice and payment details will be sent after we confirm the class timing with you.',
    '',
    'If you need to update the request, please reply to this email or contact Fusion Tuition directly.',
    '',
    'Fusion Tuition',
  ].join('\n')

  return {
    subject: 'We received your Fusion Tuition ala-carte class request',
    text,
    html: buildCustomerEmailHtml(order),
  }
}

function buildInternalEmailHtml(order: ReturnType<typeof buildOrder>) {
  return buildBrandedEmailShell({
    preheader: `New ala-carte enquiry from ${order.customer.name}`,
    eyebrow: 'New enquiry',
    title: 'Ala-carte class request received',
    intro:
      'A parent or student submitted a June holiday ala-carte request. Follow up to arrange timing, confirm availability, and send payment details after the conversation.',
    children: [
      buildOrderMetaCard(order),
      buildCustomerDetailsTable(order),
      buildSelectedClassesHtml(order, { includePrice: true }),
      buildNoticeBox(
        'Payment is not collected online. The website has already saved this enquiry in D1 before sending this email.',
      ),
    ].join(''),
  })
}

function buildCustomerEmailHtml(order: ReturnType<typeof buildOrder>) {
  return buildBrandedEmailShell({
    preheader: 'We received your Fusion Tuition ala-carte class request',
    eyebrow: 'Request received',
    title: `Thanks, ${order.customer.name}!`,
    intro:
      'We have your ala-carte class request. Fusion Tuition will contact you to arrange a suitable timing, then send invoice and payment details after the timing is confirmed.',
    children: [
      buildSelectedClassesHtml(order, { includePrice: false }),
      buildNextStepsHtml(),
      buildNoticeBox(
        'No payment has been collected online. If you need to update your request, reply to this email or contact Fusion Tuition directly.',
      ),
    ].join(''),
  })
}

function buildBrandedEmailShell({
  preheader,
  eyebrow,
  title,
  intro,
  children,
}: {
  preheader: string
  eyebrow: string
  title: string
  intro: string
  children: string
}) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(title)}</title>
  </head>
  <body style="margin:0; padding:0; background:#fff7ed; color:#0f172a; font-family:Arial, Helvetica, sans-serif;">
    <div style="display:none; max-height:0; overflow:hidden; opacity:0; color:transparent;">${escapeHtml(preheader)}</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#fff7ed; margin:0; padding:28px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px; overflow:hidden; border:1px solid #fed7aa; border-radius:30px; background:#ffffff; box-shadow:0 18px 45px rgba(251,146,60,0.18);">
            <tr>
              <td style="padding:0; background:#fb923c;">
                <div style="padding:28px 28px 32px; background:linear-gradient(135deg,#fb923c 0%,#f97316 48%,#14b8a6 100%);">
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                    <tr>
                      <td style="vertical-align:middle;">
                        <img src="${emailLogoUrl}" width="178" alt="Fusion Tuition" style="display:block; width:178px; max-width:70%; height:auto; border:0; background:#ffffff; border-radius:18px; padding:10px 12px;" />
                      </td>
                      <td align="right" style="vertical-align:middle;">
                        <span style="display:inline-block; padding:8px 12px; border-radius:999px; background:rgba(255,255,255,0.92); color:#9a3412; font-size:12px; font-weight:800; letter-spacing:0.08em; text-transform:uppercase;">${escapeHtml(eyebrow)}</span>
                      </td>
                    </tr>
                  </table>
                  <h1 style="margin:28px 0 0; color:#ffffff; font-size:36px; line-height:0.95; letter-spacing:-1.4px; font-weight:900;">${escapeHtml(title)}</h1>
                  <p style="margin:16px 0 0; max-width:520px; color:#fff7ed; font-size:16px; line-height:1.65; font-weight:700;">${escapeHtml(intro)}</p>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:26px 24px 30px;">
                ${children}
                <p style="margin:28px 0 0; padding-top:18px; border-top:1px solid #ffedd5; color:#64748b; font-size:12px; line-height:1.6; text-align:center;">
                  Fusion Tuition · Targeted help, no long term commitments<br />
                  <a href="${emailAssetOrigin}/ala-carte" style="color:#ea580c; font-weight:800; text-decoration:none;">View ala-carte classes</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`
}

function buildOrderMetaCard(order: ReturnType<typeof buildOrder>) {
  return `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:0 0 16px; border-radius:22px; background:#0f172a; color:#ffffff; overflow:hidden;">
    <tr>
      <td style="padding:18px 20px;">
        <p style="margin:0; color:#fdba74; font-size:11px; font-weight:900; letter-spacing:0.16em; text-transform:uppercase;">Order receipt</p>
        <p style="margin:8px 0 0; font-size:14px; line-height:1.6;"><strong>Order ID:</strong> ${escapeHtml(order.id)}</p>
        <p style="margin:2px 0 0; font-size:14px; line-height:1.6;"><strong>Created:</strong> ${escapeHtml(order.createdAt.toISOString())}</p>
        <p style="margin:2px 0 0; font-size:14px; line-height:1.6;"><strong>Campaign:</strong> ${escapeHtml(order.campaignSlug)}</p>
      </td>
    </tr>
  </table>`
}

function buildCustomerDetailsTable(order: ReturnType<typeof buildOrder>) {
  const rows = [
    ['Name', order.customer.name],
    ['Email', order.customer.email ?? 'Not provided'],
    ['Phone', order.customer.phone ?? 'Not provided'],
    ['Student level', order.customer.studentLevel ?? 'Not provided'],
    ['Notes', order.customer.notes ?? 'Not provided'],
  ]

  return `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:0 0 16px; border:1px solid #fed7aa; border-radius:22px; overflow:hidden;">
    <tr>
      <td colspan="2" style="padding:14px 18px; background:#fff7ed; color:#9a3412; font-size:12px; font-weight:900; letter-spacing:0.14em; text-transform:uppercase;">Contact details</td>
    </tr>
    ${rows
      .map(
        ([label, value]) => `<tr>
          <td style="width:34%; padding:12px 18px; border-top:1px solid #ffedd5; color:#64748b; font-size:13px; font-weight:800; vertical-align:top;">${escapeHtml(label)}</td>
          <td style="padding:12px 18px; border-top:1px solid #ffedd5; color:#0f172a; font-size:14px; line-height:1.5; font-weight:700; vertical-align:top;">${escapeHtml(value)}</td>
        </tr>`,
      )
      .join('')}
  </table>`
}

function buildSelectedClassesHtml(
  order: ReturnType<typeof buildOrder>,
  { includePrice }: { includePrice: boolean },
) {
  return `<div style="margin:0 0 16px;">
    <p style="margin:0 0 10px; color:#9a3412; font-size:12px; font-weight:900; letter-spacing:0.14em; text-transform:uppercase;">Selected classes</p>
    ${order.items
      .map((item, index) => {
        const meta = [
          `${item.level} ${item.subject}`,
          formatDuration(item.durationMinutes),
          includePrice ? `${item.currency} ${item.price}` : null,
        ]
          .filter(Boolean)
          .join(' · ')

        return `<div style="margin:${index === 0 ? '0' : '10px'} 0 0; padding:16px 18px; border:1px solid #fed7aa; border-radius:22px; background:#fffaf3;">
          <p style="margin:0; color:#0f172a; font-size:18px; line-height:1.2; font-weight:900; letter-spacing:-0.3px;">${escapeHtml(item.title)}</p>
          <p style="margin:7px 0 0; color:#ea580c; font-size:13px; line-height:1.5; font-weight:800;">${escapeHtml(meta)}</p>
          ${item.instruction ? `<p style="margin:10px 0 0; padding:10px 12px; border-radius:16px; background:#ffffff; color:#475569; font-size:13px; line-height:1.55;"><strong style="color:#0f172a;">Instruction:</strong> ${escapeHtml(item.instruction)}</p>` : ''}
        </div>`
      })
      .join('')}
  </div>`
}

function buildNextStepsHtml() {
  const steps = [
    'We review your selected class request.',
    'We contact you to arrange a suitable timing.',
    'Invoice and payment details are sent after timing is confirmed.',
  ]

  return `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:0 0 16px; border-radius:22px; background:#ecfeff; border:1px solid #99f6e4;">
    <tr>
      <td style="padding:18px 20px;">
        <p style="margin:0 0 10px; color:#0f766e; font-size:12px; font-weight:900; letter-spacing:0.14em; text-transform:uppercase;">What happens next</p>
        ${steps
          .map(
            (step, index) =>
              `<p style="margin:${index === 0 ? '0' : '8px'} 0 0; color:#0f172a; font-size:14px; line-height:1.55; font-weight:700;"><span style="display:inline-block; width:24px; height:24px; margin-right:8px; border-radius:999px; background:#14b8a6; color:#ffffff; text-align:center; line-height:24px; font-size:12px; font-weight:900;">${index + 1}</span>${escapeHtml(step)}</p>`,
          )
          .join('')}
      </td>
    </tr>
  </table>`
}

function buildNoticeBox(message: string) {
  return `<div style="margin:0; padding:14px 16px; border-radius:20px; background:#ffedd5; color:#7c2d12; font-size:13px; line-height:1.6; font-weight:800;">${escapeHtml(message)}</div>`
}

async function sendInternalEmail(order: ReturnType<typeof buildOrder>) {
  const to = parseEmailList(process.env.ALA_CARTE_INTERNAL_EMAIL)
  const from = process.env.EMAIL_FROM?.trim()

  if (to.length === 0 || !from) {
    console.log('Internal email not configured for à la carte orders', {
      orderId: order.id,
      hasRecipient: to.length > 0,
      hasSender: Boolean(from),
    })
    return
  }

  const email = buildInternalEmail(order)
  await cloudflareEnv.EMAIL.send({
    to,
    from: { email: from, name: 'Fusion Tuition' },
    replyTo: order.customer.email ?? undefined,
    subject: email.subject,
    text: email.text,
    html: email.html,
  })
}

function parseEmailList(value: string | undefined) {
  return (
    value
      ?.split(',')
      .map((email) => email.trim())
      .filter(Boolean) ?? []
  )
}

async function sendCustomerConfirmationEmail(
  order: ReturnType<typeof buildOrder>,
) {
  const to = order.customer.email
  const from = process.env.EMAIL_FROM?.trim()

  if (!to) return

  if (!from) {
    console.log('Customer email not configured for à la carte orders', {
      orderId: order.id,
      hasSender: Boolean(from),
    })
    return
  }

  const email = buildCustomerEmail(order)
  await cloudflareEnv.EMAIL.send({
    to,
    from: { email: from, name: 'Fusion Tuition' },
    subject: email.subject,
    text: email.text,
    html: email.html,
  })
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => {
    switch (character) {
      case '&':
        return '&amp;'
      case '<':
        return '&lt;'
      case '>':
        return '&gt;'
      case "'":
        return '&#39;'
      case '"':
        return '&quot;'
      default:
        return character
    }
  })
}

async function notifyTelegram(message: string) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!botToken || !chatId) {
    console.log('À la carte order received:', message)
    return
  }

  const response = await fetch(
    `https://api.telegram.org/bot${botToken}/sendMessage`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: message }),
    },
  )

  if (!response.ok) {
    console.error('Failed to send Telegram order notification', {
      status: response.status,
      body: await response.text(),
    })
  }
}
