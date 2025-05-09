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
      <div className="loading-wrapper">
        <div className="loading-container">
          <Loader2 className="loading-spinner" />
          <p>Chargement de votre progression...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-wrapper">
        <div className="error-container">
          <div className="error-icon-container">
            <AlertCircle />
          </div>
          <h2>Une erreur est survenue</h2>
          <p>{error}</p>
          {retryCount > 0 && <p className="retry-message">Nouvelle tentative {retryCount}/3...</p>}
          <div className="error-buttons">
            <button onClick={() => fetchData()} className="retry-btn">
              Réessayer
            </button>
            <button onClick={() => navigate('/Profile1/skills')} className="back-btn">
              Retour aux compétences
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="skill-container">
      {/* Header */}
      <header className="skill-header">
        <div className="skill-header-content">
          <div className="skill-info-wrapper">
            <div className="skill-icon">
              <BookOpen />
            </div>
            <div className="skill-text">
              <h1>{skillDetails?.skillname}</h1>
              <p>{skillDetails?.description}</p>
              <div className="skill-level">
                <Award className="level-icon" />
                <span>Niveau {skillDetails?.level}</span>
              </div>
            </div>
          </div>
          
          <div className="progress-circle-container">
            <div className="progress-stats">
              <span>Progression</span>
              <span className="progress-percentage">{completionPercentage}%</span>
            </div>
            <div className="progress-circle">
              <svg viewBox="0 0 100 100">
                <circle className="progress-bg" cx="50" cy="50" r="45" />
                <circle 
                  className="progress-fill" 
                  cx="50" cy="50" 
                  r="45" 
                  style={{ 
                    strokeDashoffset: 283 - (283 * completionPercentage) / 100,
                    stroke: completionPercentage === 100 ? '#10b981' : '#3b82f6'
                  }} 
                />
              </svg>
              <div className="progress-text">{completionPercentage}%</div>
            </div>
            <div className="progress-details">
              <div>{progress.completedLessons.length} leçons terminées</div>
              <div>{progress.totalLessons - progress.completedLessons.length} restantes</div>
            </div>
          </div>
        </div>
      </header>

      <div className="content-wrapper">
        {/* Sidebar */}
        <aside className="lessons-sidebar">
          <div className="sidebar-header">
            <Bookmark className="sidebar-icon" />
            <h2>Parcours d'apprentissage</h2>
          </div>
          
          <ul className="lessons-list">
            {skillDetails?.lessons?.map((lesson, index) => {
              const isCompleted = progress.completedLessons.includes(lesson._id.toString());
              const isCurrent = currentLessonIndex === index;
              
              return (
                <li 
                  key={lesson._id}
                  className={`lesson-item ${isCurrent ? 'current' : ''} ${isCompleted ? 'completed' : ''}`}
                  onClick={() => updateState({ currentLessonIndex: index })}
                >
                  <div className="lesson-marker">
                    {isCompleted ? (
                      <CheckCircle className="check-icon" />
                    ) : (
                      <span className="lesson-number">{index + 1}</span>
                    )}
                  </div>
                  
                  <div className="lesson-info">
                    <div className="lesson-title">
                      {lesson.title}
                      {isCurrent && <span className="current-badge">En cours</span>}
                    </div>
                    
                    <div className="lesson-meta">
                      <div className="duration">
                        <Clock className="duration-icon" />
                        <span>{lesson.duration} min</span>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </aside>

        {/* Main content */}
        <main className="lesson-content">
          {currentLesson ? (
            <div className="lesson-container">
              <div className="lesson-header">
                <div className="lesson-title-area">
                  <h2>{currentLesson.title}</h2>
                  <div className="lesson-duration">
                    <Clock className="icon" />
                    <span>{currentLesson.duration} minutes</span>
                  </div>
                </div>
                
                <div className="lesson-navigation">
                  <button
                    onClick={() => navigateLesson('prev')}
                    disabled={currentLessonIndex === 0}
                    className="nav-button prev"
                  >
                    <ChevronLeft />
                    <span className="nav-text">Précédent</span>
                  </button>
                  
                  <div className="lesson-progress">
                    {currentLessonIndex + 1} / {skillDetails.lessons.length}
                  </div>
                  
                  <button
                    onClick={() => navigateLesson('next')}
                    disabled={currentLessonIndex === skillDetails.lessons.length - 1}
                    className="nav-button next"
                  >
                    <span className="nav-text">Suivant</span>
                    <ChevronRight />
                  </button>
                </div>
              </div>
              
              <div className="lesson-body">
                <LessonContent lesson={currentLesson} />
              </div>
              
              <div className="lesson-footer">
                <div className="lesson-progress-info">
                  <BarChart2 className="icon" />
                  <span>Progression: {Math.round((currentLessonIndex / skillDetails.lessons.length) * 100)}%</span>
                </div>
                
                {!progress.completedLessons.includes(currentLesson._id.toString()) ? (
                  <button
                    onClick={markLessonAsRead}
                    disabled={isMarkingComplete}
                    className="complete-button"
                  >
                    {isMarkingComplete ? (
                      <>
                        <Loader2 className="spinner" />
                        <span>Validation...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle className="icon" />
                        <span>Valider cette leçon</span>
                      </>
                    )}
                  </button>
                ) : (
                  <div className="completed-status">
                    <CheckCircle className="icon" />
                    <span>Leçon validée</span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-content">
                <BookOpen className="empty-icon" />
                <h3>Sélectionnez une leçon pour commencer</h3>
                <p>Choisissez une leçon dans la liste à gauche pour démarrer votre apprentissage</p>
              </div>
            </div>
          )}
          
          {/* Certificate section */}
          {progress.isCompleted && (
            <div className="certificate-section">
              <div className="certificate-header">
                <Award className="certificate-icon" />
                <h3>Certificat de réussite</h3>
              </div>
              
              <div className="certificate-content">
                <p>
                  Félicitations ! Vous avez terminé toutes les leçons de cette compétence.
                </p>
                
                <div className="certificate-actions">
                  {certificate ? (
                    <div className="certificate-buttons">
                      <a
                        href={certificate}
                        download
                        className="download-button"
                      >
                        <Download className="icon" />
                        <span>Télécharger</span>
                      </a>
                      
                      <button
                        onClick={sendCertificateByEmail}
                        className="email-button"
                      >
                        <Mail className="icon" />
                        <span>Envoyer par email</span>
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={handleGenerateCertificate}
                      disabled={isGeneratingCert}
                      className="generate-button"
                    >
                      {isGeneratingCert ? (
                        <>
                          <Loader2 className="spinner" />
                          <span>Génération en cours...</span>
                        </>
                      ) : (
                        <>
                          <Download className="icon" />
                          <span>Obtenir mon certificat</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default SkillProgress;
