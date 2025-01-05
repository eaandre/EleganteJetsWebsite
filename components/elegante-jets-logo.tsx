import { Playfair_Display } from 'next/font/google'

const playfairDisplay = Playfair_Display({ subsets: ['latin'] })

export function EleganteJetsLogo() {
  return (
    <div className={`text-2xl font-bold ${playfairDisplay.className}`}>
      <span className="text-primary hover:text-primary/80 transition-colors">Elegante Jets & Concierge</span>
    </div>
  )
}

