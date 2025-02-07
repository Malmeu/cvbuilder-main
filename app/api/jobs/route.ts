import { NextResponse } from 'next/server'
import { Job } from '@/app/types/job'

// Données de test pour le marché algérien
const jobs: Job[] = [
  {
    id: '1',
    title: 'Développeur Frontend React',
    company: 'Yassir',
    location: 'Alger',
    salary: '150,000 - 200,000 DZD',
    category: 'normal',
    description: 'Nous recherchons un développeur Frontend React talentueux pour rejoindre notre équipe en pleine croissance.',
    requirements: [
      'Expérience avec React et TypeScript',
      'Bonne maîtrise de HTML/CSS',
      'Niveau d\'anglais professionnel',
      'Bac+3 minimum en informatique'
    ],
    postedAt: '2024-02-01',
    deadline: '2024-03-01',
    logo: '/companies/yassir.png',
    isUrgent: true,
    contactEmail: 'careers@yassir.com',
    wilaya: 'Alger',
    workType: 'hybrid'
  },
  {
    id: '2',
    title: 'Commercial Terrain',
    company: 'Djezzy',
    location: 'Oran',
    salary: '60,000 DZD + Commission',
    category: 'normal',
    description: 'Djezzy recherche des commerciaux dynamiques pour développer son portefeuille clients.',
    requirements: [
      'Expérience commerciale souhaitée',
      'Permis de conduire obligatoire',
      'Bonne présentation',
      'Niveau universitaire'
    ],
    postedAt: '2024-02-05',
    deadline: '2024-03-15',
    logo: '/companies/djezzy.png',
    isPromoted: true,
    contactEmail: 'recrutement@djezzy.dz',
    wilaya: 'Oran',
    workType: 'on-site'
  },
  {
    id: '3',
    title: 'Réceptionniste Hôtel',
    company: 'Sheraton Club des Pins',
    location: 'Alger',
    salary: '45,000 DZD',
    category: 'seasonal',
    description: 'Pour la saison estivale, nous recherchons des réceptionnistes qualifiés.',
    requirements: [
      'Expérience en hôtellerie',
      'Français et Anglais courant',
      'Disponibilité soir et week-end',
      'Bac+2 minimum'
    ],
    postedAt: '2024-02-07',
    deadline: '2024-04-30',
    isUrgent: true,
    contactEmail: 'rh@sheraton-clubdespins.com',
    wilaya: 'Alger',
    workType: 'on-site',
    season: 'summer'
  }
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  
  let filteredJobs = [...jobs]
  
  // Filtrage par catégorie
  const category = searchParams.get('category')
  if (category) {
    filteredJobs = filteredJobs.filter(job => job.category === category)
  }

  // Filtrage par wilaya
  const wilaya = searchParams.get('wilaya')
  if (wilaya) {
    filteredJobs = filteredJobs.filter(job => job.wilaya === wilaya)
  }

  // Filtrage par recherche
  const query = searchParams.get('query')?.toLowerCase()
  if (query) {
    filteredJobs = filteredJobs.filter(job => 
      job.title.toLowerCase().includes(query) ||
      job.company.toLowerCase().includes(query) ||
      job.description.toLowerCase().includes(query)
    )
  }

  // Filtrage par type de travail
  const workType = searchParams.get('workType')
  if (workType) {
    filteredJobs = filteredJobs.filter(job => job.workType === workType)
  }

  return NextResponse.json(filteredJobs)
}

// Pour plus tard : Ajouter POST, PUT, DELETE pour la gestion des offres
