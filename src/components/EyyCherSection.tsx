import { motion } from 'framer-motion'
import {
  ArrowRight,
  Clock,
  GraduationCap,
  MessageSquare,
  Zap,
} from 'lucide-react'

export function EyyCherSection() {
  const features = [
    {
      icon: <MessageSquare className="h-4 w-4 text-orange-600 md:h-5 md:w-5" />,
      text: 'Detailed Explanations',
    },
    {
      icon: <Clock className="h-4 w-4 text-orange-600 md:h-5 md:w-5" />,
      text: '24/7 Availability',
    },
    {
      icon: <GraduationCap className="h-4 w-4 text-orange-600 md:h-5 md:w-5" />,
      text: 'Subject Mastery',
    },
  ]

  return (
    <section className="container mx-auto px-4 py-10 md:py-20">
      <div className="relative overflow-hidden rounded-2xl border border-amber-100/50 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 px-5 py-10 md:rounded-[2.5rem] md:px-16 md:pb-0 md:pt-20">
        {/* Background decoration elements */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-orange-200/40 opacity-40 blur-3xl md:h-96 md:w-96"></div>
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-rose-200/30 opacity-40 blur-3xl md:h-96 md:w-96"></div>
        </div>

        <div className="relative z-10 grid items-end gap-8 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-start pb-8 md:pb-20"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-orange-100/80 px-3 py-1.5 backdrop-blur-sm md:mb-6 md:px-4 md:py-2">
              <img
                src="/telegram_logo.png"
                alt="Telegram"
                width={16}
                height={16}
                className="h-4 w-4 md:h-5 md:w-5"
              />
              <span className="text-xs font-semibold text-orange-900 md:text-sm">
                Available on Telegram
              </span>
            </div>

            <h2 className="mb-4 text-balance text-3xl font-extrabold tracking-tight text-gray-900 md:mb-6 md:text-6xl">
              Your Personal AI <br />
              Tutor: <span className="text-orange-600">EyyCher</span>
            </h2>

            <p className="mb-6 max-w-xl text-base leading-relaxed text-gray-600 md:mb-10 md:text-xl">
              Master complex concepts with EyyCher. Get instant, detailed, and
              easy-to-understand explanations for Physics, Chemistry, Biology,
              and Math — available 24/7 on Telegram.
            </p>

            <div className="mb-8 grid grid-cols-1 gap-3 sm:flex sm:flex-wrap sm:gap-6 md:mb-12">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 md:gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-orange-100 bg-white shadow-sm md:h-10 md:w-10 md:rounded-xl">
                    {feature.icon}
                  </div>
                  <span className="text-sm font-medium text-gray-700 md:text-base">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>

            <a
              href="https://eyycher.fusiontuition.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-orange-600 px-6 py-4 text-base font-bold text-white transition-all duration-300 hover:bg-orange-700 hover:shadow-[0_0_20px_rgba(234,88,12,0.4)] sm:w-auto sm:px-10 sm:py-5 sm:text-xl md:gap-3"
            >
              <img
                src="/telegram_logo.png"
                alt=""
                width={24}
                height={24}
                className="relative z-10 h-5 w-5 brightness-0 invert sm:h-6 sm:w-6"
              />
              <span className="relative z-10">Try EyyCher Now</span>
              <ArrowRight className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-1 sm:h-6 sm:w-6" />
            </a>
          </motion.div>

          {/* Phone Section - Hidden on mobile, visible on lg */}
          <div className="relative hidden h-full min-h-[500px] items-center justify-center lg:flex">
            {/* Ambient Glow */}
            <div className="absolute inset-0 z-0 flex items-center justify-center">
              <div className="h-[400px] w-[400px] animate-pulse rounded-full bg-orange-200/50 blur-[100px]"></div>
            </div>

            {/* Hover Parent Container */}
            <motion.div
              initial="initial"
              whileHover="hover"
              className="relative z-10 w-full cursor-pointer"
            >
              {/* Phone Image Container - Bouncy entrance and hover lift */}
              <motion.div
                initial={{ opacity: 0, y: 400, rotate: 2, scale: 2.2 }}
                whileInView={{ opacity: 1, y: 180, rotate: 0, scale: 2.2 }}
                viewport={{ once: true }}
                variants={{
                  initial: { y: 180 },
                  hover: { y: -80, scale: 2.3 },
                }}
                transition={{
                  y: { type: 'spring', stiffness: 40, damping: 12 },
                  scale: { duration: 0.3 },
                }}
                className="relative z-10 w-full origin-top drop-shadow-[0_35px_35px_rgba(0,0,0,0.2)]"
              >
                <img
                  src="/eyycher_phone.png"
                  alt="EyyCher Telegram Bot on Phone"
                  width={1200}
                  height={2400}
                  className="h-auto w-full object-contain"
                />
              </motion.div>

              {/* Floating Feature Tags */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: '25%', y: -120 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                variants={{
                  initial: { x: '10%', y: 150 },
                  hover: { x: '50%', y: -50, scale: 1.1, rotate: 4 },
                }}
                transition={{
                  duration: 0.5,
                  hover: {
                    type: 'spring',
                    stiffness: 40,
                    damping: 0,
                  },
                }}
                className="absolute right-[25%] top-[25%] z-30 rounded-2xl border border-white/50 bg-white/90 p-6 shadow-2xl backdrop-blur-md"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                    <Zap className="h-8 w-8" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold uppercase tracking-wider text-gray-500">
                      Response
                    </span>
                    <span className="text-lg font-black leading-none text-gray-900">
                      Instant Help
                    </span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: '-25%', y: -300 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                variants={{
                  initial: { x: '-10%' },
                  hover: { x: '-50%', y: -320, scale: 1.1, rotate: -10 },
                }}
                transition={{
                  duration: 0.5,
                  hover: { type: 'spring', stiffness: -220, damping: 15 },
                }}
                className="absolute bottom-[25%] left-[25%] z-30 rounded-2xl border border-white/50 bg-white/90 p-6 shadow-2xl backdrop-blur-md"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                    <MessageSquare className="h-8 w-8" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold uppercase tracking-wider text-gray-500">
                      Detailed
                    </span>
                    <span className="text-lg font-black leading-none text-gray-900">
                      Expert Logic
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Mobile Phone Image - Simplified version for mobile */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative mx-auto flex w-full max-w-[340px] items-center justify-center lg:hidden"
          >
            <div className="absolute inset-0 z-0 flex items-center justify-center">
              <div className="h-[300px] w-[300px] animate-pulse rounded-full bg-orange-200/50 blur-[60px]"></div>
            </div>
            <img
              src="/eyycher_phone.png"
              alt="EyyCher Telegram Bot on Phone"
              width={340}
              height={544}
              className="relative z-10 aspect-[5/8] w-full object-cover object-center drop-shadow-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
