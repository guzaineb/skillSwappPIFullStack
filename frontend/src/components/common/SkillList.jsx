<<<<<<< HEAD

=======
>>>>>>> origin/tasks
// SkillList.jsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSkillStore } from '../../store/skillStore';
import { useAuthStore } from '../../store/authStore';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkillList = () => {
  const { user, isAuthenticated, isCheckingAuth } = useAuthStore();
  const { skills, fetchSkills } = useSkillStore();

  const [filteredSkills, setFilteredSkills] = useState([]);
  const [localError, setLocalError] = useState(null);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const navigate = useNavigate();

  const handleContinueSkill = async (skillId) => {
    try {
      const skillRes = await axios.get(`http://localhost:5000/api/skill/skills/${skillId}`);
      const skillData = skillRes.data;

      navigate(`/Profile1/skills/${skillId}/progress`, {
        state: {
          skill: skillData
        }
      });
    } catch (err) {
      console.error("Erreur lors de la récupération de la compétence :", err);
      toast.error("Impossible d'ouvrir la compétence.");
    }
  };

  useEffect(() => {
    if (isCheckingAuth) return;

    const init = async () => {
      try {
        if (!user || !user._id || !isAuthenticated) {
          toast.warn('Vous devez être connecté pour accéder à cette page.');
          navigate('/login');
          return;
        }

        await fetchSkills();
        const res = await axios.get(`http://localhost:5000/api/auth/user/${user._id}`);
        const enrolledSkills = res.data;

        const matchedSkills = skills.filter(skill =>
          enrolledSkills.some(enrolled => enrolled._id === skill._id)
        );
        setFilteredSkills(matchedSkills);
      } catch (error) {
        console.error("Erreur lors du chargement des compétences :", error);
        setLocalError("Impossible de charger vos compétences.");
        toast.error("Erreur de chargement.");
      } finally {
        setIsPageLoading(false);
      }
    };

    init();
  }, [user, isAuthenticated, isCheckingAuth]);

  if (isCheckingAuth || isPageLoading) {
    return (
      <div className="container mt-5">
        <Skeleton height={30} count={5} />
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-primary">🎓 Vos Compétences</h2>

      {localError && <div className="alert alert-danger">{localError}</div>}

      <section className="row g-4">
        {filteredSkills.length === 0 ? (
          <p>Aucune compétence trouvée.</p>
        ) : (
          filteredSkills.map((skill) => (
            <div key={skill._id} className="col-md-6 col-lg-4">
              <div className="card border-0 shadow-sm h-100 position-relative">
                <Link to={`/skills/${skill._id}`}>
                  <img
                    src={skill.image || '/assets/img/default-course.jpg'}
                    className="card-img-top"
                    alt={skill.skillname}
                    style={{ height: '220px', objectFit: 'cover', borderTopLeftRadius: '0.5rem', borderTopRightRadius: '0.5rem' }}
                  />
                </Link>

                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold">{skill.skillname}</h5>
                  <p className="card-text text-muted small flex-grow-1">
                    {skill.description?.length > 100
                      ? `${skill.description.slice(0, 100)}...`
                      : skill.description}
                  </p>
                  <p className="text-muted mb-2">
                    <i className="bi bi-folder-fill me-1"></i>{skill.category?.title}
                  </p>

                  <div className="d-flex justify-content-between mb-3 text-muted small">
                    <div className="d-flex align-items-center">
                      <img src="/assets/img/icon/icon-01.svg" alt="leçons" width="18" className="me-2" />
                      <span>{skill.lessonCount || 0} leçons</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <img src="/assets/img/icon/icon-02.svg" alt="durée" width="18" className="me-2" />
                      <span>{skill.totalDuration || '0h'} durée</span>
                    </div>
                  </div>

                  <button
                    className="btn btn-success btn-sm w-100 mt-auto"
                    onClick={() => handleContinueSkill(skill._id)}
                  >
                    ▶ Continuer
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

<<<<<<< HEAD

=======
>>>>>>> origin/tasks
export default SkillList;
