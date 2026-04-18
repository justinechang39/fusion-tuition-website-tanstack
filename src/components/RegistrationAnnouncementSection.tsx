import { CalendarCheck } from 'lucide-react'

export function RegistrationAnnouncementSection() {
  return (
    <section className="animate-fade-in-up animation-delay-0">
      <div className="relative overflow-hidden rounded-none px-0 py-6 md:rounded-2xl md:px-4 md:py-8">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
        <div className="relative z-10 text-center">
          <div className="mb-3 flex justify-center">
            <div className="rounded-full bg-white/20 p-2 md:p-3">
              <CalendarCheck className="h-6 w-6 text-white md:h-8 md:w-8" />
            </div>
          </div>
          <h2 className="mb-2 text-xl font-bold md:text-3xl">
            Registration for 2026 Classes is Open
          </h2>
          <p className="text-sm text-black md:text-base">
            Secure your spot in our small group classes today
          </p>
        </div>
      </div>
    </section>
  )
}
