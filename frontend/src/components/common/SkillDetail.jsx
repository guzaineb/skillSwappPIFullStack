import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";

function SkillDetail() {
  const { id } = useParams();
  const [skill, setSkill] = useState(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  const userId = localStorage.getItem("userId"); // récupère le userId stocké en localStorage (si login OK)

  useEffect(() => {
    const fetchSkillWithProgress = async () => {
      try {
        // 1. D'abord lire la compétence et enregistrer la progression
        await axios.post(`http://localhost:5000/api/skill/read-skill`, {
          userId,
          skillId: id,
        });

        // 2. Ensuite récupérer la compétence à afficher
        const res = await axios.get(`http://localhost:5000/api/skill/skills/${id}`);
        setSkill(res.data);

      } catch (error) {
        console.error(error);
        setError("Erreur lors du chargement de la compétence.");
      }
    };

    if (userId) {
      fetchSkillWithProgress();
    } else {
      setError("Utilisateur non connecté.");
    }
  }, [id, userId]);

  useEffect(() => {
    if (skill) {
      const calculateProgress = () => {
        if (!skill.lessons || skill.lessons.length === 0) return 0;
        const completed = skill.lessons.filter((lesson) => lesson.completed).length;
        return Math.round((completed / skill.lessons.length) * 100);
      };
      setProgress(calculateProgress());
    }
  }, [skill]);

  if (error) return (
    <div className="skill-detail-page">
      <Header />
      <main className="container py-5">
        <h1>Erreur</h1>
        <p>{error}</p>
      </main>
      <Footer />
    </div>
  );

  if (!skill) return (
    <div className="skill-detail-page">
      <Header />
      <main className="container py-5">
        <div>Chargement...</div>
      </main>
      <Footer />
    </div>
  );

  const progressBarClass = progress >= 100 ? "bg-success" : "bg-info";

  return (
    <div className="skill-detail-page">
      <Header />
      <main className="container py-5">
        <h1>{skill.skillname}</h1>
        <p>{skill.description}</p>

        <div className="progress my-4" style={{ height: "20px" }}>
          <div
            className={`progress-bar ${progressBarClass}`}
            role="progressbar"
            style={{ width: `${progress}%` }}
          >
            {progress}%
          </div>
        </div>

        <h3>Leçons :</h3>
        {skill.lessons.length === 0 ? (
          <p>Aucune leçon pour cette compétence.</p>
        ) : (
          <ul className="list-group">
            {skill.lessons.map((lesson) => (
              <li className="list-group-item" key={lesson._id}>
                {lesson.title} {lesson.completed && <span className="badge bg-success ms-2">Fait</span>}
              </li>
            ))}
          </ul>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default SkillDetail;
