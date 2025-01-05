import { GoogleMap } from '@/components/google-map'
import { Button } from "@/components/ui/button"

export default function ContactPage() {
  return (
    <div className="bg-background text-foreground">
      <section className="py-16 bg-muted text-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg mb-8">Get in touch with our team to start planning your luxury travel experience.</p>
        </div>
      </section>
      <section className="py-16 bg-background text-foreground">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Send Us a Message</h2>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                  <input type="text" id="name" name="name" className="w-full px-3 py-2 border rounded-md bg-background text-foreground" required />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                  <input type="email" id="email" name="email" className="w-full px-3 py-2 border rounded-md bg-background text-foreground" required />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                  <textarea id="message" name="message" rows={4} className="w-full px-3 py-2 border rounded-md bg-background text-foreground" required></textarea>
                </div>
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Our Location</h2>
              <GoogleMap />
              <div className="mt-4">
                <p><strong>Address:</strong> Nnamdi Azikiwe International Airport, Abuja, FCT, Nigeria</p>
                <p><strong>Phone:</strong> +234 916 7116 192</p>
                <p><strong>Email:</strong> info@elegantejets.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

