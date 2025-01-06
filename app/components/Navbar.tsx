'use client';

import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-base-100 shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo et Nom */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-primary">CVBuilder</span>
            </Link>
          </div>

          {/* Navigation Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-base-content hover:text-primary">
              Accueil
            </Link>
            
            {/* Dropdown Outils */}
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="flex items-center gap-1 cursor-pointer text-base-content hover:text-primary">
                Outils
                <ChevronDown className="w-4 h-4" />
              </label>
              <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-lg bg-base-100 rounded-box w-52">
                <li>
                  <Link href="/builder" className="flex items-center gap-2">
                    <span className="font-medium">Builder CV</span>
                    <span className="badge badge-primary badge-sm">FR</span>
                  </Link>
                </li>
                <li>
                  <button className="flex items-center gap-2 opacity-50 cursor-not-allowed">
                    <span className="font-medium">Builder CV Canadien</span>
                    <span className="badge badge-secondary badge-sm">Bientôt</span>
                  </button>
                </li>
              </ul>
            </div>

            <Link href="#templates" className="text-base-content hover:text-primary">
              Templates
            </Link>
            <Link href="#contact" className="text-base-content hover:text-primary">
              Contact
            </Link>
          </div>

          {/* Bouton Menu Mobile */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-base-content hover:text-primary"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-base-100">
            <Link
              href="/"
              className="block px-3 py-2 text-base-content hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Accueil
            </Link>
            
            {/* Outils Mobile */}
            <div className="px-3 py-2">
              <span className="block text-sm font-medium text-base-content/70 mb-2">
                Outils
              </span>
              <ul className="space-y-2 pl-2">
                <li>
                  <Link
                    href="/builder"
                    className="flex items-center gap-2 text-base-content hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Builder CV
                    <span className="badge badge-primary badge-sm">FR</span>
                  </Link>
                </li>
                <li>
                  <button className="flex items-center gap-2 text-base-content opacity-50 cursor-not-allowed">
                    Builder CV Canadien
                    <span className="badge badge-secondary badge-sm">Bientôt</span>
                  </button>
                </li>
              </ul>
            </div>

            <Link
              href="#templates"
              className="block px-3 py-2 text-base-content hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Templates
            </Link>
            <Link
              href="#contact"
              className="block px-3 py-2 text-base-content hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
