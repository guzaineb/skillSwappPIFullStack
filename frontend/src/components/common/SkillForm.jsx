import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { useSkillStore } from '../../store/skillStore';

const API_URL = 'http://localhost:5000/api';

/**
 * Composant de formulaire pour créer ou modifier une compétence
 * @param {Object} existingSkill - Compétence existante à modifier (optionnel)
 */
export const SkillForm = ({ existingSkill }) => {
  const navigate = useNavigate();
  const { addSkill } = useSkillStore();
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  // État initial du formulaire basé sur le modèle mongoose
  const [formData, setFormData] = useState(existingSkill || {
    skillname: '',
    category: '',
    description: '',
    shortDescription: '',
    pricingType: 'free',
    price: 0,
    image: '',
    coverImage: '',
    status: 'pending',
    level: 'beginner',
    tags: [],
    prerequisites: [],
    objectives: [],
    targetAudience: '',
    estimatedCompletionTime: 0,
    featured: false,
    language: 'fr',
    lessons: [{
      title: '',
      content: '',
      duration: 30,
      order: 1,
      resources: [],
      videoUrl: '',
      quizzes: []
    }]
  });

  // État pour gérer l'affichage des sections du formulaire
  const [expandedSections, setExpandedSections] = useState({
    basicInfo: true,
    details: true,
    lessons: true,
    marketing: false,
    advanced: false
  });

  // Validation du formulaire
  const validateForm = () => {
    const newErrors = {};

    // Validation des champs obligatoires
    if (!formData.skillname?.trim()) {
      newErrors.skillname = 'Le nom est requis';
    } else if (formData.skillname.length < 3) {
      newErrors.skillname = 'Le nom doit contenir au moins 3 caractères';
    }

    if (!formData.category) {
      newErrors.category = 'La catégorie est requise';
    }

    // Description et description courte - on peut les générer automatiquement si manquantes
    if (!formData.description?.trim()) {
      // Au lieu d'une erreur, on définit une valeur par défaut
      setFormData(prev => ({
        ...prev,
        description: 'Description à venir'
      }));
    }

    if (!formData.shortDescription?.trim()) {
      // Générer automatiquement à partir de la description
      setFormData(prev => ({
        ...prev,
        shortDescription: prev.description ? prev.description.substring(0, 200) : 'Description courte'
      }));
    }

    if (!formData.pricingType) {
      newErrors.pricingType = 'Le type de prix est requis';
    }

    if (!formData.status) {
      newErrors.status = 'Le statut est requis';
    }

    if (!formData.level) {
      newErrors.level = 'Le niveau est requis';
    }

    // Validation du prix pour les compétences payantes
    if (formData.pricingType === 'paid' && (!formData.price || formData.price <= 0)) {
      newErrors.price = 'Un prix valide est requis pour une compétence payante';
    }

    // Validation des leçons
    if (!formData.lessons || formData.lessons.length === 0) {
      newErrors.lessons = 'Au moins une leçon est requise';
    } else {
      let hasLessonErrors = false;

      formData.lessons.forEach((lesson, index) => {
        if (!lesson.title?.trim()) {
          newErrors[`lesson${index}_title`] = 'Le titre est requis';
          hasLessonErrors = true;
        }

        if (!lesson.content?.trim()) {
          newErrors[`lesson${index}_content`] = 'Le contenu est requis';
          hasLessonErrors = true;
        }

        if (!lesson.duration || lesson.duration <= 0) {
          newErrors[`lesson${index}_duration`] = 'Une durée valide est requise';
          hasLessonErrors = true;
        }
      });
      // Si des erreurs de leçon sont présentes, ajouter un message global
      if (hasLessonErrors) {
        newErrors.lessons = 'Certaines leçons contiennent des erreurs';
      }
    }
    // Les tags sont recommandés mais pas obligatoires
    if (!formData.tags || formData.tags.length === 0) {
      // Ajouter un tag par défaut basé sur le nom de la compétence
      const defaultTag = formData.skillname?.trim().toLowerCase() || 'compétence';
      setFormData(prev => ({
        ...prev,
        tags: [defaultTag]
      }));
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Chargement des catégories au montage du composant
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${API_URL}/category/categories`);
        setCategories(res.data);
      } catch (err) {
        console.error('Erreur lors du chargement des catégories:', err);
        toast.error('Impossible de charger les catégories');
      }
    };
    fetchCategories();
  }, []);

  // Gestion des changements dans les leçons
  const handleLessonChange = (index, field, value) => {
    const updatedLessons = [...formData.lessons];

    // Traitement spécifique selon le type de champ
    if (field === 'duration' || field === 'order') {
      updatedLessons[index][field] = Number(value) || 0;
    } else {
      updatedLessons[index][field] = value;
    }

    setFormData({ ...formData, lessons: updatedLessons });

    // Effacer l'erreur associée à ce champ
    if (errors[`lesson${index}_${field}`]) {
      setErrors(prev => ({ ...prev, [`lesson${index}_${field}`]: '' }));
    }
  };

  // Ajout d'une nouvelle leçon
  const addLesson = () => {
    const newOrder = formData.lessons.length > 0
      ? Math.max(...formData.lessons.map(l => l.order || 0)) + 1
      : 1;

    setFormData({
      ...formData,
      lessons: [
        ...formData.lessons,
        {
          title: '',
          content: '',
          duration: 30,
          order: newOrder,
          resources: [],
          videoUrl: ''
        }
      ]
    });
  };

  // Suppression d'une leçon
  const removeLesson = (index) => {
    if (formData.lessons.length <= 1) {
      toast.warning('Une compétence doit avoir au moins une leçon');
      return;
    }

    const updatedLessons = [...formData.lessons];
    updatedLessons.splice(index, 1);

    // Réorganiser les ordres des leçons
    const reorderedLessons = updatedLessons.map((lesson, idx) => ({
      ...lesson,
      order: idx + 1
    }));

    setFormData({ ...formData, lessons: reorderedLessons });
  };

  // Gestion des ressources d'une leçon
  const addResource = (lessonIndex) => {
    const updatedLessons = [...formData.lessons];
    if (!updatedLessons[lessonIndex].resources) {
      updatedLessons[lessonIndex].resources = [];
    }

    updatedLessons[lessonIndex].resources.push({
      title: '',
      type: 'link',
      url: '',
      description: ''
    });

    setFormData({ ...formData, lessons: updatedLessons });
  };

  // Suppression d'une ressource
  const removeResource = (lessonIndex, resourceIndex) => {
    const updatedLessons = [...formData.lessons];
    updatedLessons[lessonIndex].resources.splice(resourceIndex, 1);
    setFormData({ ...formData, lessons: updatedLessons });
  };

  // Gestion des changements dans les ressources
  const handleResourceChange = (lessonIndex, resourceIndex, field, value) => {
    const updatedLessons = [...formData.lessons];
    updatedLessons[lessonIndex].resources[resourceIndex][field] = value;
    setFormData({ ...formData, lessons: updatedLessons });
  };

  // Fonction pour basculer l'état d'expansion d'une section
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Gestion des fichiers image
  const handleImageChange = (e, imageType) => {
    const file = e.target.files[0];
    if (!file) return;

    // Vérification du type de fichier
    if (!file.type.startsWith('image/')) {
      toast.error('Veuillez sélectionner un fichier image valide');
      return;
    }

    // Vérification de la taille du fichier (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('L\'image est trop volumineuse (max 5MB)');
      return;
    }

    // Lecture du fichier et mise à jour de l'état
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({
        ...formData,
        [imageType]: file // Stocker le fichier lui-même pour l'envoi au serveur
      });
    };
    reader.readAsDataURL(file);
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation du formulaire
    if (!validateForm()) {
      toast.error('Veuillez corriger les erreurs dans le formulaire');
      return;
    }

    setIsSubmitting(true);
    try {
      // Préparation des leçons avec validation
      const validatedLessons = formData.lessons.map(lesson => ({
        title: lesson.title || 'Sans titre',
        content: lesson.content || 'Contenu à venir',
        duration: Number(lesson.duration) || 30,
        order: Number(lesson.order) || 1,
        resources: Array.isArray(lesson.resources) ? lesson.resources : []
      }));

      // Préparation des données à envoyer
      const dataToSend = {
        skillname: formData.skillname,
        category: formData.category,
        description: formData.description || 'Description à venir',
        shortDescription: formData.shortDescription || (formData.description ? formData.description.substring(0, 200) : 'Description courte à venir'),
        pricingType: formData.pricingType || 'free',
        price: formData.pricingType === 'paid' ? Number(formData.price) || 0 : 0,
        status: formData.status || 'pending',
        level: formData.level || 'beginner',
        lessons: validatedLessons,
        tags: Array.isArray(formData.tags) ? formData.tags : [],
        prerequisites: Array.isArray(formData.prerequisites) ? formData.prerequisites : [],
        objectives: Array.isArray(formData.objectives) ? formData.objectives : [],
        targetAudience: formData.targetAudience || '',
        estimatedCompletionTime: Number(formData.estimatedCompletionTime) || 0,
        featured: formData.featured || false,
        language: formData.language || 'fr'
      };

      // Log pour le débogage
      console.log('Données validées à envoyer:', JSON.stringify(dataToSend, null, 2));

      // Afficher les données qui vont être envoyées
      console.log('Données du formulaire:', dataToSend);

      // Utilisation du store pour ajouter la compétence
      console.log('Données à envoyer au store:', dataToSend);

      // Ajout de la compétence via le store
      const response = await addSkill(dataToSend);

      console.log('Réponse du serveur:', response);
      toast.success('Compétence créée avec succès');

      // Redirection vers la liste des compétences après un court délai
      setTimeout(() => {
        navigate('/Profile/skills');
      }, 1000);
    } catch (error) {
      console.error("Erreur lors de la soumission:", error);
      console.error("Détails de l'erreur:", error.response?.data);

      // Afficher un message d'erreur plus détaillé
      let errorMessage = 'Une erreur est survenue lors de l\'enregistrement';

      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      // Afficher des informations supplémentaires si disponibles
      if (error.response?.data?.invalidLesson) {
        console.error("Leçon invalide:", error.response.data.invalidLesson);
        errorMessage += ` - Problème avec une leçon: ${JSON.stringify(error.response.data.invalidLesson)}`;
      }

      if (error.response?.data?.receivedLessons) {
        console.error("Leçons reçues:", error.response.data.receivedLessons);
        errorMessage += ` - Format des leçons incorrect`;
      }

      toast.error(errorMessage);

      setErrors(prev => ({
        ...prev,
        submit: errorMessage
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card p-4">
      <div className="mb-3">
        <h1>{existingSkill ? 'Modifier la compétence' : 'Ajouter une compétence'}</h1>
        <label className="form-label">Nom de la compétence</label>
        <input
          type="text"
          className={`form-control ${errors.skillname ? 'is-invalid' : ''}`}
          value={formData.skillname}
          onChange={(e) => setFormData({ ...formData, skillname: e.target.value })}
        />
        {errors.skillname && <div className="invalid-feedback d-block">{errors.skillname}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Catégorie</label>
        <select
          className={`form-select ${errors.category ? 'is-invalid' : ''}`}
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        >
          <option value="">-- Sélectionner une catégorie --</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.title}
            </option>
          ))}
        </select>
        {errors.category && <div className="invalid-feedback d-block">{errors.category}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          className={`form-control ${errors.description ? 'is-invalid' : ''}`}
          value={formData.description}
          onChange={(e) => {
            const newDesc = e.target.value;
            setFormData({
              ...formData,
              description: newDesc,
              shortDescription: formData.shortDescription || newDesc.substring(0, 200)
            });
          }}
          rows="3"
        />
        {errors.description && <div className="invalid-feedback d-block">{errors.description}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Description courte</label>
        <textarea
          className={`form-control ${errors.shortDescription ? 'is-invalid' : ''}`}
          value={formData.shortDescription}
          onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
          rows="2"
          maxLength="200"
          placeholder="Brève description (max 200 caractères)"
        />
        <small className="text-muted">
          {formData.shortDescription?.length || 0}/200 caractères
        </small>
        {errors.shortDescription && <div className="invalid-feedback d-block">{errors.shortDescription}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Tags (séparés par des virgules)</label>
        <input
          type="text"
          className="form-control"
          value={formData.tags?.join(', ') || ''}
          onChange={(e) => {
            const tagsString = e.target.value;
            const tagsArray = tagsString.split(',').map(tag => tag.trim()).filter(tag => tag);
            setFormData({ ...formData, tags: tagsArray });
          }}
          placeholder="ex: programmation, web, javascript"
        />
        <small className="text-muted">
          Les tags aident à rendre votre compétence plus visible dans les recherches
        </small>
      </div>

      <div className="mb-3">
        <label className="form-label">Image</label>
        <input
          type="file"
          accept="image/*"
          className="form-control"
          ref={fileInputRef}
          onChange={(e) => handleImageChange(e, 'image')}
        />
        <small className="text-muted">Format recommandé: JPG ou PNG, max 5MB</small>
      </div>

      {formData.image && (
        <div className="mb-3">
          <img
            src={formData.image instanceof File ? URL.createObjectURL(formData.image) : formData.image}
            alt="Aperçu"
            className="img-fluid rounded"
            style={{ maxWidth: '200px' }}
          />
        </div>
      )}

      <div className="mb-3">
        <label className="form-label">Statut</label>
        <select
          className={`form-select ${errors.status ? 'is-invalid' : ''}`}
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
        >
          <option value="">-- Sélectionner --</option>
          <option value="active">Actif</option>
          <option value="inactive">Inactif</option>
          <option value="pending">En attente</option>
        </select>
        {errors.status && <div className="invalid-feedback d-block">{errors.status}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Niveau</label>
        <select
          className={`form-select ${errors.level ? 'is-invalid' : ''}`}
          value={formData.level}
          onChange={(e) => setFormData({ ...formData, level: e.target.value })}
        >
          <option value="">-- Sélectionner --</option>
          <option value="beginner">Débutant</option>
          <option value="intermediate">Intermédiaire</option>
          <option value="advanced">Avancé</option>
        </select>
        {errors.level && <div className="invalid-feedback d-block">{errors.level}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Type de prix</label>
        <select
          className={`form-select ${errors.pricingType ? 'is-invalid' : ''}`}
          value={formData.pricingType}
          onChange={(e) => setFormData({ ...formData, pricingType: e.target.value })}
        >
          <option value="">-- Sélectionner --</option>
          <option value="free">Gratuit</option>
          <option value="paid">Payant</option>
        </select>
        {errors.pricingType && <div className="invalid-feedback d-block">{errors.pricingType}</div>}
      </div>

      {formData.pricingType === 'paid' && (
        <div className="mb-3">
          <label className="form-label">Prix</label>
          <div className="input-group">
            <input
              type="number"
              className={`form-control ${errors.price ? 'is-invalid' : ''}`}
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              min="0"
              step="0.01"
            />
            <span className="input-group-text">€</span>
          </div>
          {errors.price && <div className="invalid-feedback d-block">{errors.price}</div>}
        </div>
      )}

      <div className="mb-4">
        <label className="form-label">Leçons</label>
        {errors.lessons && <div className="alert alert-danger">{errors.lessons}</div>}

        {formData.lessons.map((lesson, index) => (
          <div key={index} className="border rounded p-3 mb-2">
            <div className="d-flex justify-content-between mb-2">
              <h5>Leçon {index + 1}</h5>
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => removeLesson(index)}
              >
                <FaTrash /> Supprimer
              </button>
            </div>

            <div className="mb-2">
              <label className="form-label">Titre</label>
              <input
                type="text"
                className={`form-control ${errors[`lesson${index}_title`] ? 'is-invalid' : ''}`}
                placeholder="Titre de la leçon"
                value={lesson.title}
                onChange={(e) => handleLessonChange(index, 'title', e.target.value)}
              />
              {errors[`lesson${index}_title`] && <div className="invalid-feedback d-block">{errors[`lesson${index}_title`]}</div>}
            </div>

            <div className="mb-2">
              <label className="form-label">Contenu</label>
              <textarea
                className={`form-control ${errors[`lesson${index}_content`] ? 'is-invalid' : ''}`}
                placeholder="Contenu de la leçon"
                rows="3"
                value={lesson.content}
                onChange={(e) => handleLessonChange(index, 'content', e.target.value)}
              />
              {errors[`lesson${index}_content`] && <div className="invalid-feedback d-block">{errors[`lesson${index}_content`]}</div>}
            </div>

            <div className="mb-2">
              <label className="form-label">Durée (minutes)</label>
              <input
                type="number"
                className={`form-control ${errors[`lesson${index}_duration`] ? 'is-invalid' : ''}`}
                placeholder="Durée de la leçon (en minutes)"
                value={lesson.duration}
                onChange={(e) => handleLessonChange(index, 'duration', e.target.value)}
                min="1"
              />
              {errors[`lesson${index}_duration`] && <div className="invalid-feedback d-block">{errors[`lesson${index}_duration`]}</div>}
            </div>
          </div>
        ))}
        <button type="button" className="btn btn-secondary mt-2" onClick={addLesson}>
          <FaPlus /> Ajouter une leçon
        </button>
      </div>

      <div className="d-grid gap-2">
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Envoi en cours...
            </>
          ) : (
            existingSkill ? 'Mettre à jour la compétence' : 'Créer la compétence'
          )}
        </button>
      </div>
      {errors.submit && <div className="alert alert-danger mt-3">{errors.submit}</div>}
    </form>
  );
};



