import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { generatePDF } from './AnalysisReport';

interface HistoryItem {
  id: string;
  date: string;
  score: number;
  recommendations: string[];
  fileName?: string;
}

export default function CVHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);

  useEffect(() => {
    // Charger l'historique depuis le localStorage
    const savedHistory = localStorage.getItem('cv-analysis-history');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleDownload = (item: HistoryItem) => {
    const doc = generatePDF(item, item.fileName);
    doc.save(`analyse-cv-${format(new Date(item.date), 'dd-MM-yyyy')}.pdf`);
  };

  const handleDelete = (id: string) => {
    const newHistory = history.filter(item => item.id !== id);
    setHistory(newHistory);
    localStorage.setItem('cv-analysis-history', JSON.stringify(newHistory));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">
        Historique des analyses
      </h2>

      {history.length === 0 ? (
        <p className="text-gray-600">
          Aucune analyse enregistrée pour le moment.
        </p>
      ) : (
        <div className="space-y-4">
          {history.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center space-x-4 mb-2">
                    <span className="text-sm text-gray-500">
                      {format(new Date(item.date), 'dd MMMM yyyy', { locale: fr })}
                    </span>
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">
                      Score: {item.score}/100
                    </span>
                  </div>
                  {item.fileName && (
                    <p className="text-sm text-gray-600 mb-2">
                      Fichier: {item.fileName}
                    </p>
                  )}
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleDownload(item)}
                    className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                    title="Télécharger le rapport"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Supprimer"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <button
                onClick={() => setSelectedItem(selectedItem?.id === item.id ? null : item)}
                className="mt-4 text-sm text-blue-600 hover:text-blue-700 transition-colors"
              >
                {selectedItem?.id === item.id ? 'Masquer les détails' : 'Voir les détails'}
              </button>

              {selectedItem?.id === item.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 pt-4 border-t border-gray-100"
                >
                  <h4 className="font-medium text-gray-800 mb-2">Recommandations</h4>
                  <ul className="space-y-2">
                    {item.recommendations.map((rec, index) => (
                      <li key={index} className="text-gray-600 text-sm flex items-start space-x-2">
                        <span className="text-emerald-500">•</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
