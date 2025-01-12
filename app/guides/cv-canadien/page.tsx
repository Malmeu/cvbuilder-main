import { Metadata } from 'next';
import { Breadcrumbs } from '@/app/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Guide Complet du CV Canadien | Format et Conseils',
  description: 'Guide détaillé pour créer un CV format canadien parfait. Découvrez les normes, exemples et conseils pour maximiser vos chances de décrocher un emploi au Canada.',
  keywords: 'cv canadien, format cv canada, exemple cv canadien, normes cv canada, conseils cv canada',
};

export default function GuideCanadianCV() {
  return (
    <div className="min-h-screen bg-white">
      <Breadcrumbs />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          Guide Complet du CV Format Canadien
        </h1>

        <div className="prose prose-lg max-w-4xl mx-auto">
          <h2>Comprendre le Format CV Canadien</h2>
          <p>
            Le CV canadien se distingue par sa concision et son approche directe. Contrairement au CV 
            européen, il ne nécessite pas de photo et doit se concentrer uniquement sur les informations 
            professionnelles pertinentes.
          </p>

          <h2>Éléments Essentiels du CV Canadien</h2>
          <ul>
            <li>
              <strong>Informations Personnelles</strong> : Nom, adresse, téléphone et email professionnel. 
              Pas de photo, âge, statut matrimonial ou informations personnelles.
            </li>
            <li>
              <strong>Résumé Professionnel</strong> : Bref aperçu de vos compétences clés et objectifs 
              professionnels en 3-4 lignes.
            </li>
            <li>
              <strong>Expérience Professionnelle</strong> : En ordre chronologique inverse, mettant l'accent 
              sur les réalisations quantifiables.
            </li>
            <li>
              <strong>Formation</strong> : Diplômes et certifications pertinents, avec les équivalences 
              canadiennes si nécessaire.
            </li>
          </ul>

          <h2>Conseils pour un CV Canadien Efficace</h2>
          <ol>
            <li>
              <strong>Adaptez votre CV</strong> : Personnalisez votre CV pour chaque poste en utilisant 
              des mots-clés de l'offre d'emploi.
            </li>
            <li>
              <strong>Soyez Concis</strong> : Le CV ne doit pas dépasser 2 pages, privilégiez les 
              informations récentes et pertinentes.
            </li>
            <li>
              <strong>Utilisez des Verbes d'Action</strong> : "Géré", "Développé", "Optimisé" pour 
              décrire vos réalisations.
            </li>
            <li>
              <strong>Incluez des Résultats Mesurables</strong> : Chiffres, pourcentages et réalisations 
              concrètes.
            </li>
          </ol>

          <h2>Erreurs à Éviter</h2>
          <ul>
            <li>Ne pas inclure de photo ou d'informations personnelles non pertinentes</li>
            <li>Éviter les longues phrases et les paragraphes denses</li>
            <li>Ne pas utiliser d'abréviations ou de jargon spécifique</li>
            <li>Ne pas mentionner de références (sauf si demandées)</li>
          </ul>

          <h2>Sections Optionnelles mais Valorisantes</h2>
          <ul>
            <li>
              <strong>Bénévolat</strong> : Très apprécié au Canada, surtout si lié au domaine 
              professionnel
            </li>
            <li>
              <strong>Compétences Linguistiques</strong> : Niveau en anglais et français, autres langues 
              si pertinent
            </li>
            <li>
              <strong>Projets Spéciaux</strong> : Réalisations notables hors du cadre professionnel 
              traditionnel
            </li>
          </ul>

          <div className="bg-violet-50 p-6 rounded-lg my-8">
            <h3 className="text-violet-800 font-semibold mb-4">Conseil Pro</h3>
            <p className="text-violet-900">
              Utilisez notre outil de création de CV canadien pour générer un CV parfaitement formaté 
              selon les standards canadiens. Notre outil intègre automatiquement toutes les bonnes 
              pratiques mentionnées dans ce guide.
            </p>
            <a 
              href="/canadian-builder" 
              className="inline-block mt-4 px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
            >
              Créer mon CV Canadien
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
