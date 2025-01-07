'use client'

import { CanadianCV } from '@/app/types/canadian-cv'
import { MapPin, Mail, Phone, Linkedin } from 'lucide-react'

interface Props {
  cv: CanadianCV
}

export default function CVPreview({ cv }: Props) {
  const formatDate = (date: string) => {
    if (!date) return ''
    const [year, month] = date.split('-')
    const monthNames = {
      fr: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
      en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    }
    return `${monthNames[cv.language][parseInt(month) - 1]} ${year}`
  }

  const labels = {
    fr: {
      experience: 'Expérience professionnelle',
      education: 'Formation',
      skills: 'Compétences',
      present: 'Présent',
      contact: 'Contact',
      interests: "Centres d'intérêt",
      references: 'Références'
    },
    en: {
      experience: 'Professional Experience',
      education: 'Education',
      skills: 'Skills',
      present: 'Present',
      contact: 'Contact',
      interests: 'Interests',
      references: 'References'
    }
  }

  const text = labels[cv.language]

  return (
    <div className="p-8 max-w-[210mm] mx-auto" style={{ minHeight: '297mm' }}>
      <div className="space-y-8">
        {/* En-tête */}
        <header className="relative bg-[#4A4A4A] text-white -mx-6 md:-mx-12 -mt-6 md:-mt-12 p-4 md:p-8 mb-6 md:mb-8">
          <h1 className="text-2xl md:text-4xl font-bold mb-2">
            {cv.personalDetails.firstName} {cv.personalDetails.lastName}
          </h1>
          <h2 className="text-lg md:text-xl mb-3 md:mb-4">{cv.personalDetails.currentPosition}</h2>
          <p className="text-xs md:text-sm max-w-2xl mb-4 md:mb-6 text-gray-200">
            {cv.personalDetails.summary}
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-4 md:gap-8">
          <main>
            {/* Expérience */}
            <section className="mb-6 md:mb-8">
              <h2 className="text-base md:text-lg font-bold border-b-2 border-[#4A4A4A] mb-3 md:mb-4">
                {text.experience}
              </h2>
              {cv.experiences.map((exp, index) => (
                <div key={index} className="mb-4 md:mb-6">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-1 md:mb-2">
                    <h3 className="font-bold text-sm md:text-base">{exp.position}</h3>
                    <div className="text-xs md:text-sm text-gray-600">
                      {formatDate(exp.startDate)} - {exp.current ? text.present : formatDate(exp.endDate)}
                    </div>
                  </div>
                  <div className="text-xs md:text-sm mb-1 md:mb-2">
                    <span className="font-semibold">{exp.company}</span> | {exp.city}, {exp.province}
                  </div>
                  <ul className="list-disc list-inside text-xs md:text-sm space-y-0.5 md:space-y-1">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>

            {/* Formation */}
            <section className="mb-6 md:mb-8">
              <h2 className="text-base md:text-lg font-bold border-b-2 border-[#4A4A4A] mb-3 md:mb-4">
                {text.education}
              </h2>
              {cv.education.map((edu, index) => (
                <div key={index} className="mb-3 md:mb-4">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                    <div>
                      <h3 className="font-bold text-sm md:text-base">{edu.diploma}</h3>
                      <div className="text-xs md:text-sm">
                        <span className="font-semibold">{edu.institution}</span> | {edu.city}, {edu.province}
                      </div>
                      {edu.equivalence && (
                        <div className="text-xs md:text-sm text-gray-600 italic">
                          {edu.equivalence}
                        </div>
                      )}
                    </div>
                    <div className="text-xs md:text-sm text-gray-600">
                      {edu.startYear} - {edu.endYear}
                    </div>
                  </div>
                </div>
              ))}
            </section>
          </main>

          <aside>
            {/* Contact */}
            <section className="mb-6 md:mb-8">
              <h2 className="text-base md:text-lg font-bold border-b-2 border-[#4A4A4A] mb-3 md:mb-4">
                {text.contact}
              </h2>
              <div className="space-y-2 md:space-y-3 text-xs md:text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3 h-3 md:w-4 md:h-4 text-gray-600" />
                  <span>{cv.personalDetails.city}, {cv.personalDetails.province}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3 h-3 md:w-4 md:h-4 text-gray-600" />
                  <span>{cv.personalDetails.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3 h-3 md:w-4 md:h-4 text-gray-600" />
                  <span>{cv.personalDetails.email}</span>
                </div>
                {cv.personalDetails.linkedIn && (
                  <div className="flex items-center gap-2">
                    <Linkedin className="w-3 h-3 md:w-4 md:h-4 text-gray-600" />
                    <span>{cv.personalDetails.linkedIn}</span>
                  </div>
                )}
              </div>
            </section>

            {/* Compétences */}
            <section className="mb-6 md:mb-8">
              <h2 className="text-base md:text-lg font-bold border-b-2 border-[#4A4A4A] mb-3 md:mb-4">
                {text.skills}
              </h2>
              {cv.skills.map((category, index) => (
                <div key={index} className="mb-3 md:mb-4">
                  <h3 className="font-semibold text-sm md:text-base mb-1 md:mb-2">{category.category}</h3>
                  <ul className="list-disc list-inside text-xs md:text-sm space-y-0.5 md:space-y-1">
                    {category.skills.map((skill, i) => (
                      <li key={i}>{skill}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>

            {/* Centres d'intérêt */}
            {cv.interests.length > 0 && (
              <section className="mb-6 md:mb-8">
                <h2 className="text-base md:text-lg font-bold border-b-2 border-[#4A4A4A] mb-3 md:mb-4">
                  {text.interests}
                </h2>
                <ul className="list-disc list-inside text-xs md:text-sm space-y-0.5 md:space-y-1">
                  {cv.interests.map((interest, index) => (
                    <li key={index}>
                      <span className="font-semibold">{interest.name}</span>
                      {interest.description && (
                        <span className="text-gray-600"> - {interest.description}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Références */}
            {cv.references.available && (
              <section>
                <h2 className="text-base md:text-lg font-bold border-b-2 border-[#4A4A4A] mb-3 md:mb-4">
                  {text.references}
                </h2>
                <p className="text-xs md:text-sm text-gray-600 italic">
                  {cv.references.text}
                </p>
              </section>
            )}
          </aside>
        </div>
      </div>
    </div>
  )
}
