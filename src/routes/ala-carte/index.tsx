// ala-carte.tsx
// Mobile-first à la carte class menu landing page for Fusion Tuition.

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
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock3,
  ShoppingBag,
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
const heroSparkles = [
  { id: 0, size: 3, x: 12, y: 18, duration: 7.2, delay: 0.1 },
  { id: 1, size: 5, x: 28, y: 68, duration: 8.4, delay: 1.2 },
  { id: 2, size: 4, x: 46, y: 24, duration: 6.8, delay: 0.6 },
  { id: 3, size: 3, x: 64, y: 72, duration: 7.8, delay: 1.8 },
  { id: 4, size: 6, x: 78, y: 34, duration: 9.1, delay: 0.4 },
  { id: 5, size: 4, x: 88, y: 62, duration: 6.5, delay: 2.4 },
  { id: 6, size: 3, x: 18, y: 84, duration: 8.9, delay: 1.5 },
  { id: 7, size: 5, x: 36, y: 42, duration: 7.5, delay: 2.1 },
  { id: 8, size: 4, x: 55, y: 12, duration: 8.2, delay: 0.9 },
  { id: 9, size: 3, x: 70, y: 52, duration: 6.9, delay: 2.8 },
  { id: 10, size: 5, x: 6, y: 48, duration: 9.4, delay: 1.1 },
  { id: 11, size: 4, x: 94, y: 22, duration: 7.1, delay: 0.2 },
]

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

function scrollToCartForm(form: HTMLFormElement, fieldName?: string) {
  form.scrollIntoView({ behavior: 'smooth', block: 'start' })

  if (!fieldName) return

  window.setTimeout(() => {
    const field = form.elements.namedItem(fieldName)
    if (field instanceof HTMLElement) {
      field.focus({ preventScroll: true })
    }
  }, 450)
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
    const form = event.currentTarget

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

    if (!orderForm.name.trim()) {
      scrollToCartForm(form, 'name')
      toast({
        title: 'Please fill in the form',
        description: 'Start with your name so we know who to contact.',
        variant: 'destructive',
      })
      return
    }

    if (!trimmedEmail && !trimmedPhone) {
      scrollToCartForm(form, 'email')
      toast({
        title: 'Please fill in the form',
        description: 'Provide an email or phone number so we can follow up.',
        variant: 'destructive',
      })
      return
    }

    if (trimmedEmail && !emailPattern.test(trimmedEmail)) {
      scrollToCartForm(form, 'email')
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

function MicroSparkleDrifter() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      {heroSparkles.map((sp) => (
        <motion.div
          key={sp.id}
          className="absolute rounded-full bg-orange-400/20 shadow-[0_0_8px_rgba(249,115,22,0.35)]"
          style={{
            width: sp.size,
            height: sp.size,
            left: `${sp.x}%`,
            top: `${sp.y}%`,
          }}
          animate={{
            y: ['0px', '-70px', '0px'],
            opacity: [0.08, 0.65, 0.08],
            scale: [0.8, 1.25, 0.8],
          }}
          transition={{
            duration: sp.duration,
            repeat: Infinity,
            delay: sp.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

export function FloatingAlaCarteNav({
  isVisible,
  backTo,
  backLabel,
  cartCount,
  openCart,
}: {
  isVisible: boolean
  backTo: '/' | '/ala-carte'
  backLabel: string
  cartCount: number
  openCart: () => void
}) {
  return (
    <AnimatePresence initial={false}>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.98 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="fixed inset-x-0 top-[calc(0.75rem+env(safe-area-inset-top))] z-50 px-4 sm:top-4"
        >
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 rounded-full border border-white/70 bg-white/85 p-1.5 shadow-2xl shadow-orange-200/60 backdrop-blur-xl">
            <Button
              asChild
              className="h-11 rounded-full border-transparent bg-white px-4 font-black text-slate-950 shadow-sm hover:bg-orange-50 hover:text-orange-700"
              variant="outline"
            >
              <Link to={backTo}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                {backLabel}
              </Link>
            </Button>
            <Button
              className="hidden h-11 rounded-full border-transparent bg-slate-950 px-4 font-black text-white shadow-sm hover:bg-orange-600 sm:inline-flex"
              onClick={openCart}
            >
              Cart
              <motion.span
                key={cartCount}
                initial={{ scale: 1 }}
                animate={cartCount > 0 ? { scale: [1, 1.3, 0.9, 1] } : {}}
                transition={{ duration: 0.4 }}
                className="ml-1 inline-block"
              >
                {cartCount > 0 ? ` · ${cartCount}` : ''}
              </motion.span>
              <ShoppingBag className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function AlaCarteFooter() {
  return (
    <footer className="mt-20 border-t-2 border-slate-950/5 py-16 text-center max-w-5xl mx-auto px-4 select-none">
      <div className="flex flex-col items-center gap-6">
        <img
          src="/fusion_tuition_logo_horizontal.png"
          alt="Fusion Tuition"
          className="h-8 md:h-10 object-contain select-none"
        />

        <p className="text-xs font-black uppercase tracking-[0.24em] text-slate-400">
          in pursuit of better · fusion tuition
        </p>

        <div className="flex items-center gap-6 font-black text-xs text-slate-500 uppercase tracking-widest">
          <Link to="/" className="hover:text-orange-600 transition-colors">
            Home
          </Link>
          <span className="text-slate-300">·</span>
          <Link to="/about" className="hover:text-orange-600 transition-colors">
            About
          </Link>
          <span className="text-slate-300">·</span>
          <Link
            to="/contact"
            className="hover:text-orange-600 transition-colors"
          >
            Contact
          </Link>
        </div>

        <p className="text-[10px] font-bold text-slate-400 max-w-md leading-relaxed">
          © {new Date().getFullYear()} Fusion Tuition. All rights reserved.
          Timing for classes is coordinated dynamically after selection
          submission.
        </p>
      </div>
    </footer>
  )
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      className={`rounded-[1.5rem] border-2 border-slate-950 transition-all overflow-hidden bg-white shadow-[3px_3px_0px_#020617] hover:shadow-[4px_4px_0px_#f97316] ${isOpen ? 'shadow-[4px_4px_0px_#f97316]' : ''}`}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left font-black text-slate-950 text-base md:text-lg select-none cursor-pointer outline-none"
      >
        <motion.span
          animate={{ x: isOpen ? 6 : 0 }}
          transition={{ type: 'spring', stiffness: 180, damping: 15 }}
        >
          {question}
        </motion.span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-700 border border-orange-200/50"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <title>Toggle details</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 180, damping: 20 }}
          >
            <div className="border-t border-slate-100 p-5 text-sm font-semibold text-slate-600 leading-relaxed bg-gradient-to-br from-white to-[#fffaf3]/40">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function HowItWorksAndFaq() {
  const steps = [
    {
      number: '01',
      title: 'Pick weak chapters',
      desc: 'Choose the topics that need focused help.',
      color: 'from-orange-400 to-orange-500',
      shadow: 'shadow-orange-500/20',
    },
    {
      number: '02',
      title: 'Send your request',
      desc: 'No payment here. Just share your details.',
      color: 'from-teal-400 to-teal-500',
      shadow: 'shadow-teal-500/20',
    },
    {
      number: '03',
      title: 'Justine will reach out',
      desc: 'He will coordinate timing and next steps with you.',
      color: 'from-amber-400 to-amber-500',
      shadow: 'shadow-amber-500/20',
    },
  ]

  const faqs = [
    {
      q: 'How do you coordinate timings for classes?',
      a: 'Rather than forcing you into fixed timetables, we schedule à la carte sessions dynamically. Once you submit your classes, our registrar reaches out directly via phone or WhatsApp to understand your vacation schedule and match a slot that fits perfectly.',
    },
    {
      q: 'Is there an immediate charge or deposit required?',
      a: 'No payment is collected on this website. Selecting and submitting classes is 100% free of charge. We will align on the ideal slots first, and invoice details will be shared digitally only after schedule confirmation.',
    },
    {
      q: 'What is the class size limit?',
      a: "Classes are kept to 5 students or fewer, so tutors can spot each student's mistakes and keep the session focused.",
    },
    {
      q: 'Can we request help with topics not listed?',
      a: "Absolutely! If you need support with a specific school worksheet, an unlisted chapter, or are from a different syllabus (e.g. IP or AP), please specify this in the 'Anything else?' or 'Additional instruction' fields during checkout. We will coordinate a tailored rescue option.",
    },
  ]

  return (
    <section className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8 border-t border-slate-950/5">
      {/* Background blurs */}
      <div className="absolute right-0 bottom-12 h-64 w-64 rounded-full bg-orange-100/40 blur-3xl pointer-events-none" />
      <div className="absolute left-[-4rem] top-12 h-80 w-80 rounded-full bg-teal-100/30 blur-3xl pointer-events-none" />

      {/* Stepper Title */}
      <div className="text-center sm:text-left mb-12">
        <span className="text-xs font-black uppercase tracking-[0.32em] text-orange-700 bg-orange-100/50 px-4.5 py-1.5 rounded-full border border-orange-200/50 shadow-sm backdrop-blur-sm">
          easy 3-step master-rescue
        </span>
        <h2 className="mt-5 text-4xl font-black tracking-[-0.05em] sm:text-5xl lg:text-6xl text-slate-950">
          how it works.
        </h2>
        <p className="mt-3 text-slate-500 font-bold max-w-xl">
          From selecting chapters to targeted classroom victory—simple,
          personalized, and friction-free.
        </p>
      </div>

      {/* Step Cards Grid */}
      <div className="relative grid gap-6 sm:grid-cols-3 mb-24">
        {/* Desktop connecting dashed SVG path */}
        <div className="absolute top-[40px] left-[15%] right-[15%] hidden sm:block pointer-events-none select-none z-0">
          <svg
            className="w-full h-8"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 400 30"
          >
            <path
              d="M0,15 Q100,2 200,15 T400,15"
              stroke="#f97316"
              strokeWidth="2"
              strokeDasharray="6,6"
              className="opacity-20"
            />
          </svg>
        </div>

        {/* Mobile connecting vertical line */}
        <div className="absolute left-[48px] top-10 bottom-10 w-0.5 border-l-2 border-dashed border-orange-500/20 sm:hidden pointer-events-none select-none z-0" />

        {steps.map((step, idx) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{
              type: 'spring',
              stiffness: 80,
              damping: 15,
              delay: idx * 0.1,
            }}
            whileHover={{ y: -6, scale: 1.015 }}
            whileTap={{ scale: 0.985 }}
            className="group relative rounded-[2rem] border-2 border-slate-950 bg-white p-6 shadow-[5px_5px_0px_#020617] hover:shadow-[5px_5px_0px_#f97316] transition-all duration-200 z-10"
          >
            {/* Step bubble */}
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${step.color} text-white font-black text-lg shadow-lg ${step.shadow} transition-transform duration-300 group-hover:scale-105 relative`}
            >
              {step.number}
              {/* Spinning orbital white dot around step bubble on card hover */}
              <motion.div
                className="absolute inset-[-4px] rounded-2xl border border-orange-500/0 group-hover:border-orange-500/25 pointer-events-none"
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-orange-500 opacity-0 group-hover:opacity-100 shadow-[0_0_8px_#f97316]" />
              </motion.div>
            </div>

            <h3 className="mt-5 text-xl font-black text-slate-950 tracking-tight leading-tight">
              {step.title}
            </h3>
            <p className="mt-3 text-sm font-semibold text-slate-500 leading-relaxed">
              {step.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* FAQ Title */}
      <div className="text-center sm:text-left mb-12">
        <span className="text-xs font-black uppercase tracking-[0.32em] text-teal-700 bg-teal-50 px-4.5 py-1.5 rounded-full border border-teal-200/50 shadow-sm backdrop-blur-sm">
          have questions?
        </span>
        <h2 className="mt-5 text-4xl font-black tracking-[-0.05em] sm:text-5xl lg:text-6xl text-slate-950">
          frequently asked questions.
        </h2>
        <p className="mt-3 text-slate-500 font-bold max-w-xl">
          Everything parents and students want to know about our target chapter
          rescue classes.
        </p>
      </div>

      {/* Accordion FAQ Grid */}
      <div className="grid gap-4 max-w-4xl">
        {faqs.map((faq, idx) => (
          <FaqItem key={idx} question={faq.q} answer={faq.a} />
        ))}
      </div>
    </section>
  )
}

function CartStepIndicator({
  cartCount,
  isSubmitting,
}: { cartCount: number; isSubmitting: boolean }) {
  const step = cartCount === 0 ? 1 : isSubmitting ? 3 : 2

  return (
    <div className="flex items-center justify-center gap-2 rounded-full border border-slate-950/5 bg-slate-950/[0.02] p-1 w-full max-w-sm mx-auto select-none mb-6">
      <div
        className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-colors duration-300 ${
          step === 1 ? 'bg-slate-950 text-white shadow-sm' : 'text-slate-400'
        }`}
      >
        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-slate-200 text-slate-950 text-[9px] font-black">
          1
        </span>
        <span>Choose</span>
      </div>
      <div className="h-0.5 w-4 bg-slate-200" />
      <div
        className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-colors duration-300 ${
          step === 2 ? 'bg-slate-950 text-white shadow-sm' : 'text-slate-400'
        }`}
      >
        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-slate-200 text-slate-950 text-[9px] font-black">
          2
        </span>
        <span>Details</span>
      </div>
      <div className="h-0.5 w-4 bg-slate-200" />
      <div
        className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-colors duration-300 ${
          step === 3 ? 'bg-slate-950 text-white shadow-sm' : 'text-slate-400'
        }`}
      >
        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-slate-200 text-slate-950 text-[9px] font-black">
          3
        </span>
        <span>Finish</span>
      </div>
    </div>
  )
}

function QuickAddCard({ onAdd }: { onAdd: (item: any) => void }) {
  const moleItem = items.find((item) => item.id === 'o-chem-mole-concept')
  if (!moleItem) return null

  return (
    <div className="relative mt-6 overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white p-5 text-left shadow-sm transition-shadow group hover:shadow-md">
      <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-orange-500/5 blur-xl pointer-events-none" />
      <div className="absolute -left-6 -bottom-6 h-20 w-20 rounded-full bg-teal-500/5 blur-xl pointer-events-none" />

      <div className="flex items-center justify-between gap-2">
        <span className="text-[9px] font-black uppercase tracking-widest text-orange-600 bg-orange-50 border border-orange-100 px-2.5 py-1 rounded-full">
          💡 fast-track suggestion
        </span>
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
          High Yield
        </span>
      </div>

      <h4 className="mt-3.5 text-base font-black text-slate-950 leading-tight group-hover:text-orange-600 transition-colors">
        {moleItem.title}
      </h4>
      <p className="mt-1.5 text-xs font-semibold text-slate-500 leading-relaxed line-clamp-2">
        {moleItem.description}
      </p>

      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3.5">
        <div className="text-[11px] font-black text-slate-500 uppercase tracking-wider">
          O Level · {formatDuration(moleItem.durationMinutes)}
        </div>
        <Button
          type="button"
          onClick={() => onAdd(moleItem)}
          className="h-8 rounded-xl bg-slate-950 px-3 text-xs font-black text-white shadow-none transition-colors hover:bg-orange-600"
        >
          Quick Add
        </Button>
      </div>
    </div>
  )
}

function AlaCartePage() {
  const order = useAlaCarteOrder()
  const [activeFilter, setActiveFilter] = useState<'all' | 'O Level' | 'IGCSE'>(
    'all',
  )
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const shouldShow = window.scrollY > 80
      setIsScrolled((current) =>
        current === shouldShow ? current : shouldShow,
      )
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const filteredCategories = categories.filter((category) => {
    if (activeFilter === 'all') return true
    return category.level === activeFilter
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
      },
    },
  }

  const logoVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.7,
      filter: 'blur(20px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        stiffness: 60,
        damping: 14,
        duration: 1.2,
        delay: 0.08,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 24, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 14,
        delay: 1.15,
      },
    },
  }

  return (
    <div className="relative min-h-screen bg-[#fffaf3] pb-28 text-slate-950 [overflow-x:clip]">
      {/* Gentle emerging ambient background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.2, ease: 'easeOut' }}
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -left-24 top-8 h-72 w-72 rounded-full bg-orange-200/60 blur-3xl" />
        <div className="absolute right-[-9rem] top-72 h-96 w-96 rounded-full bg-teal-200/50 blur-3xl" />
        <div className="absolute inset-0 bg-dot-thick-orange-500 opacity-[0.06] [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />

        {/* Concentric rotating background orbits (Sirius / Orbit theme) */}
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 h-[600px] w-[600px] pointer-events-none select-none">
          {/* Orbit 1 */}
          <motion.div
            className="absolute inset-0 rounded-full border border-orange-500/[0.04]"
            animate={{ rotate: 360 }}
            transition={{ duration: 75, repeat: Infinity, ease: 'linear' }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-orange-400/30 blur-[1px]" />
          </motion.div>

          {/* Orbit 2 */}
          <motion.div
            className="absolute -inset-16 rounded-full border border-teal-500/[0.04]"
            animate={{ rotate: -360 }}
            transition={{ duration: 110, repeat: Infinity, ease: 'linear' }}
          >
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 h-2.5 w-2.5 rounded-full bg-teal-400/30 blur-[1px]" />
          </motion.div>
        </div>
      </motion.div>

      <FloatingAlaCarteNav
        isVisible={isScrolled}
        backTo="/"
        backLabel="Back home"
        cartCount={order.cartCount}
        openCart={() => order.setIsCartOpen(true)}
      />

      <section className="relative mx-auto flex min-h-[100svh] max-w-5xl items-center px-4 pb-16 pt-10 sm:px-6 md:pb-20 md:pt-16 lg:px-8">
        <MicroSparkleDrifter />
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="z-10 grid w-full items-center gap-6 text-left md:grid-cols-[1fr_200px] md:gap-8"
        >
          <div className="hidden justify-end md:order-2 md:flex">
            <motion.div
              variants={logoVariants}
              className="relative flex h-32 w-32 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-amber-600 shadow-[0_0_44px_rgba(249,115,22,0.45)] sm:h-36 sm:w-36 md:h-28 md:w-28"
            />
          </div>

          {/* Left-aligned hero content */}
          <div className="relative isolate order-1 flex flex-col pt-8 text-left md:order-1 md:pt-0">
            <motion.div
              variants={logoVariants}
              className="pointer-events-none absolute right-[-0.75rem] top-[-0.2rem] z-0 flex h-32 w-32 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-amber-600 opacity-95 shadow-[0_0_44px_rgba(249,115,22,0.45)] md:hidden"
              aria-hidden="true"
            />

            <motion.div
              variants={itemVariants}
              className="relative z-10 flex max-w-[18rem] flex-wrap items-baseline gap-x-2 gap-y-1 text-2xl leading-none sm:max-w-none sm:text-3xl md:text-2xl"
            >
              <span className="font-[Georgia,serif] font-bold italic tracking-[0.04em] text-orange-600">
                À la carte
              </span>
              <span className="font-extrabold uppercase tracking-[0.04em] text-slate-600">
                classes
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="relative z-10 mt-6 max-w-4xl text-balance text-5xl font-black leading-[0.93] tracking-[-0.06em] text-slate-950 sm:text-7xl lg:text-8xl"
            >
              conquer your <br />
              <span className="bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 bg-clip-text text-transparent drop-shadow-[0_2px_25px_rgba(249,115,22,0.15)]">
                weaknesses.
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="relative z-10 mt-6 max-w-2xl text-lg font-semibold leading-8 text-slate-700 sm:text-xl"
            >
              June Holidays. One-off classes for your weaknesses.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="relative z-10 mt-8 grid gap-3 sm:grid-cols-2 max-w-xl"
            >
              <InfoPill
                icon={<Clock3 className="h-5 w-5" />}
                label="2–3 hours"
                detail="focused session"
              />
              <InfoPill
                icon={<UsersRound className="h-5 w-5" />}
                label="≤ 5 students"
                detail="small group"
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section
        id="ala-carte-menu"
        className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="mb-10 text-center sm:text-left">
          <p className="text-xs font-black uppercase tracking-[0.32em] text-orange-600 bg-orange-100/50 px-4 py-1.5 rounded-full inline-block border border-orange-200/50 shadow-sm backdrop-blur-sm">
            Choose a subject
          </p>
          <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] sm:text-5xl lg:text-6xl text-slate-950">
            What do you need help with?
          </h2>
          <p className="mt-3 text-slate-500 font-bold max-w-xl">
            Select a subject path to view O Level and IGCSE rescue class
            curriculums.
          </p>
        </div>

        {/* Dynamic Level Filter Pills */}
        <div className="mb-10 flex flex-wrap justify-center sm:justify-start gap-2.5 rounded-[2rem] border-2 border-slate-950 bg-white p-1.5 w-fit shadow-[4px_4px_0px_#020617] mx-auto sm:mx-0">
          {(
            [
              { id: 'all', label: 'All Subjects' },
              { id: 'O Level', label: 'O Level' },
              { id: 'IGCSE', label: 'IGCSE' },
            ] as const
          ).map((opt) => {
            const isActive = activeFilter === opt.id
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setActiveFilter(opt.id)}
                className="relative px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-colors duration-200 select-none cursor-pointer"
                style={{
                  color: isActive ? '#fff' : '#0f172a',
                }}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeFilterBg"
                    className="absolute inset-0 rounded-full bg-slate-950"
                    transition={{ type: 'spring', stiffness: 220, damping: 20 }}
                  />
                )}
                <span className="relative z-10">{opt.label}</span>
              </button>
            )
          })}
        </div>

        <motion.div
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.12,
              },
            },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid gap-6 sm:grid-cols-2 lg:gap-8"
        >
          {filteredCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </motion.div>
      </section>

      {/* HOW IT WORKS & FAQs */}
      <HowItWorksAndFaq />

      {/* Classy Sirius Footer */}
      <AlaCarteFooter />

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
        addToCart={order.addToCart}
      />
    </div>
  )
}

function CategoryCard({ category }: { category: AlaCarteCategory }) {
  const itemCount = getCategoryItems(category.id).length

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
        visible: {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: {
            type: 'spring',
            stiffness: 80,
            damping: 14,
          },
        },
      }}
      className="h-full"
    >
      <Link
        to="/ala-carte/$categoryId"
        params={{ categoryId: category.id }}
        className="group block h-full overflow-hidden rounded-[2rem] border-2 border-slate-950 bg-white shadow-[6px_6px_0px_#020617] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[5px_5px_0px_#f97316] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[3px_3px_0px_#020617] transition-all duration-200 select-none cursor-pointer"
      >
        <div className="h-48 overflow-hidden bg-orange-50 relative border-b-2 border-slate-950">
          <img
            src={category.image.src}
            alt={category.image.alt}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
          <div className="absolute top-4 left-4 rounded-full bg-slate-950 px-3 py-1 text-xs font-black text-white border border-white/20 shadow-sm">
            {category.level}
          </div>
        </div>
        <div className="p-6 flex flex-col justify-between h-[calc(100%-12rem)]">
          <div>
            <h3 className="text-2xl font-black tracking-[-0.04em] text-slate-950 md:text-3xl leading-tight">
              {category.shortLabel}
            </h3>
            <p className="mt-2 text-sm font-semibold text-slate-500 leading-relaxed line-clamp-2">
              {category.description}
            </p>
          </div>
          <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 border border-orange-100/50 px-3 py-1 text-xs font-black text-orange-700">
              {itemCount} class{itemCount === 1 ? '' : 'es'}
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm font-black text-slate-950 group-hover:text-orange-600 transition-colors">
              explore curriculum
              <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export function FloatingCartButton({
  cartCount,
  openCart,
}: {
  cartCount: number
  openCart: () => void
}) {
  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-orange-200/80 bg-white/95 px-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 shadow-[0_-18px_40px_rgba(251,146,60,0.18)] backdrop-blur-xl md:hidden">
        <motion.div
          key={cartCount}
          initial={{ scale: 1 }}
          animate={cartCount > 0 ? { scale: [1, 1.08, 0.96, 1] } : {}}
          transition={{ duration: 0.4 }}
        >
          <Button
            className={
              cartCount === 0
                ? 'h-14 w-full rounded-2xl border-orange-200 bg-white text-base font-black text-slate-950 shadow-sm hover:bg-orange-50 hover:text-slate-950'
                : 'h-14 w-full rounded-2xl text-base font-black shadow-xl shadow-orange-500/20'
            }
            onClick={openCart}
            variant={cartCount === 0 ? 'outline' : 'default'}
          >
            <ShoppingBag className="mr-2 h-5 w-5" />
            {cartCount === 0
              ? 'View cart'
              : `Cart · ${cartCount} class${cartCount > 1 ? 'es' : ''}`}
          </Button>
        </motion.div>
      </div>
      {cartCount > 0 && (
        <motion.button
          key={cartCount}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: [0.8, 1.1, 0.95, 1], opacity: 1 }}
          transition={{ duration: 0.4 }}
          type="button"
          className="fixed bottom-6 right-6 z-40 hidden rounded-full bg-slate-950 px-5 py-4 font-black text-white shadow-2xl shadow-orange-200 transition hover:-translate-y-0.5 hover:bg-orange-600 md:block"
          onClick={openCart}
        >
          <span className="flex items-center gap-3">
            <ShoppingBag className="h-5 w-5" />
            Cart · {cartCount}
          </span>
        </motion.button>
      )}
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
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  }

  const childVariants = {
    hidden: { opacity: 0, y: 16, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  }

  return (
    <Sheet
      open={Boolean(selectedItem)}
      onOpenChange={() => setSelectedItem(null)}
    >
      <SheetContent className="w-full overflow-y-auto border-l border-orange-100 bg-[#fffaf3] sm:max-w-xl">
        {selectedItem && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6 pb-8 pt-6 text-slate-950"
          >
            <motion.div
              variants={childVariants}
              className="relative h-56 overflow-hidden rounded-[2rem] border-2 border-slate-950 shadow-[6px_6px_0px_#020617] bg-orange-100"
            >
              <img
                src={selectedItem.image.src}
                alt={selectedItem.image.alt}
                className="h-full w-full object-cover"
              />
            </motion.div>

            <motion.div variants={childVariants}>
              <SheetHeader className="text-left">
                <SheetTitle className="text-3xl font-black tracking-[-0.03em] leading-tight text-slate-950">
                  {selectedItem.title}
                </SheetTitle>
                <SheetDescription className="text-base leading-relaxed font-semibold text-slate-600">
                  {selectedItem.description}
                </SheetDescription>
              </SheetHeader>
            </motion.div>

            <motion.div
              variants={childVariants}
              className="grid grid-cols-2 gap-4"
            >
              <MiniStat
                label="Duration"
                value={formatDuration(selectedItem.durationMinutes)}
              />
              <MiniStat label="Max Group" value="≤ 5 students" />
            </motion.div>

            <motion.div variants={childVariants}>
              <p className="mb-3 text-xs font-black uppercase tracking-wider text-slate-700">
                Chapters covered
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedItem.chapters.map((chapter) => (
                  <span
                    key={chapter}
                    className="rounded-full border-2 border-slate-950 bg-white px-3.5 py-1.5 text-xs font-black text-slate-950 shadow-[2px_2px_0px_rgba(2,6,23,0.06)] hover:bg-orange-50 transition-colors"
                  >
                    {chapter}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div variants={childVariants}>
              <p className="mb-3 text-xs font-black uppercase tracking-wider text-slate-700">
                What students will do
              </p>
              <div className="space-y-2.5">
                {selectedItem.whatStudentsWillDo.map((point) => (
                  <div
                    key={point}
                    className="flex items-start gap-3 rounded-2xl border border-slate-950/5 bg-white/50 p-3.5 shadow-sm backdrop-blur-sm"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" />
                    <p className="text-sm font-bold text-slate-700 leading-relaxed">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.label variants={childVariants} className="block">
              <span className="text-xs font-black uppercase tracking-wider text-slate-700">
                Additional instruction (optional)
              </span>
              <Textarea
                className="mt-2.5 min-h-28 rounded-2xl border-2 border-slate-950 bg-white p-3 text-sm shadow-[2px_2px_0px_#020617] focus-visible:ring-0 focus-visible:border-orange-500 focus-visible:shadow-[4px_4px_0px_#f97316] transition-all font-semibold"
                placeholder={selectedItem.additionalInstructionLabel}
                value={selectedInstruction}
                onChange={(event) => setSelectedInstruction(event.target.value)}
              />
            </motion.label>

            <motion.div variants={childVariants}>
              <Button
                className="h-12 w-full rounded-2xl border-2 border-slate-950 bg-slate-950 font-black text-white shadow-[4px_4px_0px_rgba(249,115,22,0.85)] hover:bg-orange-600 hover:shadow-[4px_4px_0px_#020617] transition-all duration-200 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                onClick={() => {
                  addToCart(selectedItem, selectedInstruction)
                  setSelectedItem(null)
                }}
              >
                Add to cart
              </Button>
            </motion.div>
          </motion.div>
        )}
      </SheetContent>
    </Sheet>
  )
}

function TactileField({
  label,
  required = false,
  isFocused,
  children,
}: {
  label: string
  required?: boolean
  isFocused: boolean
  children: ReactNode
}) {
  return (
    <div className="group block text-left">
      <span className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-slate-700 transition-colors duration-200 group-focus-within:text-orange-600">
        {label} {required && '*'}
        <AnimatePresence>
          {isFocused && (
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="inline-block h-1.5 w-1.5 rounded-full bg-orange-500 shadow-[0_0_6px_#f97316]"
            />
          )}
        </AnimatePresence>
      </span>
      <div className="relative mt-2">{children}</div>
    </div>
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
  addToCart,
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
  addToCart: (item: AlaCarteItem, instruction?: string) => void
}) {
  const [activeFocus, setActiveFocus] = useState<string | null>(null)

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="w-full overflow-y-auto border-l border-orange-100 bg-[#fffaf3] sm:max-w-xl">
        <div className="space-y-6 pb-8 pt-6 text-slate-950">
          <CartStepIndicator
            cartCount={cartCount}
            isSubmitting={isSubmitting}
          />

          <SheetHeader className="text-left">
            <SheetTitle className="text-3xl font-black tracking-[-0.03em] leading-tight text-slate-950">
              Your ala-carte order
            </SheetTitle>
            <SheetDescription className="text-base leading-relaxed font-semibold text-slate-600">
              Submit your classes and we&apos;ll follow up to understand what
              your child needs, arrange timing, then send invoice/payment info.
            </SheetDescription>
          </SheetHeader>

          {cartItems.length === 0 ? (
            <div className="relative overflow-hidden rounded-[2rem] border border-orange-100 bg-orange-50/50 p-8 text-center shadow-sm">
              {/* Planetary Orbit Inside Sheet */}
              <div className="relative mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-amber-600 shadow-[0_0_30px_rgba(249,115,22,0.25)]">
                <div className="absolute h-[86%] w-[86%] rounded-full border border-white/20 bg-orange-600/5 backdrop-blur-sm" />
                <motion.div
                  className="absolute h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,1)]"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                  style={{ originX: '2rem', originY: '0px' }}
                />
                <ShoppingBag className="h-8 w-8 text-white drop-shadow-md" />
              </div>
              <p className="text-xl font-black text-slate-950">
                Your cart is empty
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-500 max-w-xs mx-auto">
                Explore our target-focused June holiday classes and add a
                subject curriculum to get started.
              </p>
              <Button
                type="button"
                className="mt-6 rounded-full bg-slate-950 px-6 py-2.5 text-xs font-black text-white transition-colors hover:bg-orange-600 hover:text-white"
                onClick={() => {
                  setIsCartOpen(false)
                  document
                    .getElementById('ala-carte-menu')
                    ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
              >
                Browse classes
              </Button>

              <QuickAddCard onAdd={(item) => addToCart(item)} />
            </div>
          ) : (
            <div className="space-y-4">
              <AnimatePresence initial={false}>
                {cartItems.map((cartItem) => {
                  const item = itemById.get(cartItem.itemId)
                  if (!item) return null

                  return (
                    <motion.div
                      key={cartItem.itemId}
                      initial={{ opacity: 0, height: 0, y: 15 }}
                      animate={{ opacity: 1, height: 'auto', y: 0 }}
                      exit={{
                        opacity: 0,
                        height: 0,
                        y: -15,
                        transition: { duration: 0.25 },
                      }}
                      layout
                      className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-sm transition-shadow duration-200 hover:shadow-md"
                    >
                      <div className="grid grid-cols-[64px_1fr_auto] gap-3">
                        <div className="relative h-16 overflow-hidden rounded-2xl border border-orange-100 bg-orange-100">
                          <img
                            src={item.image.src}
                            alt={item.image.alt}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-black text-slate-950">
                            {item.title}
                          </p>
                          <p className="mt-1 text-xs font-bold text-slate-500">
                            {formatDuration(item.durationMinutes)} ·{' '}
                            {item.subject}
                          </p>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="h-9 w-9 rounded-xl border border-slate-200 bg-white shadow-none transition-colors hover:bg-red-50 hover:text-red-600"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <Textarea
                        className="mt-3 min-h-20 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-950 shadow-none transition-colors focus-visible:border-orange-500 focus-visible:ring-0"
                        placeholder="Additional instruction for this class (optional)"
                        value={cartItem.instruction}
                        onChange={(event) =>
                          updateInstruction(item.id, event.target.value)
                        }
                      />
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          )}

          <form className="space-y-4" onSubmit={submitOrder} noValidate>
            <p className="rounded-2xl border border-orange-100 bg-orange-50/50 px-4 py-3.5 text-xs font-black text-orange-950">
              Name is required. Provide email or phone so we can follow up. If
              you provide email, we&apos;ll send a confirmation too.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <TactileField
                label="Name"
                required
                isFocused={activeFocus === 'name'}
              >
                <Input
                  className="h-12 rounded-2xl border border-slate-200 bg-white px-4 font-semibold text-slate-950 shadow-none transition-colors focus:bg-[#fffdfa] focus-visible:border-orange-500 focus-visible:ring-0"
                  name="name"
                  value={orderForm.name}
                  onFocus={() => setActiveFocus('name')}
                  onBlur={() => setActiveFocus(null)}
                  onChange={(event) =>
                    setOrderForm((current) => ({
                      ...current,
                      name: event.target.value,
                    }))
                  }
                  placeholder="Parent or student name"
                />
              </TactileField>
              <TactileField label="Email" isFocused={activeFocus === 'email'}>
                <Input
                  className="h-12 rounded-2xl border border-slate-200 bg-white px-4 font-semibold text-slate-950 shadow-none transition-colors focus:bg-[#fffdfa] focus-visible:border-orange-500 focus-visible:ring-0"
                  name="email"
                  type="email"
                  value={orderForm.email}
                  onFocus={() => setActiveFocus('email')}
                  onBlur={() => setActiveFocus(null)}
                  onChange={(event) =>
                    setOrderForm((current) => ({
                      ...current,
                      email: event.target.value,
                    }))
                  }
                  placeholder="For confirmation email"
                />
              </TactileField>
            </div>
            <TactileField
              label="Phone number"
              isFocused={activeFocus === 'phone'}
            >
              <Input
                className="h-12 rounded-2xl border border-slate-200 bg-white px-4 font-semibold text-slate-950 shadow-none transition-colors focus:bg-[#fffdfa] focus-visible:border-orange-500 focus-visible:ring-0"
                name="phone"
                type="tel"
                value={orderForm.phone}
                onFocus={() => setActiveFocus('phone')}
                onBlur={() => setActiveFocus(null)}
                onChange={(event) =>
                  setOrderForm((current) => ({
                    ...current,
                    phone: event.target.value,
                  }))
                }
                placeholder="WhatsApp / mobile"
              />
            </TactileField>
            <TactileField
              label="Student level (optional)"
              isFocused={activeFocus === 'studentLevel'}
            >
              <Input
                className="h-12 rounded-2xl border border-slate-200 bg-white px-4 font-semibold text-slate-950 shadow-none transition-colors focus:bg-[#fffdfa] focus-visible:border-orange-500 focus-visible:ring-0"
                name="studentLevel"
                value={orderForm.studentLevel}
                onFocus={() => setActiveFocus('studentLevel')}
                onBlur={() => setActiveFocus(null)}
                onChange={(event) =>
                  setOrderForm((current) => ({
                    ...current,
                    studentLevel: event.target.value,
                  }))
                }
                placeholder="e.g. Sec 4 O Level, Sec 3 IGCSE"
              />
            </TactileField>
            <TactileField
              label="Anything else? (optional)"
              isFocused={activeFocus === 'notes'}
            >
              <Textarea
                className="min-h-24 rounded-2xl border border-slate-200 bg-white p-4 font-semibold text-slate-950 shadow-none transition-colors focus:bg-[#fffdfa] focus-visible:border-orange-500 focus-visible:ring-0"
                name="notes"
                value={orderForm.notes}
                onFocus={() => setActiveFocus('notes')}
                onBlur={() => setActiveFocus(null)}
                onChange={(event) =>
                  setOrderForm((current) => ({
                    ...current,
                    notes: event.target.value,
                  }))
                }
                placeholder="Tell us what your child needs help with or when you're usually reachable."
              />
            </TactileField>
            <div className="sticky bottom-0 z-20 -mx-6 border-t border-orange-100 bg-[#fffaf3]/95 px-6 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl">
              <Button
                className="w-full rounded-2xl bg-slate-950 py-6 text-base font-black text-white shadow-sm transition-colors hover:bg-orange-600"
                disabled={isSubmitting || cartItems.length === 0}
                type="submit"
              >
                {isSubmitting
                  ? 'Submitting...'
                  : `Submit ${cartCount} class${cartCount > 1 ? 'es' : ''}`}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
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
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="relative rounded-[2rem] border-2 border-slate-950 bg-white/40 p-4 shadow-[4px_4px_0px_rgba(2,6,23,0.08)] backdrop-blur-md transition-all select-none"
      whileHover={{
        y: -4,
        scale: 1.025,
        backgroundColor: 'rgba(255,255,255,0.75)',
        borderColor: 'rgba(249,115,22,1)',
        boxShadow: '6px 6px 0px rgba(249,115,22,0.85)',
      }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center gap-4">
        <motion.div
          className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-700"
          animate={
            isHovered
              ? { rotate: [0, -12, 12, -6, 6, 0], scale: 1.08 }
              : { rotate: 0, scale: 1 }
          }
          transition={{ duration: 0.5 }}
        >
          {icon}
        </motion.div>
        <div className="text-left">
          <p className="font-black text-slate-950 leading-none">{label}</p>
          <p className="mt-1 text-sm font-semibold text-slate-500 leading-none">
            {detail}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border-2 border-slate-950 bg-orange-50/50 p-4 text-center shadow-[3px_3px_0px_#020617]">
      <p className="text-xs font-black uppercase tracking-wider text-orange-700 animate-pulse">
        {label}
      </p>
      <p className="mt-1.5 text-base font-black text-slate-950 leading-tight">
        {value}
      </p>
    </div>
  )
}
