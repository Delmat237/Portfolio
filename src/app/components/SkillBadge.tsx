// src/components/SkillCard.tsx
interface SkillCardProps {
    title: string;
  }
  
  const SkillCard = ({ title }: SkillCardProps) => {
    return (
      <div className="skill-item bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md mx-auto hover:shadow-xl transition-all duration-300">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{title}</h3>
        <button 
          className="small-btn mt-4 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Voir Plus
        </button>
      </div>
    );
  };
  
  export default SkillCard;
  