import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSkillStore } from '../../store/skillStore';
import { toast } from 'react-toastify';

export const EditSkill = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateSkill, fetchSkillById } = useSkillStore();
  const [formData, setFormData] = useState({
    skillname: '',
    category: '',
    description: '',
<<<<<<< HEAD

=======
>>>>>>> origin/tasks
    pricingType: '',
    price: '',
    status: '',
    level: '',
    lessons: [{ title: '', content: '', duration: 0 }]
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSkill = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const skillData = await fetchSkillById(id);
        if (skillData) {
          setFormData(skillData);
        } else {
          toast.error('Compétence non trouvée');
          navigate('/Profile/skills');
        }
      } catch (error) {
        console.error('Erreur de chargement:', error);
        toast.error('Erreur lors du chargement de la compétence');
        navigate('/Profile/skills');
      } finally {
        setLoading(false);
      }
    };

    loadSkill();
  }, [id, navigate, fetchSkillById]);

  const validateForm = () => {
    const errors = {};
    
    if (!formData.skillname?.trim()) errors.skillname = 'Le nom est requis';
    if (!formData.category) errors.category = 'La catégorie est requise';
    if (!formData.description?.trim()) errors.description = 'La description est requise';
    if (!formData.status) errors.status = 'Le statut est requis';
    if (!formData.level) errors.level = 'Le niveau est requis';
    
    if (formData.pricingType === 'paid' && (!formData.price || formData.price <= 0)) {
      errors.price = 'Un prix valide est requis pour une compétence payante';
    }

    if (formData.lessons?.length > 0) {
      formData.lessons.forEach((lesson, index) => {
        if (!lesson.title?.trim()) {
          errors[`lesson${index}`] = errors[`lesson${index}`] || {};
          errors[`lesson${index}`].title = 'Le titre est requis';
        }
        if (!lesson.content?.trim()) {
          errors[`lesson${index}`] = errors[`lesson${index}`] || {};
          errors[`lesson${index}`].content = 'Le contenu est requis';
        }
        if (!lesson.duration || lesson.duration <= 0) {
          errors[`lesson${index}`] = errors[`lesson${index}`] || {};
          errors[`lesson${index}`].duration = 'Une durée valide est requise';
        }
      });
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const updatedSkill = await updateSkill(id, formData);
      toast.success('Compétence mise à jour avec succès');
      navigate('/skills');
      return updatedSkill;
    } catch (error) {
      toast.error(error.message);
      console.error('Erreur de mise à jour:', error);
    }
  };

  const handleLessonChange = (index, field, value) => {
    const updatedLessons = [...(formData.lessons || [])];
    updatedLessons[index] = {
      ...updatedLessons[index],
      [field]: value
    };
    setFormData({ ...formData, lessons: updatedLessons });
  };

  const addLesson = () => {
    setFormData({
      ...formData,
      lessons: [...(formData.lessons || []), { title: '', content: '', duration: 0 }]
    });
  };

  const removeLesson = (index) => {
    if (!formData.lessons || formData.lessons.length <= 1) {
      toast.warning('Au moins une leçon est requise');
      return;
    }
    
    const updatedLessons = formData.lessons.filter((_, i) => i !== index);
    setFormData({ ...formData, lessons: updatedLessons });
  };

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="text-center">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2>Modifier la compétence</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label className="form-label">Nom de la compétence</label>
          <input
            type="text"
            className={`form-control ${validationErrors.skillname ? 'is-invalid' : ''}`}
            value={formData.skillname || ''}
            onChange={(e) => setFormData({ ...formData, skillname: e.target.value })}
          />
          {validationErrors.skillname && (
            <div className="invalid-feedback">{validationErrors.skillname}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Catégorie</label>
          <select
            className={`form-select ${validationErrors.category ? 'is-invalid' : ''}`}
            value={formData.category || ''}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          >
            <option value="">Sélectionner une catégorie</option>
            {/* Ajouter les options de catégorie ici */}
          </select>
          {validationErrors.category && (
            <div className="invalid-feedback">{validationErrors.category}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className={`form-control ${validationErrors.description ? 'is-invalid' : ''}`}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows="3"
          />
          {validationErrors.description && (
            <div className="invalid-feedback">{validationErrors.description}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Type de prix</label>
          <select
            className="form-select"
            value={formData.pricingType}
            onChange={(e) => setFormData({ ...formData, pricingType: e.target.value })}
          >
            <option value="free">Gratuit</option>
            <option value="paid">Payant</option>
          </select>
        </div>

        {formData.pricingType === 'paid' && (
          <div className="mb-3">
            <label className="form-label">Prix</label>
            <input
              type="number"
              className={`form-control ${validationErrors.price ? 'is-invalid' : ''}`}
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            />
            {validationErrors.price && (
              <div className="invalid-feedback">{validationErrors.price}</div>
            )}
          </div>
        )}

        <div className="mb-3">
          <label className="form-label">Leçons</label>
          {formData.lessons.map((lesson, index) => (
            <div key={index} className="card mb-3 p-3">
              <div className="mb-2">
                <label className="form-label">Titre</label>
                <input
                  type="text"
                  className={`form-control ${validationErrors[`lesson${index}`]?.title ? 'is-invalid' : ''}`}
                  value={lesson.title}
                  onChange={(e) => handleLessonChange(index, 'title', e.target.value)}
                />
                {validationErrors[`lesson${index}`]?.title && (
                  <div className="invalid-feedback">{validationErrors[`lesson${index}`].title}</div>
                )}
              </div>

              <div className="mb-2">
                <label className="form-label">Contenu</label>
                <textarea
                  className={`form-control ${validationErrors[`lesson${index}`]?.content ? 'is-invalid' : ''}`}
                  value={lesson.content}
                  onChange={(e) => handleLessonChange(index, 'content', e.target.value)}
                  rows="3"
                />
                {validationErrors[`lesson${index}`]?.content && (
                  <div className="invalid-feedback">{validationErrors[`lesson${index}`].content}</div>
                )}
              </div>

              <div className="mb-2">
                <label className="form-label">Durée (minutes)</label>
                <input
                  type="number"
                  className={`form-control ${validationErrors[`lesson${index}`]?.duration ? 'is-invalid' : ''}`}
                  value={lesson.duration}
                  onChange={(e) => handleLessonChange(index, 'duration', e.target.value)}
                />
                {validationErrors[`lesson${index}`]?.duration && (
                  <div className="invalid-feedback">{validationErrors[`lesson${index}`].duration}</div>
                )}
              </div>

              <button
                type="button"
                className="btn btn-danger mt-2"
                onClick={() => removeLesson(index)}
              >
                Supprimer la leçon
              </button>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-secondary"
            onClick={addLesson}
          >
            Ajouter une leçon
          </button>
        </div>

        <div className="mt-4">
          <button type="submit" className="btn btn-primary me-2">
            Enregistrer les modifications
          </button>
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={() => navigate('/skills')}
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
};


