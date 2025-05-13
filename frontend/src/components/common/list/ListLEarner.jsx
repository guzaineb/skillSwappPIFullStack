import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const StudentsBySkill = () => {
  const { skillId } = useParams();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // À ajouter: ID de l'éducateur (à remplacer par la vraie valeur de ton éducateur connecté)
  const educatorId = "ID_EDUCATOR"; // <<< à adapter

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/skill/${skillId}/students`);
        setStudents(res.data);
      } catch (err) {
        setError("Erreur lors de la récupération des étudiants");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [skillId]);

  // Fonction pour bloquer un étudiant
  const handleBlockStudent = async (studentId) => {
    try {
      await axios.put(`http://localhost:5000/api/auth/block-student/${studentId}`, {
        educatorId,
        studentId,
      });
      // Optionnel : mettre à jour la liste localement après blocage
      setStudents(prevStudents => prevStudents.filter(student => student._id !== studentId));
      alert('Étudiant bloqué avec succès.');
    } catch (err) {
      console.error(err);
      alert('Erreur lors du blocage de l\'étudiant.');
    }
  };

  return (
    <div className="container py-4">
      <h2>Étudiants inscrits à la compétence</h2>
      {loading && <p>Chargement...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && students.length === 0 && <p>Aucun étudiant inscrit.</p>}

      <ul className="list-group">
        {students.map((student) => (
          <li key={student._id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{student.name}</strong> — {student.email}
            </div>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleBlockStudent(student._id)}
            >
              Bloquer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentsBySkill;
