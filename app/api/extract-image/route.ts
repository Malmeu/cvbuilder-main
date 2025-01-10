import { NextResponse } from 'next/server';
import Tesseract from 'tesseract.js';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'Aucune image fournie' },
        { status: 400 }
      );
    }

    // Convertir le fichier en URL data
    const bytes = await file.arrayBuffer();
    const blob = new Blob([bytes]);
    const imageUrl = URL.createObjectURL(blob);
    
    // Utiliser Tesseract pour extraire le texte
    const result = await Tesseract.recognize(
      imageUrl,
      'fra+eng',
      {
        logger: (m) => console.log(m)
      }
    );

    // Libérer l'URL
    URL.revokeObjectURL(imageUrl);

    return NextResponse.json({ text: result.data.text });
  } catch (error) {
    console.error('Erreur lors de l\'extraction de l\'image:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'extraction du texte de l\'image' },
      { status: 500 }
    );
  }
}
