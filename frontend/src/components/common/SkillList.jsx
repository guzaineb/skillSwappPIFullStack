// SkillList.jsx
import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSkillStore } from '../../store/skillStore';
import { useAuthStore } from '../../store/authStore';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import {
  BookOpen,
  Clock,
  Award,
  Search,
  Filter,
  ChevronRight,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * Composant affichant la liste des compétences auxquelles l'utilisateur est inscrit
 */
const SkillList = () => {
  const { user, isAuthenticated, isCheckingAuth } = useAuthStore();
  const { fetchUserSkills, fetchUserSkillProgress } = useSkillStore();

  const [userSkills, setUserSkills] = useState([]);
  const [skillProgress, setSkillProgress] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'completed', 'in-progress'
  const [sortBy, setSortBy] = useState('recent'); // 'recent', 'name', 'progress'
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fonction pour charger les compétences de l'utilisateur
  const loadUserSkills = useCallback(async () => {
    if (!user?._id) return;

    try {
      setIsLoading(true);
      setError(null);

      // Récupérer les compétences de l'utilisateur
      const skills = await fetchUserSkills(user._id);
      setUserSkills(skills || []);

      // Récupérer la progression pour chaque compétence
      if (Array.isArray(skills) && skills.length > 0) {
        const progressPromises = skills.map(skill =>
          fetchUserSkillProgress(user._id, skill._id)
        );

        const progressResults = await Promise.all(progressPromises);

        // Créer un objet avec la progression de chaque compétence
        const progressMap = {};
        progressResults.forEach((progress, index) => {
          if (progress && skills[index]) {
            progressMap[skills[index]._id] = progress;
          }
        });

        setSkillProgress(progressMap);
      }
    } catch (error) {
      console.error("Erreur lors du chargement des compétences :", error);
      setError("Impossible de charger vos compétences.");
      toast.error("Erreur de chargement des compétences.");
    } finally {
      setIsLoading(false);
    }
  }, [user?._id, fetchUserSkills, fetchUserSkillProgress]);

  // Fonction pour continuer une compétence
  const handleContinueSkill = (skillId) => {
    navigate(`/Profile1/skills/${skillId}/progress`);
  };

  // Chargement initial des données
  useEffect(() => {
    if (isCheckingAuth) return;

    if (!user || !isAuthenticated) {
      toast.warn('Vous devez être connecté pour accéder à cette page.');
      navigate('/login');
      return;
    }

    loadUserSkills();
  }, [user, isAuthenticated, isCheckingAuth, loadUserSkills, navigate]);

  // Filtrer et trier les compétences
  const filteredAndSortedSkills = userSkills
    .filter(skill => {
      // Filtrer par recherche
      const matchesSearch = searchQuery === '' ||
        skill.skillname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.category?.title?.toLowerCase().includes(searchQuery.toLowerCase());

      // Filtrer par statut
      const progress = skillProgress[skill._id];
      const isCompleted = progress?.isCompleted;

      if (filterStatus === 'all') return matchesSearch;
      if (filterStatus === 'completed') return matchesSearch && isCompleted;
      if (filterStatus === 'in-progress') return matchesSearch && !isCompleted;

      return matchesSearch;
    })
    .sort((a, b) => {
      // Trier les compétences
      if (sortBy === 'name') {
        return a.skillname.localeCompare(b.skillname);
      }

      if (sortBy === 'progress') {
        const progressA = skillProgress[a._id];
        const progressB = skillProgress[b._id];

        const percentA = progressA ?
          (progressA.completed / progressA.totalLessons) * 100 : 0;
        const percentB = progressB ?
          (progressB.completed / progressB.totalLessons) * 100 : 0;

        return percentB - percentA;
      }

      // Par défaut, trier par date (récent)
      return new Date(b.createdDate || 0) - new Date(a.createdDate || 0);
    });

  // Formater la durée en heures et minutes
  const formatDuration = (minutes) => {
    if (!minutes) return "Durée inconnue";

    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hours > 0) {
      return `${hours}h${mins > 0 ? ` ${mins}min` : ''}`;
    }
    return `${mins} min`;
  };

  // Animation pour les cartes
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  // Affichage du chargement
  if (isCheckingAuth || isLoading) {
    return (
      <div className="container py-5">
        <h2 className="mb-4">Mes compétences</h2>
        <div className="row g-4">
          {[...Array(6)].map((_, i) => (
            <div className="col-md-6 col-lg-4" key={i}>
              <Skeleton height={300} borderRadius={8} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Mes compétences</h2>
        <Link to="/skills" className="btn btn-primary">
          Explorer plus de compétences
        </Link>
      </div>

      {/* Barre de recherche et filtres */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0">
                  <Search size={18} />
                </span>
                <input
                  type="text"
                  className="form-control border-start-0 bg-light"
                  placeholder="Rechercher dans mes compétences..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-3">
              <select
                className="form-select bg-light"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">Tous les statuts</option>
                <option value="in-progress">En cours</option>
                <option value="completed">Terminées</option>
              </select>
            </div>
            <div className="col-md-3">
              <select
                className="form-select bg-light"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="recent">Plus récentes</option>
                <option value="name">Alphabétique</option>
                <option value="progress">Progression</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Message d'erreur */}
      {error && (
        <div className="alert alert-danger d-flex align-items-center" role="alert">
          <AlertCircle size={18} className="me-2" />
          {error}
        </div>
      )}

      {/* Liste des compétences */}
      {filteredAndSortedSkills.length === 0 ? (
        <div className="text-center py-5">
          <div className="mb-4">
            <img
              src="/assets/img/empty-skills.svg"
              alt="Aucune compétence"
              style={{ maxWidth: '200px', opacity: 0.7 }}
            />
          </div>
          <h4>Vous n'êtes inscrit à aucune compétence</h4>
          <p className="text-muted">Explorez notre catalogue pour découvrir des compétences qui vous intéressent</p>
          <Link to="/skills" className="btn btn-primary mt-3">
            Explorer les compétences
          </Link>
        </div>
      ) : (
        <motion.div
          className="row g-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredAndSortedSkills.map((skill) => {
            const progress = skillProgress[skill._id] || { completed: 0, totalLessons: 0, isCompleted: false };
            const progressPercent = progress.totalLessons > 0
              ? Math.round((progress.completed / progress.totalLessons) * 100)
              : 0;

            return (
              <motion.div
                key={skill._id}
                className="col-md-6 col-lg-4"
                variants={itemVariants}
              >
                <div className="card border-0 shadow-sm h-100">
                  <div className="position-relative">
                    <Link to={`/skills/${skill._id}`}>
                      <img
                        src={skill.image || '/assets/img/default-course.jpg'}
                        className="card-img-top"
                        alt={skill.skillname}
                        style={{ height: '180px', objectFit: 'cover' }}
                      />
                    </Link>
                    {progress.isCompleted && (
                      <div className="position-absolute top-0 end-0 m-2">
                        <span className="badge bg-success d-flex align-items-center">
                          <CheckCircle size={14} className="me-1" />
                          Terminée
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">
                      <Link to={`/skills/${skill._id}`} className="text-decoration-none text-dark">
                        {skill.skillname}
                      </Link>
                    </h5>

                    <div className="mb-3">
                      <span className="badge bg-light text-dark me-2">
                        {skill.category?.title || 'Non catégorisé'}
                      </span>
                      <span className="badge bg-light text-dark">
                        {skill.level === 'beginner' ? 'Débutant' :
                          skill.level === 'intermediate' ? 'Intermédiaire' :
                            skill.level === 'advanced' ? 'Avancé' : 'Tous niveaux'}
                      </span>
                    </div>

                    <div className="d-flex justify-content-between mb-2 text-muted small">
                      <div className="d-flex align-items-center">
                        <BookOpen size={14} className="me-1" />
                        <span>{skill.lessonCount || 0} leçons</span>
                      </div>
                      <div className="d-flex align-items-center">
                        <Clock size={14} className="me-1" />
                        <span>{formatDuration(skill.totalDuration)}</span>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between mb-2 text-muted small">
                      <div className="d-flex align-items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="me-1">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                          <circle cx="9" cy="7" r="4"></circle>
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                        <Link to={`/skills/${skill._id}/students`} className="text-decoration-none text-muted">
                          {skill.enrollmentCount || 0} participant(s)
                        </Link>
                      </div>
                    </div>

                    {/* Barre de progression */}
                    <div className="mb-3 mt-auto">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <span className="small">Progression</span>
                        <span className="small fw-bold">{progressPercent}%</span>
                      </div>
                      <div className="progress" style={{ height: '6px' }}>
                        <div
                          className={`progress-bar ${progress.isCompleted ? 'bg-success' : 'bg-primary'}`}
                          role="progressbar"
                          style={{ width: `${progressPercent}%` }}
                          aria-valuenow={progressPercent}
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>

                    <button
                      className="btn btn-outline-primary w-100 d-flex justify-content-between align-items-center"
                      onClick={() => handleContinueSkill(skill._id)}
                    >
                      <span>Continuer</span>
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
};

export default SkillList;
