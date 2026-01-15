// app/api/contact/route.ts
import nodemailer from 'nodemailer';
import { NextRequest, NextResponse } from 'next/server'; // Import from next/server for App Router

export async function POST(req: NextRequest) { // Changed to named export POST, and NextRequest type
  try {
    const { name, email, subject, message } = await req.json(); // Use req.json() for App Router body parsing

    // Basic validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ message: 'Tous les champs sont requis.' }, { status: 400 });
    }

    // --- Your email sending logic using Nodemailer ---
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `${name} <${email}>`, // Use sender's name and email
      replyTo: email, // Set reply-to to the sender's email
      to: 'azangueleonel9@gmail.com', // Your recipient email
      subject: `Nouveau message de contact : ${subject}`,
      html: `
        <p><strong>Nom:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Sujet:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return NextResponse.json({ message: 'Message envoyé avec succès !' }, { status: 200 });

  } catch (error) {
    console.error('Error sending email:', error);
    // You might want to be less specific with the error message for the client
    return NextResponse.json({ message: 'Erreur lors de l\'envoi de l\'e-mail. Veuillez réessayer plus tard.' }, { status: 500 });
  }
}

// Optional: Add other HTTP methods if needed, e.g., export async function GET() { ... }