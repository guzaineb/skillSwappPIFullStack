import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { CheckCircle, Clock } from 'lucide-react';
import { toast } from 'react-toastify';

export default function SkillReader(skillId) {
  
  const { user } = useAuthStore();
  const { id } = useParams();
  const [skill, setSkill] = useState(null);
  const [progress, setProgress] = useState(null);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [certificateUrl, setCertificateUrl] = useState(null);

  const totalLessons = skill?.lessons?.length || 0;
  const currentLesson = skill?.lessons?.[currentLessonIndex];

  useEffect(() => {
    const fetchSkill = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/skill/skills/${id}`);
        setSkill(res.data);
      } catch {
        toast.error("Erreur de chargement de la compétence");
      }
    };
    fetchSkill();
  }, [id]);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/skill/progress/${user._id}/${id}`);
        setProgress(res.data);

        if (res.data?.isCompleted) {
          setCertificateUrl(`/certificates/${user._id}_${id}.pdf`);
        } else if (res.data?.completedLessons?.length) {
          const nextIndex = skill?.lessons?.findIndex(
            l => !res.data.completedLessons.includes(l.id)
          );
          setCurrentLessonIndex(nextIndex !== -1 ? nextIndex : 0);
        }
      } catch {
        toast.error("Erreur chargement progression");
      }
    };

    if (skill && user?._id) fetchProgress();
  }, [skill, user]);

  const handleCompleteLesson = async () => {
    const lessonId = currentLesson.id;
    try {
      await axios.post('http://localhost:5000/api/skill/read-skill', {
        userId: user._id,
        skillId: id,
      });
      const updatedCompleted = [...(progress?.completedLessons || []), lessonId];
      const isCompleted = updatedCompleted.length === totalLessons;

      setProgress(prev => ({ ...prev, completedLessons: updatedCompleted, isCompleted }));

      if (isCompleted) {
        const certRes = await axios.post('http://localhost:5000/api/skill/generate-certificate', {
          userId: user._id,
          skillId: id,
        });
        setCertificateUrl(certRes.data.certificateUrl);
      } else {
        setCurrentLessonIndex(i => i + 1);
      }

      toast.success("Leçon complétée");
    } catch {
      toast.error("Erreur mise à jour leçon");
    }
  };

  const percentage = progress ? Math.round((progress.completedLessons.length / totalLessons) * 100) : 0;

  if (!skill || !currentLesson) return <div className="p-4">Chargement...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      <div className="bg-white shadow-md rounded-2xl p-6">
        <h1 className="text-3xl font-bold mb-2">{skill.skillname}</h1>
        <p className="text-gray-700">{skill.description}</p>
        <p className="text-sm text-gray-500 mt-1">{totalLessons} leçons · Niveau : {skill.level}</p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold">{currentLesson.title}</h2>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <Clock className="h-4 w-4 mr-1" />
              {currentLesson.duration}
            </div>
          </div>
          <span className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">
            {progress?.completedLessons?.includes(currentLesson.id) ? 'Complété' : 'En cours'}
          </span>
        </div>

        <div className="w-full bg-gray-200 h-2 rounded-full">
          <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
        </div>

        <div className="text-gray-700 leading-relaxed">
          <p>{currentLesson.content}</p>
        </div>

        <div className="text-right">
          <button
            onClick={handleCompleteLesson}
            disabled={progress?.completedLessons?.includes(currentLesson.id)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded disabled:bg-gray-400"
          >
            Marquer comme complété
          </button>
        </div>
      </div>

      {progress?.isCompleted && certificateUrl && (
        <div className="bg-green-50 p-4 text-center rounded-lg mt-4">
          <p className="text-green-700 font-semibold flex items-center justify-center">
            <CheckCircle className="h-5 w-5 mr-2" /> Félicitations ! Compétence terminée 🎉
          </p>
          <a href={certificateUrl} className="text-blue-600 underline block mt-2" target="_blank" rel="noopener noreferrer">
            Télécharger le certificat
          </a>
        </div>
      )}
    </div>
  );
}
