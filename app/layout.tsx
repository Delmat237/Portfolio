import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AppProvider } from '@/contexts/Appcontext'
import ScrollToTop from '@/components/ScrollToTop'
import { Analytics } from '@vercel/analytics/next';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Portfolio AZANGUE L . D  - Élève-ingénieur de  Génie Informatique',
    template: '%s | Data Scientist & Pentester & IA & Cybersecurity'
  },
  description: 'Élève Ingénieur exerçant dans les domaines : Intelligence Artificielle, Cybersécurité et Analyse de Données. Solutions innovantes pour des problèmes complexes.',
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
  authors: [{ name: 'Leonel Delmat AZANGUE', url: 'azangue-leonel-portfolio.vercel.app' }],
  openGraph: {
    title: 'Expert IA & Cybersécurité',
    description: 'Solutions avancées en intelligence artificielle et protection des systèmes',
    url: 'https://azangue-leonel-portfolio.vercel.app/',
    siteName: 'Portfolio Ingénieur IA',
    images: [{
      url: 'https://azangue-leonel-portfolio.vercel.app/og-ia.jpg',
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
    images: ['https://azangue-leonel-portfolio.vercel.app/twitter-ia.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon-ai.ico',
    apple: '/apple-touch-icon-ai.png',
  },
  metadataBase: new URL('https://azangue-leonel-portfolio.vercel.app/'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#020617" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                  document.documentElement.style.colorScheme = 'dark'
                } else {
                  document.documentElement.classList.remove('dark')
                  document.documentElement.style.colorScheme = 'light'
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <AppProvider>
          <div className="min-h-screen">
            {children}
            <ScrollToTop />
            <Analytics />
          </div>
        </AppProvider>
      </body>
    </html>
  )
}