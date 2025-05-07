import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { 
  CheckCircle, Download, BookOpen, ChevronLeft, ChevronRight, Mail, 
  Clock, Award, BarChart2, Bookmark, Loader2, AlertCircle
} from 'lucide-react';
import { toast } from 'react-toastify';
import './SkillProgress.css';

axios.defaults.baseURL = 'http://localhost:5000/api';

const SkillProgress = () => {
  const { user } = useAuthStore();
  const { skillId } = useParams();
  const navigate = useNavigate();
  
  const initialState = {
    progress: { 
      completedLessons: [],
      isCompleted: false,
      totalLessons: 0
    },
    currentLessonIndex: 0,
    certificate: null,
    isLoading: true,
    isGeneratingCert: false,
    error: null,
    skillDetails: null,
    activeTab: 'content',
    isMarkingComplete: false,
    retryCount: 0
  };

  const [state, setState] = useState(initialState);

  const updateState = useCallback((updates) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  const fetchData = useCallback(async () => {
    try {
      updateState({ isLoading: true, error: null });
      
      const [progressRes, skillData] = await Promise.all([
        axios.get(`/skill/progress/${user._id}/${skillId}`),
        axios.get(`/skill/skills/${skillId}`)
      ]);

      const lessons = skillData.data?.lessons || [];
      const completedLessons = progressRes.data.completedLessons || [];
      
      const firstIncomplete = lessons.findIndex(
        lesson => !completedLessons.includes(lesson._id.toString())
      );

      updateState({
        progress: {
          ...progressRes.data,
          totalLessons: lessons.length
        },
        skillDetails: skillData.data,
        currentLessonIndex: firstIncomplete !== -1 ? firstIncomplete : 0,
        isLoading: false,
        retryCount: 0
      });
    } catch (err) {
      const retryCount = state.retryCount + 1;
      if (retryCount <= 3) {
        setTimeout(() => fetchData(), 2000 * retryCount);
        updateState({ retryCount });
      } else {
        updateState({
          error: err.response?.data?.message || "Erreur de chargement des données",
          isLoading: false,
          retryCount: 0
        });
      }
    }
  }, [user?._id, skillId, state.retryCount, updateState]);

  const markLessonAsRead = useCallback(async () => {
    if (!state.skillDetails?.lessons || !user?._id) return;

    try {
      updateState({ isMarkingComplete: true });
      
      const currentLessonId = state.skillDetails.lessons[state.currentLessonIndex]._id;
      
      const res = await axios.post('/skill/read-skill', {
        userId: user._id,
        skillId,
        lessonId: currentLessonId
      });

      const updatedCompletedLessons = res.data.progress.completedLessons || [];
      const lessons = state.skillDetails.lessons;
      
      const nextIndex = lessons.findIndex(
        (lesson, index) => index > state.currentLessonIndex && 
        !updatedCompletedLessons.includes(lesson._id.toString())
      );

      const isSkillCompleted = res.data.progress.isCompleted;

      updateState({
        progress: {
          ...res.data.progress,
          totalLessons: lessons.length
        },
        currentLessonIndex: nextIndex !== -1 ? nextIndex : state.currentLessonIndex,
        isMarkingComplete: false
      });

      if (isSkillCompleted) {
        await handleGenerateCertificate();
      }

      toast.success("Progression enregistrée !");
    } catch (err) {
      toast.error(err.response?.data?.message || "Erreur lors de la mise à jour");
      updateState({ isMarkingComplete: false });
    }
  }, [state.currentLessonIndex, state.skillDetails, skillId, user?._id, updateState]);

  const handleGenerateCertificate = useCallback(async () => {
    try {
      updateState({ isGeneratingCert: true });
      
      const res = await axios.post('/skill/generate-certificate', {
        userId: user._id,
        skillId
      });

      if (!res.data?.certificateUrl) {
        throw new Error("URL du certificat manquante");
      }

      const test = await fetch(res.data.certificateUrl);
      if (!test.ok) throw new Error("Certificat inaccessible");

      updateState({ 
        certificate: res.data.certificateUrl,
        isGeneratingCert: false
      });
      
      toast.success("Certificat généré !");
    } catch (err) {
      toast.error(err.response?.data?.message || `Erreur: ${err.message}`);
      updateState({ isGeneratingCert: false });
    }
  }, [skillId, user?._id, updateState]);

  const sendCertificateByEmail = useCallback(async () => {
    if (!state.certificate) {
      toast.warning("Aucun certificat disponible");
      return;
    }

    try {
      await axios.post('/certificate/send-email', {
        userId: user._id,
        skillId,
        certificateUrl: state.certificate
      });
      
      toast.success("Certificat envoyé par email !");
    } catch (err) {
      toast.error(err.response?.data?.message || "Erreur lors de l'envoi");
    }
  }, [skillId, state.certificate, user?._id]);

  const navigateLesson = useCallback((direction) => {
    const { currentLessonIndex, skillDetails } = state;
    if (!skillDetails?.lessons) return;

    const newIndex = direction === 'prev' 
      ? currentLessonIndex - 1 
      : currentLessonIndex + 1;
    
    if (newIndex >= 0 && newIndex < skillDetails.lessons.length) {
      updateState({ currentLessonIndex: newIndex });
    }
  }, [state, updateState]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowLeft') navigateLesson('prev');
    if (e.key === 'ArrowRight') navigateLesson('next');
  }, [navigateLesson]);

  useEffect(() => {
    if (user?._id && skillId) {
      fetchData();
    } else {
      updateState({ 
        error: "Identifiants utilisateur ou compétence manquants",
        isLoading: false 
      });
    }
  }, [user?._id, skillId, fetchData, updateState]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const { 
    progress, 
    currentLessonIndex, 
    certificate, 
    isLoading, 
    isGeneratingCert, 
    error, 
    skillDetails,
    isMarkingComplete,
    retryCount
  } = state;

  const currentLesson = skillDetails?.lessons?.[currentLessonIndex];
  const completionPercentage = useMemo(() => 
    progress.totalLessons > 0 
      ? Math.round((progress.completedLessons.length / progress.totalLessons) * 100)
      : 0,
    [progress.completedLessons.length, progress.totalLessons]
  );

  const LessonContent = memo(({ lesson }) => (
    <div className="lesson-content-text" role="region" aria-label="Contenu de la leçon">
      {lesson.content.split('\n').map((paragraph, i) => (
        <p key={i} className="lesson-paragraph">{paragraph}</p>
      ))}
    </div>
  ));

  if (isLoading) {
    return (
      <div className="loading-container" role="status" aria-live="polite">
        <Loader2 className="loader-icon" />
        <p className="loading-text">Chargement de votre progression...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container" role="alert">
        <div className="error-box">
          <div className="error-content">
            <AlertCircle className="error-icon" />
            <div className="error-message">
              <h3 className="error-title">Erreur</h3>
              <p className="error-description">{error}</p>
              {retryCount > 0 && (
                <p className="retry-text">Nouvelle tentative {retryCount}/3...</p>
              )}
              <div className="error-actions">
                <button 
                  onClick={() => fetchData()}
                  className="retry-button"
                  aria-label="Réessayer le chargement"
                >
                  Réessayer
                </button>
                <button 
                  onClick={() => navigate('/Profile1/skills')}
                  className="error-button"
                  aria-label="Retour aux compétences"
                >
                  Retour aux compétences
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="skill-progress-container" role="main" aria-label="Progression des compétences">
      {/* Header with circular progress */}
      <section className="header-card" aria-labelledby="skill-header">
        <div className="header-content">
          <div className="header-info">
            <div className="skill-info">
              <div className="skill-icon-container">
                <BookOpen className="skill-icon" aria-hidden="true" />
              </div>
              <div>
                <h1 id="skill-header" className="skill-title">{skillDetails?.skillname}</h1>
                <p className="skill-description">{skillDetails?.description}</p>
              </div>
            </div>
            <div className="progress-container">
              <div className="progress-header">
                <span className="progress-label">Progression globale</span>
                <span className="progress-percentage">{completionPercentage}%</span>
              </div>
              <div className="circular-progress" role="progressbar" aria-valuenow={completionPercentage} aria-valuemin="0" aria-valuemax="100">
                <svg className="progress-ring" viewBox="0 0 100 100">
                  <circle className="progress-ring-bg" cx="50" cy="50" r="45" />
                  <circle 
                    className="progress-ring-fill" 
                    cx="50" cy="50" r="45" 
                    style={{ strokeDashoffset: 283 - (283 * completionPercentage) / 100 }}
                  />
                </svg>
                <span className="progress-text">{completionPercentage}%</span>
              </div>
              <div className="progress-details">
                <span>{progress.completedLessons.length} leçons terminées</span>
                <span>{progress.totalLessons - progress.completedLessons.length} restantes</span>
              </div>
            </div>
          </div>
          <div className="level-container">
            <Award className="level-icon" aria-hidden="true" />
            <span className="level-text">Niveau {skillDetails?.level}</span>
          </div>
        </div>
      </section>
  
      <div className="main-content">
        {/* Lessons navigation */}
        <nav className="lessons-sidebar" aria-label="Navigation des leçons">
          <div className="lessons-card">
            <div className="lessons-header">
              <h2 className="lessons-title">
                <Bookmark className="lessons-icon" aria-hidden="true" />
                Parcours d'apprentissage
              </h2>
            </div>
            <ul className="lessons-list" role="listbox" aria-label="Liste des leçons">
              {skillDetails?.lessons?.map((lesson, index) => {
                const isCompleted = progress.completedLessons.includes(lesson._id.toString());
                const isCurrent = currentLessonIndex === index;
                const lessonProgress = Math.round((index / skillDetails.lessons.length) * 100);
  
                return (
                  <li 
                    key={lesson._id}
                    className={`lesson-item ${isCurrent ? 'lesson-current' : ''}`}
                    onClick={() => updateState({ currentLessonIndex: index })}
                    role="option"
                    aria-selected={isCurrent}
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && updateState({ currentLessonIndex: index })}
                  >
                    <div className="lesson-content">
                      <div className="lesson-status">
                        <div className={`status-circle ${isCompleted ? 'status-completed' : 'status-incomplete'}`}>
                          {isCompleted ? (
                            <CheckCircle className="status-icon" aria-hidden="true" />
                          ) : (
                            <span className="status-number">{index + 1}</span>
                          )}
                        </div>
                        {!isCompleted && (
                          <div className="status-pulse" />
                        )}
                      </div>
                      <div className="lesson-details">
                        <div className="lesson-title-container">
                          <p className={`lesson-title-text ${isCurrent ? 'lesson-title-current' : ''}`}>
                            {lesson.title}
                          </p>
                          {isCurrent && (
                            <span className="lesson-current-badge">En cours</span>
                          )}
                        </div>
                        <div className="lesson-meta">
                          <div className="lesson-duration">
                            <Clock className="duration-icon" aria-hidden="true" />
                            <span>{lesson.duration} min</span>
                          </div>
                          <div className="lesson-progress-bar">
                            <div 
                              className="lesson-progress-fill" 
                              style={{ width: `${isCompleted ? 100 : lessonProgress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
  
        {/* Main content */}
        <section className="content-area" aria-labelledby="lesson-content">
          <div className="content-card">
            {currentLesson ? (
              <>
                <header className="content-header">
                  <div className="content-title-section">
                    <h2 id="lesson-content" className="content-title">{currentLesson.title}</h2>
                    <div className="content-duration">
                      <Clock className="duration-icon" aria-hidden="true" />
                      <span>Durée estimée : {currentLesson.duration} minutes</span>
                    </div>
                  </div>
                  <div className="navigation-controls">
                    <button
                      onClick={() => navigateLesson('prev')}
                      disabled={currentLessonIndex === 0}
                      className="nav-button"
                      aria-label="Leçon précédente"
                    >
                      <ChevronLeft className="nav-icon" />
                    </button>
                    <span className="step-indicator">
                      Étape {currentLessonIndex + 1}/{skillDetails.lessons.length}
                    </span>
                    <button
                      onClick={() => navigateLesson('next')}
                      disabled={currentLessonIndex === skillDetails.lessons.length - 1}
                      className="nav-button"
                      aria-label="Leçon suivante"
                    >
                      <ChevronRight className="nav-icon" />
                    </button>
                  </div>
                </header>
  
                <div className="content-body">
                  <LessonContent lesson={currentLesson} />
  
                  <footer className="content-footer">
                    <div className="progress-info">
                      <BarChart2 className="progress-icon" aria-hidden="true" />
                      <span>Progression actuelle : {Math.round((currentLessonIndex / skillDetails.lessons.length) * 100)}%</span>
                    </div>
                    {!progress.completedLessons.includes(currentLesson._id.toString()) ? (
                      <button
                        onClick={markLessonAsRead}
                        disabled={isMarkingComplete}
                        className="complete-button"
                        aria-label="Valider cette leçon"
                      >
                        {isMarkingComplete ? (
                          <>
                            <Loader2 className="loader-icon-small" />
                            Validation...
                          </>
                        ) : (
                          <>
                            <CheckCircle className="complete-icon" />
                            Valider
                          </>
                        )}
                      </button>
                    ) : (
                      <div className="completed-badge">
                        <CheckCircle className="complete-icon" />
                        Leçon validée
                      </div>
                    )}
                  </footer>
                </div>
              </>
            ) : (
              <div className="no-lesson" role="alert">
                Sélectionnez une leçon pour commencer
              </div>
            )}
          </div>
  
          {/* Certificate section */}
          {progress.isCompleted && (
            <section className="certificate-card" aria-labelledby="certificate-header">
              <div className="certificate-header">
                <div className="certificate-title">
                  <Award className="certificate-icon" aria-hidden="true" />
                  <h3 id="certificate-header" className="certificate-title-text">Certificat de réussite</h3>
                </div>
              </div>
              <div className="certificate-body">
                <div className="certificate-content">
                  <p className="certificate-description">
                    Félicitations ! Vous avez terminé toutes les leçons.
                  </p>
                  <div className="certificate-actions">
                    {certificate ? (
                      <>
                        <a
                          href={certificate}
                          download
                          className="download-button"
                          aria-label="Télécharger le certificat"
                        >
                          <Download className="download-icon" />
                          Télécharger
                        </a>
                        <button
                          onClick={sendCertificateByEmail}
                          className="email-button"
                          aria-label="Envoyer le certificat par email"
                        >
                          <Mail className="email-icon" />
                          Envoyer
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={handleGenerateCertificate}
                        disabled={isGeneratingCert}
                        className="generate-certificate-button"
                        aria-label="Générer le certificat"
                      >
                        {isGeneratingCert ? (
                          <>
                            <Loader2 className="loader-icon-small" />
                            Génération...
                          </>
                        ) : (
                          <>
                            <Download className="download-icon" />
                            Obtenir
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </section>
          )}
        </section>
      </div>
    </div>
  );
};

export default SkillProgress;