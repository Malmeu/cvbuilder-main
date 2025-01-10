import { NextResponse } from 'next/server';
import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const TIMEOUT = 30000; // 30 secondes

const WORD_MIME_TYPES = [
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
  'application/msword' // .doc
];

interface PDFData {
  text: string;
  numpages: number;
  info: any;
  metadata: any;
  version: string;
}

async function extractFromPDF(buffer: Buffer): Promise<string> {
  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => reject(new Error('Timeout dépassé')), TIMEOUT);
  });

  const parsePromise = pdfParse(buffer, {
    max: 50,
    pagerender: function(pageData: any) {
      return pageData.getTextContent()
        .then(function(textContent: any) {
          let lastY, text = '';
          for (let item of textContent.items) {
            if (lastY != item.transform[5] && text) {
              text += '\n';
            }
            text += item.str + ' ';
            lastY = item.transform[5];
          }
          return text;
        });
    }
  }) as Promise<PDFData>;

  const data = await Promise.race([parsePromise, timeoutPromise]);
  
  if (!data || typeof data !== 'object' || !('text' in data)) {
    throw new Error('Échec de l\'extraction du texte');
  }

  return data.text.trim();
}

async function extractFromWord(buffer: Buffer): Promise<string> {
  try {
    const result = await mammoth.extractRawText({ buffer });
    if (!result.value) {
      throw new Error('Aucun texte extrait du document Word');
    }
    return result.value.trim();
  } catch (error) {
    console.error('Erreur lors de l\'extraction Word:', error);
    throw new Error('Impossible d\'extraire le texte du document Word. Assurez-vous qu\'il s\'agit d\'un fichier .docx valide.');
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'Aucun fichier fourni' },
        { status: 400 }
      );
    }

    console.log('Type MIME:', file.type);
    console.log('Nom du fichier:', file.name);
    console.log('Taille:', file.size);

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'Le fichier est trop volumineux (maximum 10MB)' },
        { status: 400 }
      );
    }

    const isPDF = file.type === 'application/pdf';
    const isWord = WORD_MIME_TYPES.includes(file.type) || file.name.toLowerCase().endsWith('.docx');

    if (!isPDF && !isWord) {
      return NextResponse.json(
        { 
          error: 'Format de fichier non supporté',
          suggestion: 'Seuls les fichiers PDF et Word (.docx) sont acceptés.',
          details: `Type de fichier détecté: ${file.type}`
        },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    try {
      let text;
      if (isPDF) {
        text = await extractFromPDF(buffer);
      } else {
        text = await extractFromWord(buffer);
      }

      if (!text) {
        return NextResponse.json(
          { 
            error: 'Aucun texte n\'a pu être extrait du fichier.',
            suggestion: isPDF 
              ? 'Pour les PDF aplatis ou scannés, veuillez utiliser un outil de reconnaissance de texte (OCR) en ligne.'
              : 'Assurez-vous que votre document Word contient du texte extractible.'
          },
          { status: 422 }
        );
      }

      return NextResponse.json({ text });
    } catch (error) {
      console.error('Erreur lors de l\'extraction:', error);
      const message = error instanceof Error ? error.message : 'Erreur lors de l\'extraction du texte';
      return NextResponse.json(
        { 
          error: message,
          suggestion: isPDF 
            ? 'Si votre document est un PDF aplati ou scanné, veuillez utiliser un outil OCR.'
            : 'Assurez-vous que votre fichier Word est au format .docx (et non .doc).'
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Erreur générale:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors du traitement du fichier' },
      { status: 500 }
    );
  }
}
