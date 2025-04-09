import axios from "axios";
import { create } from "zustand";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { io } from "socket.io-client";

const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/auth"
    : "/api/auth";

axios.defaults.withCredentials = true;

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const useAuthStore = create((set, get) => ({
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
      set({
        error: "All fields are required",
        isLoading: false,
      });
      return;
    }

    const validRoles = ["learner", "admin", "educator"];
    if (!validRoles.includes(role)) {
      set({ error: "Invalid role", isLoading: false });
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
        message: "Signup successful! Please check your email.",
      });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Signup failed";
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
        error:
          error.response?.data?.message || "Login failed",
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
      set({
        error: "Logout failed",
        isLoading: false,
      });
      throw error;
    }
  },

  verifyEmail: async (code) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/verify-email`, {
        code,
      });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
      return response.data;
    } catch (error) {
      set({
        error:
          error.response?.data?.message || "Verification failed",
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
      set({
        error: null,
        isCheckingAuth: false,
        isAuthenticated: false,
      });
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
          error.response?.data?.message ||
          "Error sending reset password email",
      });
      throw error;
    }
  },

  resetPassword: async (token, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(
        `${API_URL}/reset-password/${token}`,
        { password }
      );
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error:
          error.response?.data?.message ||
          "Error resetting password",
      });
      throw error;
    }
  },

  resendVerificationCode: async () => {
    set({ isLoading: true, error: null, message: null });

    try {
      const { user } = get();
      if (!user?.email) {
        set({ error: "User email not found", isLoading: false });
        return;
      }

      const response = await axios.post(
        `${API_URL}/resend-verification-code`,
        {
          email: user.email,
        }
      );

      set({
        isLoading: false,
        message: "Verification code resent successfully",
      });

      return response.data;
    } catch (error) {
      set({
        error:
          error.response?.data?.message ||
          "Error resending verification code",
        isLoading: false,
      });
      throw error;
    }
  },

//   updateProfile: async (data) => {
//     set({ isUpdatingProfile: true });
//     try {
//       const res = await axiosInstance.put(`/update-profile`, data);
//       set({ user: res.data });
//       toast.success("Profile updated successfully");
//     } catch (error) {
//       console.log("error in update profile:", error);
//       toast.error(
//         error.response?.data?.message || "Error updating profile"
//       );
//     } finally {
//       set({ isUpdatingProfile: false });
//     }
//   },

// updateProfile: async (data) => {
//     set({ isUpdatingProfile: true });
//     try {
//       const res = await axiosInstance.put(`/update-profile`, data);
//       set({ user: res.data }); // Assure-toi que la réponse contient bien l'URL de l'image mise à jour
//       toast.success("Profile updated successfully");
//     } catch (error) {
//       console.log("error in update profile:", error);
//       toast.error(
//         error.response?.data?.message || "Error updating profile"
//       );
//     } finally {
//       set({ isUpdatingProfile: false });
//     }
//   },

updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const response = await axios.put(`${API_URL}/update-profile`, data);

      set({user: response.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("error in update profile:", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },



  // initializeSocket: (userId) => {
  //   const socket = io("http://localhost:5000", {
  //     query: { userId },
  //   });

  //   socket.on("connect", () => {
  //     console.log("Connected to socket server");
  //   });

  //   socket.on("getOnlineUsers", (onlineUsers) => {
  //     set({ onlineUsers });
  //   });

  //   set({ socket });
  // },



  cleanupSocket: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
      set({ socket: null, onlineUsers: [] });
    }
  },
}));
