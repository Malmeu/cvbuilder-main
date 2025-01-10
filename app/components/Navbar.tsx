'use client'

import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const navigation = [
    { name: 'Accueil', href: '/' },
    { name: 'Créer un CV', href: '/builder' },
    { name: 'Format Canadien', href: '/canadian-builder' },
    { name: 'TCF', href: '/outils/tcf', highlight: true },
    { name: 'Blog', href: '/blog' },
    { name: 'Boîte à outils', href: '/outils' },
    { name: 'Modèles', href: '/templates' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-base-100/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              CV DIALI
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link 
                key={item.name}
                href={item.href}
                className={`text-base-content/80 hover:text-primary transition-colors ${
                  item.highlight ? 'font-semibold text-primary' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link 
              href="/builder"
              className="px-6 py-2 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-all"
            >
              Créer mon CV
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-full hover:bg-base-200/50 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`
          md:hidden 
          fixed inset-0 top-16 
          bg-base-100/95 backdrop-blur-lg
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}>
          <div className="p-4 space-y-6">
            {navigation.map((item) => (
              <Link 
                key={item.name}
                href={item.href}
                className={`block text-lg font-medium text-base-content/80 hover:text-primary transition-colors ${
                  item.highlight ? 'font-semibold text-primary' : ''
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4">
              <Link 
                href="/builder"
                className="block w-full px-6 py-3 bg-primary/10 text-primary text-center rounded-full hover:bg-primary/20 transition-all"
                onClick={() => setIsOpen(false)}
              >
                Créer mon CV
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
