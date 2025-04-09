import axios from "axios";
import { create } from "zustand";

const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/auth"
    : "/api/auth";

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  message: null,
  isUpdatingProfile: false,
  onlineUsers: [],
  socket: null,

  signup: async (name, email, phone, role, password) => {
    set({ isLoading: true, error: null, message: null });

    if (!name || !email || !phone || !role || !password) {
      set({ error: "Tous les champs sont obligatoires", isLoading: false });
      return;
    }

    const validRoles = ["learner", "admin", "educator"];
    if (!validRoles.includes(role)) {
      set({ error: "Rôle invalide", isLoading: false });
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/signup`, {
        name,
        email,
        phone,
        role,
        password,
      });

      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
        message: "Inscription réussie ! Vérifiez votre email.",
      });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Erreur lors de l'inscription";
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      set({
        isAuthenticated: true,
        user: response.data.user,
        error: null,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Erreur de connexion",
        isLoading: false,
      });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(`${API_URL}/logout`);
      set({
        user: null,
        isAuthenticated: false,
        error: null,
        isLoading: false,
      });
    } catch (error) {
      set({ error: "Erreur lors de la déconnexion", isLoading: false });
      throw error;
    }
  },
  verifyEmail: async (code) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/verify-email`, { code });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
      return response.data;
    } catch (error) {
      set({
        error: error.response.data.message || "Error verifying email",
        isLoading: false,
      });
      throw error;
    }
  },
  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/check-auth`);
      set({
        user: response.data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
      return response.data;
    } catch (error) {
      set({ error, isCheckingAuth: false, isAuthenticated: false });
    }
  },
  forgotPassword: async (email) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/forget-password`, {
        email,
      });
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error:
          error.response?.data?.message || "Error sending reset password email",
      });
      throw error;
    }
  },
  resetPassword: async (token, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/reset-password/${token}`, {
        password,
      });
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Error resetting password",
      });
      throw error;
    }
  },

  resendVerificationCode: async () => {
    set({ isLoading: true, error: null, message: null });

    try {
      const { user } = useAuthStore.getState();
      if (!user?.email) {
        set({ error: "User email not found", isLoading: false });
        return;
      }

      const response = await axios.post(`${API_URL}/resend-verification-code`, {
        email: user.email,
      });

      set({
        isLoading: false,
        message: "New verification code sent successfully",
      });

      return response.data;
    } catch (error) {
      set({
        error:
          error.response?.data?.message || "Error while resending the code",
        isLoading: false,
      });
      throw error;
    }
  },

  // updateProfile: async (data) => {
  //   set({ isUpdatingProfile: true });
  //   try {
  //     const res = await axiosInstance.put(`${API_URL}/update-profile`, data);
  //     set({ user: res.data });
  //     toast.success("Profile updated successfully");
  //   } catch (error) {
  //     console.log("error in update profile:", error);
  //     toast.error(error.response.data.message);
  //   } finally {
  //     set({ isUpdatingProfile: false });
  //   }
  // },
}));
