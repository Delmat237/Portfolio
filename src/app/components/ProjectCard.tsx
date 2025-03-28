import { FaExternalLinkAlt } from "react-icons/fa";

// src/components/ProjectCard.tsx
interface ProjectCardProps {
    title: string;
    description: string;
    techStack: string[];
    link: string;
   
  }
  
  const ProjectCard = ({ title, description, techStack, link }: ProjectCardProps) => {
    return (
      <div className="project-card p-6 ">
        <h3 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">{title}</h3>
        <p className="text-lg mb-6 text-black-100">{description}</p>
        <div className="flex flex-wrap gap-2 mb-6">
        {techStack.map((tech, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg dark:bg-blue-800 dark:text-blue-400"
          >
            {tech}
          </span>
        ))}
        </div>
        <a 
  // className="flex bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
  className=" flex  w-full items-center justify-center  bg-blue-400 text-white px-6 py-3 rounded-lg hover:bg-blue-700 hover:text-white transition-all duration-500 hover:shadow-lg hover:brightness-110"

  href={link}
  aria-label="Voir le projet"
>
  <FaExternalLinkAlt className="w-5 h-5 mr-2" />
  Voir le Projet
</a>

      </div>
    );
  };
  
  export default ProjectCard;
            