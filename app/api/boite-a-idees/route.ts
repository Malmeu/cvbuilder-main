import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { nom, email, idee, categorie } = await request.json()

    // Validation des données
    if (!nom || !email || !idee) {
      return NextResponse.json(
        { error: 'Tous les champs sont obligatoires' }, 
        { status: 400 }
      )
    }

    // Import dynamique de nodemailer
    const nodemailer = await import('nodemailer')

    // Configuration de Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    })

    // Préparation de l'email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'cvdiali.contact@gmail.com',
      subject: `Nouvelle Suggestion CVDiali - ${categorie || 'Sans Catégorie'}`,
      html: `
        <h2>Nouvelle Suggestion pour CVDiali</h2>
        <p><strong>Nom :</strong> ${nom}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Catégorie :</strong> ${categorie || 'Non spécifiée'}</p>
        <hr />
        <h3>Détails de la Suggestion :</h3>
        <p>${idee}</p>
      `
    }

    // Envoi de l'email
    await transporter.sendMail(mailOptions)

    return NextResponse.json(
      { message: 'Suggestion envoyée avec succès' }, 
      { status: 200 }
    )
  } catch (error) {
    console.error('Erreur lors de l\'envoi de la suggestion:', error)
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi de la suggestion' }, 
      { status: 500 }
    )
  }
}
