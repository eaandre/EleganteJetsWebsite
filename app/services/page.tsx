import { ServicesGrid } from '@/components/service.grid'
import { ComparisonTable } from '@/components/comparison-table'
import { EnhancedPricingWidget } from "@/components/enhanced-pricing-widget"
import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function ServicesPage() {
  return (
    <div className="bg-background text-foreground">
      <section className="py-16 bg-muted text-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4 text-foreground">Our Premier Services</h1>
          <p className="text-lg mb-8 text-foreground">Experience unparalleled luxury and convenience with our range of exclusive private aviation services.</p>
        </div>
      </section>
      <ServicesGrid />
      <ComparisonTable />
      <section className="py-16 bg-background text-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-foreground">Ready to Elevate Your Travel Experience?</h2>
          <p className="mb-8 text-lg text-foreground">Contact us today to discuss your travel needs and experience the luxury of private aviation.</p>
          <Link href="/quote">
            <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors px-6 py-3 rounded-md font-semibold text-lg">
              Get Your Personalized Quote
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

