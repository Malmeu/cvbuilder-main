'use client'

import { CanadianExperience } from '@/app/types/canadian-cv'
import { useState } from 'react'
import { Plus, X, GripVertical } from 'lucide-react'
import { provinces } from '@/app/data/canadian-provinces'

interface Props {
  experiences: CanadianExperience[]
  onChange: (experiences: CanadianExperience[]) => void
  language: 'fr' | 'en'
}

const emptyExperience: CanadianExperience = {
  position: '',
  company: '',
  address: '',
  startDate: '',
  endDate: '',
  current: false,
  achievements: ['']
}

export default function ExperienceForm({ experiences, onChange, language }: Props) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)

  const labels = {
    fr: {
      position: 'Poste',
      company: 'Entreprise',
      address: 'Adresse',
      startDate: 'Date de début',
      endDate: 'Date de fin',
      current: 'Poste actuel',
      achievements: 'Réalisations',
      addAchievement: 'Ajouter une réalisation',
      addExperience: 'Ajouter une expérience',
      dragToReorder: 'Glisser pour réorganiser'
    },
    en: {
      position: 'Position',
      company: 'Company',
      address: 'Address',
      startDate: 'Start Date',
      endDate: 'End Date',
      current: 'Current Position',
      achievements: 'Achievements',
      addAchievement: 'Add Achievement',
      addExperience: 'Add Experience',
      dragToReorder: 'Drag to reorder'
    }
  }

  const text = labels[language]

  const handleAddExperience = () => {
    onChange([...experiences, { ...emptyExperience }])
  }

  const handleRemoveExperience = (index: number) => {
    onChange(experiences.filter((_, i) => i !== index))
  }

  const handleExperienceChange = (index: number, field: keyof CanadianExperience, value: string | boolean) => {
    const newExperiences = [...experiences]
    newExperiences[index] = {
      ...newExperiences[index],
      [field]: value
    }
    onChange(newExperiences)
  }

  const handleAddAchievement = (experienceIndex: number) => {
    const newExperiences = [...experiences]
    newExperiences[experienceIndex].achievements.push('')
    onChange(newExperiences)
  }

  const handleRemoveAchievement = (experienceIndex: number, achievementIndex: number) => {
    const newExperiences = [...experiences]
    newExperiences[experienceIndex].achievements = 
      newExperiences[experienceIndex].achievements.filter((_, i) => i !== achievementIndex)
    onChange(newExperiences)
  }

  const handleAchievementChange = (experienceIndex: number, achievementIndex: number, value: string) => {
    const newExperiences = [...experiences]
    newExperiences[experienceIndex].achievements[achievementIndex] = value
    onChange(newExperiences)
  }

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    setDraggedIndex(index)
    e.dataTransfer.effectAllowed = 'move'
    e.currentTarget.classList.add('opacity-50')
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    
    if (draggedIndex === null || draggedIndex === index) return

    const items = [...experiences]
    const draggedItem = items[draggedIndex]
    items.splice(draggedIndex, 1)
    items.splice(index, 0, draggedItem)
    onChange(items)
    setDraggedIndex(index)
  }

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove('opacity-50')
    setDraggedIndex(null)
  }

  return (
    <div className="space-y-6">
      {experiences.map((experience, index) => (
        <div
          key={index}
          className="card bg-base-200 shadow-sm transition-opacity duration-200"
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDragEnd={handleDragEnd}
        >
          <div className="card-body">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <GripVertical className="w-4 h-4 cursor-move text-base-content/50" />
                <h3 className="card-title text-base">
                  {experience.position || text.position} #{index + 1}
                </h3>
              </div>
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => handleRemoveExperience(index)}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4 md:gap-8">
              <div className="space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">{text.position}</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full md:w-[120%]"
                    value={experience.position}
                    onChange={(e) => handleExperienceChange(index, 'position', e.target.value)}
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">{text.company}</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full md:w-[120%]"
                    value={experience.company}
                    onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">{text.address}</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full md:w-[120%]"
                    value={experience.address}
                    onChange={(e) => handleExperienceChange(index, 'address', e.target.value)}
                    placeholder={language === 'fr' ? 'Ex: Montréal, Canada' : 'Ex: Montreal, Canada'}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">{text.startDate}</span>
                  </label>
                  <input
                    type="month"
                    className="input input-bordered w-full md:w-[120%]"
                    value={experience.startDate}
                    onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">{text.endDate}</span>
                  </label>
                  <div className="flex flex-col gap-2">
                    <input
                      type="month"
                      className="input input-bordered w-full md:w-[120%]"
                      value={experience.endDate}
                      onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
                      disabled={experience.current}
                    />
                    <label className="label cursor-pointer justify-start gap-2">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-primary"
                        checked={experience.current}
                        onChange={(e) => handleExperienceChange(index, 'current', e.target.checked)}
                      />
                      <span className="label-text">{text.current}</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">{text.achievements}</span>
              </label>
              <div className="space-y-2">
                {experience.achievements.map((achievement, achievementIndex) => (
                  <div key={achievementIndex} className="flex gap-2">
                    <input
                      type="text"
                      className="input input-bordered flex-1"
                      value={achievement}
                      onChange={(e) => handleAchievementChange(index, achievementIndex, e.target.value)}
                      placeholder={`${text.achievements} ${achievementIndex + 1}`}
                    />
                    {experience.achievements.length > 1 && (
                      <button
                        className="btn btn-ghost btn-sm"
                        onClick={() => handleRemoveAchievement(index, achievementIndex)}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  className="btn btn-ghost btn-sm gap-2"
                  onClick={() => handleAddAchievement(index)}
                >
                  <Plus className="w-4 h-4" />
                  {text.addAchievement}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        className="btn btn-outline gap-2 w-full"
        onClick={handleAddExperience}
      >
        <Plus className="w-4 h-4" />
        {text.addExperience}
      </button>
    </div>
  )
}
