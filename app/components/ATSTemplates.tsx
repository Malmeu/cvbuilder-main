import { useState } from 'react';
import { motion } from 'framer-motion';

const templates = [
  {
    id: 'simple',
    name: 'Simple et Efficace',
    description: 'Un modèle épuré et professionnel, parfait pour la plupart des secteurs.',
    preview: `[Votre Nom]
[Votre Adresse]
[Email] | [Téléphone]
[LinkedIn]

RÉSUMÉ PROFESSIONNEL
[Bref résumé de vos compétences et objectifs professionnels]

EXPÉRIENCE PROFESSIONNELLE
[Poste] | [Entreprise] | [Dates]
• [Réalisation clé avec chiffres]
• [Réalisation clé avec chiffres]
• [Réalisation clé avec chiffres]

FORMATION
[Diplôme] | [Institution] | [Dates]

COMPÉTENCES
• [Compétence 1]
• [Compétence 2]
• [Compétence 3]`
  },
  {
    id: 'technique',
    name: 'Technique & IT',
    description: 'Optimisé pour les postes techniques et informatiques.',
    preview: `[Votre Nom]
[Email] | [GitHub] | [LinkedIn]

COMPÉTENCES TECHNIQUES
Languages: [Java, Python, JavaScript, etc.]
Frameworks: [React, Angular, Spring, etc.]
Outils: [Git, Docker, Jenkins, etc.]
Cloud: [AWS, Azure, GCP]

EXPÉRIENCE PROFESSIONNELLE
[Poste] | [Entreprise] | [Dates]
• [Projet technique avec impact mesurable]
• [Optimisation ou amélioration avec métriques]
• [Innovation ou solution technique]

PROJETS PERSONNELS
[Nom du Projet]
• [Description technique]
• [Technologies utilisées]
• [Lien GitHub]

FORMATION
[Diplôme en Informatique/Ingénierie]
[Institution] | [Dates]`
  },
  {
    id: 'commercial',
    name: 'Commercial & Marketing',
    description: 'Idéal pour les profils commerciaux et marketing.',
    preview: `[Votre Nom]
[Email] | [LinkedIn] | [Portfolio]

PROFIL
[Bref résumé mettant en avant vos réussites commerciales]

EXPÉRIENCE PROFESSIONNELLE
[Poste Commercial] | [Entreprise] | [Dates]
• [Objectif dépassé de X%]
• [Montant du CA généré]
• [Nombre de nouveaux clients]

RÉALISATIONS CLÉS
• [Développement commercial]
• [Gestion de portefeuille]
• [Négociations réussies]

FORMATION
[Formation Commerciale]
[Institution] | [Dates]

COMPÉTENCES
• [CRM utilisés]
• [Techniques de vente]
• [Outils marketing]`
  }
];

interface TemplateModalProps {
  template: typeof templates[0];
  onClose: () => void;
}

function TemplateModal({ template, onClose }: TemplateModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-semibold text-gray-800">{template.name}</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <p className="text-gray-600 mb-6">{template.description}</p>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <pre className="whitespace-pre-wrap font-mono text-sm text-gray-700">
              {template.preview}
            </pre>
          </div>

          <div className="mt-6 flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Fermer
            </button>
            <button
              onClick={() => {
                navigator.clipboard.writeText(template.preview);
                onClose();
              }}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Copier le modèle
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function ATSTemplates() {
  const [selectedTemplate, setSelectedTemplate] = useState<typeof templates[0] | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Modèles de CV optimisés ATS
        </h2>
        <p className="text-gray-600">
          Choisissez un modèle pré-optimisé pour les systèmes ATS et adaptez-le à votre profil.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 cursor-pointer hover:shadow-md transition-all"
            onClick={() => setSelectedTemplate(template)}
          >
            <h3 className="text-xl font-medium text-gray-800 mb-2">
              {template.name}
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              {template.description}
            </p>
            <div className="text-emerald-600 text-sm font-medium">
              Voir le modèle →
            </div>
          </motion.div>
        ))}
      </div>

      {selectedTemplate && (
        <TemplateModal
          template={selectedTemplate}
          onClose={() => setSelectedTemplate(null)}
        />
      )}
    </div>
  );
}
