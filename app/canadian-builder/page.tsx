'use client'

import { useState, useEffect, useRef } from 'react'
import { CanadianCV } from '../types/canadian-cv'
import { FileText, Languages, Eye, Home } from 'lucide-react'
import Link from 'next/link'
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
    address: 'Montréal, Québec',
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
  const cvPreviewRef = useRef<HTMLDivElement>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const handleResize = () => {
      // Garde la fonction handleResize pour de futures utilisations si nécessaire
    }
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
    <div className="container mx-auto px-2 sm:px-4 space-y-6">
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          {cv.language === 'fr' ? '' : ''}
        </h1>
        
        {/* Navigation et contrôles */}
        <div className="flex flex-col space-y-3 sm:space-y-4 md:flex-row md:justify-between md:items-center pt-2">
          <button
            className="btn btn-ghost gap-2 hover:bg-base-200/50 w-full md:w-auto"
            onClick={() => setCV(prev => ({
              ...prev,
              language: prev.language === 'fr' ? 'en' : 'fr'
            }))}
          >
            <Languages className="w-4 h-4" />
            {cv.language === 'fr' ? 'English' : 'Français'}
          </button>

          <div className="flex flex-col sm:flex-row flex-wrap items-center gap-2">
            <select 
              className="select select-bordered w-full sm:w-auto"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            >
              {themes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>

            <div className="flex gap-2 w-full sm:w-auto">
              <button
                onClick={() => {
                  const modal = document.getElementById('preview_modal') as HTMLDialogElement
                  modal?.showModal()
                }}
                className="btn btn-primary gap-2 flex-1 sm:flex-initial"
              >
                <Eye className="w-4 h-4" />
                {cv.language === 'fr' ? 'Prévisualiser' : 'Preview'}
              </button>

              <button
                onClick={handleDownloadPdf}
                disabled={isGenerating}
                className="btn btn-primary gap-2 flex-1 sm:flex-initial"
              >
                <FileText className="w-4 h-4" />
                {cv.language === 'fr' ? 'Télécharger PDF' : 'Download PDF'}
              </button>

              <Link 
                href="/"
                className="btn btn-ghost gap-2 flex-1 sm:flex-initial"
              >
                <Home className="w-4 h-4" />
                {cv.language === 'fr' ? 'Accueil' : 'Home'}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[350px_1fr] gap-4 sm:gap-8">
        <div className="space-y-6 order-2 lg:order-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {cv.language === 'fr' ? 'Informations' : 'Information'}
            </h2>
          </div>

          {/* Tabs avec effet de verre */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2 -mx-2 px-2 sm:-mx-4 sm:px-4 md:mx-0 md:px-0 scrollbar-none">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  px-4 py-2 rounded-full transition-all whitespace-nowrap
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

        {/* Prévisualisation uniquement sur desktop */}
        <div className="hidden lg:block relative order-1 lg:order-2">
          <div className="lg:sticky lg:top-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {cv.language === 'fr' ? 'Prévisualisation' : 'Preview'}
              </h2>
            </div>
            <div 
              ref={cvPreviewRef}
              data-cv-preview 
              data-theme={theme}
              className="bg-base-100 w-full lg:w-[210mm] mx-auto overflow-x-auto"
            >
              <CVPreview cv={cv} theme={theme} />
            </div>
          </div>
        </div>
      </div>

      <dialog id="preview_modal" className="modal">
        <div className="modal-box w-[95%] max-w-5xl max-h-[90vh] p-2 sm:p-6">
          <h3 className="font-bold text-lg mb-4">
            {cv.language === 'fr' ? 'Prévisualisation de votre CV' : 'Preview your Resume'}
          </h3>
          <div 
            className="bg-base-100 w-full overflow-x-auto max-h-[calc(90vh-12rem)] overflow-y-auto"
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
                {cv.language === 'fr' ? 'Télécharger PDF' : 'Download PDF'}
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  )
}
