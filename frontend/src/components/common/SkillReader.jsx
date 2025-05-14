import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useSkillStore } from '../../store/skillStore';
import {
  CheckCircle,
  Clock,
  BookOpen,
  Award,
  ChevronLeft,
  ChevronRight,
  Download,
  Video,
  Link as LinkIcon,
  FileText,
  ExternalLink,
  Star,
  Users
} from 'lucide-react';
import { toast } from 'react-toastify';
import mongoose from 'mongoose';
import SkillResponses from './SkillResponses';
import DOMPurify from 'dompurify';
import { motion } from 'framer-motion';

/**
 * Composant de lecture et progression dans une compétence
 */
const SkillReader = () => {
  const { user } = useAuthStore();
  const { fetchSkillById, markLessonAsRead, generateCertificate } = useSkillStore();
  const { id: skillId } = useParams();

  const [skill, setSkill] = useState(null);
  const [progress, setProgress] = useState(null);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [certificateUrl, setCertificateUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('content'); // 'content', 'resources', 'discussion'
  const [isCompletingLesson, setIsCompletingLesson] = useState(false);

  // Calcul des valeurs dérivées
  const totalLessons = skill?.lessons?.length || 0;
  const currentLesson = skill?.lessons?.[currentLessonIndex];
  const isLessonCompleted = progress?.completedLessons?.includes(currentLesson?._id?.toString());
  const isLastLesson = currentLessonIndex === totalLessons - 1;
  const isFirstLesson = currentLessonIndex === 0;

  // Calcul du pourcentage de progression
  const percentage = progress?.completedLessons?.length && totalLessons > 0
    ? Math.round((progress.completedLessons.length / totalLessons) * 100)
    : 0;

  // Fonction pour charger les données de la compétence et de la progression
  const fetchData = useCallback(async () => {
    // Validation de l'ID de la compétence
    if (!skillId || typeof skillId !== 'string' || !mongoose.Types.ObjectId.isValid(skillId)) {
      setError("ID de compétence invalide");
      setIsLoading(false);
      toast.error("L'identifiant de la compétence est incorrect");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Récupération de la compétence
      const skillData = await fetchSkillById(skillId);
      setSkill(skillData);

      // Si l'utilisateur est connecté, récupérer sa progression
      if (user?._id) {
        try {
          const progressData = await fetch(`http://localhost:5000/api/skill/progress/${user._id}/${skillId}`)
            .then(res => res.json());

          setProgress(progressData);

          // Trouver la première leçon non complétée
          if (progressData && skillData?.lessons?.length > 0) {
            const nextIncompleteIndex = skillData.lessons.findIndex(
              lesson => !progressData.completedLessons?.includes(lesson._id.toString())
            );

            // Si toutes les leçons sont complétées, afficher la dernière
            setCurrentLessonIndex(
              nextIncompleteIndex !== -1 ? nextIncompleteIndex :
                skillData.lessons.length - 1
            );

            // Vérifier si un certificat existe pour cette compétence
            if (progressData.isCompleted) {
              try {
                const certResponse = await fetch(
                  `http://localhost:5000/api/certificates/${user._id}/${skillId}`
                ).then(res => res.json());

                setCertificateUrl(certResponse.certificateUrl);
              } catch (certErr) {
                console.log("Aucun certificat trouvé");
              }
            }
          }
        } catch (progressErr) {
          console.log("Aucune progression trouvée pour cet utilisateur");
        }
      }
    } catch (err) {
      console.error("Erreur de chargement:", err);
      setError(err.message || "Erreur de chargement");
      toast.error("Erreur de chargement des données");
    } finally {
      setIsLoading(false);
    }
  }, [skillId, user?._id, fetchSkillById]);

  // Chargement initial des données
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Fonction pour marquer une leçon comme complétée
  const handleCompleteLesson = async () => {
    if (!user?._id || !skillId || !currentLesson?._id || isLessonCompleted) return;

    setIsCompletingLesson(true);
    try {
      // Marquer la leçon comme lue
      const response = await markLessonAsRead(user._id, skillId, currentLesson._id);

      // Mettre à jour la progression locale
      setProgress(response.progress);

      // Si la compétence est complétée, générer un certificat
      if (response.progress.isCompleted) {
        try {
          const certResponse = await generateCertificate(user._id, skillId);
          setCertificateUrl(certResponse.certificateUrl);
          toast.success("Félicitations ! Vous avez terminé cette compétence 🎉");
        } catch (certErr) {
          console.error("Erreur lors de la génération du certificat:", certErr);
        }
      }

      // Passer à la leçon suivante si ce n'est pas la dernière
      if (!isLastLesson && !response.progress.isCompleted) {
        setCurrentLessonIndex(currentIndex => currentIndex + 1);
      }

      toast.success("Progression enregistrée");
    } catch (error) {
      console.error("Erreur:", error);
      toast.error(error.message || "Erreur lors de la mise à jour de la progression");
    } finally {
      setIsCompletingLesson(false);
    }
  };

  // Fonction pour naviguer vers la leçon précédente
  const goToPreviousLesson = () => {
    if (!isFirstLesson) {
      setCurrentLessonIndex(currentIndex => currentIndex - 1);
    }
  };

  // Fonction pour naviguer vers la leçon suivante
  const goToNextLesson = () => {
    if (!isLastLesson) {
      setCurrentLessonIndex(currentIndex => currentIndex + 1);
    }
  };

  // Fonction pour formater la durée en heures et minutes
  const formatDuration = (minutes) => {
    if (!minutes) return "Durée inconnue";

    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hours > 0) {
      return `${hours}h${mins > 0 ? ` ${mins}min` : ''}`;
    }
    return `${mins} min`;
  };

  // Fonction pour rendre le contenu HTML sécurisé
  const renderSafeHTML = (content) => {
    return { __html: DOMPurify.sanitize(content) };
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-500">
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Réessayer
        </button>
      </div>
    );
  }

  if (!skill) {
    return <div className="p-4 text-center">Compétence non trouvée</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      <div className="bg-white shadow-md rounded-2xl p-6">
        <h1 className="text-3xl font-bold mb-2">{skill.skillname}</h1>
        <p className="text-gray-700">{skill.description}</p>
        <p className="text-sm text-gray-500 mt-1">
          {totalLessons} leçon{totalLessons !== 1 ? 's' : ''} • Niveau : {skill.level}
        </p>
      </div>

      {currentLesson && (
        <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold">{currentLesson.title}</h2>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <Clock className="h-4 w-4 mr-1" />
                {currentLesson.duration} min
              </div>
            </div>
            <span className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">
              {progress?.completedLessons?.includes(currentLesson._id.toString())
                ? 'Complété'
                : `${currentLessonIndex + 1}/${totalLessons}`}
            </span>
          </div>

          <div className="w-full bg-gray-200 h-2 rounded-full">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>

          <div className="text-gray-700 leading-relaxed">
            <p>{currentLesson.content}</p>
          </div>

          {user && (
            <div className="flex justify-between items-center">
              {currentLessonIndex > 0 && (
                <button
                  onClick={() => setCurrentLessonIndex(prev => prev - 1)}
                  className="px-4 py-2 rounded text-white bg-gray-600 hover:bg-gray-700"
                >
                  Précédent
                </button>
              )}

              <button
                onClick={handleCompleteLesson}
                disabled={progress?.completedLessons?.includes(currentLesson._id.toString())}
                className={`px-4 py-2 rounded text-white ml-auto ${progress?.completedLessons?.includes(currentLesson._id.toString())
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-700'
                  }`}
              >
                {progress?.completedLessons?.includes(currentLesson._id.toString())
                  ? 'Déjà complété'
                  : currentLessonIndex === totalLessons - 1
                    ? 'Terminer la compétence'
                    : 'Marquer comme complété'}
              </button>
            </div>
          )}
        </div>
      )}
      {progress?.isCompleted && (
        <div className="bg-green-50 p-4 text-center rounded-lg mt-4">
          <p className="text-green-700 font-semibold flex items-center justify-center">
            <CheckCircle className="h-5 w-5 mr-2" />
            Félicitations ! Compétence terminée 🎉
          </p>
          {certificateUrl && (
            <a
              href={certificateUrl}
              className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              target="_blank"
              rel="noopener noreferrer"
            >
              Télécharger le certificat
            </a>
          )}
        </div>
      )}

      {/* Section des réponses et questions */}
      <div className="mt-8">
        <SkillResponses skillId={skillId} />
      </div>
    </div>
  );
}

export default SkillReader;