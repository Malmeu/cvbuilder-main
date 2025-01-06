'use client'

import { CanadianSkill } from '@/app/types/canadian-cv'
import { useState } from 'react'
import { Plus, X, GripVertical } from 'lucide-react'

interface Props {
  skills: CanadianSkill[]
  onChange: (skills: CanadianSkill[]) => void
  language: 'fr' | 'en'
}

const defaultCategories = {
  fr: ['Langues', 'Compétences techniques', 'Compétences interpersonnelles', 'Certifications'],
  en: ['Languages', 'Technical Skills', 'Soft Skills', 'Certifications']
}

const emptySkill: CanadianSkill = {
  category: '',
  skills: ['']
}

export default function SkillsForm({ skills, onChange, language }: Props) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)

  const labels = {
    fr: {
      title: 'Compétences',
      category: 'Catégorie',
      skills: 'Compétences',
      addCategory: 'Ajouter une catégorie',
      addSkill: 'Ajouter une compétence',
      dragToReorder: 'Glisser pour réorganiser',
      selectCategory: 'Sélectionner ou saisir une catégorie'
    },
    en: {
      title: 'Skills',
      category: 'Category',
      skills: 'Skills',
      addCategory: 'Add Category',
      addSkill: 'Add Skill',
      dragToReorder: 'Drag to reorder',
      selectCategory: 'Select or type a category'
    }
  }

  const text = labels[language]

  const handleAddCategory = () => {
    onChange([...skills, { ...emptySkill }])
  }

  const handleRemoveCategory = (index: number) => {
    onChange(skills.filter((_, i) => i !== index))
  }

  const handleCategoryChange = (index: number, value: string) => {
    const newSkills = [...skills]
    newSkills[index] = {
      ...newSkills[index],
      category: value
    }
    onChange(newSkills)
  }

  const handleAddSkill = (categoryIndex: number) => {
    const newSkills = [...skills]
    newSkills[categoryIndex].skills.push('')
    onChange(newSkills)
  }

  const handleRemoveSkill = (categoryIndex: number, skillIndex: number) => {
    const newSkills = [...skills]
    newSkills[categoryIndex].skills = 
      newSkills[categoryIndex].skills.filter((_, i) => i !== skillIndex)
    onChange(newSkills)
  }

  const handleSkillChange = (categoryIndex: number, skillIndex: number, value: string) => {
    const newSkills = [...skills]
    newSkills[categoryIndex].skills[skillIndex] = value
    onChange(newSkills)
  }

  const handleDragStart = (index: number) => {
    setDraggedIndex(index)
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    if (draggedIndex === null || draggedIndex === index) return

    const newSkills = [...skills]
    const draggedSkill = newSkills[draggedIndex]
    newSkills.splice(draggedIndex, 1)
    newSkills.splice(index, 0, draggedSkill)
    onChange(newSkills)
    setDraggedIndex(index)
  }

  return (
    <div className="space-y-6">
      {skills.map((skillCategory, categoryIndex) => (
        <div
          key={categoryIndex}
          className="card bg-base-200 shadow-sm"
          draggable
          onDragStart={() => handleDragStart(categoryIndex)}
          onDragOver={(e) => handleDragOver(e, categoryIndex)}
        >
          <div className="card-body">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <GripVertical className="w-4 h-4 cursor-move text-base-content/50" />
                <h3 className="card-title text-base">
                  {skillCategory.category || text.title} #{categoryIndex + 1}
                </h3>
              </div>
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => handleRemoveCategory(categoryIndex)}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">{text.category}</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                value={skillCategory.category}
                onChange={(e) => handleCategoryChange(categoryIndex, e.target.value)}
                list={`categories-${categoryIndex}`}
                placeholder={text.selectCategory}
              />
              <datalist id={`categories-${categoryIndex}`}>
                {defaultCategories[language].map((category) => (
                  <option key={category} value={category} />
                ))}
              </datalist>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">{text.skills}</span>
              </label>
              <div className="space-y-2">
                {skillCategory.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="flex gap-2">
                    <input
                      type="text"
                      className="input input-bordered flex-1"
                      value={skill}
                      onChange={(e) => handleSkillChange(categoryIndex, skillIndex, e.target.value)}
                    />
                    <button
                      className="btn btn-ghost btn-sm"
                      onClick={() => handleRemoveSkill(categoryIndex, skillIndex)}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  className="btn btn-ghost btn-sm gap-2"
                  onClick={() => handleAddSkill(categoryIndex)}
                >
                  <Plus className="w-4 h-4" />
                  {text.addSkill}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        className="btn btn-outline gap-2 w-full"
        onClick={handleAddCategory}
      >
        <Plus className="w-4 h-4" />
        {text.addCategory}
      </button>
    </div>
  )
}
