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
  city: '',
  province: '',
  startDate: '',
  endDate: '',
  current: false,
  achievements: ['']
}

export default function ExperienceForm({ experiences, onChange, language }: Props) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)

  const labels = {
    fr: {
      title: 'Expérience professionnelle',
      position: 'Poste',
      company: 'Entreprise',
      city: 'Ville',
      province: 'Province',
      startDate: 'Date de début',
      endDate: 'Date de fin',
      current: 'Poste actuel',
      achievements: 'Réalisations',
      addExperience: 'Ajouter une expérience',
      addAchievement: 'Ajouter une réalisation',
      dragToReorder: 'Glisser pour réorganiser'
    },
    en: {
      title: 'Professional Experience',
      position: 'Position',
      company: 'Company',
      city: 'City',
      province: 'Province',
      startDate: 'Start Date',
      endDate: 'End Date',
      current: 'Current Position',
      achievements: 'Achievements',
      addExperience: 'Add Experience',
      addAchievement: 'Add Achievement',
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

  const handleExperienceChange = (index: number, field: keyof CanadianExperience, value: any) => {
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

  const handleDragStart = (index: number) => {
    setDraggedIndex(index)
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    if (draggedIndex === null || draggedIndex === index) return

    const newExperiences = [...experiences]
    const draggedExperience = newExperiences[draggedIndex]
    newExperiences.splice(draggedIndex, 1)
    newExperiences.splice(index, 0, draggedExperience)
    onChange(newExperiences)
    setDraggedIndex(index)
  }

  return (
    <div className="space-y-6">
      {experiences.map((experience, index) => (
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
                  {experience.position || text.title} #{index + 1}
                </h3>
              </div>
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => handleRemoveExperience(index)}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">{text.position}</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
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
                  className="input input-bordered"
                  value={experience.company}
                  onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">{text.city}</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={experience.city}
                  onChange={(e) => handleExperienceChange(index, 'city', e.target.value)}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">{text.province}</span>
                </label>
                <select
                  className="select select-bordered"
                  value={experience.province}
                  onChange={(e) => handleExperienceChange(index, 'province', e.target.value)}
                >
                  {provinces.map((province) => (
                    <option key={province.code} value={province.name[language]}>
                      {province.name[language]}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">{text.startDate}</span>
                </label>
                <input
                  type="month"
                  className="input input-bordered"
                  value={experience.startDate}
                  onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">{text.endDate}</span>
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="month"
                    className="input input-bordered flex-1"
                    value={experience.endDate}
                    onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
                    disabled={experience.current}
                  />
                  <label className="cursor-pointer label">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary"
                      checked={experience.current}
                      onChange={(e) => handleExperienceChange(index, 'current', e.target.checked)}
                    />
                    <span className="label-text ml-2">{text.current}</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="form-control">
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
                    />
                    <button
                      className="btn btn-ghost btn-sm"
                      onClick={() => handleRemoveAchievement(index, achievementIndex)}
                    >
                      <X className="w-4 h-4" />
                    </button>
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
