'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  defaultView?: 'signin' | 'signup'
}

export default function AuthModal({ isOpen, onClose, defaultView = 'signin' }: AuthModalProps) {
  const [view, setView] = useState<'signin' | 'signup'>(defaultView)

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-[calc(100%-2rem)] sm:w-[90%] max-w-lg bg-base-100 rounded-2xl shadow-xl 
              overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="relative p-6 text-center border-b border-base-200">
              <button
                onClick={onClose}
                className="absolute right-4 top-4 p-2 rounded-full hover:bg-base-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-2xl font-bold">
                {view === 'signin' ? 'Connexion' : 'Créer un compte'}
              </h2>
            </div>

            {/* Content */}
            <div className="p-6">
              <AnimatePresence mode="wait">
                {view === 'signin' ? (
                  <motion.div
                    key="signin"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <SignInForm onClose={onClose} />
                    <p className="text-center mt-6 text-sm">
                      Pas encore de compte ?{' '}
                      <button
                        onClick={() => setView('signup')}
                        className="text-primary hover:underline"
                      >
                        Créer un compte
                      </button>
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="signup"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <SignUpForm onClose={onClose} />
                    <p className="text-center mt-6 text-sm">
                      Déjà un compte ?{' '}
                      <button
                        onClick={() => setView('signin')}
                        className="text-primary hover:underline"
                      >
                        Se connecter
                      </button>
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
