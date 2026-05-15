/**
 * Public API for June holiday à la carte class order enquiries.
 *
 * The marketing page does not collect payment. This endpoint validates the
 * selected catalogue items and optionally sends a Telegram notification when
 * TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID are configured.
 */
import alaCarteData from '@/data/ala-carte-classes.json'
import { createFileRoute } from '@tanstack/react-router'

interface CartItemPayload {
  itemId: string
  quantity: number
  instruction?: string
}

interface CustomerPayload {
  name: string
  phone: string
  studentLevel?: string
  notes?: string
}

interface OrderPayload {
  customer: CustomerPayload
  cartItems: CartItemPayload[]
}

const catalogItems = new Map(alaCarteData.items.map((item) => [item.id, item]))

export const Route = createFileRoute('/api/ala-carte-orders')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const payload = (await request.json().catch(() => null)) as unknown

        if (!isValidPayload(payload)) {
          return Response.json(
            { error: 'Invalid order payload' },
            { status: 400 },
          )
        }

        const order = buildOrder(payload)

        if (order.items.length === 0) {
          return Response.json(
            { error: 'No valid order items' },
            { status: 400 },
          )
        }

        const message = buildTelegramMessage(order)
        await notifyTelegram(message)

        return Response.json({ success: true })
      },
    },
  },
})

function isValidPayload(payload: unknown): payload is OrderPayload {
  if (!payload || typeof payload !== 'object') return false

  const maybePayload = payload as Partial<OrderPayload>
  const customer = maybePayload.customer

  return Boolean(
    customer &&
      typeof customer.name === 'string' &&
      customer.name.trim() &&
      typeof customer.phone === 'string' &&
      customer.phone.trim() &&
      Array.isArray(maybePayload.cartItems) &&
      maybePayload.cartItems.length > 0,
  )
}

function buildOrder(payload: OrderPayload) {
  const customer = {
    name: payload.customer.name.trim(),
    phone: payload.customer.phone.trim(),
    studentLevel: payload.customer.studentLevel?.trim() || 'Not provided',
    notes: payload.customer.notes?.trim() || 'Not provided',
  }

  const items = payload.cartItems
    .map((cartItem) => {
      const item = catalogItems.get(cartItem.itemId)

      if (
        !item ||
        !Number.isInteger(cartItem.quantity) ||
        cartItem.quantity !== 1
      ) {
        return null
      }

      return {
        title: item.title,
        subject: item.subject,
        level: item.level,
        durationMinutes: item.durationMinutes,
        price: item.price,
        currency: item.currency,
        instruction: cartItem.instruction?.trim() || 'None',
      }
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item))

  const total = items.reduce((sum, item) => sum + item.price, 0)

  return { customer, items, total }
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
        )}, ${item.currency} ${item.price})\n  Instruction: ${item.instruction}`,
    )
    .join('\n')

  return [
    'New À La Carte Order',
    '',
    `Name: ${order.customer.name}`,
    `Phone: ${order.customer.phone}`,
    `Student level: ${order.customer.studentLevel}`,
    `Notes: ${order.customer.notes}`,
    '',
    'Selected classes:',
    itemLines,
    '',
    `Estimated total: SGD ${order.total}`,
    'Payment is not collected online. Call to arrange timing and send invoice/payment info.',
  ].join('\n')
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
