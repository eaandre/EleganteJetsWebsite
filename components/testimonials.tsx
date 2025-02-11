import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    name: "C-suite Executive",
    company: "Global Corporation",
    content: "Elegante Jets offers more than just a flight—it’s an unparalleled luxury experience. From personalized services to exquisite attention to detail, every journey feels like an exclusive retreat.",
    image: "/images/testimonials/executive1.jpg" // Optional, can be a logo or leave out for privacy
  },
  {
    name: "High-Net-Worth Entrepreneur",
    company: "Private Enterprise",
    content: "For the elite traveler, Elegante Jets is the gold standard. The flexibility, seamless booking, and impeccable service ensure every trip is executed to perfection, every time.",
    image: "/images/testimonials/entrepreneur1.jpg" // Optional
  },
  {
    name: "Luxury Brand Ambassador",
    company: "Premium Lifestyle Brand",
    content: "Elegante Jets redefines luxury air travel. From bespoke in-flight services to VIP treatment on the ground, they understand what true exclusivity means—delivering it on every journey.",
    image: "/images/testimonials/brand_ambassador1.jpg" // Optional
  }
]

export function Testimonials() {
  return (
    <section className="py-16 bg-muted text-foreground">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-foreground">What Our Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-card hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {/* Optional: Use a logo or generic icon instead of personal images */}
                  <div className="mr-4">
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.company}</div>
                  </div>
                </div>
                <p className="text-foreground mb-4">&quot;{testimonial.content}&quot;</p>
              </CardContent>
            </Card>
          ))}
        </div>
        {/* Updated CTA to WhatsApp link */}
        <div className="text-center mt-8">
          <a href="https://wa.me/2349024133349" target="_blank" rel="noopener noreferrer" className="bg-primary text-white py-3 px-6 rounded-full hover:bg-primary-dark transition-colors duration-300">
            Book Your Exclusive Experience
          </a>
        </div>
      </div>
    </section>
  )
}
