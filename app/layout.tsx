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
  authors: [{ name: 'Leonel Delmat AZANGUE', url: 'https://azangue-leonel-portfolio.vercel.app' }],
  creator: 'Leonel Delmat AZANGUE',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Leonel Delmat AZANGUE — Ingénieur IA & Full-Stack',
    description: 'IA Agentique, Computer Vision, DevOps : des solutions technologiques à impact social et inclusif.',
    url: 'https://azangue-leonel-portfolio.vercel.app/',
    siteName: 'Portfolio — Leonel Delmat AZANGUE',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Leonel Delmat AZANGUE — Ingénieur IA & Full-Stack',
    description: 'IA Agentique • Computer Vision • DevOps • Technologies à impact social',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
                if (localStorage.theme !== 'light') {
                  document.documentElement.classList.add('dark')
                  document.documentElement.style.colorScheme = 'dark'
                } else {
                  document.documentElement.classList.remove('dark')
                  document.documentElement.style.colorScheme = 'light'
                }
              } catch (_) {
                document.documentElement.classList.add('dark')
                document.documentElement.style.colorScheme = 'dark'
              }
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Leonel Delmat AZANGUE',
              alternateName: 'AZANGUE Leonel Delmat',
              url: 'https://azangue-leonel-portfolio.vercel.app',
              image: 'https://azangue-leonel-portfolio.vercel.app/images/profile.png',
              jobTitle: 'Ingénieur en IA & Full-Stack',
              description:
                "Élève-ingénieur en Génie Informatique (ENSPY) et Mathématiques (Université de Yaoundé I), spécialisé en IA Agentique, Computer Vision et DevOps, pour des solutions technologiques à impact social et inclusif.",
              knowsAbout: [
                'Intelligence Artificielle',
                'Machine Learning',
                'Deep Learning',
                'Computer Vision',
                'Systèmes Multi-Agents',
                'RAG',
                'DevOps',
                'Full-Stack Development',
                'Cybersécurité',
                'Data Science',
              ],
              alumniOf: [
                { '@type': 'CollegeOrUniversity', name: "École Nationale Supérieure Polytechnique de Yaoundé (ENSPY)" },
                { '@type': 'CollegeOrUniversity', name: 'Université de Yaoundé I' },
              ],
              nationality: { '@type': 'Country', name: 'Cameroun' },
              sameAs: [
                'https://github.com/Delmat237',
                'https://www.linkedin.com/in/leonel-azangue',
              ],
            }),
          }}
        />
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