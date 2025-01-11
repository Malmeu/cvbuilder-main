'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronRight, MapPin, GraduationCap, Briefcase, FileText, 
  DollarSign, Globe, Table, Users, Clock, CheckCircle, 
  Building, GraduationCap as GraduationCap2, FileCheck
} from 'lucide-react';
import SectionCard from '../components/immigration/SectionCard';
import StatsCard from '../components/immigration/StatsCard';
import ProcessStep from '../components/immigration/ProcessStep';

const stats = [
  {
    title: 'Programmes disponibles',
    value: '50+',
    icon: FileText,
    description: 'Différents programmes d\'immigration adaptés à votre profil'
  },
  {
    title: 'Taux de succès',
    value: '85%',
    icon: CheckCircle,
    description: 'Des demandes sont acceptées en suivant notre guide'
  },
  {
    title: 'Délai moyen',
    value: '6-8 mois',
    icon: Clock,
    description: 'Pour compléter le processus d\'immigration'
  },
  {
    title: 'Nouveaux immigrants',
    value: '450k+',
    icon: Users,
    description: 'Accueillis au Canada chaque année'
  },
];

const processSteps = [
  {
    title: 'Évaluation de l\'admissibilité',
    description: 'Vérifiez votre éligibilité aux différents programmes d\'immigration',
    icon: CheckCircle
  },
  {
    title: 'Préparation des documents',
    description: 'Rassemblez tous les documents nécessaires pour votre demande',
    icon: FileText
  },
  {
    title: 'Tests linguistiques',
    description: 'Passez les tests de langue requis (IELTS ou TEF)',
    icon: GraduationCap
  },
  {
    title: 'Création du profil',
    description: 'Créez votre profil d\'immigration en ligne',
    icon: FileCheck
  },
  {
    title: 'Soumission de la demande',
    description: 'Envoyez votre demande complète avec tous les documents',
    icon: Building
  },
];

export default function Immigration() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-base-200 to-base-300">
      {/* Hero Section */}
      <div className="relative bg-primary/10 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 py-16 sm:py-24">
            <div className="text-center">
              <motion.h1 
                className="text-4xl tracking-tight font-extrabold text-base-content sm:text-5xl md:text-6xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="block">Immigration au</span>
                <span className="block text-primary">Canada</span>
              </motion.h1>
              <motion.p 
                className="mt-3 text-base text-base-content/70 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Votre guide complet pour immigrer au Canada. Découvrez les programmes, le processus et les ressources nécessaires.
              </motion.p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <StatsCard
                key={stat.title}
                {...stat}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-12">
          {/* Programmes d'immigration */}
          <SectionCard title="Programmes d'immigration" icon={FileText}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card bg-base-200">
                <div className="card-body">
                  <h3 className="card-title">Entrée express</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Travailleurs qualifiés</li>
                    <li>Métiers spécialisés</li>
                    <li>Expérience canadienne</li>
                  </ul>
                </div>
              </div>
              <div className="card bg-base-200">
                <div className="card-body">
                  <h3 className="card-title">Programmes provinciaux</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Québec</li>
                    <li>Ontario</li>
                    <li>Colombie-Britannique</li>
                  </ul>
                </div>
              </div>
            </div>
          </SectionCard>

          {/* Processus */}
          <SectionCard title="Processus d'immigration" icon={ChevronRight}>
            <div className="space-y-8">
              {processSteps.map((step, index) => (
                <ProcessStep
                  key={step.title}
                  step={index + 1}
                  {...step}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </SectionCard>

          {/* Documents requis */}
          <SectionCard title="Documents requis" icon={FileText}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card bg-base-200">
                <div className="card-body">
                  <h3 className="card-title">Documents personnels</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Passeport valide</li>
                    <li>Acte de naissance</li>
                    <li>Photos format passeport</li>
                  </ul>
                </div>
              </div>
              <div className="card bg-base-200">
                <div className="card-body">
                  <h3 className="card-title">Documents professionnels</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Diplômes et relevés</li>
                    <li>Lettres de référence</li>
                    <li>CV détaillé</li>
                  </ul>
                </div>
              </div>
            </div>
          </SectionCard>

          {/* Coûts */}
          <SectionCard title="Coûts et frais" icon={DollarSign}>
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th>Type de frais</th>
                    <th>Montant (CAD)</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Demande RP</td>
                    <td>1,325 $</td>
                    <td>Par demandeur principal</td>
                  </tr>
                  <tr>
                    <td>Droit de RP</td>
                    <td>500 $</td>
                    <td>Par adulte</td>
                  </tr>
                  <tr>
                    <td>Biométrie</td>
                    <td>85 $</td>
                    <td>Par personne</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </SectionCard>

          {/* Ressources */}
          <SectionCard title="Ressources utiles" icon={GraduationCap}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <a 
                href="https://www.canada.ca/fr/immigration-refugies-citoyennete.html" 
                target="_blank"
                rel="noopener noreferrer"
                className="card bg-base-200 hover:bg-base-300 transition-colors"
              >
                <div className="card-body">
                  <h3 className="card-title">Immigration Canada</h3>
                  <p>Site officiel du gouvernement</p>
                </div>
              </a>
              <a 
                href="https://www.canada.ca/fr/immigration-refugies-citoyennete/services/immigrer-canada/entree-express.html" 
                target="_blank"
                rel="noopener noreferrer"
                className="card bg-base-200 hover:bg-base-300 transition-colors"
              >
                <div className="card-body">
                  <h3 className="card-title">Entrée express</h3>
                  <p>Système d'immigration principal</p>
                </div>
              </a>
              <a 
                href="https://www.cic.gc.ca/francais/immigrer/qualifie/crs-outils.asp" 
                target="_blank"
                rel="noopener noreferrer"
                className="card bg-base-200 hover:bg-base-300 transition-colors"
              >
                <div className="card-body">
                  <h3 className="card-title">Calculateur CRS</h3>
                  <p>Évaluez vos points</p>
                </div>
              </a>
            </div>
          </SectionCard>
        </div>
      </div>
    </main>
  );
}
