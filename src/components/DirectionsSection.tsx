import { FUSION_TUITION_LOCATION, HOW_TO_GET_HERE_PATH } from '@/lib/location'
import { cn } from '@/lib/utils'
import { useJsApiLoader } from '@react-google-maps/api'
import { Link } from '@tanstack/react-router'
import { type VariantProps, cva } from 'class-variance-authority'
import { MapPinned } from 'lucide-react'
import { FaApple, FaGoogle } from 'react-icons/fa' // Import icons
import { Button } from './ui/button'

const sectionVariants = cva('py-16 px-4 md:px-20 flex flex-col md:flex-row', {
  variants: {
    bgColor: {
      white: 'bg-white',
      gray: 'bg-gray-100',
      // Add more colors if needed
    },
  },
  defaultVariants: {
    bgColor: 'white',
  },
})

interface DirectionsSectionProps extends VariantProps<typeof sectionVariants> {}

const DirectionsSection: React.FC<DirectionsSectionProps> = ({ bgColor }) => {
  const mapApiKey = import.meta.env.VITE_PUBLIC_MAP_API_KEY ?? ''

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: mapApiKey,
  })

  return (
    <section className={cn(sectionVariants({ bgColor }))}>
      <div className="order-2 h-64 w-full md:order-1 md:h-96 md:w-1/2">
        {isLoaded ? (
          <iframe
            src={FUSION_TUITION_LOCATION.embedUrl}
            width="100%"
            height="100%"
            loading="lazy"
          ></iframe>
        ) : (
          <div>Loading Map...</div>
        )}
      </div>
      <div className="order-1 mt-8 flex w-full flex-col items-center md:order-2 md:ml-8 md:mt-0 md:w-1/2 md:items-start">
        <h2 className="mb-4 text-3xl font-bold">Our Address</h2>
        <p className="mb-4 text-lg">
          {FUSION_TUITION_LOCATION.unit}, {FUSION_TUITION_LOCATION.street},{' '}
          {FUSION_TUITION_LOCATION.postalCode}
          <br />
          {FUSION_TUITION_LOCATION.country}
        </p>

        <div className="mb-4 flex w-full flex-col gap-4 md:flex-row md:flex-wrap">
          <Button asChild className="flex items-center">
            <Link to={HOW_TO_GET_HERE_PATH}>
              <MapPinned className="mr-2 h-4 w-4" />
              How to get here
            </Link>
          </Button>
          <Button
            variant="outlineHover"
            onClick={() =>
              window.open(
                FUSION_TUITION_LOCATION.googleMapsDirectionsUrl,
                '_blank',
              )
            }
            className="flex items-center"
          >
            <FaGoogle className="mr-2" />
            Open in Google Maps
          </Button>
          <Button
            variant="outlineHover"
            onClick={() =>
              window.open(FUSION_TUITION_LOCATION.appleMapsUrl, '_blank')
            }
            className="flex items-center"
          >
            <FaApple className="mr-2" />
            Open in Apple Maps
          </Button>
        </div>
      </div>
    </section>
  )
}

export default DirectionsSection
