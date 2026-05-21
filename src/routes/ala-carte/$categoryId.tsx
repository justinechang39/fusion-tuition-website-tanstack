// $categoryId.tsx
// Subject-level ala-carte menu page. Each category gets its own route so
// mobile users clearly move from choosing a subject to choosing a class.

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Link, createFileRoute } from '@tanstack/react-router'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Plus, Search, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import {
  AlaCarteFooter,
  type AlaCarteItem,
  CartSheet,
  FloatingAlaCarteNav,
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

function getCategorySuggestions(catId: string) {
  if (catId.includes('chemistry')) {
    return ['Mole Concept', 'Acids', 'Organic', 'Metals']
  }
  if (catId.includes('physics')) {
    return ['Kinematics', 'Forces', 'Electricity', 'Light']
  }
  if (catId.includes('mathematics') || catId.includes('math')) {
    return ['Calculus', 'Vectors', 'Trigonometry', 'Quadratic']
  }
  return ['Mole', 'Kinematics', 'Acids', 'Forces']
}

function AlaCarteCategoryPage() {
  const { categoryId } = Route.useParams()
  const category = categories.find((current) => current.id === categoryId)
  const categoryItems = getCategoryItems(categoryId)
  const order = useAlaCarteOrder()
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
  const [selectedItem, setSelectedItem] = useState<AlaCarteItem | null>(null)
  const [selectedInstruction, setSelectedInstruction] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const suggestions = getCategorySuggestions(categoryId)

  const filteredCategoryItems = categoryItems.filter((item) => {
    const query = searchQuery.toLowerCase().trim()
    if (!query) return true
    return (
      item.title.toLowerCase().includes(query) ||
      item.subtitle.toLowerCase().includes(query) ||
      item.chapters.some((chapter) => chapter.toLowerCase().includes(query))
    )
  })

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
    <div className="relative min-h-screen bg-[#fffaf3] pb-28 text-slate-950 [overflow-x:clip]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-12 h-72 w-72 rounded-full bg-orange-200/60 blur-3xl" />
        <div className="absolute right-[-9rem] top-80 h-96 w-96 rounded-full bg-teal-200/50 blur-3xl" />
        <div className="absolute inset-0 bg-dot-thick-orange-500 opacity-[0.05] [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />

        {/* Concentric rotating background orbits (Sirius / Orbit theme) */}
        <div className="absolute top-[8%] left-1/2 -translate-x-1/2 h-[640px] w-[640px] pointer-events-none select-none">
          {/* Orbit 1 */}
          <motion.div
            className="absolute inset-0 rounded-full border border-orange-500/[0.04]"
            animate={{ rotate: 360 }}
            transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-orange-400/30 blur-[1px]" />
          </motion.div>

          {/* Orbit 2 */}
          <motion.div
            className="absolute -inset-16 rounded-full border border-teal-500/[0.03]"
            animate={{ rotate: -360 }}
            transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
          >
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 h-2.5 w-2.5 rounded-full bg-teal-400/30 blur-[1px]" />
          </motion.div>
        </div>
      </div>

      <FloatingAlaCarteNav
        isVisible={isScrolled}
        backTo="/ala-carte"
        backLabel="Subjects"
        cartCount={order.cartCount}
        openCart={() => order.setIsCartOpen(true)}
      />

      <section className="relative mx-auto max-w-5xl px-0 pb-8 pt-0 sm:px-6 sm:pt-6 md:pb-12 md:pt-14 lg:px-8">
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.12,
                delayChildren: 0.15,
              },
            },
          }}
          initial="hidden"
          animate="visible"
          className="relative min-h-[330px] overflow-hidden border-b-2 border-slate-950 bg-slate-950 sm:min-h-[430px] sm:rounded-[2rem] sm:border-2 sm:shadow-[8px_8px_0px_#020617] md:min-h-[520px]"
        >
          <img
            src={category.image.src}
            alt={category.image.alt}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/58 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(249,115,22,0.34),transparent_34%),radial-gradient(circle_at_18%_84%,rgba(20,184,166,0.24),transparent_34%)]" />
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8 md:p-10 lg:p-12">
            <div className="max-w-3xl text-left">
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { type: 'spring', stiffness: 100 },
                  },
                }}
              >
                <Badge className="mb-3 rounded-full border border-white/20 bg-white/90 px-3.5 py-1.5 text-xs font-black uppercase tracking-widest text-orange-700 shadow-sm hover:bg-white sm:mb-4">
                  {category.level}
                </Badge>
              </motion.div>

              <motion.h1
                variants={{
                  hidden: { opacity: 0, y: 24, filter: 'blur(4px)' },
                  visible: {
                    opacity: 1,
                    y: 0,
                    filter: 'blur(0px)',
                    transition: {
                      type: 'spring',
                      stiffness: 80,
                      damping: 12,
                    },
                  },
                }}
                className="max-w-2xl text-4xl font-black leading-[0.9] tracking-[-0.05em] text-white drop-shadow-[0_4px_26px_rgba(0,0,0,0.55)] sm:text-6xl md:text-7xl lg:text-8xl"
              >
                {category.label}
              </motion.h1>

              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="mt-3 max-w-xl text-sm font-bold leading-6 text-orange-50 drop-shadow-[0_2px_18px_rgba(0,0,0,0.5)] sm:mt-4 sm:text-lg sm:leading-8"
              >
                {category.description}
              </motion.p>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="mt-4 flex flex-wrap gap-2 text-[10px] font-black uppercase tracking-[0.14em] text-white sm:mt-6 sm:text-xs"
              >
                <span className="rounded-full border border-white/20 bg-white/15 px-3 py-1.5 shadow-sm backdrop-blur-md">
                  June holidays
                </span>
                <span className="rounded-full border border-white/20 bg-white/15 px-3 py-1.5 shadow-sm backdrop-blur-md">
                  Small group
                </span>
                <span className="rounded-full border border-white/20 bg-white/15 px-3 py-1.5 shadow-sm backdrop-blur-md">
                  {categoryItems.length} class
                  {categoryItems.length === 1 ? '' : 'es'}
                </span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-3 text-left">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-orange-600 bg-orange-100/50 px-3 py-1 rounded-full inline-block border border-orange-200/50 shadow-sm backdrop-blur-sm">
              Choose a class
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-[-0.04em] sm:text-4xl text-slate-950">
              {category.shortLabel} menu
            </h2>
          </div>
          <p className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-black text-slate-600 shadow-sm">
            {categoryItems.length} class{categoryItems.length === 1 ? '' : 'es'}
          </p>
        </div>

        {/* Sleek Topic & Chapter Search */}
        <div className="mb-8 max-w-md mx-auto sm:mx-0">
          <div className="relative flex items-center rounded-2xl border-2 border-slate-950 bg-white shadow-[3px_3px_0px_#020617] focus-within:shadow-[4px_4px_0px_#f97316] transition-all">
            <Search className="absolute left-4 h-5 w-5 text-slate-400" />
            <Input
              type="text"
              placeholder="Search chapters, topics, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-12 w-full rounded-2xl border-none pl-11 pr-10 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent text-slate-950 font-semibold placeholder:text-slate-400 placeholder:font-bold"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 cursor-pointer select-none transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>

          {/* Quick-Filter Topic Buttons - Custom scrollable row for modern mobile feel */}
          <div className="mt-3.5 flex items-center gap-2.5 w-full overflow-hidden select-none">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 shrink-0">
              suggested:
            </span>
            <div
              className="flex gap-2 overflow-x-auto pb-1.5 pt-0.5 px-0.5 -mx-0.5 w-full"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              {suggestions.map((sug) => {
                const isActive =
                  searchQuery.toLowerCase().trim() === sug.toLowerCase().trim()
                return (
                  <button
                    key={sug}
                    type="button"
                    onClick={() => setSearchQuery(isActive ? '' : sug)}
                    className={`px-3.5 py-1.5 text-xs font-bold rounded-full border-2 border-slate-950 select-none cursor-pointer shrink-0 transition-all duration-200 active:translate-y-0.5 shadow-[2px_2px_0px_#020617] ${
                      isActive
                        ? 'bg-slate-950 text-white shadow-none translate-y-0.5'
                        : 'bg-white text-slate-950 hover:bg-orange-50 hover:border-orange-500'
                    }`}
                  >
                    {sug}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        <motion.div
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid gap-6 md:grid-cols-2 lg:gap-8"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {filteredCategoryItems.length === 0 ? (
              <motion.div
                key="empty-search"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="col-span-full rounded-[2.5rem] border-2 border-slate-950 bg-white p-8 text-center shadow-[6px_6px_0px_#020617] max-w-md mx-auto w-full select-none"
              >
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-orange-600 bg-orange-50 border border-orange-100 px-3.5 py-1.5 rounded-full inline-block">
                  no chapters found
                </p>
                <h3 className="mt-4 text-xl font-black text-slate-950 tracking-tight">
                  Could not find &quot;{searchQuery}&quot;
                </h3>
                <p className="mt-2 text-sm font-semibold text-slate-500 leading-relaxed">
                  Tap a high-yield suggestion below to recover instantly, or
                  clear the search:
                </p>

                {/* Clickable recommendation pills in empty state */}
                <div className="mt-4.5 flex flex-wrap justify-center gap-2">
                  {suggestions.map((sug) => (
                    <button
                      key={sug}
                      type="button"
                      onClick={() => setSearchQuery(sug)}
                      className="px-3.5 py-1.5 text-xs font-bold rounded-full border-2 border-slate-950 bg-[#fffdfa] hover:bg-orange-50 hover:border-orange-500 text-slate-950 shadow-[2px_2px_0px_#020617] active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
                    >
                      🔍 {sug}
                    </button>
                  ))}
                </div>

                <div className="mt-6 flex justify-center">
                  <Button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="rounded-full border-2 border-slate-950 bg-slate-950 px-5.5 py-3 text-xs font-black text-white hover:bg-orange-600 shadow-[3px_3px_0px_#020617] active:translate-y-0.5 active:shadow-none cursor-pointer"
                  >
                    Reset Search Filter
                  </Button>
                </div>
              </motion.div>
            ) : (
              filteredCategoryItems.map((item) => {
                const isSelected = order.cartItems.some(
                  (cartItem) => cartItem.itemId === item.id,
                )

                return (
                  <motion.article
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{
                      opacity: 0,
                      scale: 0.95,
                      transition: { duration: 0.2 },
                    }}
                    whileHover={{ y: -4, scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
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
                    className={
                      isSelected
                        ? 'group overflow-hidden rounded-[2rem] border-2 border-orange-500 bg-gradient-to-b from-[#fffdfa] to-orange-50/20 shadow-[6px_6px_0px_#f97316] hover:shadow-[6px_6px_0px_#f97316] transition-all duration-200'
                        : 'group overflow-hidden rounded-[2rem] border-2 border-slate-950 bg-white shadow-[6px_6px_0px_#020617] hover:shadow-[6px_6px_0px_#f97316] transition-all duration-200'
                    }
                  >
                    <button
                      type="button"
                      className="block w-full text-left cursor-pointer relative"
                      onClick={() => openItem(item)}
                    >
                      <div className="relative h-48 overflow-hidden bg-orange-100 border-b-2 border-slate-950">
                        <img
                          src={item.image.src}
                          alt={item.image.alt}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute left-4 top-4 rounded-full bg-slate-950/90 px-3 py-1 text-xs font-black text-white border border-white/20 shadow-sm backdrop-blur-sm">
                          {formatDuration(item.durationMinutes)} · ≤ 5 students
                        </div>

                        {/* High-end absolute Selection badge */}
                        <AnimatePresence>
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0.4, opacity: 0, rotate: -20 }}
                              animate={{ scale: 1, opacity: 1, rotate: 0 }}
                              exit={{ scale: 0.4, opacity: 0, rotate: 20 }}
                              transition={{
                                type: 'spring',
                                stiffness: 200,
                                damping: 15,
                              }}
                              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-white border-2 border-slate-950 shadow-[2px_2px_0px_#020617]"
                            >
                              <CheckCircle2 className="h-5 w-5 text-white" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      <div className="p-5">
                        <h3 className="text-2xl font-black leading-tight tracking-[-0.03em] text-slate-950">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm font-semibold text-slate-500">
                          {item.subtitle}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {item.chapters.map((chapter) => (
                            <span
                              key={chapter}
                              className="rounded-full border-2 border-slate-950 bg-white px-3.5 py-1 text-xs font-black text-slate-950 shadow-[2px_2px_0px_rgba(2,6,23,0.06)] hover:bg-orange-50 transition-colors"
                            >
                              {chapter}
                            </span>
                          ))}
                        </div>
                      </div>
                    </button>
                    <div className="flex items-center justify-between border-t border-slate-100 px-5 py-4 bg-white/40">
                      <button
                        type="button"
                        className="text-sm font-black text-slate-600 hover:text-orange-600 transition-colors cursor-pointer"
                        onClick={() => openItem(item)}
                      >
                        View details
                      </button>
                      <Button
                        className={
                          isSelected
                            ? 'rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-black cursor-pointer shadow-[2px_2px_0px_#020617] active:translate-y-0.5 active:shadow-none transition-all'
                            : 'rounded-full bg-slate-950 text-white font-black hover:bg-orange-600 cursor-pointer shadow-[2px_2px_0px_#020617] active:translate-y-0.5 active:shadow-none transition-all'
                        }
                        size="sm"
                        onClick={() => order.addToCart(item)}
                      >
                        {isSelected ? (
                          <div className="flex items-center gap-1.5 mr-0.5">
                            <CheckCircle2 className="h-4 w-4 text-white" />
                            <motion.div
                              className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_6px_#fff]"
                              animate={{ scale: [1, 1.4, 1] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            />
                          </div>
                        ) : (
                          <Plus className="mr-1.5 h-4 w-4" />
                        )}
                        {isSelected ? 'Selected' : 'Add to cart'}
                      </Button>
                    </div>
                  </motion.article>
                )
              })
            )}
          </AnimatePresence>
        </motion.div>
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
        addToCart={order.addToCart}
      />

      {/* Classy Sirius Footer at the bottom of curriculum page */}
      <AlaCarteFooter />
    </div>
  )
}
