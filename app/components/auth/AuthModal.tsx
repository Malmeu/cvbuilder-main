'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'
import { useState } from 'react'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  defaultView?: 'signin' | 'signup'
}

export default function AuthModal({ isOpen, onClose, defaultView = 'signin' }: AuthModalProps) {
  const [view, setView] = useState<'signin' | 'signup'>(defaultView)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50"
        onClick={onClose}
      />

      <div className="relative z-50 w-full max-w-lg px-4">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="relative p-6">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>

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
                    <span className="text-gray-500">Pas encore de compte ?</span>{' '}
                    <button
                      onClick={() => setView('signup')}
                      className="text-primary hover:underline font-medium"
                    >
                      Inscrivez-vous
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
                    Pas encore de compte ?{' '}
                    <button
                      onClick={() => setView('signin')}
                      className="text-primary hover:underline font-medium"
                    >
                      Connectez-vous
                    </button>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
