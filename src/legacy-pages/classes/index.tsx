import { contactDetails, curriculumCatalog } from '@/lib/agent-ready'
import {
  ArrowDown,
  ArrowUpRight,
  BookOpen,
  Clock3,
  MessageCircle,
  Users,
} from 'lucide-react'
import './classes.css'

const curricula = [
  {
    id: 'igcse',
    name: 'IGCSE',
    label: 'Cambridge IGCSE',
    description:
      'Mathematics and science tuition for the Cambridge IGCSE syllabus.',
    subjects: curriculumCatalog.igcse,
  },
  {
    id: 'o-level',
    name: 'GCE O Level',
    label: 'Singapore-Cambridge GCE O Level',
    description: 'Physics, Chemistry, and Additional Mathematics tuition.',
    subjects: curriculumCatalog.oLevel,
  },
  {
    id: 'a-level',
    name: 'A Level',
    label: 'Singapore-Cambridge GCE A Level',
    description:
      'Physics and Chemistry tuition for the listed A Level syllabuses.',
    subjects: curriculumCatalog.aLevel,
  },
  {
    id: 'ib',
    name: 'IB',
    label: 'International Baccalaureate',
    description:
      'Mathematics and Chemistry tuition at Higher and Standard Level.',
    subjects: curriculumCatalog.ib,
  },
] as const

const trialUrl = `https://wa.me/${contactDetails.phoneE164.slice(1)}?text=${encodeURIComponent(
  "Hi! I'm interested in booking a free trial class at Fusion Tuition.",
)}`

function EnquiryChevron() {
  return (
    <span className="t-learn-chevron" aria-hidden="true">
      <svg
        width="20"
        height="20"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path className="t-learn-arm t-learn-arm-top" d="M6 4L10 8" />
        <path className="t-learn-arm t-learn-arm-bot" d="M10 8L6 12" />
      </svg>
    </span>
  )
}

export default function ClassesPage() {
  return (
    <div className="classes-page">
      <section className="classes-opening" aria-labelledby="classes-title">
        <div className="classes-opening-copy">
          <h1 id="classes-title">
            Small class.
            <br />
            Same school.
            <br />
            Same stream.
          </h1>
          <p className="classes-intro">
            Physics, Chemistry, and Mathematics tuition for IGCSE, O Level, A
            Level, and IB, with a maximum of three students per class.
          </p>
          <a
            className="classes-button classes-button-primary"
            href={trialUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={20} aria-hidden="true" />
            Book a free trial
            <ArrowUpRight size={19} aria-hidden="true" />
          </a>
          <p className="classes-trial-note">
            Ask about your subject and available lesson timings.
          </p>
        </div>

        <nav className="classes-finder" aria-label="Choose your curriculum">
          <h2>Choose your curriculum.</h2>
          <p>Choose your curriculum to explore the subjects we teach.</p>
          <div className="classes-finder-links">
            {curricula.map((curriculum) => (
              <a key={curriculum.id} href={`#${curriculum.id}`}>
                <span>{curriculum.name}</span>
                <span className="classes-finder-count">
                  {curriculum.subjects.length} subjects
                </span>
                <ArrowDown size={19} aria-hidden="true" />
              </a>
            ))}
          </div>
          <span className="classes-finder-footnote">
            Subject details and syllabus codes below.
          </span>
        </nav>
      </section>

      <section className="classes-benefits" aria-label="How our classes work">
        <div>
          <Users size={22} aria-hidden="true" />
          <p>
            <strong>3 students, maximum.</strong>
            <span>Small-group lessons.</span>
          </p>
        </div>
        <div>
          <Clock3 size={22} aria-hidden="true" />
          <p>
            <strong>Flexible lesson timings.</strong>
            <span>Lessons around your availability.</span>
          </p>
        </div>
        <div>
          <BookOpen size={22} aria-hidden="true" />
          <p>
            <strong>Support outside class.</strong>
            <span>Free consultations outside class.</span>
          </p>
        </div>
      </section>

      <section
        className="classes-catalogue"
        aria-labelledby="classes-catalogue-title"
      >
        <div className="classes-catalogue-heading">
          <h2 id="classes-catalogue-title">Find your subject.</h2>
          <p>
            Select a subject to enquire on WhatsApp about classes and lesson
            timings.
          </p>
        </div>
        <div className="classes-programmes">
          {curricula.map((curriculum) => (
            <section
              className="classes-programme"
              id={curriculum.id}
              key={curriculum.id}
              aria-labelledby={`${curriculum.id}-title`}
            >
              <div className="classes-programme-heading">
                <h3 id={`${curriculum.id}-title`}>{curriculum.name}</h3>
                <p>{curriculum.label}</p>
              </div>
              <p className="classes-programme-description">
                {curriculum.description}
              </p>
              <ul className="classes-subjects">
                {curriculum.subjects.map((subject) => (
                  <li key={subject.name}>
                    <a
                      className="t-learn"
                      href={`https://wa.me/${contactDetails.phoneE164.slice(1)}?text=${encodeURIComponent(
                        `Hi Fusion Tuition! I'm interested in a free trial for ${curriculum.name} ${subject.name} (${subject.code}). Could you share more about the classes and timings?`,
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Enquire about ${curriculum.name} ${subject.name}, syllabus ${subject.code}, on WhatsApp`}
                    >
                      <span className="classes-subject-name">
                        {subject.name}
                      </span>
                      <span className="classes-subject-code">
                        {subject.code}
                      </span>
                      <EnquiryChevron />
                    </a>
                  </li>
                ))}
              </ul>
              <p className="classes-programme-note">
                Ask about a subject on WhatsApp{' '}
                <ArrowUpRight size={14} aria-hidden="true" />
              </p>
            </section>
          ))}
        </div>
      </section>

      <section
        className="classes-contact"
        aria-labelledby="classes-contact-title"
      >
        <div>
          <h2 id="classes-contact-title">Ask about a class.</h2>
          <p>
            Contact us with your curriculum and subject to ask about lesson
            timings or book a free trial.
          </p>
          <a
            className="classes-button classes-button-light"
            href={trialUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={20} aria-hidden="true" />
            Enquire on WhatsApp
            <ArrowUpRight size={19} aria-hidden="true" />
          </a>
        </div>
        <div className="classes-contact-details">
          <p>Prefer to call or email?</p>
          <a href={`tel:${contactDetails.phoneE164}`}>
            {contactDetails.phoneDisplay}
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
          <a href={`mailto:${contactDetails.email}`}>
            {contactDetails.email}
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
          <p className="classes-contact-location">
            Singapore · Small-group tuition
          </p>
        </div>
      </section>
    </div>
  )
}
