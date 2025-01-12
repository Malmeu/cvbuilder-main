'use client';

import { motion } from 'framer-motion';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { useState, FormEvent } from 'react';
import emailjs from '@emailjs/browser';

// Configuration EmailJS
emailjs.init("yH4zvsKc755StyHmP"); // À remplacer par votre clé publique EmailJS

interface FormData {
  name: string;
  email: string;
  message: string;
}

const contactInfo = [
  {
    icon: EnvelopeIcon,
    title: 'Email',
    value: 'cvdiali.contact@gmail.com',
    link: 'mailto:cvdiali.contact@gmail.com',
    delay: 0.1
  },
  {
    icon: PhoneIcon,
    title: 'Téléphone',
    value: '(+213) 0540 03 11 26',
    link: 'tel:+2130540031126',
    delay: 0.2
  },
  {
    icon: MapPinIcon,
    title: 'Adresse',
    value: 'Béjaia, Algérie',
    link: 'https://maps.google.com/?q=Béjaia,Algérie',
    delay: 0.3
  }
];

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await emailjs.send(
        'service_zmzh45f', // À remplacer par votre Service ID
        'template_1g0gq9p', // À remplacer par votre Template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'cvdiali.contact@gmail.com'
        }
      );

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Contactez-nous
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Notre équipe est là pour vous aider. N'hésitez pas à nous contacter pour toute question concernant nos services.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <motion.a
                key={info.title}
                href={info.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: info.delay }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-6 flex flex-col items-center text-center group"
              >
                <div className="w-12 h-12 bg-violet-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-violet-200 transition-colors">
                  <Icon className="w-6 h-6 text-violet-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {info.title}
                </h3>
                <p className="text-gray-600">
                  {info.value}
                </p>
              </motion.a>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm p-8 max-w-3xl mx-auto"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Envoyez-nous un message
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Nom complet
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                  placeholder="Votre nom"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                  placeholder="votre@email.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                placeholder="Votre message..."
              />
            </div>

            {submitStatus === 'success' && (
              <div className="p-4 bg-green-50 text-green-700 rounded-lg">
                Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="p-4 bg-red-50 text-red-700 rounded-lg">
                Une erreur est survenue lors de l'envoi. Veuillez réessayer.
              </div>
            )}

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full font-medium py-3 rounded-lg transition-colors ${
                isSubmitting 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-violet-600 hover:bg-violet-700 text-white'
              }`}
            >
              {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
