import { useEffect } from 'react';
import { useSkillStore } from './../../store/skillStore';
<<<<<<< HEAD

=======
>>>>>>> origin/tasks
import { Link, useNavigate } from 'react-router-dom';

export const SkillGrid = () => {
  const { skills, isLoading, error, fetchSkills, deleteSkill, findSkillById } = useSkillStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  if (isLoading) return <div className="text-center">Chargement...</div>;
  if (error) return <div className="text-center text-danger">Erreur: {error}</div>;

  return (
    <div className="container">
      <header className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">Our Skills</h2>
        </div>
        <Link to="/Profile/skills/new" className="btn btn-primary">Add skill</Link>
      </header>

      <div className="row">
        {skills.map((skill) => (
          <div className="col-xxl-4 col-md-6 d-flex" key={skill._id}>
            <div className="course-box flex-fill">
              <div className="product">
                <div className="product-img">
                  <Link to={`/skills/${skill._id}`}>
                    <img
                      className="img-fluid"
                      alt={skill.skillname}
                      src={skill.image || '/assets/img/default-course.jpg'}
                    />
                  </Link>
                  <div className={`price ${skill.pricingType === 'free' ? 'combo' : ''}`}>
                    {skill.pricingType === 'free' ? (
                      <h3>GRATUIT</h3>
                    ) : (
                      <h3>${skill.price}</h3>
                    )}
                  </div>
                </div>

                <div className="product-content">
                  <h3 className="title instructor-text">
                    <Link to={`/course-details/${skill._id}`}>{skill.skillname}</Link>
                  </h3>

                  <div className="course-info d-flex align-items-center">
                    <div className="rating-img d-flex align-items-center">
                      <img src="/assets/img/icon/icon-01.svg" alt="leçons" />
                      <p>{skill.lessonCount} Leçons</p>
                    </div>
                    <div className="course-view d-flex align-items-center">
                      <img src="/assets/img/icon/icon-02.svg" alt="niveau" />
                      <p>{skill.totalDuration}</p>
                    </div>
                  </div>

                  <div className="course-edit-btn d-flex align-items-center justify-content-between">
                    <Link to={`/Profile/skills/edit/${skill._id}`} className="btn btn-link">
                      <i className="bx bx-edit me-2"></i>Modifier
                    </Link>
                    <button
                      onClick={() => {
                        findSkillById(skill._id);
                        navigate(`/Profile/skill/${skill._id}/students`);
                      }}
                      className="btn btn-link text-info"
                    >
                      <i className="bx bx-group me-2"></i>Liste des participants
                    </button>
                    <button
                      onClick={() => deleteSkill(skill._id)}
                      className="btn btn-link text-danger"
                    >
                      <i className="bx bx-trash me-2"></i>Supprimer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
<<<<<<< HEAD

=======
>>>>>>> origin/tasks
        ))}
      </div>
    </div>
  );
};
