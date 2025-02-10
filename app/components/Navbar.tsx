'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { LogIn, LogOut, Menu, User, Briefcase } from 'lucide-react'
import AuthModal from './auth/AuthModal'
import { useToast } from '../hooks/useToast'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authView, setAuthView] = useState<'signin' | 'signup'>('signin')
  const [user, setUser] = useState<any>(null)
  const pathname = usePathname()
  const supabase = createClientComponentClient()
  const { toast } = useToast()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user: currentUser } } = await supabase.auth.getUser()
      setUser(currentUser)
    }

    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()
    
    if (error) {
      toast({
        title: 'Erreur',
        description: error.message,
        variant: 'destructive',
      })
    } else {
      toast({
        title: 'Déconnexion réussie',
        description: 'À bientôt !',
      })
    }
  }

  const openAuthModal = (view: 'signin' | 'signup') => {
    setAuthView(view)
    setIsAuthModalOpen(true)
  }

  const navigation = [
    { name: 'CV Classique', href: '/builder' },
    { name: 'CV Canadien', href: '/canadian-builder' },
    { name: 'Jobs', href: '/jobs' },
    { name: 'Outils', href: '/outils' },
    { name: 'Blog', href: '/blog' },
    ...(user ? [
      { name: 'Favoris', href: '/favoris' },
      { name: 'Tableau de bord', href: '/dashboard' },
      ...(user.email === 'admin@cvdiali.com' ? [
        { 
          name: 'Admin', 
          href: '/admin/jobs',
          icon: Briefcase 
        }
      ] : [])
    ] : []),
  ]

  return (
    <nav className="bg-base-100 border-b border-base-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo et liens de navigation */}
          <div className="flex">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                CV DIALI
              </span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg ${
                    pathname === item.href
                      ? 'bg-primary/10 text-primary'
                      : 'text-base-content hover:bg-base-200 hover:text-primary'
                  }`}
                >
                  {item.icon && <item.icon className="w-4 h-4" />}
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Boutons d'authentification */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            {user ? (
              <button
                onClick={handleSignOut}
                className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium 
                  text-base-content hover:bg-base-200 focus:outline-none focus:ring-2 
                  focus:ring-offset-2 focus:ring-primary"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Déconnexion
              </button>
            ) : (
              <>
                <button
                  onClick={() => openAuthModal('signin')}
                  className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium 
                    text-base-content hover:bg-base-200 focus:outline-none focus:ring-2 
                    focus:ring-offset-2 focus:ring-primary"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Connexion
                </button>
                <button
                  onClick={() => openAuthModal('signup')}
                  className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium 
                    bg-primary text-primary-content hover:opacity-90 focus:outline-none 
                    focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  <User className="w-4 h-4 mr-2" />
                  Inscription
                </button>
              </>
            )}
          </div>

          {/* Menu mobile */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-base-content 
                hover:bg-base-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-3 py-2 text-base font-medium ${
                  pathname === item.href
                    ? 'bg-primary/10 text-primary'
                    : 'text-base-content hover:bg-base-200 hover:text-primary'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center gap-2">
                  {item.icon && <item.icon className="w-4 h-4" />}
                  {item.name}
                </div>
              </Link>
            ))}
          </div>
          {!user && (
            <div className="pt-4 pb-3 border-t border-base-200">
              <div className="space-y-1">
                <button
                  onClick={() => {
                    setIsMenuOpen(false)
                    openAuthModal('signin')
                  }}
                  className="block w-full px-3 py-2 text-base font-medium text-left 
                    text-base-content hover:bg-base-200"
                >
                  <div className="flex items-center">
                    <LogIn className="w-5 h-5 mr-3" />
                    Connexion
                  </div>
                </button>
                <button
                  onClick={() => {
                    setIsMenuOpen(false)
                    openAuthModal('signup')
                  }}
                  className="block w-full px-3 py-2 text-base font-medium text-left 
                    text-base-content hover:bg-base-200"
                >
                  <div className="flex items-center">
                    <User className="w-5 h-5 mr-3" />
                    Inscription
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultView={authView}
      />
    </nav>
  )
}
