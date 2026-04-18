import React from 'react'

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: 'Alice Tan',
      feedback:
        'Fusion Tuition Centre helped me improve my grades tremendously. The tutors are patient and knowledgeable.',
      image: '/images/alice.jpg',
    },
    {
      name: 'Jason Lee',
      feedback:
        'I love the interactive lessons and the supportive environment. Highly recommended!',
      image: '/images/jason.jpg',
    },
    // Add more testimonials as needed
  ]

  return (
    <section className="bg-white px-4 py-16 md:px-20">
      <h2 className="mb-10 text-center text-4xl font-bold">Testimonials</h2>
      <div className="space-y-8">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center md:flex-row md:text-left"
          >
            <img
              src={testimonial.image}
              alt={testimonial.name}
              width={96}
              height={96}
              className="mb-4 h-24 w-24 rounded-full md:mb-0 md:mr-6"
              loading="lazy"
            />
            <div>
              <p className="text-lg italic">“{testimonial.feedback}”</p>
              <p className="mt-2 font-bold text-primary">
                - {testimonial.name}
              </p>
            </div>
          </div>
        ))}{' '}
      </div>
    </section>
  )
}

export default TestimonialsSection
