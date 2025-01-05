import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  
  const faqs = [
    {
      question: "What is the booking process for a private jet charter?",
      answer: "Our booking process is simple and efficient. Contact our team with your travel details, and we'll provide you with suitable options. Once you select your preferred aircraft, we'll handle all the arrangements and provide you with a detailed itinerary."
    },
    {
      question: "How far in advance should I book a charter flight?",
      answer: "While we can accommodate last-minute requests, we recommend booking at least 48-72 hours in advance to ensure the best aircraft options and competitive pricing."
    },
    {
      question: "What amenities are available on board?",
      answer: "Amenities vary by aircraft but typically include comfortable seating, Wi-Fi, entertainment systems, and catering options. We can provide specific details for each aircraft upon request."
    },
    {
      question: "Is it possible to change my itinerary after booking?",
      answer: "Yes, we understand that plans can change. We offer flexibility to modify your itinerary, subject to aircraft and crew availability. Please contact us as soon as possible with any changes."
    },
    {
      question: "What safety measures do you have in place?",
      answer: "Safety is our top priority. We only work with operators who meet or exceed FAA regulations. All aircraft undergo regular maintenance, and crews are highly trained and experienced."
    }
  ]
  
  export function FAQ() {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    )
  }
  
  