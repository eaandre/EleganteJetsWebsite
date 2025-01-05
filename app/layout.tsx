import type { Metadata } from 'next'
import './globals.css'
import { LiveChatWidget } from "@/components/live-chat-widget"
import Link from 'next/link'
import { Header } from '@/components/header'
import { ThemeProvider } from "@/components/theme-provider"
import { ScrollToTop } from "@/components/scroll-to-top"

export const metadata: Metadata = {
  title: 'Elegante Jets & Concierge | Luxury Private Aviation Services',
  description: 'Experience unparalleled luxury and personalized service in the sky and on the ground with Elegante Jets & Concierge',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="bg-background text-foreground min-h-screen flex flex-col">
            <Header />
            <ScrollToTop />
            <main className="flex-grow">{children}</main>
            <footer className="bg-background text-foreground py-8">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-primary">About Us</h3>
                    <p>Elegante Jets & Concierge provides premium air travel and concierge services for discerning clients worldwide.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-primary">Quick Links</h3>
                    <ul className="space-y-2">
                      <li><Link href="/services" className="hover:text-primary transition-colors">Our Services</Link></li>
                      <li><Link href="/fleet" className="hover:text-primary transition-colors">Our Fleet</Link></li>
                      <li><Link href="/about" className="hover:text-primary transition-colors">Our Story</Link></li>
                      <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-primary">Contact</h3>
                    <p>Nnamdi Azikiwe International Airport, Abuja, FCT, Nigeria</p>
                    <p>Phone: +234 916 7116 192</p>
                    <p>Email: elegantejetsconcierge@gmail.com</p>
                  </div>
                </div>
                <div className="mt-8 text-center text-sm">
                  <p>&copy; {new Date().getFullYear()} Elegante Jets & Concierge. All rights reserved.</p>
                </div>
              </div>
            </footer>
            <LiveChatWidget />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

