// $categoryId.tsx
// Subject-level ala-carte menu page. Each category gets its own route so
// mobile users clearly move from choosing a subject to choosing a class.

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowLeft, CheckCircle2, Plus, ShoppingBag } from 'lucide-react'
import { useState } from 'react'
import {
  type AlaCarteItem,
  CartSheet,
  FloatingCartButton,
  ItemDetailSheet,
  categories,
  formatDuration,
  getCategoryItems,
  useAlaCarteOrder,
} from './index'

export const Route = createFileRoute('/ala-carte/$categoryId')({
  component: AlaCarteCategoryPage,
})

function AlaCarteCategoryPage() {
  const { categoryId } = Route.useParams()
  const category = categories.find((current) => current.id === categoryId)
  const categoryItems = getCategoryItems(categoryId)
  const order = useAlaCarteOrder()
  const [selectedItem, setSelectedItem] = useState<AlaCarteItem | null>(null)
  const [selectedInstruction, setSelectedInstruction] = useState('')

  const openItem = (item: AlaCarteItem) => {
    const cartItem = order.cartItems.find(
      (current) => current.itemId === item.id,
    )
    setSelectedInstruction(cartItem?.instruction ?? '')
    setSelectedItem(item)
  }

  if (!category) {
    return (
      <div className="-mx-4 -my-8 bg-[#fffaf3] px-4 py-16 text-slate-950 lg:-mx-8">
        <div className="mx-auto max-w-3xl rounded-[2rem] bg-white p-8 text-center shadow-xl shadow-orange-100">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-orange-600">
            Ala-carte classes
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-[-0.04em]">
            Subject not found
          </h1>
          <Button asChild className="mt-6 rounded-full">
            <Link to="/ala-carte">Back to subjects</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="relative -mx-4 -my-8 min-h-screen overflow-hidden bg-[#fffaf3] pb-28 text-slate-950 lg:-mx-8">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-12 h-72 w-72 rounded-full bg-orange-200/60 blur-3xl" />
        <div className="absolute right-[-9rem] top-80 h-96 w-96 rounded-full bg-teal-200/50 blur-3xl" />
        <div className="absolute inset-0 bg-dot-thick-orange-500 opacity-[0.05] [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
      </div>

      <section className="relative w-full pb-8 pt-0 md:pt-4">
        <div className="sticky top-20 z-30 -mb-16 flex items-center justify-between gap-3 px-4 pt-4 sm:px-6 md:top-24 lg:px-8">
          <Button
            asChild
            className="rounded-full border-white/70 bg-white/90 text-slate-950 shadow-xl shadow-slate-950/15 backdrop-blur hover:bg-white hover:text-slate-950"
            variant="outline"
          >
            <Link to="/ala-carte">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Subjects
            </Link>
          </Button>
          <Button
            className="rounded-full border-white/70 bg-white/90 text-slate-950 shadow-xl shadow-slate-950/15 backdrop-blur hover:bg-white hover:text-slate-950"
            variant="outline"
            onClick={() => order.setIsCartOpen(true)}
          >
            Cart{order.cartCount > 0 ? ` · ${order.cartCount}` : ''}
            <ShoppingBag className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="relative min-h-[560px] overflow-hidden bg-slate-950 shadow-2xl shadow-orange-200/70 sm:min-h-[620px] md:min-h-[680px] lg:min-h-[720px]">
          <img
            src={category.image.src}
            alt={category.image.alt}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/35 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/35 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5 pb-8 sm:p-8 md:p-10 lg:p-14 xl:p-16">
            <div className="max-w-4xl text-white">
              <Badge className="mb-4 bg-orange-400 text-slate-950 hover:bg-orange-400">
                {category.level}
              </Badge>
              <h1 className="text-5xl font-black leading-[0.88] tracking-[-0.06em] text-white drop-shadow-2xl sm:text-7xl md:text-8xl lg:text-9xl">
                {category.label}
              </h1>
              <p className="mt-4 max-w-2xl text-base font-bold leading-relaxed text-orange-50 drop-shadow sm:text-xl">
                Pick one or more targeted classes. We&apos;ll arrange timing
                after checkout.
              </p>
              <div className="mt-5 flex flex-wrap gap-2 text-xs font-black uppercase tracking-[0.14em] text-white sm:text-sm">
                <span className="rounded-full border border-white/20 bg-white/15 px-3 py-2 backdrop-blur">
                  June holidays
                </span>
                <span className="rounded-full border border-white/20 bg-white/15 px-3 py-2 backdrop-blur">
                  Small group
                </span>
                <span className="rounded-full border border-white/20 bg-white/15 px-3 py-2 backdrop-blur">
                  {categoryItems.length} menu item
                  {categoryItems.length === 1 ? '' : 's'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-slate-500">
              Choose a class
            </p>
            <h2 className="mt-1 text-3xl font-black tracking-[-0.04em]">
              {category.shortLabel} menu
            </h2>
          </div>
          <p className="rounded-full bg-white px-4 py-2 text-sm font-black text-slate-600 shadow-sm">
            {categoryItems.length} item{categoryItems.length === 1 ? '' : 's'}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {categoryItems.map((item) => {
            const isSelected = order.cartItems.some(
              (cartItem) => cartItem.itemId === item.id,
            )

            return (
              <article
                key={item.id}
                className="group overflow-hidden rounded-[1.75rem] border border-orange-100 bg-white shadow-lg shadow-orange-100/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-orange-100"
              >
                <button
                  type="button"
                  className="block w-full text-left"
                  onClick={() => openItem(item)}
                >
                  <div className="relative h-48 overflow-hidden bg-orange-100">
                    <img
                      src={item.image.src}
                      alt={item.image.alt}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-black text-orange-700 shadow-sm">
                      {formatDuration(item.durationMinutes)} · ≤{' '}
                      {item.maxClassSize} students
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-2xl font-black leading-tight tracking-[-0.03em]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm font-semibold text-slate-500">
                      {item.subtitle}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.chapters.map((chapter) => (
                        <span
                          key={chapter}
                          className="rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-700"
                        >
                          {chapter}
                        </span>
                      ))}
                    </div>
                  </div>
                </button>
                <div className="flex items-center justify-between border-t border-orange-50 px-5 py-4">
                  <button
                    type="button"
                    className="text-sm font-black text-slate-500 hover:text-orange-600"
                    onClick={() => openItem(item)}
                  >
                    View details
                  </button>
                  <Button
                    className="rounded-full"
                    disabled={isSelected}
                    size="sm"
                    onClick={() => order.addToCart(item)}
                  >
                    {isSelected ? (
                      <CheckCircle2 className="mr-1 h-4 w-4" />
                    ) : (
                      <Plus className="mr-1 h-4 w-4" />
                    )}
                    {isSelected ? 'Selected' : 'Add'}
                  </Button>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <FloatingCartButton
        cartCount={order.cartCount}
        openCart={() => order.setIsCartOpen(true)}
      />

      <ItemDetailSheet
        selectedItem={selectedItem}
        selectedInstruction={selectedInstruction}
        setSelectedInstruction={setSelectedInstruction}
        setSelectedItem={setSelectedItem}
        addToCart={order.addToCart}
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
