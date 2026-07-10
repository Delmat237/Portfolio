import type { Competition } from './types'

const competitionData: Competition[] = [
  {
    title: "Cursor Hackathon — J.U.I.N 2026",
    position: "2ème place",
    description: "2ème place (Prix : 600 $ de crédits Cursor) avec « DataPipe », une solution d'ETL (Extract, Transform, Load) visuel pour les flux de données bancaires complexes. Interface web nodale en glisser-déposer pour orchestrer l'import (CSV/JSON/SQL), le nettoyage, le filtrage et l'anonymisation sécurisée, augmentée d'un assistant IA traduisant des instructions en langage naturel en code de transformation (requêtes SQL, scripts de nettoyage). Université de Yaoundé I.",
    date: "2026",
    team: "Équipe « Les Avengers »",
    technologies: ["ETL", "Data Engineering", "Assistant IA", "Next.js", "SQL"],
    link: "https://github.com/Delmat237/DataPipe---ETL-Visuel-pour-Pipelines-Bancaires",
    image: "/images/datapipe.jpg"
  },
  {
    title: "WiSE HACK'25",
    position: "1er Prix",
    description: "Conception d'un moteur d'Instrumentation Dynamique de Binaires (DBI) avec DynamoRIO. Analyse instruction, détection de hotspots et hot-patching.",
    date: "2025",
    team: "Équipe",
    technologies: ["Cybersécurité", "DynamoRIO", "System", "C++"],
    link: "https://www.linkedin.com/posts/leonel-azangue_wisehack25-cybersaezcuritaez-dynamorio-activity-7418334432962633728-AhkW?utm_source=share&utm_medium=member_desktop&rcm=ACoAAE2muccBTMTwBQrbAFsEQk5VT-Dry95HEkk",
    image: "/images/wise.jpeg"
  },
  {
    title: "DataTour Competition 2025",
    position: "3ème place",
    description: "Compétition Panafricaine de Data Science. Analyse de datasets complexes, modélisation prédictive avancée, et travail en équipe sur des problématiques data-driven à fort impact.",
    date: "2025",
    team: "Équipe",
    technologies: ["Data Science", "Machine Learning", "Python"],
    link: "#",
    image: "/images/datatour.png"
  },
  {
    title: "Nuit de l'Info 2025",
    position: "Participant",
    description: "Hackathon National de Développement. Supervision par Pr. Batchakui Bernabe & Dr. Anne-Marie Ghana. Développement rapide de prototype fonctionnel sous contraintes temporelles.",
    date: "2025",
    team: "Équipe",
    technologies: ["Innovation", "Prototypage", "Full Stack"],
    link: "#",
    image: "/images/nuitinfo.png"
  },
  {
    title: "HackVerse 24H Chrono Club GI de l'ENSPY",
    position: "Participant",
    description: "Développement d'une application de gestion des ressources dans un établissement.",
    date: "2025",
    team: "Équipe",
    technologies: ["Dev Web", "Gestion", "Hackathon"],
    link: "#",
    image: "/images/hackverse.png"
  },
  {
    title: "Hackathon 1ère Edit - Club GI de l'ENSPY",
    position: "3ème place",
    description: "Compétition de développement logiciel.",
    date: "2024",
    team: "Équipe",
    technologies: ["Developpement", "Innovation"],
    link: "#",
    image: "/images/hackgi.png"
  },
  {
    title: "Challenge Data Science : Kaggle",
    position: "Finaliste",
    description: "Participation à des challenges de Data Science.",
    date: "2023",
    team: "Solo/Équipe",
    technologies: ["Data Science", "Python", "Kaggle"],
    link: "#",
    image: "/images/kaggle.jpg"
  }
]

export default competitionData
