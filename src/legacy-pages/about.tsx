import ContactSection from '@/components/ContactSection'
import TeacherCard from '@/components/TeacherCard'
import WhyChooseUsCard from '@/components/WhyChooseUsCard'
import { NextHeadComponent } from '@/components/components/NextHeadComponent'

export default function About() {
  const whyChooseUsData = [
    {
      title: 'Engineer Teachers',
      description:
        'All our teachers are experienced engineers with a passion for teaching.',
    },
    {
      title: 'Small class rooms',
      description:
        'We believe in small class sizes to ensure individual attention.',
    },
    {
      title: 'Free consultations',
      description:
        'We offer free consultation outside tuition hours to help students answer questions and clarify doubts.',
    },
  ]

  return (
    <div className="container mx-auto space-y-16 px-4 md:px-6 lg:px-8">
      <NextHeadComponent title="fusion tuition | about us" />
      <section className="pt-8">
        <h1 className="mb-4 text-4xl font-bold">About Us</h1>
        <p className="text-lg">
          Our tuition centre is dedicated to providing high-quality education to
          students, helping them achieve their academic goals and build a
          successful future.
        </p>
      </section>

      <section>
        <h2 className="mb-8 text-3xl font-semibold">Why Choose Us</h2>
        <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
          {whyChooseUsData.map((item, index) => (
            <WhyChooseUsCard
              key={index}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-8 text-3xl font-semibold">Our Teachers</h2>
        <TeacherCard
          name="Justine Chang"
          experience="6 years as a Software and Mechanical Engineer"
          subjects="Physics, Mathematics"
          imageSrc="/justine.jpg"
        />
        <TeacherCard
          name="Ng Qi Hui"
          experience="6 years as a Chemical Engineer"
          subjects="Chemistry, Mathematics"
          imageSrc="/qihui.jpg"
          imageOnRight
        />
        {/* Add more TeacherCards as needed */}
      </section>

      <section className="text-center">
        <ContactSection />
      </section>
    </div>
  )
}
