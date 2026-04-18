import { NextHeadComponent } from '@/components/components/NextHeadComponent'
import { Button } from '@/components/ui/button'
import { FUSION_TUITION_LOCATION } from '@/lib/location'
import { cn } from '@/lib/utils'
import { Link } from '@tanstack/react-router'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowUpRight,
  Building2,
  Car,
  Clock3,
  Footprints,
  MapPinned,
  Navigation,
  PlayCircle,
  TrainFront,
} from 'lucide-react'
import { useState } from 'react'
import { FaApple, FaGoogle } from 'react-icons/fa'

type RouteMode = 'car' | 'mrt'

type RouteFact = {
  label: string
  value: string
}

type RouteStep = {
  title: string
  description: string
  cue: string
}

type RouteGuide = {
  eyebrow: string
  title: string
  description: string
  videoTitle: string
  videoHint: string
  facts: RouteFact[]
  steps: RouteStep[]
  surfaceClassName: string
  glowClassName: string
  badgeClassName: string
}

const tabOrder: {
  key: RouteMode
  label: string
  shortLabel: string
  icon: typeof Car
}[] = [
  { key: 'car', label: 'Coming by car', shortLabel: 'By car', icon: Car },
  {
    key: 'mrt',
    label: 'Coming by MRT',
    shortLabel: 'By MRT',
    icon: TrainFront,
  },
]

// Sample route content for previewing the final layout in production.
// Replace these details with the final confirmed directions when ready.
const routeGuides: Record<RouteMode, RouteGuide> = {
  car: {
    eyebrow: 'Drive In Smoothly',
    title: 'A calm, predictable arrival flow for first-time parents.',
    description:
      'This sample version shows how a driving route can feel once real directions are added: short cues, clear landmarks, and one action per step so nobody has to decode a dense paragraph while on the move.',
    videoTitle: 'Sample driving arrival video',
    videoHint:
      'Replace this with a short landscape clip showing the last turn-in, the easiest drop-off point, and the correct entrance.',
    facts: [
      {
        label: 'Parking',
        value:
          'Sample: visitor lots and nearby roadside parking options for quick weekday drop-offs.',
      },
      {
        label: 'Drop-off',
        value:
          'Sample: easiest drop-off point is directly outside the building before moving the car.',
      },
      {
        label: 'Arrival cue',
        value:
          'Sample: look for the low-rise commercial building frontage and the lift lobby signage.',
      },
    ],
    steps: [
      {
        title: 'Approach the area',
        description:
          'Come in from the larger main road, then slow down once you reach the row of low-rise commercial buildings. This first card is where the final version can reassure drivers that they are in the right cluster before the last turn.',
        cue: 'Sample cue: major junction before Jalan Pemimpin',
      },
      {
        title: 'Watch for the building turn-in',
        description:
          'Move into the left lane early and watch for the turn-in instead of relying on the map at the final second. The ideal production copy here should help drivers set up the turn without stress.',
        cue: 'Sample cue: frontage sign and driveway opening',
      },
      {
        title: 'Park or stop briefly',
        description:
          'For the sample layout, this card shows where parking notes should live: short-stay loading guidance, family-friendly drop-off advice, and any backup option if the nearest lot is full.',
        cue: 'Sample cue: visitor lot / quick drop-off zone',
      },
      {
        title: 'Enter the correct block',
        description:
          'Once out of the car, the route should immediately name the correct entrance so users are not left comparing several doors. This is usually the point where a five-second video clip helps the most.',
        cue: 'Sample cue: nearest lift lobby and glass entrance',
      },
      {
        title: 'Head up to the unit',
        description:
          'End with the exact unit and a final visual confirmation. The last card should feel reassuring, not instructional, because by then the user mostly wants confirmation that they have arrived correctly.',
        cue: `Sample cue: unit ${FUSION_TUITION_LOCATION.unit}`,
      },
    ],
    surfaceClassName:
      'border-orange-200/80 bg-gradient-to-br from-white via-orange-50/80 to-amber-50/80',
    glowClassName: 'from-orange-300/40 via-amber-200/30 to-transparent',
    badgeClassName: 'border-orange-200 bg-orange-50 text-orange-700',
  },
  mrt: {
    eyebrow: 'Public Transport Route',
    title: 'Simple public transport guidance that still feels premium.',
    description:
      'This sample version demonstrates the intended MRT experience: a fast scan from station exit to final arrival, with enough detail to feel helpful and enough whitespace to stay readable on a phone.',
    videoTitle: 'Sample MRT and walking route video',
    videoHint:
      'Replace this with a short vertical walkthrough from the station exit or bus stop to the building entrance.',
    facts: [
      {
        label: 'Nearest station',
        value: 'Sample: Marymount MRT with a short final transfer or walk.',
      },
      {
        label: 'Transfer',
        value:
          'Sample: one bus stop or a straightforward walk with minimal turns.',
      },
      {
        label: 'Walking time',
        value: 'Sample: around 8 to 12 minutes depending on pace.',
      },
    ],
    steps: [
      {
        title: 'Exit the MRT station',
        description:
          'Start with the exact exit and the first thing the user should see on street level. The point of the first step is to eliminate that common ‘which side am I on?’ moment immediately.',
        cue: 'Sample cue: station exit with the clearest street view',
      },
      {
        title: 'Orient yourself immediately',
        description:
          'Give a single, plain-language action here: turn left, cross once, or head toward a visible landmark. The layout works best when this card only communicates one directional decision.',
        cue: 'Sample cue: turn toward the low-rise commercial stretch',
      },
      {
        title: 'Continue along the simplest path',
        description:
          'This is where the route can mention a bus stop, a sheltered walkway, or one long straight segment. The design intentionally gives enough room for a fuller explanation without overwhelming the reader.',
        cue: 'Sample cue: straight path past one major crossing',
      },
      {
        title: 'Look out for the building',
        description:
          'Before the final approach, call out the building by name, shape, or frontage. That cue does a lot of work in reducing hesitation, especially for students arriving alone the second time.',
        cue: 'Sample cue: low-rise block with visible unit signage',
      },
      {
        title: 'Take the final approach',
        description:
          'Use the last step to confirm the entrance, lift, floor, and unit number. The real version can be extremely specific here because this is where precision is most useful.',
        cue: `Sample cue: unit ${FUSION_TUITION_LOCATION.unit}`,
      },
    ],
    surfaceClassName:
      'border-teal-200/80 bg-gradient-to-br from-white via-teal-50/80 to-cyan-50/70',
    glowClassName: 'from-teal-300/40 via-cyan-200/30 to-transparent',
    badgeClassName: 'border-teal-200 bg-teal-50 text-teal-700',
  },
}

const viewportTransition = {
  duration: 0.5,
  ease: [0.22, 1, 0.36, 1] as const,
}

function VideoPlaceholder({
  title,
  hint,
  toneClassName,
}: {
  title: string
  hint: string
  toneClassName: string
}) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-[28px] border border-white/70 bg-white/80 p-4 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur',
        toneClassName,
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.9),transparent_45%)]" />
      <div className="relative aspect-video overflow-hidden rounded-[22px] border border-dashed border-slate-300/90 bg-[linear-gradient(135deg,rgba(255,255,255,0.6),rgba(255,244,234,0.9),rgba(236,253,250,0.7))]">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(15,23,42,0.05))]" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <div className="mb-4 rounded-full border border-white/80 bg-white/80 p-3 shadow-sm">
            <PlayCircle className="h-7 w-7 text-slate-700" />
          </div>
          <p className="text-base font-semibold text-slate-900">{title}</p>
          <p className="mt-2 max-w-md text-sm leading-6 text-slate-600">
            {hint}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function HowToGetHerePage() {
  const [activeTab, setActiveTab] = useState<RouteMode>('car')
  const activeGuide = routeGuides[activeTab]

  return (
    <div className="relative overflow-hidden bg-[linear-gradient(180deg,#fffaf5_0%,#ffffff_28%,#fffdf8_100%)]">
      <NextHeadComponent title="fusion tuition | how to get here" />

      <div className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] overflow-hidden">
        <motion.div
          className="absolute left-[-8rem] top-16 h-64 w-64 rounded-full bg-orange-200/40 blur-3xl"
          animate={{ x: [0, 28, 0], y: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute right-[-6rem] top-24 h-72 w-72 rounded-full bg-teal-200/35 blur-3xl"
          animate={{ x: [0, -24, 0], y: [0, 16, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.35)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.35)_1px,transparent_1px)] bg-[size:42px_42px] opacity-40" />
      </div>

      <div className="container relative mx-auto px-4 pb-16 pt-28 md:px-6 md:pb-24 md:pt-36">
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={viewportTransition}
          className="mb-10"
        >
          <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-slate-600">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 transition-colors hover:border-orange-200 hover:text-slate-900"
            >
              Back to Contact
            </Link>
            <span className="rounded-full border border-orange-100 bg-orange-50 px-4 py-2 text-orange-700">
              Preview content for layout testing
            </span>
          </div>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-orange-600">
                How To Get Here
              </p>
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                Clear arrival steps, built for parents on the move.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                This preview shows the intended UX direction: one obvious route
                choice, one helpful video at the top, and one vertical sequence
                of steps that feels effortless to scan on mobile.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <div className="rounded-full border border-slate-200 bg-white/85 px-4 py-2 text-sm text-slate-700 shadow-sm">
                  {FUSION_TUITION_LOCATION.fullAddress}
                </div>
                <div className="rounded-full border border-slate-200 bg-white/85 px-4 py-2 text-sm text-slate-700 shadow-sm">
                  Designed for car and MRT journeys
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" className="rounded-full px-6">
                  <a
                    href={FUSION_TUITION_LOCATION.googleMapsDirectionsUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaGoogle className="mr-2" />
                    Open in Google Maps
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full border-slate-300 bg-white/80 px-6"
                >
                  <a
                    href={FUSION_TUITION_LOCATION.appleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaApple className="mr-2" />
                    Open in Apple Maps
                  </a>
                </Button>
              </div>
            </div>

            <VideoPlaceholder
              title="Sample overview arrival video"
              hint="Use this top slot for a quick orientation reel that previews the building exterior, entrance, and final unit."
              toneClassName="bg-white/70"
            />
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={viewportTransition}
          className="mb-8 rounded-[32px] border border-white/80 bg-white/70 p-3 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-md"
        >
          <div className="flex flex-col gap-3 sm:flex-row">
            {tabOrder.map((tab) => {
              const isActive = tab.key === activeTab
              const Icon = tab.icon

              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={cn(
                    'relative flex flex-1 items-center gap-3 overflow-hidden rounded-[24px] px-4 py-4 text-left transition-colors sm:px-5',
                    isActive
                      ? 'bg-slate-950 text-white shadow-lg'
                      : 'bg-transparent text-slate-600 hover:bg-slate-100/80 hover:text-slate-900',
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="route-tab-glow"
                      className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.14),transparent_55%)]"
                    />
                  )}
                  <span
                    className={cn(
                      'relative rounded-2xl border p-2.5',
                      isActive
                        ? 'border-white/15 bg-white/10'
                        : 'border-slate-200 bg-white',
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="relative">
                    <span className="block text-sm font-semibold sm:text-base">
                      {tab.label}
                    </span>
                    <span
                      className={cn(
                        'mt-0.5 block text-xs',
                        isActive ? 'text-white/70' : 'text-slate-500',
                      )}
                    >
                      {tab.shortLabel} route scaffold
                    </span>
                  </span>
                </button>
              )
            })}
          </div>
        </motion.section>

        <AnimatePresence mode="wait">
          <motion.section
            key={activeTab}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="grid gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]"
          >
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div
                className={cn(
                  'relative overflow-hidden rounded-[32px] border p-5 shadow-[0_26px_80px_rgba(15,23,42,0.1)] md:p-6',
                  activeGuide.surfaceClassName,
                )}
              >
                <div
                  className={cn(
                    'pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-br opacity-80 blur-3xl',
                    activeGuide.glowClassName,
                  )}
                />

                <div className="relative">
                  <span
                    className={cn(
                      'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em]',
                      activeGuide.badgeClassName,
                    )}
                  >
                    {activeGuide.eyebrow}
                  </span>

                  <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950 md:text-3xl">
                    {activeGuide.title}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600 md:text-base">
                    {activeGuide.description}
                  </p>

                  <div className="mt-6">
                    <VideoPlaceholder
                      title={activeGuide.videoTitle}
                      hint={activeGuide.videoHint}
                      toneClassName="border-white/60 bg-white/65"
                    />
                  </div>

                  <div className="mt-6 grid gap-3">
                    {activeGuide.facts.map((fact, index) => (
                      <motion.div
                        key={fact.label}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{
                          ...viewportTransition,
                          delay: index * 0.05,
                        }}
                        className="rounded-[24px] border border-white/80 bg-white/80 p-4 shadow-sm"
                      >
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                          {fact.label}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-slate-700">
                          {fact.value}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <Button asChild className="h-11 rounded-full">
                      <a
                        href={FUSION_TUITION_LOCATION.googleMapsDirectionsUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Navigation className="mr-2 h-4 w-4" />
                        Start directions
                      </a>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="h-11 rounded-full border-slate-300 bg-white/80"
                    >
                      <Link to="/contact">
                        Contact us
                        <ArrowUpRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </aside>

            <div className="space-y-5">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={viewportTransition}
                className="rounded-[32px] border border-slate-200/80 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)]"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
                      Vertical Step Layout
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold text-slate-950">
                      One action per card keeps navigation easy to follow.
                    </h3>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-sm text-slate-600">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3">
                      <Clock3 className="mb-2 h-4 w-4 text-slate-800" />
                      Short scan
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3">
                      <MapPinned className="mb-2 h-4 w-4 text-slate-800" />
                      Landmark-led
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3">
                      <Footprints className="mb-2 h-4 w-4 text-slate-800" />
                      Mobile-first
                    </div>
                  </div>
                </div>
              </motion.div>

              <div className="relative space-y-5 before:absolute before:left-5 before:top-5 before:h-[calc(100%-2.5rem)] before:w-px before:bg-[linear-gradient(to_bottom,rgba(251,146,60,0.5),rgba(45,212,191,0.25),rgba(148,163,184,0.15))] sm:before:left-6">
                {activeGuide.steps.map((step, index) => (
                  <motion.article
                    key={`${activeTab}-${step.title}`}
                    initial={{ opacity: 0, x: 18 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.18 }}
                    transition={{ ...viewportTransition, delay: index * 0.06 }}
                    className="relative pl-14 sm:pl-16"
                  >
                    <div className="absolute left-0 top-1 flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-sm font-semibold text-slate-900 shadow-sm sm:h-12 sm:w-12">
                      {String(index + 1).padStart(2, '0')}
                    </div>

                    <div className="overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_18px_48px_rgba(15,23,42,0.05)]">
                      <div className="flex flex-col gap-4 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-start sm:justify-between sm:px-6">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                            Step {index + 1}
                          </p>
                          <h4 className="mt-2 text-xl font-semibold text-slate-950">
                            {step.title}
                          </h4>
                        </div>
                        <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
                          {activeTab === 'car' ? (
                            <Car className="mr-2 h-3.5 w-3.5" />
                          ) : (
                            <TrainFront className="mr-2 h-3.5 w-3.5" />
                          )}
                          Sample route copy
                        </span>
                      </div>

                      <div className="grid gap-4 px-5 py-5 sm:grid-cols-[minmax(0,1fr)_16rem] sm:px-6">
                        <p className="text-sm leading-7 text-slate-600 sm:text-base">
                          {step.description}
                        </p>
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                            What to show on screen
                          </p>
                          <p className="mt-2 text-sm leading-6 text-slate-700">
                            {step.cue}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={viewportTransition}
                className="grid gap-4 rounded-[32px] border border-slate-200/80 bg-slate-950 p-6 text-white shadow-[0_24px_80px_rgba(15,23,42,0.18)] md:grid-cols-[minmax(0,1fr)_auto]"
              >
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/60">
                    Final arrival block
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold">
                    Finish with one crisp destination card.
                  </h3>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-white/70 md:text-base">
                    This is where the finished page can confirm the unit, the
                    floor, and a “you’re here” visual. It gives reassurance
                    right at the end of the journey.
                  </p>
                </div>

                <div className="grid gap-3 text-sm md:min-w-60">
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <Building2 className="mb-2 h-4 w-4 text-white/80" />
                    {FUSION_TUITION_LOCATION.unit}
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <MapPinned className="mb-2 h-4 w-4 text-white/80" />
                    {FUSION_TUITION_LOCATION.street}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.section>
        </AnimatePresence>
      </div>
    </div>
  )
}
