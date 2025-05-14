import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { useAuthStore } from '../../../store/authStore';
import { FaArrowLeft, FaUser, FaEnvelope, FaSpinner, FaShieldAlt } from 'react-icons/fa';

const StudentsBySkill = () => {
  const { skillId } = useParams();
  const [skill, setSkill] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuthStore();

  useEffect(() => {
    // Log pour le débogage
    console.log("StudentsBySkill - skillId reçu:", skillId);

    const fetchSkillAndStudents = async () => {
      try {
        // Récupérer les informations de la compétence
        console.log("Récupération de la compétence avec l'ID:", skillId);
        const skillResponse = await axios.get(`http://localhost:5000/api/skill/skills/${skillId}`);
        console.log("Données de la compétence reçues:", skillResponse.data);
        setSkill(skillResponse.data);

        // Récupérer la liste des étudiants
        console.log("Récupération des étudiants pour la compétence:", skillId);
        const studentsResponse = await axios.get(`http://localhost:5000/api/skill/${skillId}/students`);
        console.log("Étudiants reçus:", studentsResponse.data);
        setStudents(studentsResponse.data);
      } catch (err) {
        console.error('Erreur lors de la récupération des données:', err);
        setError(`Erreur lors de la récupération des données: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    if (skillId) {
      fetchSkillAndStudents();
    }
  }, [skillId]);

  // Fonction pour bloquer un étudiant
  const handleBlockStudent = async (studentId) => {
    if (!user || !user._id) {
      alert('Vous devez être connecté pour effectuer cette action.');
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/auth/block-student/${studentId}`, {
        educatorId: user._id,
        studentId,
      });
      // Mettre à jour la liste localement après blocage
      setStudents(prevStudents => prevStudents.filter(student => student._id !== studentId));
      alert('Étudiant bloqué avec succès.');
    } catch (err) {
      console.error(err);
      alert('Erreur lors du blocage de l\'étudiant.');
    }
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Participants à la compétence</h1>
        <Link to="/Profile/skills" className="btn btn-outline-primary">
          <FaArrowLeft className="me-2" /> Retour aux compétences
        </Link>
      </div>

      {loading && (
        <div className="text-center py-5">
          <FaSpinner className="fa-spin mb-3" size={30} />
          <p>Chargement des participants...</p>
        </div>
      )}

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {!loading && skill && (
        <div className="card mb-4">
          <div className="card-body">
            <div className="d-flex align-items-center">
              <img
                src={skill.image || '/assets/img/default-course.jpg'}
                alt={skill.skillname}
                className="me-3 rounded"
                style={{ width: '80px', height: '80px', objectFit: 'cover' }}
              />
              <div>
                <h5 className="card-title mb-1">{skill.skillname}</h5>
                <p className="card-text text-muted mb-0">
                  {skill.shortDescription || skill.description?.substring(0, 100) || 'Aucune description disponible'}
                </p>
                <div className="mt-2">
                  <span className="badge bg-primary me-2">{skill.category?.title || 'Non catégorisé'}</span>
                  <span className="badge bg-secondary">{students.length} participant(s)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {!loading && students.length === 0 ? (
        <div className="text-center py-5">
          <div className="mb-3">
            <FaUser size={50} className="text-muted" />
          </div>
          <h4>Aucun participant inscrit</h4>
          <p className="text-muted">Cette compétence n'a pas encore d'inscrits.</p>
        </div>
      ) : (
        <>
          {!loading && (
            <p className="mb-4">{students.length} participant(s) inscrit(s) à cette compétence</p>
          )}

          <div className="card">
            <div className="card-body p-0">
              <ul className="list-group list-group-flush">
                {students.map((student) => (
                  <li key={student._id} className="list-group-item d-flex justify-content-between align-items-center p-3">
                    <div className="d-flex align-items-center">
                      <div className="avatar me-3">
                        <img
                          src={student.avatar || '/assets/img/default-avatar.jpg'}
                          alt={student.name}
                          className="rounded-circle"
                          style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                        />
                      </div>
                      <div>
                        <h6 className="mb-0">{student.name}</h6>
                        <div className="d-flex align-items-center text-muted">
                          <FaEnvelope size={12} className="me-1" />
                          <small>{student.email}</small>
                        </div>
                      </div>
                    </div>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleBlockStudent(student._id)}
                    >
                      <FaShieldAlt className="me-1" /> Bloquer
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default StudentsBySkill;
