import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Diamond, Plane, Car } from 'lucide-react'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from "@/components/error-fallback"

const HeroCarousel = dynamic(() => import("@/components/hero-carousel").then(mod => mod.HeroCarousel), { ssr: false })
const Testimonials = dynamic(() => import("@/components/testimonials").then(mod => mod.Testimonials))
const ServicesGrid = dynamic(() => import("@/components/service.grid").then(mod => mod.ServicesGrid))
const FAQ = dynamic(() => import("@/components/faq").then(mod => mod.FAQ))

export const metadata: Metadata = {
  title: 'Elegante Jets & Concierge | Luxury Private Aviation Services',
  description: 'Experience unparalleled luxury in private aviation with Elegante Jets & Concierge. Tailored charter services, premium concierge, and bespoke travel solutions.',
  keywords: 'private jets, luxury travel, concierge services, charter flights, VIP transportation',
}

export default function Home() {
  return (
    <div className="bg-background text-foreground">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <HeroCarousel />
      </ErrorBoundary>
      
      {/* About Us Section */}
      <section className="py-16 bg-background text-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-foreground">Redefining Luxury Travel</h2>
          <p className="mb-8 text-lg text-foreground">
            With years of expertise in luxury travel and a relentless focus on safety and personalization, Elegante Jets & Concierge stands as Nigeria's premier private aviation provider. From private jet charters to exclusive concierge services, we redefine what it means to travel in style.
          </p>
          <Link href="/about">
            <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors transform hover:scale-105 duration-200">
              Learn More About Us
            </Button>
          </Link>
        </div>
      </section>

      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <ServicesGrid />
      </ErrorBoundary>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-background text-foreground">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground">Excellence You Can Trust</h2>
          <div className="flex flex-wrap justify-center items-center gap-8">
            <Card className="w-64 text-center">
              <CardHeader>
                <Diamond className="w-12 h-12 mx-auto text-primary" />
                <CardTitle className="text-foreground">Tailored Luxury</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground">Bespoke experiences customized to your needs.</p>
              </CardContent>
            </Card>
            <Card className="w-64 text-center">
              <CardHeader>
                <Plane className="w-12 h-12 mx-auto text-primary" />
                <CardTitle className="text-foreground">Unmatched Comfort</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground">Travel in absolute elegance with world-class amenities.</p>
              </CardContent>
            </Card>
            <Card className="w-64 text-center">
              <CardHeader>
                <Shield className="w-12 h-12 mx-auto text-primary" />
                <CardTitle className="text-foreground">Safety First</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground">We uphold the highest industry standards in safety and reliability.</p>
              </CardContent>
            </Card>
            <Card className="w-64 text-center">
              <CardHeader>
                <Car className="w-12 h-12 mx-auto text-primary" />
                <CardTitle className="text-foreground">Seamless Booking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground">Book with ease using our tech-driven platform.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Testimonials />
      </ErrorBoundary>

      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <FAQ />
      </ErrorBoundary>

      {/* Contact Section */}
      <section className="py-16 bg-background text-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-foreground">Ready to Experience Elegance?</h2>
          <p className="mb-8 text-lg text-foreground">
            Contact us to book your journey or learn more about our premium services.
          </p>
          <div className="mb-8">
            <p><strong>Address:</strong> Nnamdi Azikiwe International Airport, Abuja, FCT, Nigeria</p>
            <p><strong>Phone:</strong> +234 916 7116 192</p>
            <p><strong>Email:</strong> info@elegantejets.com</p>
          </div>
          <Link href="/contact">
            <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors transform hover:scale-105 duration-200">
              Get In Touch
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

