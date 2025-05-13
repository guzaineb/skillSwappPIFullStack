import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EducatorsByCategory = () => {
  const { categoryId } = useParams();
  const [educators, setEducators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEducators = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/users/by-category/${categoryId}`);
        setEducators(res.data);
      } catch (err) {
        setError("Erreur lors de la récupération des éducateurs");
      } finally {
        setLoading(false);
      }
    };

    fetchEducators();
  }, [categoryId]);

  return (
    <div className="container py-4">
      <h2>Éducateurs par catégorie</h2>
      {loading && <p>Chargement...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && educators.length === 0 && <p>Aucun éducateur trouvé.</p>}

      <ul className="list-group">
        {educators.map((educator) => (
          <li key={educator._id} className="list-group-item">
            <strong>{educator.name}</strong> — {educator.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EducatorsByCategory;
