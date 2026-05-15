// ala-carte.tsx
// Mobile-first à la carte class menu landing page for Fusion Tuition.

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/textarea'
import alaCarteData from '@/data/ala-carte-classes.json'
import { toast } from '@/hooks/use-toast'
import { buildBreadcrumbJsonLd, buildPageJsonLd, buildSeoHead } from '@/lib/seo'
import { Link, createFileRoute } from '@tanstack/react-router'
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  ShoppingBag,
  Sparkles,
  Trash2,
  UsersRound,
} from 'lucide-react'
import type { Dispatch, FormEvent, ReactNode, SetStateAction } from 'react'
import { useEffect, useState } from 'react'

export interface AlaCarteImage {
  src: string
  alt: string
}

export interface AlaCarteCategory {
  id: string
  label: string
  shortLabel: string
  level: string
  subject: string
  description: string
  image: AlaCarteImage
  displayOrder: number
  isActive: boolean
}

export interface AlaCarteItem {
  id: string
  categoryId: string
  title: string
  subtitle: string
  level: string
  subject: string
  durationMinutes: number
  price: number
  currency: string
  maxClassSize: number
  image: AlaCarteImage
  chapters: string[]
  description: string
  whatStudentsWillDo: string[]
  additionalInstructionLabel: string
  isActive: boolean
  displayOrder: number
}

export interface CartItem {
  itemId: string
  quantity: number
  instruction: string
}

export interface OrderFormState {
  name: string
  email: string
  phone: string
  studentLevel: string
  notes: string
}

export const CART_STORAGE_KEY = 'fusion-ala-carte-cart'

export const categories = [...alaCarteData.categories]
  .filter((category) => category.isActive)
  .sort((a, b) => a.displayOrder - b.displayOrder) as AlaCarteCategory[]

export const items = [...alaCarteData.items]
  .filter((item) => item.isActive)
  .sort((a, b) => a.displayOrder - b.displayOrder) as AlaCarteItem[]

export const itemById = new Map(items.map((item) => [item.id, item]))
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const Route = createFileRoute('/ala-carte/')({
  head: () =>
    buildSeoHead({
      title: 'Ala-carte Classes',
      description:
        'One-off, targeted June holiday classes for O Level and IGCSE students. Pick a subject, choose a class, and Fusion Tuition will call to arrange timing.',
      path: '/ala-carte',
      imagePath: '/fusion_tuition_logo_horizontal.png',
      jsonLd: [
        buildPageJsonLd({
          path: '/ala-carte',
          title: 'Ala-carte Classes',
          description:
            'One-off targeted June holiday classes for O Level and IGCSE students who want help with selected chapters.',
        }),
        buildBreadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Ala-carte Classes', path: '/ala-carte' },
        ]),
      ],
    }),
  component: AlaCartePage,
})

export function formatDuration(minutes: number) {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return mins === 0 ? `${hours}h` : `${hours}h ${mins}m`
}

export function getCategoryItems(categoryId: string) {
  return items.filter((item) => item.categoryId === categoryId)
}

function getCartCount(cartItems: CartItem[]) {
  return cartItems.length
}

export function useAlaCarteOrder() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasMounted, setHasMounted] = useState(false)
  const [orderForm, setOrderForm] = useState<OrderFormState>({
    name: '',
    email: '',
    phone: '',
    studentLevel: '',
    notes: '',
  })

  const cartCount = getCartCount(cartItems)

  useEffect(() => {
    setHasMounted(true)

    try {
      const storedCart = window.localStorage.getItem(CART_STORAGE_KEY)
      if (!storedCart) return

      const parsedCart = JSON.parse(storedCart) as CartItem[]
      setCartItems(
        parsedCart.filter(
          (item) =>
            itemById.has(item.itemId) &&
            Number.isInteger(item.quantity) &&
            item.quantity === 1,
        ),
      )
    } catch {
      window.localStorage.removeItem(CART_STORAGE_KEY)
    }
  }, [])

  useEffect(() => {
    if (hasMounted) {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems))
    }
  }, [cartItems, hasMounted])

  const addToCart = (item: AlaCarteItem, instruction = '') => {
    const trimmedInstruction = instruction.trim()

    if (cartItems.some((cartItem) => cartItem.itemId === item.id)) {
      if (trimmedInstruction) {
        setCartItems((currentItems) =>
          currentItems.map((cartItem) =>
            cartItem.itemId === item.id
              ? { ...cartItem, instruction: trimmedInstruction }
              : cartItem,
          ),
        )
      }

      toast({
        title: 'Already selected',
        description: 'Each class can only be added once.',
      })
      return
    }

    setCartItems((currentItems) => [
      ...currentItems,
      { itemId: item.id, quantity: 1, instruction: trimmedInstruction },
    ])

    toast({
      title: 'Added to cart',
      description: `${item.title} is in your ala-carte order.`,
    })
  }

  const removeFromCart = (itemId: string) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.itemId !== itemId),
    )
  }

  const updateInstruction = (itemId: string, instruction: string) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.itemId === itemId ? { ...item, instruction } : item,
      ),
    )
  }

  const submitOrder = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (cartItems.length === 0) {
      toast({
        title: 'Your cart is empty',
        description: 'Please add at least one class first.',
        variant: 'destructive',
      })
      return
    }

    const trimmedEmail = orderForm.email.trim()
    const trimmedPhone = orderForm.phone.trim()

    if (!orderForm.name.trim() || (!trimmedEmail && !trimmedPhone)) {
      toast({
        title: 'Contact details required',
        description: 'Please provide your email or phone so we can follow up.',
        variant: 'destructive',
      })
      return
    }

    if (trimmedEmail && !emailPattern.test(trimmedEmail)) {
      toast({
        title: 'Check your email address',
        description: 'Please enter a valid email address or leave it blank.',
        variant: 'destructive',
      })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/ala-carte-orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customer: orderForm, cartItems }),
      })

      if (!response.ok) throw new Error('Order failed')

      setCartItems([])
      setOrderForm({
        name: '',
        email: '',
        phone: '',
        studentLevel: '',
        notes: '',
      })
      setIsCartOpen(false)
      window.localStorage.removeItem(CART_STORAGE_KEY)
      toast({
        title: 'Order submitted',
        description: trimmedEmail
          ? 'Thank you! We emailed a confirmation and will follow up to arrange timing.'
          : 'Thank you! Fusion Tuition will call to arrange timing and invoice details.',
      })
    } catch {
      toast({
        title: 'Could not submit order',
        description: 'Please try again or contact Fusion Tuition directly.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    cartItems,
    cartCount,
    isCartOpen,
    isSubmitting,
    orderForm,
    addToCart,
    removeFromCart,
    setIsCartOpen,
    setOrderForm,
    submitOrder,
    updateInstruction,
  }
}

function AlaCartePage() {
  const order = useAlaCarteOrder()

  return (
    <div className="relative -mx-4 -my-8 overflow-hidden bg-[#fffaf3] pb-28 text-slate-950 lg:-mx-8">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-8 h-72 w-72 rounded-full bg-orange-200/60 blur-3xl" />
        <div className="absolute right-[-9rem] top-72 h-96 w-96 rounded-full bg-teal-200/50 blur-3xl" />
        <div className="absolute inset-0 bg-dot-thick-orange-500 opacity-[0.06] [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
      </div>

      <section className="relative mx-auto max-w-5xl px-4 pb-8 pt-10 sm:px-6 md:pb-12 md:pt-16 lg:px-8">
        <div className="animate-fade-in-up">
          <Badge className="mb-5 gap-2 border-orange-200 bg-white/80 px-4 py-2 text-orange-700 shadow-sm hover:bg-white">
            <Sparkles className="h-4 w-4" />
            June holidays only
          </Badge>
          <p className="text-sm font-black uppercase tracking-[0.28em] text-orange-600">
            Ala-carte classes
          </p>
          <h1 className="mt-3 max-w-4xl text-balance text-5xl font-black leading-[0.92] tracking-[-0.055em] sm:text-7xl lg:text-8xl">
            Targeted help. No long term commitments.
          </h1>
          <p className="mt-5 max-w-2xl text-lg font-semibold leading-8 text-slate-700 sm:text-xl">
            Pick a subject, choose one or more focused classes, and we&apos;ll
            call you to arrange timing.
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <InfoPill
              icon={<Clock3 className="h-5 w-5" />}
              label="2–3 hours"
              detail="focused session"
            />
            <InfoPill
              icon={<UsersRound className="h-5 w-5" />}
              label="Less than 5"
              detail="small group"
            />
            <InfoPill
              icon={<CheckCircle2 className="h-5 w-5" />}
              label="Simple"
              detail="pick and submit"
            />
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              className="h-12 rounded-full px-6 text-base shadow-xl shadow-orange-500/20"
              onClick={() =>
                document
                  .getElementById('ala-carte-menu')
                  ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }
            >
              Start choosing classes
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              className="h-12 rounded-full border-slate-300 bg-white/80 px-6 text-base hover:border-orange-500"
              variant="outline"
              onClick={() => order.setIsCartOpen(true)}
            >
              Cart{order.cartCount > 0 ? ` · ${order.cartCount}` : ''}
              <ShoppingBag className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      <section
        id="ala-carte-menu"
        className="relative mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8"
      >
        <div className="mb-5">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-slate-500">
            Choose a subject
          </p>
          <h2 className="mt-2 text-3xl font-black tracking-[-0.04em] sm:text-5xl">
            What do you need help with?
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 md:gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      <FloatingCartButton
        cartCount={order.cartCount}
        openCart={() => order.setIsCartOpen(true)}
      />

      <CartSheet
        cartItems={order.cartItems}
        isCartOpen={order.isCartOpen}
        isSubmitting={order.isSubmitting}
        orderForm={order.orderForm}
        cartCount={order.cartCount}
        setIsCartOpen={order.setIsCartOpen}
        setOrderForm={order.setOrderForm}
        removeFromCart={order.removeFromCart}
        updateInstruction={order.updateInstruction}
        submitOrder={order.submitOrder}
      />
    </div>
  )
}

function CategoryCard({ category }: { category: AlaCarteCategory }) {
  const itemCount = getCategoryItems(category.id).length

  return (
    <Link
      to="/ala-carte/$categoryId"
      params={{ categoryId: category.id }}
      className="group overflow-hidden rounded-[1.65rem] border border-orange-100 bg-white shadow-xl shadow-orange-100 transition duration-300 hover:-translate-y-1 hover:shadow-2xl md:rounded-[2rem]"
    >
      <div className="h-36 overflow-hidden bg-orange-100 md:h-56">
        <img
          src={category.image.src}
          alt={category.image.alt}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-4 md:p-5">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-orange-600">
          {category.level}
        </p>
        <h3 className="mt-1 text-2xl font-black tracking-[-0.04em] text-slate-950 md:text-4xl">
          {category.shortLabel}
        </h3>
        <p className="mt-1 text-sm font-bold text-slate-500">
          {itemCount} item{itemCount === 1 ? '' : 's'}
        </p>
      </div>
    </Link>
  )
}

export function FloatingCartButton({
  cartCount,
  openCart,
}: {
  cartCount: number
  openCart: () => void
}) {
  if (cartCount === 0) return null

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-orange-200 bg-white/95 p-3 shadow-2xl backdrop-blur md:hidden">
        <Button
          className="h-14 w-full rounded-2xl text-base shadow-xl shadow-orange-500/20"
          onClick={openCart}
        >
          <ShoppingBag className="mr-2 h-5 w-5" />
          Cart · {cartCount} class{cartCount > 1 ? 'es' : ''}
        </Button>
      </div>
      <button
        type="button"
        className="fixed bottom-6 right-6 z-40 hidden rounded-full bg-slate-950 px-5 py-4 font-black text-white shadow-2xl shadow-orange-200 transition hover:-translate-y-0.5 hover:bg-orange-600 md:block"
        onClick={openCart}
      >
        <span className="flex items-center gap-3">
          <ShoppingBag className="h-5 w-5" />
          Cart · {cartCount}
        </span>
      </button>
    </>
  )
}

export function ItemDetailSheet({
  selectedItem,
  selectedInstruction,
  setSelectedInstruction,
  setSelectedItem,
  addToCart,
}: {
  selectedItem: AlaCarteItem | null
  selectedInstruction: string
  setSelectedInstruction: (instruction: string) => void
  setSelectedItem: (item: AlaCarteItem | null) => void
  addToCart: (item: AlaCarteItem, instruction?: string) => void
}) {
  return (
    <Sheet
      open={Boolean(selectedItem)}
      onOpenChange={() => setSelectedItem(null)}
    >
      <SheetContent className="w-full overflow-y-auto sm:max-w-xl">
        {selectedItem && (
          <div className="space-y-6 pb-8 pt-6">
            <div className="relative h-56 overflow-hidden rounded-3xl bg-orange-100">
              <img
                src={selectedItem.image.src}
                alt={selectedItem.image.alt}
                className="h-full w-full object-cover"
              />
            </div>
            <SheetHeader>
              <SheetTitle className="text-3xl font-black tracking-[-0.03em]">
                {selectedItem.title}
              </SheetTitle>
              <SheetDescription className="text-base leading-7">
                {selectedItem.description}
              </SheetDescription>
            </SheetHeader>

            <div className="grid grid-cols-2 gap-3">
              <MiniStat
                label="Duration"
                value={formatDuration(selectedItem.durationMinutes)}
              />
              <MiniStat
                label="Group"
                value={`≤ ${selectedItem.maxClassSize}`}
              />
            </div>

            <div>
              <p className="mb-3 font-black">Chapters covered</p>
              <div className="flex flex-wrap gap-2">
                {selectedItem.chapters.map((chapter) => (
                  <span
                    key={chapter}
                    className="rounded-full bg-orange-50 px-3 py-1 text-sm font-bold text-orange-700"
                  >
                    {chapter}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-3 font-black">What students will do</p>
              <div className="space-y-2">
                {selectedItem.whatStudentsWillDo.map((point) => (
                  <div
                    key={point}
                    className="flex gap-2 text-sm text-slate-700"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
                    {point}
                  </div>
                ))}
              </div>
            </div>

            <label className="block">
              <span className="font-black">
                Additional instruction (optional)
              </span>
              <Textarea
                className="mt-2 min-h-28 rounded-2xl"
                placeholder={selectedItem.additionalInstructionLabel}
                value={selectedInstruction}
                onChange={(event) => setSelectedInstruction(event.target.value)}
              />
            </label>

            <Button
              className="h-12 w-full rounded-2xl text-base"
              onClick={() => {
                addToCart(selectedItem, selectedInstruction)
                setSelectedItem(null)
              }}
            >
              Add to cart
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}

export function CartSheet({
  cartItems,
  isCartOpen,
  isSubmitting,
  orderForm,
  cartCount,
  setIsCartOpen,
  setOrderForm,
  removeFromCart,
  updateInstruction,
  submitOrder,
}: {
  cartItems: CartItem[]
  isCartOpen: boolean
  isSubmitting: boolean
  orderForm: OrderFormState
  cartCount: number
  setIsCartOpen: (isOpen: boolean) => void
  setOrderForm: Dispatch<SetStateAction<OrderFormState>>
  removeFromCart: (itemId: string) => void
  updateInstruction: (itemId: string, instruction: string) => void
  submitOrder: (event: FormEvent<HTMLFormElement>) => void
}) {
  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-xl">
        <div className="space-y-6 pb-8 pt-6">
          <SheetHeader>
            <SheetTitle className="text-3xl font-black tracking-[-0.03em]">
              Your ala-carte order
            </SheetTitle>
            <SheetDescription className="text-base leading-7">
              Submit your classes and we&apos;ll follow up to understand what
              your child needs, arrange timing, then send invoice/payment info.
            </SheetDescription>
          </SheetHeader>

          {cartItems.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-orange-200 bg-orange-50 p-8 text-center">
              <ShoppingBag className="mx-auto mb-3 h-10 w-10 text-orange-500" />
              <p className="font-black">Your cart is empty.</p>
              <p className="mt-2 text-sm text-slate-600">
                Pick a subject and add the class you want first.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((cartItem) => {
                const item = itemById.get(cartItem.itemId)
                if (!item) return null

                return (
                  <div
                    key={cartItem.itemId}
                    className="rounded-3xl border border-orange-100 bg-white p-4 shadow-sm"
                  >
                    <div className="grid grid-cols-[64px_1fr_auto] gap-3">
                      <div className="relative h-16 overflow-hidden rounded-2xl bg-orange-100">
                        <img
                          src={item.image.src}
                          alt={item.image.alt}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-black">{item.title}</p>
                        <p className="mt-1 text-sm text-slate-500">
                          {formatDuration(item.durationMinutes)} ·{' '}
                          {item.subject}
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <Textarea
                      className="mt-3 min-h-20 rounded-2xl"
                      placeholder="Additional instruction for this class (optional)"
                      value={cartItem.instruction}
                      onChange={(event) =>
                        updateInstruction(item.id, event.target.value)
                      }
                    />
                  </div>
                )
              })}

              <div className="rounded-3xl bg-slate-950 p-5 text-white">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange-300">
                  What happens next
                </p>
                <p className="mt-2 font-semibold leading-7 text-slate-100">
                  We&apos;ll contact you, confirm the best timing, then send
                  payment details after that conversation.
                </p>
              </div>
            </div>
          )}

          <form className="space-y-4" onSubmit={submitOrder}>
            <p className="rounded-2xl bg-orange-50 px-4 py-3 text-sm font-semibold text-orange-900">
              Name is required. Provide email or phone so we can follow up. If
              you provide email, we&apos;ll send a confirmation too.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-black">Name *</span>
                <Input
                  className="mt-2 h-12 rounded-2xl"
                  required
                  value={orderForm.name}
                  onChange={(event) =>
                    setOrderForm((current) => ({
                      ...current,
                      name: event.target.value,
                    }))
                  }
                  placeholder="Parent or student name"
                />
              </label>
              <label className="block">
                <span className="text-sm font-black">Email</span>
                <Input
                  className="mt-2 h-12 rounded-2xl"
                  type="email"
                  value={orderForm.email}
                  onChange={(event) =>
                    setOrderForm((current) => ({
                      ...current,
                      email: event.target.value,
                    }))
                  }
                  placeholder="For confirmation email"
                />
              </label>
            </div>
            <label className="block">
              <span className="text-sm font-black">Phone number</span>
              <Input
                className="mt-2 h-12 rounded-2xl"
                type="tel"
                value={orderForm.phone}
                onChange={(event) =>
                  setOrderForm((current) => ({
                    ...current,
                    phone: event.target.value,
                  }))
                }
                placeholder="WhatsApp / mobile"
              />
            </label>
            <label className="block">
              <span className="text-sm font-black">
                Student level (optional)
              </span>
              <Input
                className="mt-2 h-12 rounded-2xl"
                value={orderForm.studentLevel}
                onChange={(event) =>
                  setOrderForm((current) => ({
                    ...current,
                    studentLevel: event.target.value,
                  }))
                }
                placeholder="e.g. Sec 4 O Level, Sec 3 IGCSE"
              />
            </label>
            <label className="block">
              <span className="text-sm font-black">
                Anything else? (optional)
              </span>
              <Textarea
                className="mt-2 min-h-24 rounded-2xl"
                value={orderForm.notes}
                onChange={(event) =>
                  setOrderForm((current) => ({
                    ...current,
                    notes: event.target.value,
                  }))
                }
                placeholder="Tell us what your child needs help with or when you're usually reachable."
              />
            </label>
            <Button
              className="w-full rounded-2xl py-6 text-base"
              disabled={isSubmitting || cartItems.length === 0}
              type="submit"
            >
              {isSubmitting
                ? 'Submitting...'
                : `Submit ${cartCount} class${cartCount > 1 ? 'es' : ''}`}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  )
}

function InfoPill({
  icon,
  label,
  detail,
}: {
  icon: ReactNode
  label: string
  detail: string
}) {
  return (
    <div className="rounded-3xl border border-white/80 bg-white/80 p-4 shadow-lg shadow-orange-100/60 backdrop-blur">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-100 text-orange-700">
        {icon}
      </div>
      <p className="font-black">{label}</p>
      <p className="text-sm text-slate-500">{detail}</p>
    </div>
  )
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-orange-50 p-3 text-center">
      <p className="text-xs font-bold uppercase tracking-wider text-orange-700">
        {label}
      </p>
      <p className="mt-1 font-black text-slate-950">{value}</p>
    </div>
  )
}
