'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { 
  User, 
  Settings as SettingsIcon, 
  Bell, 
  Lock, 
  Languages, 
  CreditCard, 
  Shield 
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { motion } from 'framer-motion'

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [editMode, setEditMode] = useState({
    profile: false,
    email: false,
    password: false
  })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const supabase = createClientComponentClient()
  const { toast } = useToast()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          setUser(user)
          setFormData({
            ...formData,
            name: user.user_metadata?.name || '',
            email: user.email || ''
          })
        }
      } catch (error) {
        console.error('Erreur de récupération de l\'utilisateur', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  const handleUpdateProfile = async () => {
    if (!user) return

    try {
      const { error } = await supabase.auth.updateUser({
        data: { name: formData.name }
      })

      if (error) throw error

      toast({
        title: 'Profil mis à jour',
        description: 'Vos informations ont été mises à jour avec succès',
      })
      setEditMode({ ...editMode, profile: false })
    } catch (error: any) {
      toast({
        title: 'Erreur',
        description: error.message,
        variant: 'destructive'
      })
    }
  }

  const handleUpdateEmail = async () => {
    try {
      const { error } = await supabase.auth.updateUser({
        email: formData.email
      })

      if (error) throw error

      toast({
        title: 'Email mis à jour',
        description: 'Un email de confirmation vous a été envoyé',
      })
      setEditMode({ ...editMode, email: false })
    } catch (error: any) {
      toast({
        title: 'Erreur',
        description: error.message,
        variant: 'destructive'
      })
    }
  }

  const handleUpdatePassword = async () => {
    if (formData.newPassword !== formData.confirmPassword) {
      toast({
        title: 'Erreur',
        description: 'Les mots de passe ne correspondent pas',
        variant: 'destructive'
      })
      return
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: formData.newPassword
      })

      if (error) throw error

      toast({
        title: 'Mot de passe mis à jour',
        description: 'Votre mot de passe a été changé avec succès',
      })
      setEditMode({ ...editMode, password: false })
      setFormData({
        ...formData,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      })
    } catch (error: any) {
      toast({
        title: 'Erreur',
        description: error.message,
        variant: 'destructive'
      })
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[500px]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold flex items-center">
          <SettingsIcon className="w-8 h-8 mr-3 text-primary" />
          Paramètres du compte
        </h1>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="grid md:grid-cols-2 gap-6"
      >
        {/* Profil */}
        <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold flex items-center">
              <User className="w-6 h-6 mr-2 text-primary" />
              Informations personnelles
            </h2>
            <button 
              onClick={() => setEditMode({ ...editMode, profile: !editMode.profile })}
              className="text-sm text-primary hover:underline"
            >
              {editMode.profile ? 'Annuler' : 'Modifier'}
            </button>
          </div>

          {editMode.profile ? (
            <div className="space-y-4">
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Votre nom"
                className="w-full px-3 py-2 border rounded-lg"
              />
              <button 
                onClick={handleUpdateProfile}
                className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90"
              >
                Enregistrer
              </button>
            </div>
          ) : (
            <div>
              <p className="text-gray-600">{formData.name || 'Non renseigné'}</p>
              <p className="text-sm text-gray-500">{formData.email}</p>
            </div>
          )}
        </div>

        {/* Email */}
        <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold flex items-center">
              <Bell className="w-6 h-6 mr-2 text-primary" />
              Paramètres de communication
            </h2>
            <button 
              onClick={() => setEditMode({ ...editMode, email: !editMode.email })}
              className="text-sm text-primary hover:underline"
            >
              {editMode.email ? 'Annuler' : 'Modifier'}
            </button>
          </div>

          {editMode.email ? (
            <div className="space-y-4">
              <input 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Nouvel email"
                className="w-full px-3 py-2 border rounded-lg"
              />
              <button 
                onClick={handleUpdateEmail}
                className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90"
              >
                Mettre à jour
              </button>
            </div>
          ) : (
            <div>
              <p className="text-gray-600">Notifications par email</p>
              <p className="text-sm text-gray-500">Activées</p>
            </div>
          )}
        </div>

        {/* Sécurité */}
        <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold flex items-center">
              <Lock className="w-6 h-6 mr-2 text-primary" />
              Sécurité
            </h2>
            <button 
              onClick={() => setEditMode({ ...editMode, password: !editMode.password })}
              className="text-sm text-primary hover:underline"
            >
              {editMode.password ? 'Annuler' : 'Modifier'}
            </button>
          </div>

          {editMode.password ? (
            <div className="space-y-4">
              <input 
                type="password" 
                value={formData.newPassword}
                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                placeholder="Nouveau mot de passe"
                className="w-full px-3 py-2 border rounded-lg"
              />
              <input 
                type="password" 
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder="Confirmer le mot de passe"
                className="w-full px-3 py-2 border rounded-lg"
              />
              <button 
                onClick={handleUpdatePassword}
                className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90"
              >
                Changer le mot de passe
              </button>
            </div>
          ) : (
            <div>
              <p className="text-gray-600">Dernière modification</p>
              <p className="text-sm text-gray-500">Il y a moins de 30 jours</p>
            </div>
          )}
        </div>

        {/* Préférences */}
        <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
          <h2 className="text-xl font-semibold flex items-center">
            <Languages className="w-6 h-6 mr-2 text-primary" />
            Préférences
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>Langue</span>
              <select className="px-3 py-1 border rounded-lg">
                <option>Français</option>
                <option>English</option>
              </select>
            </div>
            <div className="flex justify-between items-center">
              <span>Thème</span>
              <select className="px-3 py-1 border rounded-lg">
                <option>Clair</option>
                <option>Sombre</option>
              </select>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Danger Zone */}
      <div className="bg-red-50 rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-semibold flex items-center text-red-600">
          <Shield className="w-6 h-6 mr-2" />
          Zone de danger
        </h2>
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium">Supprimer le compte</p>
            <p className="text-sm text-red-600">Cette action est irréversible</p>
          </div>
          <button 
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Supprimer mon compte
          </button>
        </div>
      </div>
    </div>
  )
}
