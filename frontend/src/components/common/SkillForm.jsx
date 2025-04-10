import { useState } from 'react';
import { useSkillStore } from './../../store/skillStore';
import { useNavigate } from "react-router-dom"; // Importer useNavigate

export const SkillForm = ({ existingSkill }) => {
  const { addSkill, updateSkill } = useSkillStore();
  const navigate = useNavigate(); // Initialiser le hook navigate

  const [formData, setFormData] = useState(existingSkill || {
    skillname: '',
    category: '',
    description: '',
    pricingType: '',
    price: '',
    image: '',
    status: '',
    level: '',
 
    lessons: [{ title: '', content: '',duration: ''  }],
  });

  const handleLessonChange = (index, field, value) => {
    const updatedLessons = [...formData.lessons];
    updatedLessons[index][field] = value;
    setFormData({ ...formData, lessons: updatedLessons });
  };

  const addLesson = () => {
    setFormData({ ...formData, lessons: [...formData.lessons, { title: '', content: '' }] });
  };

  const removeLesson = (index) => {
    const updatedLessons = [...formData.lessons];
    updatedLessons.splice(index, 1);
    setFormData({ ...formData, lessons: updatedLessons });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      ...formData,
      price: formData.pricingType === 'paid' ? Number(formData.price) : 0,
    };

    try {
      if (existingSkill) {
        await updateSkill(existingSkill._id, dataToSend);
        alert("Compétence mise à jour avec succès !");
      } else {
        await addSkill(dataToSend);
        alert("Compétence ajoutée avec succès !");
      }
      navigate('/skills'); // Rediriger vers la page des compétences après la soumission
    } catch (error) {
      console.error("Erreur lors de la soumission :", error);
      alert("Une erreur est survenue lors de l'enregistrement.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card p-4">
      <div className="mb-3">
        <label className="form-label">Nom de la compétence</label>
        <input
          type="text"
          className="form-control"
          value={formData.skillname}
          onChange={(e) => setFormData({ ...formData, skillname: e.target.value })}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Catégorie</label>
        <input
          type="text"
          className="form-control"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          className="form-control"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows="3"
        />
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
          <option value="active">Actif</option>
          <option value="inactive">Inactif</option>
          <option value="pending">En attente</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Niveau</label>
        <select
          className="form-select"
          value={formData.level}
          onChange={(e) => setFormData({ ...formData, level: e.target.value })}
        >
          <option value="">-- Sélectionner --</option>
          <option value="beginner">Débutant</option>
          <option value="intermediate">Intermédiaire</option>
          <option value="advanced">Avancé</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Type de prix</label>
        <select
          className="form-select"
          value={formData.pricingType}
          onChange={(e) => setFormData({ ...formData, pricingType: e.target.value })}
        >
          <option value="">-- Sélectionner --</option>
          <option value="free">Gratuit</option>
          <option value="paid">Payant</option>
        </select>
      </div>

      {formData.pricingType === 'paid' && (
        <div className="mb-3">
          <label className="form-label">Prix</label>
          <input
            type="number"
            className="form-control"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            min="0"
          />
        </div>
      )}

      <div className="mb-3">
        <label className="form-label">Leçons</label>
        {formData.lessons.map((lesson, index) => (
          <div key={index} className="border rounded p-3 mb-2">
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Titre de la leçon"
              value={lesson.title}
              onChange={(e) => handleLessonChange(index, 'title', e.target.value)}
              required
            />
            <textarea
              className="form-control mb-2"
              placeholder="Contenu de la leçon"
              rows="2"
              value={lesson.content}
              onChange={(e) => handleLessonChange(index, 'content', e.target.value)}
            />
              <input
      type="number"
      className="form-control mb-2"
      placeholder="Durée de la leçon (en minutes)"
      value={lesson.duration}
      onChange={(e) => handleLessonChange(index, 'duration', e.target.value)}
      required
    />
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

      <button type="submit" className="btn btn-primary mt-3">
        {existingSkill ? 'Mettre à jour' : 'Créer'}
      </button>
    </form>
  );
};
