// src/store/skillStore.js
import axios from 'axios';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const API_URL = 'http://localhost:5000/api/skill';

/**
 * Store pour la gestion des compétences
 * Utilise Zustand avec persistance pour conserver certaines données entre les sessions
 */
export const useSkillStore = create(
  persist(
    (set, get) => ({
      skills: [],
      featuredSkills: [],
      popularSkills: [],
      userSkills: [],
      filteredSkills: [],
      selectedSkill: null,
      skillProgress: {},
      pagination: {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0
      },
      filters: {
        search: '',
        category: '',
        level: '',
        pricingType: '',
        status: 'active',
        sortField: 'createdDate',
        sortOrder: 'desc'
      },
      isLoading: false,
      error: null,

      /**
       * Réinitialise les filtres
       */
      resetFilters: () => {
        set({
          filters: {
            search: '',
            category: '',
            level: '',
            pricingType: '',
            status: 'active',
            sortField: 'createdDate',
            sortOrder: 'desc'
          }
        });
      },

      /**
       * Met à jour les filtres
       * @param {Object} newFilters - Nouveaux filtres à appliquer
       */
      updateFilters: (newFilters) => {
        set((state) => ({
          filters: { ...state.filters, ...newFilters },
          pagination: { ...state.pagination, page: 1 } // Réinitialiser la page lors du changement de filtres
        }));
      },

      /**
       * Récupère les compétences avec pagination et filtres
       * @param {Object} customFilters - Filtres personnalisés (optionnel)
       */
      fetchSkills: async (customFilters = {}) => {
        set({ isLoading: true, error: null });
        try {
          const { filters, pagination } = get();

          // Si limit est spécifié dans customFilters, utiliser cette valeur
          // sinon utiliser une valeur élevée pour récupérer toutes les compétences
          const limit = customFilters.limit || 1000;

          const params = {
            ...filters,
            ...customFilters,
            page: pagination.page,
            limit
          };

          console.log('Paramètres de la requête fetchSkills:', params);

          const response = await axios.get(`${API_URL}/skills`, { params });
          console.log('Réponse de la requête fetchSkills:', response.data);

          set({
            skills: response.data.skills || [],
            pagination: response.data.pagination || {
              page: 1,
              limit: 10,
              total: 0,
              totalPages: 0
            },
            filteredSkills: response.data.skills || []
          });

          return response.data;
        } catch (err) {
          const errorMessage = err.response?.data?.message || err.message;
          set({ error: errorMessage });
          throw new Error(errorMessage);
        } finally {
          set({ isLoading: false });
        }
      },

      /**
       * Récupère les compétences mises en avant
       * @param {number} limit - Nombre de compétences à récupérer
       */
      fetchFeaturedSkills: async (limit = 6) => {
        try {
          const response = await axios.get(`${API_URL}/skills`, {
            params: {
              featured: true,
              status: 'active',
              limit,
              sortField: 'enrollmentCount',
              sortOrder: 'desc'
            }
          });

          set({ featuredSkills: response.data.skills || [] });
          return response.data.skills;
        } catch (err) {
          console.error('Erreur lors de la récupération des compétences mises en avant:', err);
          return [];
        }
      },

      /**
       * Récupère les compétences populaires
       * @param {number} limit - Nombre de compétences à récupérer
       */
      fetchPopularSkills: async (limit = 6) => {
        try {
          const response = await axios.get(`${API_URL}/skills`, {
            params: {
              status: 'active',
              limit,
              sortField: 'enrollmentCount',
              sortOrder: 'desc'
            }
          });

          set({ popularSkills: response.data.skills || [] });
          return response.data.skills;
        } catch (err) {
          console.error('Erreur lors de la récupération des compétences populaires:', err);
          return [];
        }
      },

      /**
       * Récupère les compétences d'un utilisateur
       * @param {string} userId - ID de l'utilisateur
       */
      fetchUserSkills: async (userId) => {
        if (!userId) return;

        set({ isLoading: true, error: null });
        try {
          const response = await axios.get(`${API_URL}/getSkillsByLearner/${userId}`);
          set({ userSkills: response.data || [] });
          return response.data;
        } catch (err) {
          const errorMessage = err.response?.data?.message || err.message;
          console.error('Erreur lors de la récupération des compétences de l\'utilisateur:', errorMessage);
          set({ error: errorMessage });
        } finally {
          set({ isLoading: false });
        }
      },

      /**
       * Récupère une compétence par son ID
       * @param {string} id - ID de la compétence
       */
      fetchSkillById: async (id) => {
        if (!id) return null;

        set({ isLoading: true, error: null });
        try {
          const response = await axios.get(`${API_URL}/skills/${id}`);
          set({ selectedSkill: response.data });
          return response.data;
        } catch (err) {
          const errorMessage = err.response?.data?.message || err.message;
          set({ error: errorMessage });
          throw new Error(errorMessage);
        } finally {
          set({ isLoading: false });
        }
      },

      /**
       * Récupère la progression d'un utilisateur pour une compétence
       * @param {string} userId - ID de l'utilisateur
       * @param {string} skillId - ID de la compétence
       */
      fetchUserSkillProgress: async (userId, skillId) => {
        if (!userId || !skillId) return null;

        try {
          const response = await axios.get(`${API_URL}/progress/${userId}/${skillId}`);
          set((state) => ({
            skillProgress: {
              ...state.skillProgress,
              [`${userId}_${skillId}`]: response.data
            }
          }));
          return response.data;
        } catch (err) {
          console.error('Erreur lors de la récupération de la progression:', err);
          return null;
        }
      },

      /**
       * Marque une leçon comme lue
       * @param {string} userId - ID de l'utilisateur
       * @param {string} skillId - ID de la compétence
       * @param {string} lessonId - ID de la leçon
       */
      markLessonAsRead: async (userId, skillId, lessonId) => {
        if (!userId || !skillId || !lessonId) return null;

        try {
          const response = await axios.post(`${API_URL}/read-skill`, {
            userId,
            skillId,
            lessonId
          });

          // Mettre à jour la progression locale
          set((state) => {
            const progressKey = `${userId}_${skillId}`;
            const currentProgress = state.skillProgress[progressKey] || { completedLessons: [] };

            if (!currentProgress.completedLessons.includes(lessonId)) {
              return {
                skillProgress: {
                  ...state.skillProgress,
                  [progressKey]: {
                    ...currentProgress,
                    completedLessons: [...currentProgress.completedLessons, lessonId]
                  }
                }
              };
            }

            return state;
          });

          return response.data;
        } catch (err) {
          console.error('Erreur lors du marquage de la leçon comme lue:', err);
          return null;
        }
      },

      /**
       * Permet à un utilisateur de participer à une compétence
       * @param {string} userId - ID de l'utilisateur
       * @param {string} skillId - ID de la compétence
       */
      participateToSkill: async (userId, skillId) => {
        if (!userId || !skillId) {
          throw new Error('Les identifiants de l\'utilisateur et de la compétence sont requis');
        }

        try {
          const response = await axios.post(`${API_URL}/participate`, {
            userId,
            skillId,
          });

          // Mettre à jour le compteur d'inscriptions de la compétence
          set((state) => {
            const updatedSkills = state.skills.map(skill => {
              if (skill._id === skillId) {
                return {
                  ...skill,
                  enrollmentCount: (skill.enrollmentCount || 0) + 1
                };
              }
              return skill;
            });

            // Mettre à jour également la compétence sélectionnée si elle correspond
            const updatedSelectedSkill = state.selectedSkill && state.selectedSkill._id === skillId
              ? { ...state.selectedSkill, enrollmentCount: (state.selectedSkill.enrollmentCount || 0) + 1 }
              : state.selectedSkill;

            return {
              skills: updatedSkills,
              selectedSkill: updatedSelectedSkill,
              userSkills: [...state.userSkills, state.skills.find(s => s._id === skillId)].filter(Boolean)
            };
          });

          return response.data;
        } catch (error) {
          const errorMessage = error.response?.data?.message || error.message;
          console.error('Erreur lors de la participation à la compétence:', errorMessage);
          throw new Error(errorMessage);
        }
      },

      /**
       * Ajoute une nouvelle compétence
       * @param {Object} newSkill - Données de la nouvelle compétence
       */
      addSkill: async (newSkill) => {
        set({ isLoading: true, error: null });
        try {
          console.log('Données reçues dans addSkill:', newSkill);

          // Préparation des données à envoyer
          const dataToSend = { ...newSkill };

          // Convertir les leçons en JSON si ce n'est pas déjà fait
          if (dataToSend.lessons && Array.isArray(dataToSend.lessons)) {
            dataToSend.lessons = JSON.stringify(dataToSend.lessons);
          }

          console.log('Données formatées pour l\'ajout:', dataToSend);

          // Envoi des données au serveur
          const response = await axios.post(`${API_URL}/add`, dataToSend, {
            headers: {
              'Content-Type': 'application/json'
            }
          });

          set((state) => ({
            skills: [...state.skills, response.data.skill]
          }));

          return response.data.skill;
        } catch (err) {
          const errorMessage = err.response?.data?.message || err.message;
          set({ error: errorMessage });
          throw new Error(errorMessage);
        } finally {
          set({ isLoading: false });
        }
      },

      /**
       * Met à jour une compétence existante
       * @param {string} id - ID de la compétence à mettre à jour
       * @param {Object} updatedSkill - Nouvelles données de la compétence
       */
      updateSkill: async (id, updatedSkill) => {
        if (!id) {
          throw new Error('L\'ID de la compétence est requis');
        }

        set({ isLoading: true, error: null });
        try {
          console.log('Données à mettre à jour:', updatedSkill);

          // Préparation des données à envoyer
          const dataToSend = { ...updatedSkill };

          // Convertir les leçons en JSON si ce n'est pas déjà fait
          if (dataToSend.lessons && Array.isArray(dataToSend.lessons)) {
            dataToSend.lessons = JSON.stringify(dataToSend.lessons);
          }

          console.log('Données formatées pour la mise à jour:', dataToSend);

          // Envoi des données au serveur
          const response = await axios.put(`${API_URL}/skills/update/${id}`, dataToSend, {
            headers: {
              'Content-Type': 'application/json'
            }
          });

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

      /**
       * Supprime une compétence
       * @param {string} id - ID de la compétence à supprimer
       */
      deleteSkill: async (id) => {
        if (!id) {
          throw new Error('L\'ID de la compétence est requis');
        }

        set({ isLoading: true, error: null });
        try {
          await axios.delete(`${API_URL}/skills/delete/${id}`);

          set((state) => ({
            skills: state.skills.filter((skill) => skill._id !== id),
            featuredSkills: state.featuredSkills.filter((skill) => skill._id !== id),
            popularSkills: state.popularSkills.filter((skill) => skill._id !== id),
            userSkills: state.userSkills.filter((skill) => skill._id !== id),
            selectedSkill: state.selectedSkill?._id === id ? null : state.selectedSkill
          }));

          return { success: true, message: 'Compétence supprimée avec succès' };
        } catch (err) {
          const errorMessage = err.response?.data?.message || err.message;
          set({ error: errorMessage });
          throw new Error(errorMessage);
        } finally {
          set({ isLoading: false });
        }
      },

      /**
       * Récupère les compétences par catégorie
       * @param {string} categoryId - ID de la catégorie
       */
      fetchSkillsByCategory: async (categoryId) => {
        if (!categoryId) return [];

        set({ isLoading: true, error: null });
        try {
          const response = await axios.get(`${API_URL}/skills/category/${categoryId}`);
          set({ filteredSkills: response.data || [] });
          return response.data;
        } catch (err) {
          const errorMessage = err.response?.data?.message || err.message;
          set({ error: errorMessage });
          throw new Error(errorMessage);
        } finally {
          set({ isLoading: false });
        }
      },

      /**
       * Recherche avancée de compétences
       * @param {Object} searchParams - Paramètres de recherche
       */
      advancedSearch: async (searchParams) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.get(`${API_URL}/search`, { params: searchParams });
          set({ filteredSkills: response.data || [] });
          return response.data;
        } catch (err) {
          const errorMessage = err.response?.data?.message || err.message;
          set({ error: errorMessage });
          throw new Error(errorMessage);
        } finally {
          set({ isLoading: false });
        }
      },

      /**
       * Génère un certificat pour une compétence terminée
       * @param {string} userId - ID de l'utilisateur
       * @param {string} skillId - ID de la compétence
       */
      generateCertificate: async (userId, skillId) => {
        if (!userId || !skillId) {
          throw new Error('Les identifiants de l\'utilisateur et de la compétence sont requis');
        }

        try {
          const response = await axios.post(`${API_URL}/generate-certificate`, {
            userId,
            skillId
          });

          return response.data;
        } catch (err) {
          const errorMessage = err.response?.data?.message || err.message;
          console.error('Erreur lors de la génération du certificat:', errorMessage);
          throw new Error(errorMessage);
        }
      }
    }),
    {
      name: 'skill-store', // Nom pour le stockage persistant
      partialize: (state) => ({
        // Ne persister que certaines parties du state
        filters: state.filters,
        pagination: state.pagination
      })
    }
  )
);



