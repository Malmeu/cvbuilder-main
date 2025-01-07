'use client'

import { useState, useEffect, useRef } from 'react'
import { CanadianCV } from '../types/canadian-cv'
import { FileText, Save, Languages, Eye } from 'lucide-react'
import PersonalDetailsForm from '../components/canadian/PersonalDetailsForm'
import ExperienceForm from '../components/canadian/ExperienceForm'
import EducationForm from '../components/canadian/EducationForm'
import SkillsForm from '../components/canadian/SkillsForm'
import CVPreview from '../components/canadian/CVPreview'
import html2canvas from 'html2canvas-pro'
import jsPDF from 'jspdf'
import confetti from 'canvas-confetti'

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

const tabs = [
  { id: 'personal', labelFr: 'Informations', labelEn: 'Information' },
  { id: 'experience', labelFr: 'Expérience', labelEn: 'Experience' },
  { id: 'education', labelFr: 'Formation', labelEn: 'Education' },
  { id: 'skills', labelFr: 'Compétences', labelEn: 'Skills' },
]

const themes = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
]

export default function CanadianBuilder() {
  const [cv, setCV] = useState<CanadianCV>(defaultCV)
  const [activeTab, setActiveTab] = useState('personal')
  const [windowWidth, setWindowWidth] = useState(0)
  const cvPreviewRef = useRef<HTMLDivElement>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    setWindowWidth(window.innerWidth)
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleDownloadPdf = async () => {
    const element = cvPreviewRef.current
    if(element && !isGenerating){
      setIsGenerating(true)
      try {
        // Créer un conteneur temporaire avec le thème appliqué
        const container = document.createElement('div')
        container.setAttribute('data-theme', theme)
        container.style.width = '210mm'
        container.style.margin = '0'
        container.style.background = 'white'
        
        // Cloner l'élément du CV
        const clone = element.cloneNode(true) as HTMLElement
        container.appendChild(clone)
        document.body.appendChild(container)

        const canvas = await html2canvas(container, {
          scale: 3,
          useCORS: true,
          allowTaint: true,
          backgroundColor: null,
          onclone: (clonedDoc) => {
            const clonedElement = clonedDoc.querySelector('[data-cv-preview]') as HTMLElement
            if (clonedElement) {
              // Appliquer les styles calculés
              const computedStyle = window.getComputedStyle(element)
              clonedElement.style.cssText = computedStyle.cssText
            }
          }
        })

        // Nettoyer le conteneur temporaire
        document.body.removeChild(container)

        const imgData = canvas.toDataURL('image/png')

        const pdf = new jsPDF({
          orientation: "portrait",
          unit: 'mm',
          format: "a4",
          compress: true
        })
        
        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width 

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST')
        pdf.save(`CV_${cv.personalDetails.firstName}_${cv.personalDetails.lastName}.pdf`)

        const modal = document.getElementById('preview_modal') as HTMLDialogElement
        if(modal){
          modal.close()
        }

        confetti({
          particleCount: 100,
          spread: 70,
          origin: {y: 0.6},
          zIndex: 9999
        })

      } catch (error) {
        console.error('Erreur lors de la génération du PDF:', error)
      } finally {
        setIsGenerating(false)
      }
    }
  }

  return (
    <main className="min-h-screen pt-16 bg-gradient-to-b from-base-100 via-base-200 to-base-100">
      {/* Header avec effet de verre */}
      <div className="sticky top-0 z-40 bg-base-100/80 backdrop-blur-lg border-b border-base-200 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-2xl font-bold text-primary">
              {cv.language === 'fr' ? 'CV Canadien' : 'Canadian Resume'}
            </h1>
            
            <div className="flex items-center gap-4">
              <button
                className="btn btn-ghost btn-sm gap-2 hover:bg-base-200/50"
                onClick={() => setCV(prev => ({
                  ...prev,
                  language: prev.language === 'fr' ? 'en' : 'fr'
                }))}
              >
                <Languages className="w-4 h-4" />
                {cv.language === 'fr' ? 'EN' : 'FR'}
              </button>

              <button
                className="px-6 py-2 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-all inline-flex items-center gap-2"
                onClick={() => {
                  // TODO: Ajouter la fonction de sauvegarde
                }}
              >
                <Save className="w-4 h-4" />
                {cv.language === 'fr' ? 'Sauvegarder' : 'Save'}
              </button>
            </div>
          </div>

          {/* Tabs avec effet de verre */}
          <div className="flex gap-2 mt-6 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  px-4 py-2 rounded-full transition-all
                  ${activeTab === tab.id 
                    ? 'bg-primary text-primary-content shadow-lg' 
                    : 'hover:bg-base-200/50'
                  }
                `}
              >
                {cv.language === 'fr' ? tab.labelFr : tab.labelEn}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8">
          {/* Formulaire */}
          <div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-secondary/5 rounded-3xl" />
              <div className="relative bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 overflow-hidden">
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
          </div>

          {/* Prévisualisation */}
          <div className={`${windowWidth < 1024 ? 'hidden' : 'w-[800px]'}`}>
            <div className="sticky top-32">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-secondary/5 rounded-3xl" />
                <div className="relative bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 p-4 overflow-hidden">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {cv.language === 'fr' ? 'Prévisualisation' : 'Preview'}
                    </h2>
                    <div className="flex gap-4 items-center">
                      <select 
                        className="select select-bordered select-sm" 
                        value={theme}
                        onChange={(e) => setTheme(e.target.value)}
                      >
                        {themes.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                      <button
                        className="px-4 py-2 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-all inline-flex items-center gap-2"
                        onClick={() => (document.getElementById('preview_modal') as HTMLDialogElement).showModal()}
                      >
                        <Eye className="w-4 h-4" />
                        {cv.language === 'fr' ? 'Prévisualiser' : 'Preview'}
                      </button>
                    </div>
                  </div>
                  <div 
                    ref={cvPreviewRef}
                    data-cv-preview 
                    data-theme={theme}
                    className="bg-base-100 w-[210mm] mx-auto"
                  >
                    <CVPreview cv={cv} theme={theme} />
                  </div>

                  <dialog id="preview_modal" className="modal">
                    <div className="modal-box w-11/12 max-w-5xl">
                      <h3 className="font-bold text-lg mb-4">
                        {cv.language === 'fr' ? 'Prévisualisation de votre CV' : 'Preview your Resume'}
                      </h3>
                      <div 
                        className="bg-base-100 w-[210mm] mx-auto"
                        data-theme={theme}
                      >
                        <CVPreview cv={cv} theme={theme} />
                      </div>
                      <div className="modal-action">
                        <form method="dialog" className="flex gap-2">
                          <button className="btn">
                            {cv.language === 'fr' ? 'Fermer' : 'Close'}
                          </button>
                          <button 
                            className="btn btn-primary" 
                            onClick={handleDownloadPdf}
                            disabled={isGenerating}
                          >
                            <FileText className="w-4 h-4" />
                            {isGenerating 
                              ? (cv.language === 'fr' ? 'Génération...' : 'Generating...') 
                              : (cv.language === 'fr' ? 'Télécharger PDF' : 'Download PDF')
                            }
                          </button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
