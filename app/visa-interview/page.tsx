import { Metadata } from 'next';
import { VisaInterviewForm } from '../components/visa-interview/VisaInterviewForm';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Simulation d\'Entretien Visa Étudiant | Préparez-vous efficacement',
  description: 'Préparez-vous à votre entretien de visa étudiant avec notre simulateur interactif. Questions réelles, reconnaissance vocale et conseils personnalisés.',
  keywords: 'visa étudiant, entretien visa, simulation entretien, préparation visa, questions visa étudiant, visa study permit',
  openGraph: {
    title: 'Simulateur d\'Entretien Visa Étudiant',
    description: 'Entraînez-vous à l\'entretien de visa étudiant avec notre simulateur interactif utilisant l\'IA et la reconnaissance vocale.',
    images: [
      {
        url: '/images/visa-interview-simulation.jpg',
        width: 1200,
        height: 630,
        alt: 'Simulation d\'entretien visa étudiant',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Simulateur d\'Entretien Visa Étudiant',
    description: 'Préparez votre entretien de visa étudiant avec notre simulateur IA',
    images: ['/images/visa-interview-simulation.jpg'],
  },
};

export default function VisaInterviewPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-base-100 via-base-200 to-base-100">
      <Breadcrumbs />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          Simulateur d'Entretien Visa Étudiant
        </h1>
        <VisaInterviewForm />
      </div>
    </div>
  );
}
