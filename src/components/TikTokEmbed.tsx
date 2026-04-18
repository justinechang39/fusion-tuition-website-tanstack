import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { motion } from 'framer-motion'
import { Video } from 'lucide-react'

const tiktokVideos = [
  '7525698420539952391',
  '7524648454132403464',
  '7521647884870176018',
]

function TikTokVideo({ videoId }: { videoId: string }) {
  return (
    <div
      className="tiktok-embed-wrapper relative mx-auto h-0 w-full max-w-[325px] overflow-hidden bg-black"
      style={{ paddingBottom: '177.8%' }}
    >
      <iframe
        src={`https://www.tiktok.com/player/v1/${videoId}?controls=1&music_info=1&description=1`}
        allow="fullscreen; accelerometer; gyroscope; picture-in-picture"
        title="TikTok Video"
        className="absolute inset-0 h-full w-full"
        frameBorder="0"
        scrolling="no"
        allowFullScreen
      />
    </div>
  )
}

export function TikTokEmbed() {
  return (
    <section className="border-t border-gray-200 px-4 py-16 md:px-0 md:py-24">
      <div className="mb-12">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-pink-50 px-4 py-2">
          <Video className="h-5 w-5 text-pink-600" />
          <span className="text-sm font-semibold text-pink-900">
            Social Media
          </span>
        </div>
        <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-5xl">
          Follow Us on TikTok
        </h2>
        <p className="max-w-2xl text-lg text-gray-600">
          Stay updated with our latest tips, student success stories, and
          educational content
        </p>
      </div>

      <motion.div
        className="w-full px-0 sm:px-12 md:px-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <Carousel className="mx-auto w-full max-w-sm">
          <CarouselContent>
            {tiktokVideos.map((videoId, index) => (
              <CarouselItem key={index}>
                <TikTokVideo videoId={videoId} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-8 h-10 w-10 border-gray-300 sm:-left-12" />
          <CarouselNext className="-right-8 h-10 w-10 border-gray-300 sm:-right-12" />
        </Carousel>
      </motion.div>

      <div className="mt-8 border-l-4 border-pink-500 bg-pink-50 p-4">
        <p className="text-sm text-gray-700">
          @fusion.tuition • Follow us for study tips and success stories
        </p>
      </div>
    </section>
  )
}
