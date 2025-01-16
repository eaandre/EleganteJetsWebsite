import { EnhancedPricingWidget } from "@/components/enhanced-pricing-widget";

export default function QuotePage() {
  return (
    <div className="bg-background text-foreground min-h-screen py-16">
      <div className="container mx-auto px-4">
        
        <p className="text-lg text-center mb-12 text-foreground">
          Every journey is unique, and we are committed to crafting the perfect experience tailored to your travel needs and personal preferences. To provide you with the ideal solution for your next journey, please share as many details as possible below. Our team will prepare a customized recommendation along with a competitive quote.
        </p>
        <EnhancedPricingWidget />
      </div>
    </div>
  );
}
