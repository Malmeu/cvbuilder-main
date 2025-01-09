'use client'

import { CanadianCV } from '@/app/types/canadian-cv'
import { MapPin, Mail, Phone, Linkedin } from 'lucide-react'

interface CVPreviewProps {
  cv: CanadianCV;
  theme: string;
}

export default function CVPreview({ cv, theme }: CVPreviewProps) {
  const labels = {
    fr: {
      experience: 'Expérience professionnelle',
      education: 'Formation',
      skills: 'Compétences',
      contact: 'Contact',
      interests: "Centres d'intérêt",
      references: 'Références',
      present: 'Présent',
      email: 'Courriel',
      phone: 'Téléphone',
      address: 'Adresse',
      linkedIn: 'LinkedIn'
    },
    en: {
      experience: 'Professional Experience',
      education: 'Education',
      skills: 'Skills',
      contact: 'Contact',
      interests: 'Interests',
      references: 'References',
      present: 'Present',
      email: 'Email',
      phone: 'Phone',
      address: 'Address',
      linkedIn: 'LinkedIn'
    }
  }

  const selectedLabels = cv.language === 'fr' ? labels.fr : labels.en

  const formatDate = (date: string) => {
    if (!date) return ''
    const [year, month] = date.split('-')
    const monthNames = {
      fr: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
      en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    }
    return `${monthNames[cv.language][parseInt(month) - 1]} ${year}`
  }

  return (
    <div className="p-8 max-w-[210mm] mx-auto" style={{ minHeight: '297mm' }} data-theme={theme}>
      <div className="space-y-8">
        {/* En-tête */}
        <header className="relative bg-primary text-primary-content -mx-6 md:-mx-12 -mt-6 md:-mt-12 p-4 md:p-8 mb-6 md:mb-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">{cv.personalDetails.firstName} {cv.personalDetails.lastName}</h1>
            <p className="text-xl mb-4">{cv.personalDetails.currentPosition}</p>
            <p className="text-sm max-w-2xl mx-auto">
              {cv.personalDetails.summary}
            </p>
          </div>
        </header>

        <div className="grid grid-cols-3 gap-8">
          {/* Colonne de gauche */}
          <div className="col-span-1 space-y-8">
            {/* Contact */}
            <section>
              <h2 className="text-base md:text-lg font-bold border-b-2 border-primary mb-3 md:mb-4">
                {selectedLabels.contact}
              </h2>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-medium">{selectedLabels.email}:</span> {cv.personalDetails.email}
                </p>
                <p>
                  <span className="font-medium">{selectedLabels.phone}:</span> {cv.personalDetails.phone}
                </p>
                {cv.personalDetails.address && (
                  <p>
                    <span className="font-medium">{selectedLabels.address}:</span> {cv.personalDetails.address}
                  </p>
                )}
                {cv.personalDetails.linkedIn && (
                  <p>
                    <span className="font-medium">{selectedLabels.linkedIn}:</span>{' '}
                    <a href={cv.personalDetails.linkedIn} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {cv.personalDetails.linkedIn.replace('https://linkedin.com/in/', '')}
                    </a>
                  </p>
                )}
              </div>
            </section>

            {/* Compétences */}
            <section>
              <h2 className="text-base md:text-lg font-bold border-b-2 border-primary mb-3 md:mb-4">
                {selectedLabels.skills}
              </h2>
              <div className="space-y-4">
                {cv.skills.map((category, index) => (
                  <div key={index}>
                    <h3 className="font-medium text-sm mb-2">{category.category}</h3>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      {category.skills.map((skill, i) => (
                        <li key={i}>{skill}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Intérêts */}
            {cv.interests.length > 0 && (
              <section>
                <h2 className="text-base md:text-lg font-bold border-b-2 border-primary mb-3 md:mb-4">
                  {selectedLabels.interests}
                </h2>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {cv.interests.map((interest, index) => (
                    <li key={index}>
                      {interest.name}
                      {interest.description && (
                        <span className="text-base-content/60"> - {interest.description}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          <main className="col-span-2">
            {/* Expérience */}
            <section className="mb-6 md:mb-8">
              <h2 className="text-base md:text-lg font-bold border-b-2 border-primary mb-3 md:mb-4">
                {selectedLabels.experience}
              </h2>
              {cv.experiences.map((exp, index) => (
                <div key={index} className="mb-4 md:mb-6">
                  <div className="flex justify-between items-start mb-1 md:mb-2">
                    <h3 className="font-bold text-sm md:text-base">{exp.position}</h3>
                    <div className="text-xs md:text-sm text-base-content/60">
                      {formatDate(exp.startDate)} - {exp.current ? selectedLabels.present : formatDate(exp.endDate)}
                    </div>
                  </div>
                  <div className="text-xs md:text-sm mb-1 md:mb-2">
                    <span className="font-medium">{exp.company}</span>
                    {exp.address && <span className="text-base-content/60">, {exp.address}</span>}
                  </div>
                  {exp.achievements.length > 0 && (
                    <ul className="list-disc list-inside text-xs md:text-sm space-y-0.5 md:space-y-1">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="text-base-content/80">{achievement}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </section>

            {/* Formation */}
            <section className="mb-6 md:mb-8">
              <h2 className="text-base md:text-lg font-bold border-b-2 border-primary mb-3 md:mb-4">
                {selectedLabels.education}
              </h2>
              {cv.education.map((edu, index) => (
                <div key={index} className="mb-3 md:mb-4">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-sm md:text-base">{edu.diploma}</h3>
                    <div className="text-xs md:text-sm text-base-content/60">
                      {edu.startYear} - {edu.endYear}
                    </div>
                  </div>
                  <div className="text-xs md:text-sm">
                    <span className="font-medium">{edu.institution}</span>
                    {edu.address && <span className="text-base-content/60">, {edu.address}</span>}
                  </div>
                  {edu.equivalence && (
                    <div className="text-xs md:text-sm text-base-content/60 italic mt-1">
                      {edu.equivalence}
                    </div>
                  )}
                </div>
              ))}
            </section>
          </main>

          <aside>
            {/* Références */}
            {cv.references.available && (
              <section>
                <h2 className="text-base md:text-lg font-bold border-b-2 border-primary mb-3 md:mb-4">
                  {selectedLabels.references}
                </h2>
                <p className="text-xs md:text-sm text-base-content/60 italic">
                  {cv.references.text}
                </p>
              </section>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
