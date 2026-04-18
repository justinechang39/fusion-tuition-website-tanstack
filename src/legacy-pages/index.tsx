import { EyyCherSection } from '@/components/EyyCherSection'
import FindYourClass from '@/components/FindYourClass'
import { Registration2026Banner } from '@/components/Registration2026Banner'
import { StudentScoreTableSection } from '@/components/StudentScoreTableSection'
import ContactSection from '../components/ContactSection'
import DirectionsSection from '../components/DirectionsSection'
import HeroSection from '../components/HeroSection'

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <EyyCherSection />
      <Registration2026Banner />
      <StudentScoreTableSection />
      <FindYourClass />
      <ContactSection />
      <DirectionsSection />
    </div>
  )
}
