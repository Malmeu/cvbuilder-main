import { Metadata } from 'next';
import { Breadcrumbs } from '@/app/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Guide du Visa Étudiant | Préparation et Conseils',
  description: 'Guide complet pour préparer votre demande de visa étudiant. Conseils pour l\'entretien, documents requis et étapes clés pour maximiser vos chances de succès.',
  keywords: 'visa étudiant, préparation visa, entretien visa, documents visa étudiant, study permit',
};

export default function GuideStudentVisa() {
  return (
    <div className="min-h-screen bg-white">
      <Breadcrumbs />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          Guide Complet du Visa Étudiant
        </h1>

        <div className="prose prose-lg max-w-4xl mx-auto">
          <h2>Préparer sa Demande de Visa</h2>
          <p>
            La préparation d'une demande de visa étudiant nécessite une approche méthodique et une 
            attention particulière aux détails. Voici un guide étape par étape pour maximiser vos 
            chances de succès.
          </p>

          <h2>Documents Essentiels</h2>
          <ul>
            <li>
              <strong>Lettre d'Acceptation</strong> : Document officiel de l'établissement 
              d'enseignement
            </li>
            <li>
              <strong>Preuve de Moyens Financiers</strong> : Relevés bancaires, bourses, garanties 
              financières
            </li>
            <li>
              <strong>Passeport Valide</strong> : Validité couvrant la durée prévue des études
            </li>
            <li>
              <strong>Formulaires Officiels</strong> : Correctement remplis et signés
            </li>
          </ul>

          <h2>Préparation à l'Entretien</h2>
          <ol>
            <li>
              <strong>Connaître son Projet</strong> : Pouvoir expliquer clairement ses motivations et 
              objectifs d'études
            </li>
            <li>
              <strong>Maîtriser son Dossier</strong> : Connaître les détails de son programme et de 
              l'établissement choisi
            </li>
            <li>
              <strong>Préparer les Réponses</strong> : Anticiper les questions courantes sur le 
              financement et les plans post-études
            </li>
            <li>
              <strong>Attitude Professionnelle</strong> : Maintenir un comportement calme et 
              professionnel
            </li>
          </ol>

          <h2>Questions Fréquentes en Entretien</h2>
          <ul>
            <li>Pourquoi avoir choisi ce pays et cet établissement ?</li>
            <li>Comment financerez-vous vos études ?</li>
            <li>Quels sont vos projets après l'obtention de votre diplôme ?</li>
            <li>Avez-vous des liens avec votre pays d'origine ?</li>
          </ul>

          <h2>Conseils pour Réussir</h2>
          <ul>
            <li>
              <strong>Anticipation</strong> : Commencer les démarches au moins 3-4 mois à l'avance
            </li>
            <li>
              <strong>Organisation</strong> : Tenir un dossier ordonné avec tous les documents
            </li>
            <li>
              <strong>Authenticité</strong> : Rester honnête et cohérent dans ses réponses
            </li>
            <li>
              <strong>Préparation</strong> : S'entraîner aux entretiens avec des simulations
            </li>
          </ul>

          <div className="bg-violet-50 p-6 rounded-lg my-8">
            <h3 className="text-violet-800 font-semibold mb-4">Préparez-vous Efficacement</h3>
            <p className="text-violet-900">
              Utilisez notre simulateur d'entretien visa pour vous entraîner aux questions fréquemment 
              posées. Notre outil utilise l'IA pour fournir des retours personnalisés et améliorer vos 
              réponses.
            </p>
            <a 
              href="/visa-interview" 
              className="inline-block mt-4 px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
            >
              Simuler un Entretien
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
