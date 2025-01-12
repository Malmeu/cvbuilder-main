'use client';

import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    {
      name: 'Facebook',
      url: 'https://facebook.com/cvdiali',
      icon: Facebook,
      color: 'hover:text-blue-600'
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/cvdiali',
      icon: Twitter,
      color: 'hover:text-sky-500'
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/company/cvdiali',
      icon: Linkedin,
      color: 'hover:text-blue-700'
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com/cvdiali',
      icon: Instagram,
      color: 'hover:text-pink-600'
    }
  ];

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">À propos de CV Diali</h2>
            <p className="text-gray-600 mb-4">
              CV Diali est votre partenaire pour la création de CV professionnels et la préparation 
              aux entretiens de visa. Notre mission est de vous aider à réussir votre parcours 
              professionnel et d'immigration.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-600 ${social.color} transition-colors`}
                  aria-label={`Suivez-nous sur ${social.name}`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Liens Rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/builder" className="text-gray-600 hover:text-violet-600">
                  Créer un CV
                </Link>
              </li>
              <li>
                <Link href="/canadian-builder" className="text-gray-600 hover:text-violet-600">
                  CV Format Canadien
                </Link>
              </li>
              <li>
                <Link href="/visa-interview" className="text-gray-600 hover:text-violet-600">
                  Simulateur Visa
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-600 hover:text-violet-600">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Guides Pratiques</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/guides/cv-canadien" className="text-gray-600 hover:text-violet-600">
                  Guide du CV Canadien
                </Link>
              </li>
              <li>
                <Link href="/guides/visa-etudiant" className="text-gray-600 hover:text-violet-600">
                  Guide Visa Étudiant
                </Link>
              </li>
              <li>
                <Link href="/blog/category/conseils-cv" className="text-gray-600 hover:text-violet-600">
                  Conseils CV
                </Link>
              </li>
              <li>
                <Link href="/blog/category/immigration" className="text-gray-600 hover:text-violet-600">
                  Guide Immigration
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Ressources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog/category/entretien" className="text-gray-600 hover:text-violet-600">
                  Préparer son Entretien
                </Link>
              </li>
              <li>
                <Link href="/blog/category/carriere" className="text-gray-600 hover:text-violet-600">
                  Développement de Carrière
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm">
              {currentYear} CV Diali. Tous droits réservés.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/privacy" className="text-gray-600 hover:text-violet-600">
                Politique de Confidentialité
              </Link>
              <Link href="/terms" className="text-gray-600 hover:text-violet-600">
                Conditions d'Utilisation
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-violet-600">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
