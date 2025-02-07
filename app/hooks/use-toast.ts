'use client'

import { useState } from 'react'

interface Toast {
  id: string
  title: string
  description?: string
  variant?: 'default' | 'destructive'
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = ({
    title,
    description,
    variant = 'default',
  }: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).slice(2)
    const newToast = { id, title, description, variant }
    
    setToasts((currentToasts) => [...currentToasts, newToast])
    
    // Retirer le toast après 3 secondes
    setTimeout(() => {
      setToasts((currentToasts) =>
        currentToasts.filter((toast) => toast.id !== id)
      )
    }, 3000)
  }

  return { toast, toasts }
}
