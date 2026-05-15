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
    html: textToHtml(text),
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
    html: textToHtml(text),
  }
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

function textToHtml(text: string) {
  return `<p>${escapeHtml(text)
    .replace(/\n{2,}/g, '</p><p>')
    .replace(/\n/g, '<br />')}</p>`
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
