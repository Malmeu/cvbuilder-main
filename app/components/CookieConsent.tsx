'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

type Language = 'fr' | 'en'

interface CookieConsentProps {
  language?: Language
}

interface Translations {
  fr: {
    message: string
    accept: string
    more: string
  }
  en: {
    message: string
    accept: string
    more: string
  }
}

export default function CookieConsent({ language = 'fr' }: CookieConsentProps) {
  const [accepted, setAccepted] = useState(true)

  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookieConsent')
    if (cookieConsent === null) {
      setAccepted(false)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true')
    setAccepted(true)
  }

  const text: Translations = {
    fr: {
      message: '🍪 Hey ! On adore les cookies ici (pas ceux qu\'on mange, malheureusement). On en utilise quelques-uns pour rendre votre expérience plus savoureuse !',
      accept: 'Miam, j\'accepte !',
      more: 'En savoir plus',
    },
    en: {
      message: '🍪 Hey there! We love cookies here (not the edible ones, sadly). We use them to make your experience more delicious!',
      accept: 'Yum, I accept!',
      more: 'Learn more',
    }
  }

  if (accepted) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-base-200 p-4 shadow-lg z-50">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-center sm:text-left">
          {text[language].message}
        </p>
        <div className="flex items-center gap-4">
          <button
            onClick={handleAccept}
            className="btn btn-primary btn-sm"
          >
            {text[language].accept}
          </button>
          <button
            onClick={() => setAccepted(true)}
            className="btn btn-ghost btn-sm btn-square"
            aria-label="Fermer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
