import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaArrowLeft, FaUser, FaEnvelope, FaSpinner } from 'react-icons/fa';

/**
 * Composant pour afficher la liste des étudiants inscrits à une compétence
 */
const SkillStudents = () => {
  const { skillId } = useParams();
  const [skill, setSkill] = useState(null);
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSkillAndStudents = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Récupérer les informations de la compétence
        const skillResponse = await axios.get(`http://localhost:5000/api/skill/skills/${skillId}`);
        setSkill(skillResponse.data);

        // Récupérer la liste des étudiants
        const studentsResponse = await axios.get(`http://localhost:5000/api/skill/${skillId}/students`);
        setStudents(studentsResponse.data);
      } catch (err) {
        console.error('Erreur lors de la récupération des données:', err);
        setError('Impossible de charger les informations. Veuillez réessayer plus tard.');
        toast.error('Erreur lors du chargement des données');
      } finally {
        setIsLoading(false);
      }
    };

    if (skillId) {
      fetchSkillAndStudents();
    }
  }, [skillId]);

  if (isLoading) {
    return (
      <div className="container py-5 text-center">
        <FaSpinner className="fa-spin mb-3" size={30} />
        <p>Chargement des participants...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
        <Link to={`/skills/${skillId}`} className="btn btn-primary">
          <FaArrowLeft className="me-2" /> Retour à la compétence
        </Link>
      </div>
    );
  }

  if (!skill) {
    return (
      <div className="container py-5">
        <div className="alert alert-warning" role="alert">
          Compétence non trouvée
        </div>
        <Link to="/skills" className="btn btn-primary">
          <FaArrowLeft className="me-2" /> Retour aux compétences
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Participants à {skill.skillname}</h1>
        <Link to={`/skills/${skillId}`} className="btn btn-outline-primary">
          <FaArrowLeft className="me-2" /> Retour à la compétence
        </Link>
      </div>

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
                <span className="badge bg-secondary">{skill.enrollmentCount || 0} participant(s)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {students.length === 0 ? (
        <div className="text-center py-5">
          <div className="mb-3">
            <FaUser size={50} className="text-muted" />
          </div>
          <h4>Aucun participant inscrit</h4>
          <p className="text-muted">Cette compétence n'a pas encore d'inscrits.</p>
        </div>
      ) : (
        <>
          <p className="mb-4">{students.length} participant(s) inscrit(s) à cette compétence</p>

          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {students.map(student => (
              <div className="col" key={student._id}>
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-3">
                      <div className="avatar me-3">
                        <img
                          src={student.avatar || '/assets/img/default-avatar.jpg'}
                          alt={student.name}
                          className="rounded-circle"
                          style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                        />
                      </div>
                      <div>
                        <h5 className="card-title mb-0">{student.name}</h5>
                        <div className="d-flex align-items-center text-muted">
                          <FaEnvelope size={12} className="me-1" />
                          <small>{student.email}</small>
                        </div>
                      </div>
                    </div>

                    <Link to={`/profile/${student._id}`} className="btn btn-sm btn-outline-primary w-100">
                      Voir le profil
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SkillStudents;
