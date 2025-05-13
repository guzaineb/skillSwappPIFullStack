// src/store/skillStore.js
import axios from 'axios';
import { create } from 'zustand';

const API_URL = 'http://localhost:5000/api/skill';

export const useSkillStore = create((set) => ({
  skills: [],
  lessons: [],
  selectedSkill: null,
  isLoading: false,
  error: null,

  fetchSkills: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/skills`);
      set({ skills: response.data });
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchSkillById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/skills/${id}`);
      set({ selectedSkill: response.data });
    } catch (err) {
      set({ error: 'Erreur lors du chargement de la compétence' });
    } finally {
      set({ isLoading: false });
    }
  },


  participateToSkill: async (userId, skillId) => {
    try {
      const response = await axios.post(`${API_URL}/participate`, {
        userId,
        skillId,
      });
      console.log('Réponse API participation :', response.data);
      return response.data;
    } catch (error) {
      console.error('Erreur API participation :', error.response?.data || error.message);
      throw error.response?.data || { message: "Erreur inconnue" };
    }
  },

  addSkill: async (newSkill) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/add`, newSkill);
      set((state) => ({
        skills: [...state.skills, response.data]
      }));
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ isLoading: false });
    }
  },

  updateSkill: async (id, updatedSkill) => {
    set({ isLoading: true, error: null });
    try {

      // Assurez-vous que l'URL est correcte
      const response = await axios.put(`${API_URL}/skills/${id}`, updatedSkill);
      
      // Mettre à jour le state avec la compétence mise à jour
      set((state) => ({
        skills: state.skills.map(skill => 
          skill._id === id ? response.data : skill
        ),
        selectedSkill: response.data
      }));
      
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      set({ error: errorMessage });
      throw new Error(errorMessage);
    } finally {
      set({ isLoading: false });
    }
  },

  deleteSkill: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await axios.delete(`${API_URL}/skills/delete/${id}`);
      set((state) => ({
        skills: state.skills.filter((skill) => skill._id !== id),
      }));
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchSkillsByCategory: async (category) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/skills/category/${category}`);
      set({ skills: response.data });
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ isLoading: false });
    }
  },


  findSkillById: async (skillId) => {
    try {
      const response = await axios.get(`${API_URL}/${skillId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Erreur inconnue" };
    }
  }
}));


