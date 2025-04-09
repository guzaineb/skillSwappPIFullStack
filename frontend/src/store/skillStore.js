import axios from 'axios';
import { create } from 'zustand';

const API_URL = 'http://localhost:5000/api/skill'; // Remplacez par l'URL de votre API

export const useSkillStore = create((set) => ({
  skills: [],
  isLoading: false,
  error: null,

  fetchSkills: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/skills`);
      set({ skills: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  addSkill: async (newSkill) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/add-skill`, newSkill);
      set((state) => ({ skills: [...state.skills, response.data], isLoading: false }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  updateSkill: async (id, updatedSkill) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.put(`${API_URL}/skills/update/${id}`, updatedSkill);
      set((state) => ({
        skills: state.skills.map((skill) => (skill._id === id ? response.data : skill)),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  deleteSkill: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await axios.delete(`${API_URL}/skills/delete/${id}`);
      set((state) => ({
        skills: state.skills.filter((skill) => skill._id !== id),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
}));
