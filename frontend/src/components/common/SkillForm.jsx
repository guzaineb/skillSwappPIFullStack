import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSkillStore } from '../../store/skillStore';

const API_URL = 'http://localhost:5000/api';

export const SkillForm = ({ existingSkill }) => {
  const { addSkill, updateSkill } = useSkillStore();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState(existingSkill || {
    skillname: '',
    category: '',
    description: '',
    pricingType: '',
    price: '',
    image: '',
    status: '',
    level: '',
    lessons: [{ title: '', content: '', duration: '' }]
  });

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.skillname?.trim()) newErrors.skillname = 'Le nom est requis';
    if (!formData.category) newErrors.category = 'La catégorie est requise';
    if (!formData.description?.trim()) newErrors.description = 'La description est requise';
    if (!formData.pricingType) newErrors.pricingType = 'Le type de prix est requis';
    if (!formData.status) newErrors.status = 'Le statut est requis';
    if (!formData.level) newErrors.level = 'Le niveau est requis';
    
    if (formData.pricingType === 'paid' && (!formData.price || formData.price <= 0)) {
      newErrors.price = 'Un prix valide est requis pour une compétence payante';
    }

    formData.lessons.forEach((lesson, index) => {
      if (!lesson.title?.trim()) newErrors[`lesson${index}_title`] = 'Le titre est requis';
      if (!lesson.content?.trim()) newErrors[`lesson${index}_content`] = 'Le contenu est requis';
      if (!lesson.duration || lesson.duration <= 0) newErrors[`lesson${index}_duration`] = 'Une durée valide est requise';
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${API_URL}/category/categories`);
        setCategories(res.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    fetchCategories();
  }, []);

  const handleLessonChange = (index, field, value) => {
    const updatedLessons = [...formData.lessons];
    if (field === 'duration') {
      updatedLessons[index][field] = Number(value) || 0;
    } else {
      updatedLessons[index][field] = value;
    }
    setFormData({ ...formData, lessons: updatedLessons });
    setErrors(prev => ({ ...prev, [`lesson${index}_${field}`]: '' }));
  };

  const addLesson = () => {
    setFormData({
      ...formData,
      lessons: [...formData.lessons, { title: '', content: '', duration: '' }]
    });
  };

  const removeLesson = (index) => {
    const updatedLessons = [...formData.lessons];
    updatedLessons.splice(index, 1);
    setFormData({ ...formData, lessons: updatedLessons });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const dataToSend = {
        ...formData,
        price: formData.pricingType === 'paid' ? Number(formData.price) : 0,
        lessons: formData.lessons.map(lesson => ({
          ...lesson,
          duration: Number(lesson.duration),
          content: String(lesson.content)
        }))
      };

      if (existingSkill) {
        await updateSkill(existingSkill._id, dataToSend);
      } else {
        await addSkill(dataToSend);
      }
      navigate('/Profile/skills');
    } catch (error) {
      console.error("Erreur lors de la soumission:", error);
      setErrors(prev => ({ 
        ...prev, 
        submit: 'Une erreur est survenue lors de l\'enregistrement' 
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card p-4">
      <div className="mb-3"><h1>Add Skill</h1>
        <label className="form-label">SkillName</label>
        <input
          type="text"
          className="form-control"
          value={formData.skillname}
          onChange={(e) => setFormData({ ...formData, skillname: e.target.value })}
          required
        />
        {errors.skillname && <div className="invalid-feedback">{errors.skillname}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Category</label>
        <select
          className="form-select"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        >
          <option value="">-- Category --</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.title}
            </option>
          ))}
        </select>
        {errors.category && <div className="invalid-feedback">{errors.category}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          className="form-control"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows="3"
        />
        {errors.description && <div className="invalid-feedback">{errors.description}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Image</label>
        <input
          type="file"
          accept="image/*"
          className="form-control"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => {
                setFormData({ ...formData, image: reader.result });
              };
              reader.readAsDataURL(file);
            }
          }}
        />
      </div>

      {formData.image && (
        <div className="mb-3">
          <img src={formData.image} alt="Aperçu" className="img-fluid rounded" style={{ maxWidth: '200px' }} />
        </div>
      )}

      <div className="mb-3">
        <label className="form-label">Statut</label>
        <select
          className="form-select"
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
        >
          <option value="">-- Sélectionner --</option>
          <option value="active">active</option>
          <option value="inactive">inactive</option>
          <option value="pending">pending</option>
        </select>
        {errors.status && <div className="invalid-feedback">{errors.status}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Niveau</label>
        <select
          className="form-select"
          value={formData.level}
          onChange={(e) => setFormData({ ...formData, level: e.target.value })}
        >
          <option value="">-- Sélectionner --</option>
          <option value="beginner">beginner</option>
          <option value="intermediate">intermediate</option>
          <option value="advanced">advanced</option>
        </select>
        {errors.level && <div className="invalid-feedback">{errors.level}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">pricingType</label>
        <select
          className="form-select"
          value={formData.pricingType}
          onChange={(e) => setFormData({ ...formData, pricingType: e.target.value })}
        >
          <option value="">-- Sélectionner --</option>
          <option value="free">Free</option>
          <option value="paid">Paid</option>
        </select>
        {errors.pricingType && <div className="invalid-feedback">{errors.pricingType}</div>}
      </div>

      {formData.pricingType === 'paid' && (
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            min="0"
          />
          {errors.price && <div className="invalid-feedback">{errors.price}</div>}
        </div>
      )}

      <div className="mb-3">
        <label className="form-label">Leçons</label>
        {formData.lessons.map((lesson, index) => (
          <div key={index} className="border rounded p-3 mb-2">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Titre de la leçon"
              value={lesson.title}
              onChange={(e) => handleLessonChange(index, 'title', e.target.value)}
              required
            />
            {errors[`lesson${index}_title`] && <div className="invalid-feedback">{errors[`lesson${index}_title`]}</div>}
            <label className="form-label">Content</label>
            <textarea
              className="form-control mb-2"
              placeholder="Contenu de la leçon"
              rows="2"
              value={lesson.content}
              onChange={(e) => handleLessonChange(index, 'content', e.target.value)}
            />
            {errors[`lesson${index}_content`] && <div className="invalid-feedback">{errors[`lesson${index}_content`]}</div>}
            <label className="form-label">Duration</label>
            <input
              type="number"
              className="form-control mb-2"
              placeholder="Durée de la leçon (en minutes)"
              value={lesson.duration}
              onChange={(e) => handleLessonChange(index, 'duration', e.target.value)}
              required
            />
            {errors[`lesson${index}_duration`] && <div className="invalid-feedback">{errors[`lesson${index}_duration`]}</div>}
            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={() => removeLesson(index)}
            >
              Supprimer
            </button>
          </div>
        ))}
        <button type="button" className="btn btn-secondary mt-2" onClick={addLesson}>
          + Ajouter une leçon
        </button>
      </div>

      <button type="submit" className="btn btn-primary mt-3" disabled={isSubmitting}>
        {isSubmitting ? 'Envoi...' : (existingSkill ? 'Mettre à jour' : 'Créer')}
      </button>
      {errors.submit && <div className="invalid-feedback mt-2">{errors.submit}</div>}
    </form>
  );
};


