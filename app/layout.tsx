import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AppProvider } from  '@/contexts/Appcontext'
import ScrollToTop from '@/components/ScrollToTop'
import { Analytics } from '@vercel/analytics/next';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Portfolio - Expert en IA & Cybersécurité',
    template: '%s | Data Scientist & Pentester'
  },
  description: 'Ingénieur spécialisé en Intelligence Artificielle, Cybersécurité et Analyse de Données. Solutions innovantes pour des problèmes complexes.',
  keywords: [
    'Machine Learning',
    'Deep Learning', 
    'Pentest',
    'Sécurité Informatique',
    'Data Science',
    'Python',
    'TensorFlow',
    'Analyse de Données',
    'Réseaux de Neurones',
    'Ethical Hacking'
  ],
  authors: [{ name: 'Leonel Delmat AZANGUE', url: 'https://votresite.com' }],
  openGraph: {
    title: 'Expert IA & Cybersécurité',
    description: 'Solutions avancées en intelligence artificielle et protection des systèmes',
    url: 'https://votresite.com',
    siteName: 'Portfolio Ingénieur IA',
    images: [{
      url: 'https://votresite.com/og-ia.jpg',
      width: 1200,
      height: 630,
      alt: 'Expert en Intelligence Artificielle',
    }],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Data Scientist & Pentester',
    description: 'Détection d\'anomalies • Modèles prédictifs • Sécurité des systèmes',
    images: ['https://votresite.com/twitter-ia.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon-ai.ico',
    apple: '/apple-touch-icon-ai.png',
  },
  metadataBase: new URL('https://votresite.com'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#111827" />
        <meta name="color-scheme" content="dark" /> {/* Forcé en mode sombre */}
      </head>
      <body className={`${inter.className} bg-gray-900 text-gray-100`}>
        <AppProvider>
          <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800">
            {children}
            <ScrollToTop />
            <Analytics />
          </div>
        </AppProvider>
      </body>
    </html>
  )
}