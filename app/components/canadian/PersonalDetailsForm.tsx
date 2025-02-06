'use client'

import { CanadianPersonalDetails } from '@/app/types/canadian-cv'

interface Props {
  data: CanadianPersonalDetails
  onChange: (data: CanadianPersonalDetails) => void
  language: 'fr' | 'en'
}

export default function PersonalDetailsForm({ data, onChange, language }: Props) {
  const labels = {
    fr: {
      firstName: 'Prénom',
      lastName: 'Nom',
      currentPosition: 'Poste actuel/recherché',
      email: 'Courriel',
      phone: 'Téléphone',
      address: 'Adresse',
      linkedIn: 'LinkedIn (optionnel)',
      summary: 'Résumé professionnel',
      summaryPlaceholder: 'Décrivez en quelques lignes votre parcours professionnel, vos compétences clés pour le poste et vos objectifs de carrière.'
    },
    en: {
      firstName: 'First Name',
      lastName: 'Last Name',
      currentPosition: 'Current/Desired Position',
      email: 'Email',
      phone: 'Phone',
      address: 'Address',
      linkedIn: 'LinkedIn (optional)',
      summary: 'Professional Summary',
      summaryPlaceholder: 'Describe in a few lines your professional background, key skills for the position and your career goals.'
    }
  }

  const handleChange = (field: keyof CanadianPersonalDetails, value: string) => {
    onChange({
      ...data,
      [field]: value
    })
  }

  const text = labels[language]

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div className="form-control w-full">
          <label className="label py-0.5">
            <span className="label-text text-xs">{text.firstName}</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full h-8 min-h-[2rem] text-sm px-2"
            value={data.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
          />
        </div>

        <div className="form-control w-full">
          <label className="label py-0.5">
            <span className="label-text text-xs">{text.lastName}</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full h-8 min-h-[2rem] text-sm px-2"
            value={data.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
          />
        </div>
      </div>

      <div className="form-control w-full">
        <label className="label py-0.5">
          <span className="label-text text-xs">{text.currentPosition}</span>
        </label>
        <input
          type="text"
          className="input input-bordered w-full h-8 min-h-[2rem] text-sm px-2"
          value={data.currentPosition}
          onChange={(e) => handleChange('currentPosition', e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div className="form-control w-full">
          <label className="label py-0.5">
            <span className="label-text text-xs">{text.email}</span>
          </label>
          <input
            type="email"
            className="input input-bordered w-full h-8 min-h-[2rem] text-sm px-2"
            value={data.email}
            onChange={(e) => handleChange('email', e.target.value)}
          />
        </div>

        <div className="form-control w-full">
          <label className="label py-0.5">
            <span className="label-text text-xs">{text.phone}</span>
          </label>
          <input
            type="tel"
            className="input input-bordered w-full h-8 min-h-[2rem] text-sm px-2"
            value={data.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
          />
        </div>
      </div>

      <div className="form-control w-full">
        <label className="label py-0.5">
          <span className="label-text text-xs">{text.address}</span>
        </label>
        <input
          type="text"
          className="input input-bordered w-full h-8 min-h-[2rem] text-sm px-2"
          value={data.address}
          onChange={(e) => handleChange('address', e.target.value)}
          placeholder={language === 'fr' ? 'Ex: 123 Rue Principale, Ville, Pays' : 'Ex: 123 Main Street, City, Country'}
        />
      </div>

      <div className="form-control w-full">
        <label className="label py-0.5">
          <span className="label-text text-xs">{text.linkedIn}</span>
        </label>
        <input
          type="url"
          className="input input-bordered w-full h-8 min-h-[2rem] text-sm px-2"
          value={data.linkedIn}
          onChange={(e) => handleChange('linkedIn', e.target.value)}
          placeholder="https://linkedin.com/in/username"
        />
      </div>

      <div className="form-control w-full">
        <label className="label py-0.5">
          <span className="label-text text-xs">{text.summary}</span>
        </label>
        <textarea
          className="textarea textarea-bordered h-20 text-sm px-2 py-1"
          value={data.summary}
          onChange={(e) => handleChange('summary', e.target.value)}
          placeholder={text.summaryPlaceholder}
        />
      </div>
    </div>
  )
}
