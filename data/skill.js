import {
  Shield,
  Key,
  Wifi,
  Globe,
  AlertTriangle,
  Brain,
  Eye,
  MessageSquare,
  Zap,
  Code,
  Database,
  Users,
  Target,
  BarChart3,
  PieChart,
  HardDrive,
  Settings,
  FileText,
  Presentation,
  TrendingUp,
  ChevronRight,
  Bot,
  Workflow,
  Network,
  Server,
  GitBranch,
  Cloud,
  Boxes,
  Terminal
} from 'lucide-react';

const skillData = [
  {
    title: 'Langages de Programmation',
    skills: [
      { name: 'Python', level: 90, icon: Code },
      { name: 'Java', level: 85, icon: Code },
      { name: 'C/C++', level: 80, icon: Code },
      { name: 'JavaScript/TypeScript', level: 85, icon: Code },
      { name: 'PHP/Laravel', level: 75, icon: Globe },
    ]
  },
  {
    title: 'Intelligence Artificielle & Data Science',
    skills: [
      { name: 'Machine Learning', level: 85, icon: Brain },
      { name: 'Deep Learning', level: 80, icon: Zap },
      { name: 'NLP', level: 70, icon: MessageSquare },
      { name: 'Computer Vision', level: 65, icon: Eye },
      { name: 'Data Analysis', level: 85, icon: BarChart3 },
    ]
  },
  {
    title: 'IA Agentique & Multi-Agents (MAS)',
    skills: [
      { name: 'Systèmes Multi-Agents (JADE)', level: 75, icon: Network },
      { name: 'Orchestration d\'Agents', level: 75, icon: Workflow },
      { name: 'RAG (Retrieval-Augmented Generation)', level: 80, icon: Bot },
      { name: 'Intégration de LLMs', level: 80, icon: Brain },
      { name: 'Agentic Workflows', level: 70, icon: Workflow },
    ]
  },
  {
    title: 'DevOps & Infrastructure',
    skills: [
      { name: 'Docker & Conteneurs', level: 80, icon: Boxes },
      { name: 'Nginx (Reverse Proxy)', level: 75, icon: Server },
      { name: 'Linux & Déploiement VPS', level: 80, icon: Terminal },
      { name: 'CI/CD (GitHub Actions)', level: 75, icon: GitBranch },
      { name: 'Cloud (Vercel, Render)', level: 85, icon: Cloud },
    ]
  },
  {
    title: 'Bases de Données',
    skills: [
      { name: 'MySQL', level: 90, icon: Database },
      { name: 'PostgreSQL', level: 85, icon: Database },
      { name: 'MongoDB', level: 80, icon: Database },
      { name: 'ScyllaDB', level: 60, icon: HardDrive },
      { name: 'SQLite', level: 85, icon: Database },
    ]
  },
  {
    title: 'Mathématiques pour l\'IA',
    skills: [
      { name: 'Algèbre Linéaire', level: 90, icon: TrendingUp },
      { name: 'Calcul Différentiel', level: 85, icon: TrendingUp },
      { name: 'Probabilités & Statistiques', level: 85, icon: PieChart },
      { name: 'Optimisation Convexe', level: 80, icon: Target },
    ]
  },
  {
    title: "Leadership & Soft Skills",
    skills: [
      { name: 'Management', level: 85, icon: Users },
      { name: 'Communication', level: 90, icon: MessageSquare },
      { name: 'Gestion de Projet', level: 85, icon: Settings },
      { name: 'Travail d\'équipe', level: 95, icon: Users },
    ]
  },
  {
    title: "Langues",
    skills: [
      { name: "Français", level: 100, icon: MessageSquare },
      { name: "Anglais", level: 85, icon: MessageSquare }
    ]
  }
]

export default skillData
