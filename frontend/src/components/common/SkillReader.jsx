import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { CheckCircle, Clock } from 'lucide-react';
import { toast } from 'react-toastify';
import mongoose from 'mongoose';
import SkillResponses from './SkillResponses';

const SkillReader = () => {
  const { user } = useAuthStore();
  const { id: skillId } = useParams();
  const [skill, setSkill] = useState(null);
  const [progress, setProgress] = useState(null);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [certificateUrl, setCertificateUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const totalLessons = skill?.lessons?.length || 0;
  const currentLesson = skill?.lessons?.[currentLessonIndex];

  useEffect(() => {
    const fetchData = async () => {
      // Validation renforcée de l'ID
      if (!skillId || typeof skillId !== 'string' || !mongoose.Types.ObjectId.isValid(skillId)) {
        setError("ID de compétence invalide");
        setIsLoading(false);
        toast.error("L'identifiant de la compétence est incorrect");
        return;
      }


      try {
        setIsLoading(true);
        setError(null);

        const [skillRes, progressRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/skill/skills/${skillId}`),
          user?._id && axios.get(`http://localhost:5000/api/skill/progress/${user._id}/${skillId}`)
        ]);

        if (!skillRes.data) {
          throw new Error("Compétence non trouvée");
        }

        setSkill(skillRes.data);

        if (progressRes?.data) {
          setProgress(progressRes.data);

          // Find first incomplete lesson
          const nextIncompleteIndex = skillRes.data.lessons.findIndex(
            lesson => !progressRes.data.completedLessons?.includes(lesson._id.toString())
          );

          setCurrentLessonIndex(
            nextIncompleteIndex !== -1 ? nextIncompleteIndex :
              skillRes.data.lessons.length > 0 ? skillRes.data.lessons.length - 1 : 0
          );

          if (progressRes.data.isCompleted) {
            // Check for existing certificate
            try {
              const certRes = await axios.get(
                `http://localhost:5000/api/certificates/${user._id}/${skillId}`
              );
              setCertificateUrl(certRes.data.certificateUrl);
            } catch (certErr) {
              console.log("No certificate found yet");
            }
          }
        }
      } catch (err) {
        console.error("Erreur de chargement:", err);
        setError(err.response?.data?.message || err.message || "Erreur de chargement");
        toast.error("Erreur de chargement des données");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [skillId, user?._id]);

  const handleCompleteLesson = async () => {
    if (!user?._id || !skillId) return;

    try {
      // Mark skill as read (backend will handle lesson completion)
      const res = await axios.post('http://localhost:5000/api/skill/read-skill', {
        userId: user._id,
        skillId: skillId
      });

      // Update local state
      const updatedProgress = res.data.progress;
      setProgress(updatedProgress);

      if (updatedProgress.isCompleted) {
        setCertificateUrl(res.data.certificateUrl ||
          `http://localhost:5000/certificates/${user._id}_${skillId}.pdf`);
      }

      // Move to next lesson if not completed
      if (!updatedProgress.isCompleted) {
        const nextIndex = skill.lessons.findIndex(
          lesson => !updatedProgress.completedLessons.includes(lesson._id.toString())
        );
        if (nextIndex !== -1) {
          setCurrentLessonIndex(nextIndex);
        }
      }

      toast.success("Progression enregistrée");
    } catch (error) {
      console.error("Erreur:", error);
      toast.error(error.response?.data?.message || "Erreur lors de la mise à jour");
    }
  };

  const percentage = progress?.completedLessons?.length && totalLessons > 0
    ? Math.round((progress.completedLessons.length / totalLessons) * 100)
    : 0;

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