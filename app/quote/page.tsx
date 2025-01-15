import { EnhancedPricingWidget } from "@/components/enhanced-pricing-widget";

export default function QuotePage() {
  return (
    <div className="bg-background text-foreground min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-foreground">
          Seamless Luxury, Tailored To You
        </h1>
        <p className="text-lg text-center mb-12 text-foreground">
          Experience the luxury of tailored travel with Elegante Jets &
          Concierge. Whether you&apos;re planning a one-way trip, a round-trip
          journey, a multi-leg adventure, or need a luxurious vehicle, we&apos;ve got
          you covered.
        </p>
        <EnhancedPricingWidget />
      </div>
    </div>
  );
}
