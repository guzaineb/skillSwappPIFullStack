import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSkillStore } from '../../store/skillStore';

export const CourseDetails = () => {
  const { id } = useParams();
  const fetchSkillById = useSkillStore((state) => state.fetchSkillById);
  const course = useSkillStore((state) => state.selectedSkill);
  const lesson = useSkillStore((state) => state.lessons.find((lesson) => lesson._id === id));

  useEffect(() => {
    if (id) fetchSkillById(id);
  }, [id, fetchSkillById]);

  return (
    <div>
      {/* Header du cours */}
      <div
        className="course-header text-white mb-4"
        style={{
          backgroundImage: `url(${course?.image || '/assets/img/bg-course.jpg'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '60px 30px',
        }}
      >
        <div className="container">
          <h1>{course?.skillname}</h1>
          <p className="lead">{course?.description }</p>
          <button className="btn btn-warning mt-3">S'inscrire au cours</button>
        </div>
      </div>

      <section className="page-content course-sec">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              {/* Overview */}
              <div className="card overview-sec mb-4">
                <div className="card-body">
                  <h5 className="subs-title">Aperçu</h5>
                  <h6>Description du cours</h6>
                  <p>{course?.description }</p>

                  <h6>Ce que vous apprendrez</h6>
                  <div className="row">
                    <div className="col-md-6">
                      <ul>
                        <li>{course.lesson?.titre }</li>
                        <li>Créer des designs interactifs</li>
                        <li>Tester des prototypes</li>
                      </ul>
                    </div>
                    <div className="col-md-6">
                      <ul>
                        <li>Maîtriser Adobe XD</li>
                        <li>Créer des interfaces mobiles</li>
                        <li>Exporter des maquettes pro</li>
                      </ul>
                    </div>
                  </div>

                  <h6>Pré-requis</h6>
                  <ul className="mb-0">
                    <li>Aucune expérience préalable nécessaire</li>
                    <li>Un ordinateur avec Adobe XD 2019+</li>
                  </ul>
                </div>
              </div>

              {/* Contenu du cours */}
              <div className="card content-sec mb-4">
                <div className="card-body">
                  <div className="row mb-3">
                    <div className="col-sm-6">
                      <h5 className="subs-title">Contenu du cours</h5>
                    </div>
                    <div className="col-sm-6 text-sm-end">
                      <h6>92 Leçons – 10:56:11</h6>
                    </div>
                  </div>

                  {["Introduction", "Wireframing", "Typographie & Couleur", "Prototypage"].map((title, index) => {
                    const collapseId = `collapse${index + 1}`;
                    return (
                      <div className="course-card mb-3 p-3 bg-light rounded shadow-sm" key={collapseId}>
                        <h6 className="cou-title">
                          <a className="collapsed d-flex justify-content-between" data-bs-toggle="collapse" href={`#${collapseId}`} aria-expanded="false">
                            {title}
                            <i className="bi bi-chevron-down"></i>
                          </a>
                        </h6>
                        <div id={collapseId} className="card-collapse collapse">
                          <ul className="list-unstyled mt-2">
                            {Array.from({ length: 3 }).map((_, i) => (
                              <li key={i} className="d-flex justify-content-between align-items-center py-2 border-bottom">
                                <span>
                                  <img src="/assets/img/icon/play.svg" alt="Play" className="me-2" />
                                  Leçon {index + 1}.{i + 1} - Titre de la leçon
                                </span>
                                <div>
                                  <Link to={`/lecture/${id}/${index}-${i}`}>Voir</Link>
                                  <span className="ms-2 text-muted">03:15</span>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* À propos de l'instructeur */}
              <div className="card p-4">
                <h6>À propos de l’instructeur</h6>
                <div className="d-flex align-items-center mt-3">
                  <img src="/assets/img/user.jpg" className="rounded-circle me-3" width="60" height="60" alt="Instructor" />
                  <div>
                    <strong>{course?.instructor || 'John Doe'}</strong><br />
                    <span className="text-muted">UX Designer, Google</span><br />
                    <small>10+ ans d'expérience dans le design numérique et la pédagogie UX.</small>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
