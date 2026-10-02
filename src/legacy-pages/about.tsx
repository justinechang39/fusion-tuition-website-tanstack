import { contactDetails } from '@/lib/agent-ready'
import { Link } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'
import './about/about.css'

const values = [
  {
    title: 'Engineers as teachers',
    description:
      'We draw on our engineering experience to explain concepts and their practical applications.',
  },
  {
    title: 'Three students, maximum',
    description:
      'Small groups leave time for individual questions and attention during each lesson.',
  },
  {
    title: 'Free consultations',
    description:
      'Students can ask for help outside lesson hours at no extra charge.',
  },
  {
    title: 'Same school, same stream',
    description:
      'We do not mix students from different schools or different streams.',
  },
]

const teachers = [
  {
    name: 'Justine Chang',
    role: 'Physics & Mathematics',
    background: 'Software and Mechanical Engineer — 6 years',
    imageSrc: '/justine-portrait.webp',
    imageWidth: 1000,
    imageHeight: 927,
    imagePosition: 'left center',
  },
  {
    name: 'Ng Qi Hui',
    role: 'Chemistry & Mathematics',
    background: 'Chemical Engineer — 6 years',
    imageSrc: '/qihui-portrait.webp',
    imageWidth: 1000,
    imageHeight: 1000,
    imagePosition: 'center',
  },
]

export default function About() {
  return (
    <div className="about-page">
      <header className="about-hero">
        <div className="about-shell about-intro">
          <h1>
            Engineers
            <br />
            who <em>teach.</em>
          </h1>
          <div className="about-intro-copy">
            <p>
              Fusion Tuition is run by Justine and Qi Hui, two engineers who
              left industry to teach Physics, Chemistry, and Mathematics.
            </p>
            <Link to="/classes" className="about-button">
              See our classes <ArrowUpRight size={20} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </header>

      <div className="about-shell">
        <section
          className="about-teachers"
          aria-labelledby="about-teachers-title"
        >
          <div className="about-section-heading">
            <h2 id="about-teachers-title">Just the two of us.</h2>
            <p>
              No rotating tutors or substitute teachers. Your child learns with
              Justine or Qi Hui every lesson, so we can follow their questions
              and progress over time.
            </p>
          </div>
          <div className="about-profiles">
            {teachers.map((teacher, index) => (
              <article
                key={teacher.name}
                className={`about-teacher ${index === 1 ? 'about-teacher-reverse' : ''}`}
              >
                <img
                  src={teacher.imageSrc}
                  alt={teacher.name}
                  width={teacher.imageWidth}
                  height={teacher.imageHeight}
                  className="about-portrait"
                  style={{ objectPosition: teacher.imagePosition }}
                  loading="lazy"
                  decoding="async"
                />
                <div className="about-teacher-info">
                  <h3>{teacher.name}</h3>
                  <p className="about-teacher-subjects">{teacher.role}</p>
                  <p className="about-teacher-background">
                    {teacher.background}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          className="about-approach"
          aria-labelledby="about-approach-title"
        >
          <h2 id="about-approach-title">How we teach.</h2>
          <dl className="about-values">
            {values.map((value) => (
              <div key={value.title}>
                <dt>{value.title}</dt>
                <dd>{value.description}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section
          className="about-contact"
          aria-labelledby="about-contact-title"
        >
          <div>
            <h2 id="about-contact-title">Try a class.</h2>
            <p>
              Talk to us about your child’s subjects and curriculum, or arrange
              a free trial class.
            </p>
          </div>
          <div className="about-contact-actions">
            <a
              href={contactDetails.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="about-button"
            >
              Ask about a free trial
              <ArrowUpRight size={20} aria-hidden="true" />
            </a>
            <a href={`tel:${contactDetails.phoneE164}`}>
              {contactDetails.phoneDisplay}
            </a>
            <a href={`mailto:${contactDetails.email}`}>
              {contactDetails.email}
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}
