'use client'

import { CanadianEducation } from '@/app/types/canadian-cv'
import { useState } from 'react'
import { Plus, X, GripVertical } from 'lucide-react'

interface Props {
  education: CanadianEducation[]
  onChange: (education: CanadianEducation[]) => void
  language: 'fr' | 'en'
}

const emptyEducation: CanadianEducation = {
  diploma: '',
  institution: '',
  address: '',
  startYear: '',
  endYear: '',
  equivalence: ''
}

export default function EducationForm({ education, onChange, language }: Props) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)

  const labels = {
    fr: {
      title: 'Formation',
      diploma: 'Diplôme',
      institution: 'Institution',
      address: 'Adresse',
      startYear: 'Année de début',
      endYear: 'Année de fin',
      equivalence: 'Équivalence (optionnel)',
      addEducation: 'Ajouter une formation',
      dragToReorder: 'Glisser pour réorganiser',
      equivalencePlaceholder: 'Ex: Équivalent Bac+5'
    },
    en: {
      title: 'Education',
      diploma: 'Degree',
      institution: 'Institution',
      address: 'Address',
      startYear: 'Start Year',
      endYear: 'End Year',
      equivalence: 'Equivalence (optional)',
      addEducation: 'Add Education',
      dragToReorder: 'Drag to reorder',
      equivalencePlaceholder: 'Ex: Equivalent to Master\'s Degree'
    }
  }

  const text = labels[language]

  const handleAddEducation = () => {
    onChange([...education, { ...emptyEducation }])
  }

  const handleRemoveEducation = (index: number) => {
    onChange(education.filter((_, i) => i !== index))
  }

  const handleEducationChange = (index: number, field: keyof CanadianEducation, value: string) => {
    const newEducation = [...education]
    newEducation[index] = {
      ...newEducation[index],
      [field]: value
    }
    onChange(newEducation)
  }

  const handleDragStart = (index: number) => {
    setDraggedIndex(index)
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    if (draggedIndex === null || draggedIndex === index) return

    const newEducation = [...education]
    const draggedEducation = newEducation[draggedIndex]
    newEducation.splice(draggedIndex, 1)
    newEducation.splice(index, 0, draggedEducation)
    onChange(newEducation)
    setDraggedIndex(index)
  }

  return (
    <div className="space-y-6">
      {education.map((edu, index) => (
        <div
          key={index}
          className="card bg-base-200 shadow-sm"
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragOver={(e) => handleDragOver(e, index)}
        >
          <div className="card-body">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <GripVertical className="w-4 h-4 cursor-move text-base-content/50" />
                <h3 className="card-title text-base">
                  {edu.diploma || text.title} #{index + 1}
                </h3>
              </div>
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => handleRemoveEducation(index)}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">{text.diploma}</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={edu.diploma}
                  onChange={(e) => handleEducationChange(index, 'diploma', e.target.value)}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">{text.institution}</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={edu.institution}
                  onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                />
              </div>

              <div className="form-control md:col-span-2">
                <label className="label">
                  <span className="label-text">{text.address}</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={edu.address}
                  onChange={(e) => handleEducationChange(index, 'address', e.target.value)}
                  placeholder={language === 'fr' ? 'Ex: Montréal, Canada' : 'Ex: Montreal, Canada'}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">{text.startYear}</span>
                </label>
                <input
                  type="number"
                  min="1900"
                  max="2100"
                  className="input input-bordered"
                  value={edu.startYear}
                  onChange={(e) => handleEducationChange(index, 'startYear', e.target.value)}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">{text.endYear}</span>
                </label>
                <input
                  type="number"
                  min="1900"
                  max="2100"
                  className="input input-bordered"
                  value={edu.endYear}
                  onChange={(e) => handleEducationChange(index, 'endYear', e.target.value)}
                />
              </div>

              <div className="form-control md:col-span-2">
                <label className="label">
                  <span className="label-text">{text.equivalence}</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={edu.equivalence || ''}
                  onChange={(e) => handleEducationChange(index, 'equivalence', e.target.value)}
                  placeholder={text.equivalencePlaceholder}
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        className="btn btn-outline gap-2 w-full"
        onClick={handleAddEducation}
      >
        <Plus className="w-4 h-4" />
        {text.addEducation}
      </button>
    </div>
  )
}
