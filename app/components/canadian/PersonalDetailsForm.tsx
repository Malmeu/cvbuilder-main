'use client'

import { CanadianPersonalDetails } from '@/app/types/canadian-cv'
import { provinces } from '@/app/data/canadian-provinces'

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
      city: 'Ville',
      province: 'Province',
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
      city: 'City',
      province: 'Province',
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
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">{text.firstName}</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={data.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
          />
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">{text.lastName}</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={data.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
          />
        </div>
      </div>

      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">{text.currentPosition}</span>
        </label>
        <input
          type="text"
          className="input input-bordered w-full"
          value={data.currentPosition}
          onChange={(e) => handleChange('currentPosition', e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">{text.email}</span>
          </label>
          <input
            type="email"
            className="input input-bordered w-full"
            value={data.email}
            onChange={(e) => handleChange('email', e.target.value)}
          />
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">{text.phone}</span>
          </label>
          <input
            type="tel"
            className="input input-bordered w-full"
            value={data.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="+1 (xxx) xxx-xxxx"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">{text.city}</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={data.city}
            onChange={(e) => handleChange('city', e.target.value)}
          />
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">{text.province}</span>
          </label>
          <select 
            className="select select-bordered w-full"
            value={data.province}
            onChange={(e) => handleChange('province', e.target.value)}
          >
            {provinces.map((province) => (
              <option key={province.code} value={province.name[language]}>
                {province.name[language]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">{text.linkedIn}</span>
        </label>
        <input
          type="url"
          className="input input-bordered w-full"
          value={data.linkedIn}
          onChange={(e) => handleChange('linkedIn', e.target.value)}
          placeholder="https://linkedin.com/in/votre-profil"
        />
      </div>

      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">{text.summary}</span>
        </label>
        <textarea
          className="textarea textarea-bordered h-32"
          value={data.summary}
          onChange={(e) => handleChange('summary', e.target.value)}
          placeholder={text.summaryPlaceholder}
        />
      </div>
    </div>
  )
}
