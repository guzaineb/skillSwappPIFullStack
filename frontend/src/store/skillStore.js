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

  search: async (searchTerm) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/search`, {
        params: { searchTerm }
      });
      set({ skills: response.data });
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ isLoading: false });
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
      const response = await axios.put(`${API_URL}/skills/update/${id}`, updatedSkill);
      set((state) => ({
        skills: state.skills.map((skill) =>
          skill._id === id ? response.data : skill
        )
      }));
    } catch (err) {
      set({ error: err.message });
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
}));
