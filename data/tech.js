import { 
  Code,
  Database,
  GitBranch,
  Monitor,
  Smartphone,
  Server,
  Settings,
  FileText} from 'lucide-react';

const techData = [
    {
    title: 'Frontend',
    skills: [
      { name: 'React', icon: Code },
      { name: 'Next.js', icon: Code },
      { name: 'TypeScript', icon: Code },
      { name: 'Tailwind CSS', icon: Monitor },
      { name: 'Vue.js', icon: Code },
    ]
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Python',  icon: Code },
      { name: 'Java',  icon: Code },
      { name: 'Node.js', level: 20, icon: Server },
      { name: 'Express.js', level: 35, icon: Server },
      { name: 'PHP', icon: Code },
      { name: 'C#', icon: Code },
    ]
  },
  {
    title: 'Base de données',
    skills: [
      { name: 'MySQL',  icon: Database },
      { name: 'PostgreSQL',  icon: Database },
      { name: 'Firebase', level: 10, icon: Database },
      { name: 'SQLite',  icon: Database },
      { name: 'MongoDB', icon: Database },
      { name: 'Redis', icon: Database },
    ]
  },
  {
    title: 'Framework',
    skills: [
      { name: 'Django',  icon: Code },
      { name: 'Spring',  icon: Code },
      { name: 'FastAPI',  icon: Server },
      { name: 'Laravel', icon: Code },
      { name: 'ASP.NET', icon: Code },
      { name: 'Ruby on Rails', icon: Code },
    ]
  },
  {
    title: 'Mobile',
    skills: [
      { name: 'React Native',  icon: Smartphone },
      { name: 'Flutter',icon: Smartphone },
      { name: 'Ionic', icon: Smartphone },
      { name: 'Swift', icon: Smartphone },
      { name: 'Kotlin', icon: Smartphone },
    ]
  },
  {
    title: 'Outils & Autres',
    skills: [
      { name: 'Git',  icon: GitBranch },
      { name: 'Docker',  icon: Settings },
      { name: 'AWS', icon: Server },
      { name: 'Figma',  icon: Monitor },
      { name: 'Postman',  icon: Settings },
      { name: 'Drawio',  icon: FileText },
    ]
  }
]

export default techData;