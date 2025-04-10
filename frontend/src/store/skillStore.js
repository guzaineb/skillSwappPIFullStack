import axios from 'axios';
import { create } from 'zustand';

const API_URL = 'http://localhost:5000/api/skill';

export const useSkillStore = create((set) => ({
  skills: [],
  isLoading: false,
  error: null,


  search: async (searchTerm) => {
    set({ isLoading: true, error: null });
    try {
      // Correction de l'URL : utilisation du paramètre de recherche
      const response = await axios.get(`${API_URL}/search`, {
        params: { searchTerm }
      });

      if (Array.isArray(response.data)) {
        set({ skills: response.data });
      } else {
        set({ error: 'Les données reçues ne sont pas un tableau valide.' });
      }
    } catch (err) {
      set({ error: err.message || 'Une erreur est survenue lors de la recherche de compétences.' });
    } finally {
      set({ isLoading: false });
    }
  },


// Fetch all skills
  fetchSkills: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/skills`);
      if (Array.isArray(response.data)) {
        set({ skills: response.data });
      } else {
        set({ error: 'Les données reçues ne sont pas un tableau.' });
      }
    } catch (err) {
      set({ error: err.message || 'Une erreur est survenue lors de la récupération des compétences.' });
    } finally {
      set({ isLoading: false });
    }
  },

  // Update an existing skill
  updateSkill: async (id, updatedSkill) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.put(`${API_URL}/skills/update/${id}`, updatedSkill);
      set((state) => ({
        skills: state.skills.map((skill) =>
          skill._id === id ? response.data : skill
        ),
      }));
    } catch (err) {
      set({ error: err.message || 'Une erreur est survenue lors de la mise à jour de la compétence.' });
    } finally {
      set({ isLoading: false });
    }
  },

  // Delete a skill
  deleteSkill: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await axios.delete(`${API_URL}/skills/delete/${id}`);
      set((state) => ({
        skills: state.skills.filter((skill) => skill._id !== id),
      }));
    } catch (err) {
      set({ error: err.message || 'Une erreur est survenue lors de la suppression de la compétence.' });
    } finally {
      set({ isLoading: false });
    }
  },

  // Fetch skills by category
  fetchSkillsByCategory: async (category) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/skills/category/${category}`);
      if (Array.isArray(response.data)) {
        set({ skills: response.data });
      } else {
        set({ error: 'Les données reçues ne sont pas un tableau valide.' });
      }
    } catch (err) {
      set({ error: err.message || 'Une erreur est survenue lors de la récupération des compétences par catégorie.' });
    } finally {
      set({ isLoading: false });
    }
  },
  addSkill: async (newSkill) => {
    set({ isLoading: true, error: null });
    try {
      // Envoi de la requête POST pour ajouter une nouvelle compétence
      const response = await axios.post(`${API_URL}/add`, newSkill);
      
      // Si la réponse est réussie, mettre à jour le store
      set((state) => ({
        skills: [...state.skills, response.data], // Ajoute la nouvelle compétence à la liste existante
      }));
      alert("Compétence ajoutée avec succès !");
    } catch (err) {
      set({ error: err.message || 'Une erreur est survenue lors de l\'ajout de la compétence.' });
    } finally {
      set({ isLoading: false });
    }
  },

 }));
