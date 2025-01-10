import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface AnalysisResult {
  score: number;
  recommendations: string[];
}

interface AnalysisReportProps {
  analysis: AnalysisResult;
  fileName?: string;
}

export function generatePDF(analysis: AnalysisResult, fileName?: string) {
  const doc = new jsPDF();
  const date = format(new Date(), 'dd MMMM yyyy', { locale: fr });

  // En-tête
  doc.setFontSize(20);
  doc.text('Analyse de CV - Rapport', 105, 20, { align: 'center' });
  doc.setFontSize(12);
  doc.text(`Date: ${date}`, 20, 30);
  if (fileName) {
    doc.text(`CV analysé: ${fileName}`, 20, 40);
  }

  // Score
  doc.setFontSize(16);
  doc.text('Score ATS', 20, 60);
  doc.setFontSize(14);
  doc.text(`${analysis.score}/100`, 20, 70);

  // Barre de progression
  const barWidth = 150;
  const barHeight = 10;
  const barX = 20;
  const barY = 75;
  
  // Fond de la barre
  doc.setFillColor(240, 240, 240);
  doc.rect(barX, barY, barWidth, barHeight, 'F');
  
  // Barre de progression
  doc.setFillColor(46, 204, 113);
  doc.rect(barX, barY, (analysis.score / 100) * barWidth, barHeight, 'F');

  // Recommandations
  doc.setFontSize(16);
  doc.text('Recommandations', 20, 100);
  
  const recommendations = analysis.recommendations.map(rec => [rec]);
  (doc as any).autoTable({
    startY: 110,
    head: [['Points d\'amélioration']],
    body: recommendations,
    margin: { top: 10, right: 20, bottom: 20, left: 20 },
    headStyles: { fillColor: [46, 204, 113] },
    alternateRowStyles: { fillColor: [242, 242, 242] },
    styles: { 
      fontSize: 12,
      cellPadding: 5
    }
  });

  // Pied de page
  const pageCount = (doc as any).internal.getNumberOfPages();
  doc.setFontSize(10);
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.text(
      'Généré par CV Diali - www.cvdiali.com',
      105,
      doc.internal.pageSize.height - 10,
      { align: 'center' }
    );
  }

  return doc;
}

export default function AnalysisReport({ analysis, fileName }: AnalysisReportProps) {
  const handleDownload = () => {
    const doc = generatePDF(analysis, fileName);
    doc.save('analyse-cv.pdf');
  };

  return (
    <button
      onClick={handleDownload}
      className="inline-flex items-center px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors"
    >
      <svg
        className="w-5 h-5 mr-2"
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
      Télécharger le rapport PDF
    </button>
  );
}
