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
  ChevronRight
} from 'lucide-react';

// This file contains the skill data for the portfolio, including various skills and their levels.
const skillData = [
  {
    title: 'Sécurité Informatique',
    skills: [
      { name: 'Ethical Hacking', level: 10, icon: Shield },
      { name: 'Penetration Testing', level: 15, icon: Target },
      { name: 'Cryptography', level: 50, icon: Key },
      { name: 'Network Security', level: 65, icon: Wifi },
      { name: 'Web Application Security', level: 80, icon: Globe },
      { name: 'Incident Response', level: 60, icon: AlertTriangle },
    ]
  },
  {
    title: 'Intelligence Artificielle',
    skills: [
      { name: 'Machine Learning', level: 25, icon: Brain },
      { name: 'Deep Learning', level: 15, icon: Zap },
      { name: 'NLP', level: 5, icon: MessageSquare },
      { name: 'Computer Vision', level: 10, icon: Eye },
      { name: 'Reinforcement Learning', level: 5, icon: TrendingUp },
    ]
  },
  {
    title: 'Résolution de Problèmes',
    skills: [
      { name: 'Algorithm Design', level: 90, icon: Code },
      { name: 'Data Structures', level: 85, icon: Database },
      { name: 'Problem Solving', level: 88, icon: Target },
    ]
  },
  {
    title: "Leadership d'Équipe",
    skills: [
      { name: 'Team Management', level: 85, icon: Users },
      { name: 'Project Management', level: 80, icon: Settings },
      { name: 'Agile Methodologies', level: 75, icon: ChevronRight },
    ]
  },
  {
    title: "Communication",
    skills: [
      { name: 'Interpersonal Skills', level: 80, icon: Users },
      { name: 'Technical Writing', level: 55, icon: FileText },
      { name: 'Presentation Skills', level: 80, icon: Presentation },
    ]
  },
  {
    title: 'Data Science',
    skills: [
      { name: 'Data Analysis', level: 55, icon: BarChart3 },
      { name: 'Data Visualization', level: 60, icon: PieChart },
      { name: 'Big Data', level: 35, icon: HardDrive },
    ]
  }
  
]



export default skillData

