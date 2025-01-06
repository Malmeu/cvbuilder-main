'use client'

import { useState, useEffect } from 'react'
import { CanadianCV } from '../types/canadian-cv'
import { Eye, Save, Languages, FileText } from 'lucide-react'
import AdBanner from '../components/AdBanner'
import PersonalDetailsForm from '../components/canadian/PersonalDetailsForm'
import ExperienceForm from '../components/canadian/ExperienceForm'
import EducationForm from '../components/canadian/EducationForm'
import SkillsForm from '../components/canadian/SkillsForm'
import CVPreview from '../components/canadian/CVPreview'

const defaultCV: CanadianCV = {
  personalDetails: {
    firstName: '',
    lastName: '',
    currentPosition: '',
    email: '',
    phone: '',
    city: 'Montréal',
    province: 'Québec',
    linkedIn: '',
    summary: ''
  },
  experiences: [],
  education: [],
  skills: [
    {
      category: 'Langues',
      skills: ['Français', 'Anglais']
    }
  ],
  interests: [],
  references: {
    available: true,
    text: 'Références disponibles sur demande'
  },
  language: 'fr'
}

export default function CanadianBuilder() {
  const [cv, setCV] = useState<CanadianCV>(defaultCV)
  const [activeTab, setActiveTab] = useState('personal')
  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    setWindowWidth(window.innerWidth)
    window.addEventListener('resize', () => setWindowWidth(window.innerWidth))
    return () => window.removeEventListener('resize', () => setWindowWidth(window.innerWidth))
  }, [])

  const handleLanguageToggle = () => {
    setCV(prev => ({
      ...prev,
      language: prev.language === 'fr' ? 'en' : 'fr'
    }))
  }

  return (
    <div className="min-h-screen bg-base-200 pt-16">
      {/* Header avec options */}
      <div className="bg-base-100 shadow-lg py-4 px-6 fixed top-16 w-full z-40">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">
            {cv.language === 'fr' ? 'CV Canadien' : 'Canadian Resume'}
          </h1>
          <div className="flex gap-4">
            <button
              onClick={handleLanguageToggle}
              className="btn btn-outline gap-2"
            >
              <Languages className="w-4 h-4" />
              {cv.language === 'fr' ? 'English' : 'Français'}
            </button>
            <button className="btn btn-primary gap-2">
              <Save className="w-4 h-4" />
              {cv.language === 'fr' ? 'Enregistrer PDF' : 'Save PDF'}
            </button>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulaires */}
          <div className="space-y-6">
            <div className="tabs tabs-boxed">
              <button 
                className={`tab ${activeTab === 'personal' ? 'tab-active' : ''}`}
                onClick={() => setActiveTab('personal')}
              >
                {cv.language === 'fr' ? 'Informations' : 'Information'}
              </button>
              <button 
                className={`tab ${activeTab === 'experience' ? 'tab-active' : ''}`}
                onClick={() => setActiveTab('experience')}
              >
                {cv.language === 'fr' ? 'Expérience' : 'Experience'}
              </button>
              <button 
                className={`tab ${activeTab === 'education' ? 'tab-active' : ''}`}
                onClick={() => setActiveTab('education')}
              >
                {cv.language === 'fr' ? 'Formation' : 'Education'}
              </button>
              <button 
                className={`tab ${activeTab === 'skills' ? 'tab-active' : ''}`}
                onClick={() => setActiveTab('skills')}
              >
                {cv.language === 'fr' ? 'Compétences' : 'Skills'}
              </button>
            </div>

            <div className="bg-base-100 rounded-lg p-6 shadow-lg">
              {activeTab === 'personal' && (
                <PersonalDetailsForm
                  data={cv.personalDetails}
                  onChange={(data) => setCV({ ...cv, personalDetails: data })}
                  language={cv.language}
                />
              )}
              {activeTab === 'experience' && (
                <ExperienceForm
                  experiences={cv.experiences}
                  onChange={(experiences) => setCV({ ...cv, experiences })}
                  language={cv.language}
                />
              )}
              {activeTab === 'education' && (
                <EducationForm
                  education={cv.education}
                  onChange={(education) => setCV({ ...cv, education })}
                  language={cv.language}
                />
              )}
              {activeTab === 'skills' && (
                <SkillsForm
                  skills={cv.skills}
                  onChange={(skills) => setCV({ ...cv, skills })}
                  language={cv.language}
                />
              )}
            </div>
          </div>

          {/* Prévisualisation */}
          <div className={`${windowWidth < 1024 ? 'hidden' : 'flex-1'}`}>
            <div className="sticky top-24">
              <div className="bg-base-200 rounded-lg p-4 overflow-auto max-h-[calc(100vh-8rem)]">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">
                    {cv.language === 'fr' ? 'Prévisualisation' : 'Preview'}
                  </h2>
                  <button
                    className="btn btn-primary btn-sm gap-2"
                    onClick={() => {
                      // TODO: Ajouter la fonction d'export PDF
                    }}
                  >
                    <FileText className="w-4 h-4" />
                    {cv.language === 'fr' ? 'Exporter PDF' : 'Export PDF'}
                  </button>
                </div>
                <div className="overflow-auto bg-white rounded-lg">
                  <CVPreview cv={cv} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bannière publicitaire */}
        <div className="my-8">
          <AdBanner slot="canadian-builder" format="horizontal" />
        </div>
      </div>
    </div>
  )
}
