import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SkillResponses from '../common/SkillResponses';

const SkillResponsesExample = () => {
  const { skillId } = useParams();
  const [skill, setSkill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSkill = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/skill/skills/${skillId}`);
        setSkill(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Erreur lors de la récupération du skill:', err);
        setError('Impossible de charger les informations du skill.');
        setLoading(false);
      }
    };

    if (skillId) {
      fetchSkill();
    }
  }, [skillId]);

  if (loading) {
    return <div className="container mt-5 text-center">Chargement...</div>;
  }

  if (error) {
    return <div className="container mt-5 alert alert-danger">{error}</div>;
  }

  if (!skill) {
    return <div className="container mt-5 alert alert-warning">Skill non trouvé</div>;
  }

  return (
    <div className="container mt-4">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="card-title">{skill.skillname}</h2>
          <p className="card-text">{skill.description}</p>
          <div className="d-flex justify-content-between">
            <span className="badge bg-primary">{skill.level}</span>
            <span className="badge bg-info">{skill.pricingType === 'free' ? 'Gratuit' : `${skill.price} €`}</span>
          </div>
        </div>
      </div>
      
      {/* Composant de réponses */}
      <SkillResponses skillId={skillId} />
    </div>
  );
};

export default SkillResponsesExample;
