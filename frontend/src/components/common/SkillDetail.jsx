import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import { Clock, Book, Award, User, Calendar, Tag, Info, CheckCircle, XCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import './SkillDetail.css';

function SkillDetail() {
  const { id } = useParams();
  const [skill, setSkill] = useState(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeLesson, setActiveLesson] = useState(null);
  const [creator, setCreator] = useState(null);
  const [category, setCategory] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);

  const userId = localStorage.getItem("userId"); // récupère le userId stocké en localStorage (si login OK)

  useEffect(() => {
    const fetchSkillWithProgress = async () => {
      try {
        setLoading(true);
        // 1. D'abord récupérer la compétence à afficher
        const res = await axios.get(`http://localhost:5000/api/skill/skills/${id}`);
        setSkill(res.data);

        // 2. Si l'utilisateur est connecté, enregistrer la progression
        if (userId) {
          try {
            await axios.post(`http://localhost:5000/api/skill/read-skill`, {
              userId,
              skillId: id,
            });

            // Vérifier si l'utilisateur est inscrit à cette compétence
            const userRes = await axios.get(`http://localhost:5000/api/auth/user/${userId}`);
            if (userRes.data && userRes.data.enrolledSkills) {
              setIsEnrolled(userRes.data.enrolledSkills.includes(id));
            }
          } catch (progressError) {
            console.error("Erreur lors de l'enregistrement de la progression:", progressError);
            // Ne pas bloquer l'affichage de la compétence si l'enregistrement de la progression échoue
          }
        }

        // 3. Récupérer les informations sur le créateur si disponible
        if (res.data.creator) {
          try {
            const creatorRes = await axios.get(`http://localhost:5000/api/auth/user/${res.data.creator}`);
            setCreator(creatorRes.data);
          } catch (creatorError) {
            console.error("Erreur lors de la récupération du créateur:", creatorError);
          }
        }

        // 4. Récupérer les informations sur la catégorie si disponible
        if (res.data.category) {
          try {
            const categoryRes = await axios.get(`http://localhost:5000/api/category/${res.data.category}`);
            setCategory(categoryRes.data);
          } catch (categoryError) {
            console.error("Erreur lors de la récupération de la catégorie:", categoryError);
          }
        }

        // 5. Définir la première leçon comme active par défaut
        if (res.data.lessons && res.data.lessons.length > 0) {
          setActiveLesson(res.data.lessons[0]);
        }
      } catch (error) {
        console.error("Erreur lors du chargement de la compétence:", error);
        setError("Erreur lors du chargement de la compétence. Vérifiez que l'ID est correct.");
      } finally {
        setLoading(false);
      }
    };

    fetchSkillWithProgress();
  }, [id, userId]);

  useEffect(() => {
    if (skill) {
      const calculateProgress = () => {
        if (!skill.lessons || !Array.isArray(skill.lessons) || skill.lessons.length === 0) return 0;

        // Vérifier si nous avons des informations sur les leçons complétées
        // Si non, on suppose qu'aucune leçon n'est complétée
        const completed = skill.lessons.filter((lesson) => lesson.completed).length;
        return Math.round((completed / skill.lessons.length) * 100);
      };
      setProgress(calculateProgress());
    }
  }, [skill]);

  const handleLessonClick = (lesson) => {
    setActiveLesson(lesson);
  };

  const handleNextLesson = () => {
    if (!skill || !skill.lessons || !activeLesson) return;

    const currentIndex = skill.lessons.findIndex(lesson => lesson._id === activeLesson._id);
    if (currentIndex < skill.lessons.length - 1) {
      setActiveLesson(skill.lessons[currentIndex + 1]);
    }
  };

  const handlePrevLesson = () => {
    if (!skill || !skill.lessons || !activeLesson) return;

    const currentIndex = skill.lessons.findIndex(lesson => lesson._id === activeLesson._id);
    if (currentIndex > 0) {
      setActiveLesson(skill.lessons[currentIndex - 1]);
    }
  };

  // Formatage de la date
  const formatDate = (dateString) => {
    if (!dateString) return "Date inconnue";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  // Calcul de la durée totale
  const calculateTotalDuration = (lessons) => {
    if (!lessons || !Array.isArray(lessons)) return 0;
    return lessons.reduce((total, lesson) => total + (lesson.duration || 0), 0);
  };

  if (error) return (
    <div className="skill-detail-page">
      <Header />
      <main className="container py-5">
        <div className="alert alert-danger">
          <h1>Erreur</h1>
          <p>{error}</p>
          <Link to="/skills" className="btn btn-primary mt-3">Retour aux compétences</Link>
        </div>
      </main>
      <Footer />
    </div>
  );

  if (loading || !skill) return (
    <div className="skill-detail-page">
      <Header />
      <main className="container py-5">
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );

  const progressBarClass = progress >= 100 ? "bg-success" : "bg-info";

  return (
    <div className="skill-detail-page">
      <Header />
      <main className="container py-5">
        <div className="row">
          {/* Colonne de gauche - Informations sur la compétence */}
          <div className="col-lg-4">
            <div className="card mb-4 shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h1 className="card-title h3">{skill.skillname}</h1>
                  <span className={`badge ${skill.status === 'active' ? 'bg-success' : 'bg-warning'}`}>
                    {skill.status === 'active' ? 'Actif' : 'En attente'}
                  </span>
                </div>

                {skill.image && (
                  <img
                    src={skill.image}
                    alt={skill.skillname}
                    className="img-fluid rounded mb-3"
                    style={{ maxHeight: '200px', width: '100%', objectFit: 'cover' }}
                  />
                )}

                <div className="progress mb-3" style={{ height: "20px" }}>
                  <div
                    className={`progress-bar ${progressBarClass}`}
                    role="progressbar"
                    style={{ width: `${progress}%` }}
                  >
                    {progress}% Complété
                  </div>
                </div>

                <div className="skill-info">
                  <div className="d-flex align-items-center mb-2">
                    <Clock size={18} className="me-2 text-primary" />
                    <span>Durée totale: {calculateTotalDuration(skill.lessons)} minutes</span>
                  </div>

                  <div className="d-flex align-items-center mb-2">
                    <Book size={18} className="me-2 text-primary" />
                    <span>Niveau: {skill.level || 'Débutant'}</span>
                  </div>

                  <div className="d-flex align-items-center mb-2">
                    <Award size={18} className="me-2 text-primary" />
                    <span>Prix: {skill.pricingType === 'free' ? 'Gratuit' : `${skill.price} €`}</span>
                  </div>

                  {creator && (
                    <div className="d-flex align-items-center mb-2">
                      <User size={18} className="me-2 text-primary" />
                      <span>Créateur: {creator.name}</span>
                    </div>
                  )}

                  {category && (
                    <div className="d-flex align-items-center mb-2">
                      <Tag size={18} className="me-2 text-primary" />
                      <span>Catégorie: {category.title}</span>
                    </div>
                  )}

                  <div className="d-flex align-items-center mb-2">
                    <Calendar size={18} className="me-2 text-primary" />
                    <span>Créé le: {formatDate(skill.createdDate)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="card shadow-sm">
              <div className="card-header bg-light">
                <h3 className="h5 mb-0">Description</h3>
              </div>
              <div className="card-body">
                <p>{skill.description || "Aucune description disponible."}</p>

                {skill.objectives && skill.objectives.length > 0 && (
                  <div className="mt-3">
                    <h4 className="h6">Objectifs:</h4>
                    <ul className="list-group list-group-flush">
                      {skill.objectives.map((objective, index) => (
                        <li key={index} className="list-group-item bg-transparent px-0">
                          <CheckCircle size={16} className="me-2 text-success" />
                          {objective}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {skill.prerequisites && skill.prerequisites.length > 0 && (
                  <div className="mt-3">
                    <h4 className="h6">Prérequis:</h4>
                    <ul className="list-group list-group-flush">
                      {skill.prerequisites.map((prerequisite, index) => (
                        <li key={index} className="list-group-item bg-transparent px-0">
                          <Info size={16} className="me-2 text-info" />
                          {prerequisite}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Colonne de droite - Contenu des leçons */}
          <div className="col-lg-8">
            <div className="card shadow-sm">
              <div className="card-header bg-light d-flex justify-content-between align-items-center">
                <h3 className="h5 mb-0">Leçons</h3>
                <span className="badge bg-primary">{skill.lessons.length} leçons</span>
              </div>
              <div className="card-body">
                {skill.lessons.length === 0 ? (
                  <p>Aucune leçon pour cette compétence.</p>
                ) : (
                  <div className="row">
                    <div className="col-md-4">
                      <div className="list-group">
                        {skill.lessons.map((lesson, index) => (
                          <button
                            key={lesson._id}
                            className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${activeLesson && activeLesson._id === lesson._id ? 'active' : ''}`}
                            onClick={() => handleLessonClick(lesson)}
                          >
                            <div>
                              <span className="me-2">{index + 1}.</span>
                              {lesson.title}
                            </div>
                            {lesson.completed && (
                              <CheckCircle size={16} className={`${activeLesson && activeLesson._id === lesson._id ? 'text-white' : 'text-success'}`} />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="col-md-8">
                      {activeLesson ? (
                        <div className="lesson-content">
                          <h4>{activeLesson.title}</h4>
                          <div className="d-flex align-items-center text-muted mb-3">
                            <Clock size={16} className="me-1" />
                            <small>{activeLesson.duration} minutes</small>
                          </div>

                          <div className="lesson-text mb-4">
                            {activeLesson.content.split('\n').map((paragraph, idx) => (
                              <p key={idx}>{paragraph}</p>
                            ))}
                          </div>

                          {activeLesson.resources && activeLesson.resources.length > 0 && (
                            <div className="resources mb-4">
                              <h5>Ressources</h5>
                              <ul className="list-group">
                                {activeLesson.resources.map((resource, idx) => (
                                  <li key={idx} className="list-group-item">
                                    <a href={resource.url} target="_blank" rel="noopener noreferrer">
                                      {resource.title || 'Ressource ' + (idx + 1)}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          <div className="d-flex justify-content-between mt-4">
                            <button
                              className="btn btn-outline-primary"
                              onClick={handlePrevLesson}
                              disabled={skill.lessons.indexOf(activeLesson) === 0}
                            >
                              <ArrowLeft size={16} className="me-1" /> Précédent
                            </button>

                            <button
                              className="btn btn-outline-primary"
                              onClick={handleNextLesson}
                              disabled={skill.lessons.indexOf(activeLesson) === skill.lessons.length - 1}
                            >
                              Suivant <ArrowRight size={16} className="ms-1" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-5">
                          <p>Sélectionnez une leçon pour afficher son contenu</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default SkillDetail;