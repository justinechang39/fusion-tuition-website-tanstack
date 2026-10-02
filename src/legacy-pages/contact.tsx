import { TuitionHero } from '@/components/ui/TuitionHero'
import { contactDetails } from '@/lib/agent-ready'
import { FUSION_TUITION_LOCATION, HOW_TO_GET_HERE_PATH } from '@/lib/location'
import { Link } from '@tanstack/react-router'
import {
  ArrowRight,
  ArrowUpRight,
  Mail,
  MessageCircle,
  Phone,
} from 'lucide-react'
import './contact/contact.css'

export default function Contact() {
  return (
    <div className="contact-page">
      <TuitionHero className="contact-hero">
        <div className="contact-hero-shell contact-intro">
          <h1>
            Contact <em>us.</em>
          </h1>
          <div className="contact-intro-copy">
            <p>
              <span className="contact-intro-text">
                Ask about classes, lesson timings, or a free trial. Tell us your
                subject and curriculum, and we can help you find a class.
              </span>
            </p>
            <a
              className="contact-button"
              href={contactDetails.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={20} aria-hidden="true" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </TuitionHero>

      <div className="contact-body">
        <section className="contact-methods" aria-labelledby="contact-direct">
          <div className="contact-section-heading">
            <h2 id="contact-direct">Reach us directly.</h2>
            <p>
              WhatsApp, call, or email. Choose whichever works best for you.
            </p>
          </div>
          <div className="contact-rows">
            <a
              className="contact-row"
              href={contactDetails.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={24} aria-hidden="true" />
              <span>
                <strong>WhatsApp</strong>
                <span className="contact-destination">
                  {contactDetails.phoneDisplay}
                </span>
              </span>
              <ArrowUpRight size={20} aria-hidden="true" />
            </a>
            <a className="contact-row" href={`tel:${contactDetails.phoneE164}`}>
              <Phone size={24} aria-hidden="true" />
              <span>
                <strong>Call us</strong>
                <span className="contact-destination">
                  {contactDetails.phoneDisplay}
                </span>
              </span>
              <ArrowUpRight size={20} aria-hidden="true" />
            </a>
            <a className="contact-row" href={`mailto:${contactDetails.email}`}>
              <Mail size={24} aria-hidden="true" />
              <span>
                <strong>Email</strong>
                <span className="contact-destination">
                  {contactDetails.email}
                </span>
              </span>
              <ArrowUpRight size={20} aria-hidden="true" />
            </a>
          </div>
        </section>

        <section className="contact-location" aria-labelledby="contact-visit">
          <div className="contact-address-panel">
            <h2 id="contact-visit">Visit us.</h2>
            <address>
              <span>{FUSION_TUITION_LOCATION.street}</span>
              <span>{FUSION_TUITION_LOCATION.unit}</span>
              <span>
                {FUSION_TUITION_LOCATION.country}{' '}
                {FUSION_TUITION_LOCATION.postalCode}
              </span>
            </address>
            <Link className="contact-directions" to={HOW_TO_GET_HERE_PATH}>
              How to get here
              <ArrowRight size={20} aria-hidden="true" />
            </Link>
            <div className="contact-map-links">
              <a
                href={FUSION_TUITION_LOCATION.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Maps <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              <a
                href={FUSION_TUITION_LOCATION.appleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Apple Maps <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
          <iframe
            className="contact-map"
            src={FUSION_TUITION_LOCATION.embedUrl}
            title="Map showing Fusion Tuition at 37 Jalan Pemimpin, Singapore"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </section>
      </div>
    </div>
  )
}
