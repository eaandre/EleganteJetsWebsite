import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from 'next/image'
import Link from 'next/link'

const jets = [
  {
    name: "Light Jet",
    image: "/images/jets/light-jet.png",
    description: "Ideal for short trips, these jets combine efficiency with comfort for up to 6-8 passengers.",
    specs: [
      "Capacity: 6-8 passengers",
      "Range: Up to 2,500 nautical miles",
      "Speed: 400-450 knots",
      "Luggage: 6-7 pieces of luggage"
    ]
  },
  {
    name: "Midsize Jet",
    image: "/images/jets/midsize-jet.png",
    description: "A perfect choice for medium-length journeys, offering enhanced space and amenities for 6-9 passengers.",
    specs: [
      "Capacity: 6-9 passengers",
      "Range: Up to 3,000 nautical miles",
      "Speed: 430-480 knots",
      "Luggage: 7-8 pieces of luggage"
    ]
  },
  {
    name: "Heavy Jet",
    image: "/images/jets/heavy-jet.png",
    description: "Experience unparalleled luxury for long-haul travel with spacious cabins, top-tier amenities, and room for up to 16 passengers.",
    specs: [
      "Capacity: 10-16 passengers",
      "Range: Up to 6,000 nautical miles",
      "Speed: 470-550 knots",
      "Luggage: 11-20 pieces of luggage"
    ]
  }
]

const vehicles = [
  {
    name: "Luxury Sedan",
    image: "/images/vehicles/luxury-sedan.jpg",
    description: "Travel in style with premium sedans featuring leather interiors, advanced sound systems, and climate control.",
    features: [
      "Leather interior",
      "Advanced sound system",
      "Climate control",
      "Professional chauffeur service available"
    ]
  },
  {
    name:"Executive SUV",
    image: "/images/vehicles/executive-suv.jpg",
    description: "Perfect for groups, offering ample space and luxury with privacy partitions and premium entertainment systems.",
    features: [
      "Seating for up to 7 passengers",
      "Ample luggage space",
      "Premium entertainment system",
      "Privacy partition"
    ]
  },
  {
    name: "Super Car",
    image: "/images/vehicles/sports-car.jpg",
    description: "For the adventurous, our high-performance sports cars deliver speed, precision, and unmatched style.",
    features: [
      "High-performance engine",
      "Sleek, aerodynamic design",
      "Advanced handling and control systems",
      "Luxurious, driver-focused interior"
    ]
  }
]

export default function FleetPage() {
  return (
    <div className="bg-background text-foreground">
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4 text-primary-foreground">Discover Elegance in Motion: Our Premier Fleet</h1>
          <p className="text-lg mb-8 text-primary-foreground">From light jets to luxury sedans, our fleet is designed to meet your every need with top-tier comfort and service.</p>
        </div>
      </section>

      <section className="py-16 bg-background text-foreground">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground">Private Jets</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jets.map((jet) => (
              <Card key={jet.name} className="overflow-hidden">
                <Image
                  src={jet.image}
                  alt={jet.name}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <CardHeader>
                  <CardTitle className="text-foreground">{jet.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-foreground">{jet.description}</p>
                  <ul className="list-disc list-inside mb-4 text-foreground">
                    {jet.specs.map((spec, index) => (
                      <li key={index} className="text-foreground">{spec}</li>
                    ))}
                  </ul>
                  <Link href="/quote">
                    <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/80">
                      Get a Quote for Your Journey
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted text-foreground">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground">Luxury Vehicles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vehicles.map((vehicle) => (
              <Card key={vehicle.name} className="overflow-hidden">
                <Image
                  src={vehicle.image}
                  alt={vehicle.name}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <CardHeader>
                  <CardTitle className="text-foreground">{vehicle.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-foreground">{vehicle.description}</p>
                  <ul className="list-disc list-inside mb-4 text-foreground">
                    {vehicle.features.map((feature, index) => (
                      <li key={index} className="text-foreground">{feature}</li>
                    ))}
                  </ul>
                  <Link href="/quote">
                    <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/80">
                      Get a Quote for Your Journey
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
