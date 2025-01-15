import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    name: "Private Client",
    company: "Confidential",
    content: "Elegante Jets provided an exceptional travel experience. Their attention to detail and personalized service made our journey seamless and enjoyable.",
    image: "/images/testimonials/private_client1.jpg"
  },
  {
    name: "Corporate Executive",
    company: "Undisclosed Corporation",
    content: "As a frequent traveler, I rely on Elegante Jets for their professionalism and flexibility. They consistently meet our corporate travel needs with excellence.",
    image: "/images/testimonials/corporate_executive1.jpg"
  },
  {
    name: "Business Owner",
    company: "Private Enterprise",
    content: "Choosing Elegante Jets was a game-changer for our business trips. Their luxurious service and commitment to client satisfaction are unparalleled.",
    image: "/images/testimonials/business_owner1.jpg"
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
                  {/* <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={50}
                    height={50}
                    className="rounded-full mr-4"
                  /> */}
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

