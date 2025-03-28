import { FaFileDownload, FaLink } from 'react-icons/fa';

interface CertificatCardProps {
  file: string;
  img: string;
  title: string;
  source: string;
  description: string;
  ref: string;
}

const CertificatCard = ({ file, img, title, source, description, ref }: CertificatCardProps) => {
  return (
    <div className="certification-box max-w-lg p-6 rounded-lg shadow-lg bg-gray-600">
      <img
        alt={description}
        loading="lazy"
        width="400"
        height="200"
        decoding="async"
        className="w-full h-48 object-cover rounded-lg mb-6"
        src={img}
      />
      <h3 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">{title}</h3>
      <p className="text-lg mb-6 text-gray-300">{source}</p>
      <div className="flex flex-wrap gap-3 justify-center">
        <a
          href={file}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FaFileDownload className="w-5 h-5 mr-2" />
          Télécharger
        </a>
        <a
          href={ref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FaLink className="w-5 h-5 mr-2" />
          Voir Référence
        </a>
      </div>
    </div>
  );
};

export default CertificatCard;
