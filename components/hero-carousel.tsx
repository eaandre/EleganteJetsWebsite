'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const images = [
  {
    src: "/IMG_7125.JPG",
    alt: "Elegante Jets private aircraft flying over a city at sunset"
  },
  {
    src: "/IMG_7111.JPG",
    alt: "Luxurious interior of an Elegante Jets private aircraft"
  },
  {
    src: "/IMG_7100.JPG ",
    alt: "Elegante Jets business aircraft soaring over the sea at sunset"
  }
]

export function HeroCarousel() {
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentImage(index)
  }

  const goToPrevious = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToNext = () => {
    setCurrentImage((prev) => (prev + 1) % images.length)
  }

  return (
    <section className="relative h-screen overflow-hidden" aria-label="Elegante Jets Showcase">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Image
            src={images[currentImage].src}
            alt={images[currentImage].alt}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70" />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center max-w-4xl px-4"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Luxury in the Sky, Precision on the Ground
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8 drop-shadow-md">
            Experience the pinnacle of bespoke air travel and concierge services, where every journey is tailored to perfection.
          </p>
          <div className="space-x-4">
            <Link href="/contact">
              <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors transform hover:scale-105 duration-200">
                Contact Us
              </Button>
            </Link>
            <Link href="/quote">
              <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors transform hover:scale-105 duration-200">
                Get Your Personalized Quote
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentImage === index ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-colors z-20"
        onClick={goToPrevious}
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-colors z-20"
        onClick={goToNext}
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>
    </section>
  )
}

