// src/pages/admin/dashboard.tsx
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, addDoc, getFirestore } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const db = getFirestore();

  const formik = useFormik({
    initialValues: {
      nom: '',
      dateDebut: '',
      dateFin: '',
      description: ''
    },
    onSubmit: async (values) => {
      try {
        await addDoc(collection(db, 'formations'), {
          ...values,
          userId: user?.uid,
          dateAjout: new Date().toISOString()
        });
        router.push('/admin');
      } catch (error) {
        console.error('Erreur:', error);
      }
    }
  });

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl mb-8">Gestion des formations</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-2">Nom de la formation</label>
            <input
              type="text"
              name="nom"
              onChange={formik.handleChange}
              value={formik.values.nom}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block mb-2">Date de début</label>
            <input
              type="date"
              name="dateDebut"
              onChange={formik.handleChange}
              value={formik.values.dateDebut}
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>
        {/* Autres champs */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Enregistrer
        </button>
      </form>
    </div>
  );
};

export default Dashboard;
