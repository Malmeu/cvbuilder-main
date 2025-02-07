'use client'

import { useState } from 'react'
import { Save } from 'lucide-react'

interface CVBuilderProps {
  onSave: (data: any) => Promise<void>
  saving: boolean
  initialData?: any
}

export default function CVBuilder({ onSave, saving, initialData }: CVBuilderProps) {
  const [cvData, setCvData] = useState(initialData || {
    title: '',
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
    },
    sections: []
  })

  const handleSaveClick = async () => {
    await onSave(cvData)
  }

  return (
    <div className="relative">
      {/* Bouton de sauvegarde fixe */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={handleSaveClick}
          disabled={saving}
          className="inline-flex items-center px-6 py-3 rounded-xl text-base font-medium 
            bg-primary text-primary-content hover:bg-primary/90 transition-colors
            disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        >
          <Save className="w-5 h-5 mr-2" />
          {saving ? 'Sauvegarde...' : 'Sauvegarder'}
        </button>
      </div>

      {/* Contenu du CV */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Titre du CV */}
          <div className="bg-base-100 rounded-xl p-6 shadow-sm">
            <h1 className="text-3xl font-bold mb-6">Créer votre CV</h1>
            <label className="block text-sm font-medium mb-2">
              Titre du CV
            </label>
            <input
              type="text"
              value={cvData.title}
              onChange={(e) => setCvData({ ...cvData, title: e.target.value })}
              placeholder="Ex: CV Développeur Web"
              className="w-full px-4 py-2 rounded-lg border border-base-300 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Informations personnelles */}
          <div className="bg-base-100 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Informations personnelles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Prénom
                </label>
                <input
                  type="text"
                  value={cvData.personalInfo.firstName}
                  onChange={(e) => setCvData({
                    ...cvData,
                    personalInfo: {
                      ...cvData.personalInfo,
                      firstName: e.target.value
                    }
                  })}
                  className="w-full px-4 py-2 rounded-lg border border-base-300 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Nom
                </label>
                <input
                  type="text"
                  value={cvData.personalInfo.lastName}
                  onChange={(e) => setCvData({
                    ...cvData,
                    personalInfo: {
                      ...cvData.personalInfo,
                      lastName: e.target.value
                    }
                  })}
                  className="w-full px-4 py-2 rounded-lg border border-base-300 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={cvData.personalInfo.email}
                  onChange={(e) => setCvData({
                    ...cvData,
                    personalInfo: {
                      ...cvData.personalInfo,
                      email: e.target.value
                    }
                  })}
                  className="w-full px-4 py-2 rounded-lg border border-base-300 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Téléphone
                </label>
                <input
                  type="tel"
                  value={cvData.personalInfo.phone}
                  onChange={(e) => setCvData({
                    ...cvData,
                    personalInfo: {
                      ...cvData.personalInfo,
                      phone: e.target.value
                    }
                  })}
                  className="w-full px-4 py-2 rounded-lg border border-base-300 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">
                  Adresse
                </label>
                <input
                  type="text"
                  value={cvData.personalInfo.address}
                  onChange={(e) => setCvData({
                    ...cvData,
                    personalInfo: {
                      ...cvData.personalInfo,
                      address: e.target.value
                    }
                  })}
                  className="w-full px-4 py-2 rounded-lg border border-base-300 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
