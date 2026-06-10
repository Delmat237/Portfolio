const projectData = [
  {
    id: 8,
    title: 'AgroVoice-IA',
    description:
      "IA vocale hors-ligne pour l'inclusion agricole. Permet aux agriculteurs en zones blanches (sans réseau) d'effectuer un suivi complet de leurs cultures via des commandes vocales en langues locales, grâce à de la reconnaissance vocale légère et à de l'analyse prédictive 100% en local.",
    image: '/images/agrovoice.png',
    technologies: ['Python', 'FastAPI', 'Offline Speech-to-Text', 'Machine Learning', 'Docker'],
    category: 'Intelligence Artificielle',
    tag: 'IA Responsable & Inclusive',
    github: '#',
    status: 'En cours',
    demo: '#'
  },
  {
    id: 9,
    title: 'Hearless (SignAI)',
    description:
      "Traduction de la langue des signes en temps réel par vision par ordinateur, pour faciliter l'intégration académique des étudiants sourds et malentendants. Capture des repères corporels (mains, visage, pose) et traduction instantanée en texte et en parole via un modèle de Deep Learning optimisé pour la fluidité du flux vidéo.",
    image: '/images/signai.png',
    technologies: ['Deep Learning', 'Computer Vision', 'MediaPipe', 'OpenCV', 'Next.js'],
    category: 'Intelligence Artificielle',
    tag: 'IA Responsable & Inclusive',
    github: '#',
    status: 'En cours',
    demo: '#'
  },
  {
    id: 7,
    title: 'Système de RAG Local',
    description:
      "Système de Retrieval-Augmented Generation fonctionnant entièrement en local : indexation de documents, recherche sémantique et génération de réponses sourcées, sans dépendance à une API externe.",
    image: '/images/rag.png',
    technologies: ['Python', 'FastAPI', 'RAG', 'Machine Learning', 'LLM'],
    category: 'Intelligence Artificielle',
    github: 'https://github.com/Delmat237/AI_Agent_RAG_SYSTEM',
    status: 'En cours',
    demo: 'https://rag-local.onrender.com/docs'
  },
  {
    id: 3,
    title: 'IoT Soil Backend',
    description:
      "API de recommandation agricole : prédit la culture la plus adaptée à partir des propriétés du sol (capteurs IoT) et fournit des recommandations exploitables grâce à un modèle de Machine Learning.",
    image: '/images/iot_soil.png',
    technologies: ['Python', 'FastAPI', 'Machine Learning', 'Scikit-learn'],
    category: 'Intelligence Artificielle',
    github: 'https://github.com/Delmat237/IOT_SOIL_BACKEND',
    status: 'Terminé',
    demo: 'https://iot-soil-backend.onrender.com/docs'
  },
  {
    id: 2,
    title: 'Frontend XCCM & AI Assistant',
    description: 'Application Fullstack intégrant un assistant IA pour le support utilisateur.',
    image: '/images/xccm.png',
    technologies: ['React', 'Next.js', 'AI Integration', 'Tailwind CSS'],
    category: 'Full-Stack',
    github: 'https://github.com/Delmat237/XCCM1-BACKEND',
    status: 'Terminé',
    demo: 'https://frontend-xccm-12027.vercel.app/'
  },
  {
    id: 4,
    title: 'E-Commerce Platform : Custom World',
    description:
      'Plateforme e-commerce pour la personnalisation d\'appareils, pochettes, t-shirts, etc., avec paiement intégré et gestion des commandes.',
    image: '/images/Custom_World.png',
    technologies: ['Next.js', 'TypeScript', 'CinetPay', 'PostgreSQL', 'Java'],
    category: 'Full-Stack',
    github: 'https://github.com/Delmat237/Custom_World',
    status: 'Terminé',
    demo: 'https://customworld.vercel.app/'
  },
  {
    id: 5,
    title: 'E-Commerce Platform : DB Jewelry',
    description: 'Plateforme e-commerce complète avec panier, paiement et gestion des commandes.',
    image: '/images/DB_JEWELRY.png',
    technologies: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL'],
    category: 'Full-Stack',
    github: 'https://github.com/Delmat237/DB-Jewelry',
    status: 'En cours',
    demo: 'https://db-jewelry.vercel.app/'
  }
]

export default projectData
