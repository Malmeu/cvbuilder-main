'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { Mail, Lock } from 'lucide-react'
import { useToast } from '../../hooks/useToast'

interface SignInFormProps {
  onClose?: () => void
}

export default function SignInForm({ onClose }: SignInFormProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClientComponentClient()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      toast({
        title: 'Connexion réussie',
        description: 'Vous êtes maintenant connecté',
      })

      router.push('/dashboard')
      router.refresh()
      onClose?.()
    } catch (err: any) {
      toast({
        title: 'Erreur',
        description: err.message || 'Une erreur est survenue',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/50" />
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-base-content/10 bg-base-200/50 
              focus:outline-none focus:ring-2 focus:ring-primary/50"
            placeholder="votre@email.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium mb-2">
          Mot de passe
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/50" />
          <input
            id="password"
            name="password"
            type="password"
            required
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-base-content/10 bg-base-200/50 
              focus:outline-none focus:ring-2 focus:ring-primary/50"
            placeholder="Votre mot de passe"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 px-4 rounded-xl bg-primary text-primary-content font-medium
          hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Connexion...' : 'Se connecter'}
      </button>
    </form>
  )
}
