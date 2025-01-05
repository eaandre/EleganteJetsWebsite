'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, ChevronDown, Sun, Moon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { EleganteJetsLogo } from "./elegante-jets-logo"

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="ml-4"
    >
      {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
    </Button>
  )
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-background text-foreground shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link href="/" className="text-primary hover:text-primary/80 transition-colors">
            <EleganteJetsLogo />
          </Link>
        </div>
        <nav className="relative flex items-center">
          <Button
            variant="ghost"
            className="text-foreground hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
          <ThemeToggle />
          {isMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-background text-foreground border border-border rounded-md shadow-lg py-1 z-50">
              <Link href="/" className="block px-4 py-2 text-sm text-foreground hover:bg-primary/10">Home</Link>
              <Link href="/services" className="block px-4 py-2 text-sm text-foreground hover:bg-primary/10">Services</Link>
              <Link href="/fleet" className="block px-4 py-2 text-sm text-foreground hover:bg-primary/10">Fleet</Link>
              <Link href="/about" className="block px-4 py-2 text-sm text-foreground hover:bg-primary/10">Our Story</Link>
              <Link href="/contact" className="block px-4 py-2 text-sm text-foreground hover:bg-primary/10">Contact</Link>
              <Link href="/quote" className="block px-4 py-2 text-sm text-foreground hover:bg-primary/10">Get a Quote</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

