import type { LucideIcon } from 'lucide-react'

export interface Project {
  id: number
  title: string
  description: string
  image: string
  technologies: string[]
  category: string
  tag?: string
  github: string
  status: string
  demo: string
}

export interface Education {
  id: number
  title: string
  institution: string
  location: string
  period: string
  description: string
  status: string
  grade: string
  skills: string[]
}

export type SkillLevel = 'expert' | 'intermediate' | 'learning' | 'native'

export interface SkillItem {
  name: string
  level?: SkillLevel
  icon: LucideIcon
}

export interface SkillCategory {
  titleKey: string
  type: 'technical' | 'soft' | 'spoken'
  skills: SkillItem[]
}

export interface TechItem {
  name: string
  src: string
  color: string
}

export interface TechCategory {
  titleKey: string
  skills: TechItem[]
}

export interface Experience {
  title: string
  company: string
  location: string
  period: string
  description: string[]
}

export interface Competition {
  title: string
  position: string
  description: string
  date: string
  team: string
  technologies: string[]
  link: string
  image: string
}

export interface Association {
  title: string
  images: string[]
  description: string
  roles: string[]
  duration?: string
  link?: string
}

export interface Certification {
  title: string
  source: string
  description: string
  image: string
  reference: string
  file: string
}

export interface OrbitIcon {
  name: string
  src: string
  color: string
}
