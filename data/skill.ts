import {
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
  TrendingUp,
  Bot,
  Workflow,
  Network,
  Server,
  GitBranch,
  Cloud,
  Boxes,
  Terminal,
  Globe,
} from 'lucide-react'
import type { SkillCategory } from './types'

const skillData: SkillCategory[] = [
  {
    titleKey: 'programming',
    type: 'technical',
    skills: [
      { name: 'Python', level: 'expert', icon: Code },
      { name: 'Java', level: 'expert', icon: Code },
      { name: 'C/C++', level: 'intermediate', icon: Code },
      { name: 'JavaScript/TypeScript', level: 'expert', icon: Code },
      { name: 'PHP/Laravel', level: 'intermediate', icon: Globe },
    ]
  },
  {
    titleKey: 'ai',
    type: 'technical',
    skills: [
      { name: 'Machine Learning', level: 'expert', icon: Brain },
      { name: 'Deep Learning', level: 'intermediate', icon: Zap },
      { name: 'NLP', level: 'intermediate', icon: MessageSquare },
      { name: 'Computer Vision', level: 'learning', icon: Eye },
      { name: 'Data Analysis', level: 'expert', icon: BarChart3 },
    ]
  },
  {
    titleKey: 'agentic',
    type: 'technical',
    skills: [
      { name: 'Systèmes Multi-Agents (JADE)', level: 'intermediate', icon: Network },
      { name: 'Orchestration d\'Agents', level: 'intermediate', icon: Workflow },
      { name: 'RAG', level: 'intermediate', icon: Bot },
      { name: 'Intégration de LLMs', level: 'intermediate', icon: Brain },
      { name: 'Agentic Workflows', level: 'intermediate', icon: Workflow },
    ]
  },
  {
    titleKey: 'devops',
    type: 'technical',
    skills: [
      { name: 'Docker & Conteneurs', level: 'intermediate', icon: Boxes },
      { name: 'Nginx', level: 'intermediate', icon: Server },
      { name: 'Linux & VPS', level: 'intermediate', icon: Terminal },
      { name: 'CI/CD (GitHub Actions)', level: 'intermediate', icon: GitBranch },
      { name: 'Cloud (Vercel, Render)', level: 'expert', icon: Cloud },
    ]
  },
  {
    titleKey: 'databases',
    type: 'technical',
    skills: [
      { name: 'MySQL', level: 'expert', icon: Database },
      { name: 'PostgreSQL', level: 'expert', icon: Database },
      { name: 'MongoDB', level: 'intermediate', icon: Database },
      { name: 'ScyllaDB', level: 'learning', icon: HardDrive },
      { name: 'SQLite', level: 'expert', icon: Database },
    ]
  },
  {
    titleKey: 'math',
    type: 'technical',
    skills: [
      { name: 'Algèbre Linéaire', level: 'expert', icon: TrendingUp },
      { name: 'Calcul Différentiel', level: 'expert', icon: TrendingUp },
      { name: 'Probabilités & Statistiques', level: 'expert', icon: PieChart },
      { name: 'Optimisation Convexe', level: 'intermediate', icon: Target },
    ]
  },
  {
    titleKey: 'softSkills',
    type: 'soft',
    skills: [
      { name: 'Management', icon: Users },
      { name: 'Communication', icon: MessageSquare },
      { name: 'Gestion de Projet', icon: Settings },
      { name: 'Travail d\'équipe', icon: Users },
    ]
  },
  {
    titleKey: 'spokenLanguages',
    type: 'spoken',
    skills: [
      { name: 'Français', level: 'native', icon: MessageSquare },
      { name: 'Anglais', level: 'intermediate', icon: MessageSquare },
    ]
  },
]

export default skillData
