import { EyyCherSection } from '@/components/EyyCherSection'
import FindYourClass from '@/components/FindYourClass'
import { Registration2026Banner } from '@/components/Registration2026Banner'
import WhyChooseUsCard from '@/components/WhyChooseUsCard'
import { NextHeadComponent } from '@/components/components/NextHeadComponent'
import ContactSection from '../components/ContactSection'
import DirectionsSection from '../components/DirectionsSection'
import HeroSection from '../components/HeroSection'

export default function Home() {
  const whyChooseUsData = [
    {
      title: 'Small classes',
      description:
        'Individualized attention in groups of no more than 3 students for optimal learning outcomes',
    },
    {
      title: 'Engineer Teachers',
      description:
        'Learn directly from industry-experienced engineers skilled in translating complex concepts into clear, practical lessons',
    },
    {
      title: 'No school mixing',
      description:
        "We avoid mixing students from different schools or streams, maintaining cohesive classes tailored to each group's specific needs",
    },
  ]

  return (
    <div className="flex flex-col">
      <NextHeadComponent title="fusion tuition | home" />
      <HeroSection />
      <EyyCherSection />
      <Registration2026Banner />
      {/* <AboutUsSection /> */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
          {whyChooseUsData.map((item, index) => (
            <WhyChooseUsCard
              key={index}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
      <FindYourClass />
      {/* <ServicesSection /> */}
      {/* <TestimonialsSection /> */}
      <ContactSection />
      <DirectionsSection />
    </div>
  )
}
