import { Card, CardContent } from "@/components/ui/card"
import Image from 'next/image'

const testimonials = [
  {
    name: "Hon. A",
    company: "Tech Innovations Inc.",
    content: "Elegante Jets exceeded all expectations! From start to finish, the service was impeccable.",
    image: "/placeholder.svg?height=100&width=100"
  },
  {
    name: "General I.",
    company: "Global Ventures LLC",
    content: "Our go-to for corporate travel. Professional, flexible, and luxurious.",
    image: "/placeholder.svg?height=100&width=100"
  },
  {
    name: "Dr. S.",
    company: "Elite Enterprises",
    content: "The epitome of luxury air travel. Every journey feels like a personalized experience.",
    image: "/placeholder.svg?height=100&width=100"
  }
]

export function Testimonials() {
  return (
    <section className="py-16 bg-muted text-foreground">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-foreground">What Our Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-card hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={50}
                    height={50}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                  </div>
                </div>
                <p className="text-foreground mb-4">&quot;{testimonial.content}&quot;</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

