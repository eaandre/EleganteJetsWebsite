import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from 'next/image'
import Link from 'next/link'

export default function OurStoryPage() {
  return (
    <div className="bg-background text-foreground">
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4 text-primary-foreground">Our Story</h1>
          <p className="text-lg mb-8 text-primary-foreground">
            At Elegante Jets, we are redefining luxury air travel by offering personalized private jet services tailored to your unique travel needs. 
            Our mission is to elevate your flying experience, ensuring every journey is seamless, comfortable, and exceptional.
          </p>
        </div>
      </section>

      <section className="py-16 bg-background text-foreground">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground">Our Mission</h2>
          <p className="text-lg text-foreground">
            Our mission is to provide personalized private jet services that cater to your unique travel needs, elevating your flying experience to new heights.
          </p>
        </div>
      </section>

      <section className="py-16 bg-muted text-foreground">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground">Our Vision</h2>
          <p className="text-lg text-foreground">
            We envision becoming the leading provider of luxury private jet services, setting new standards in comfort, safety, and customer satisfaction.
          </p>
        </div>
      </section>

      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground">Our Values</h2>
          <ul className="space-y-4">
            <li className="text-lg text-foreground">
              <strong>Excellence:</strong> We strive for the highest standards in every aspect of our service.
            </li>
            <li className="text-lg text-foreground">
              <strong>Integrity:</strong> We conduct our business with honesty and transparency.
            </li>
            <li className="text-lg text-foreground">
              <strong>Customer-Centricity:</strong> We place our clients at the heart of everything we do.
            </li>
            <li className="text-lg text-foreground">
              <strong>Innovation:</strong> We embrace new ideas to enhance the travel experience.
            </li>
            <li className="text-lg text-foreground">
              <strong>Safety:</strong> We prioritize the well-being of our clients and crew above all.
            </li>
          </ul>
        </div>
      </section>

      <section className="py-16 bg-background text-foreground">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground">Our Commitment</h2>
          <p className="text-lg text-foreground">
            We are committed to delivering a travel experience that exceeds expectations, ensuring that every flight with Elegante Jets is a memorable journey.
          </p>
        </div>
      </section>
    </div>
  )
}
