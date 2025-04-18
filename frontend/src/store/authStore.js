import axios from "axios";
import { create } from "zustand";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { io } from "socket.io-client";

const API_URL = import.meta.env.MODE === "development" 
  ? "http://localhost:5000/api/auth" 
  : "/api/auth";

axios.defaults.withCredentials = true;

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

  setUser: (userData) => {
    if (!userData?._id && !userData?.id) {
      console.error("Attempted to set invalid user data:", userData);
      return;
    }

    const normalizedUser = {
      ...userData,
      _id: userData._id || userData.id
    };

    set({ 
      user: normalizedUser,
      isAuthenticated: true 
    });

    const currentSocket = get().socket;
    if (!currentSocket?.connected) {
      get().connectSocket();
    }
  },

  setOnlineUsers: (users) => {
    set({ onlineUsers: users });
  },

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
        name, email, phone, role, password,
      });

      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
        message: "Signup successful! Please check your email.",
      });
    } catch (error) {
      set({ 
        error: error.response?.data?.message || "Signup failed", 
        isLoading: false 
      });
      throw error;
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      const userData = response.data.user;
      
      if (!userData || (!userData._id && !userData.id)) {
        throw new Error("Invalid user data received");
      }

      const normalizedUser = {
        ...userData,
        _id: userData._id || userData.id
      };

      const currentSocket = get().socket;
      if (currentSocket?.connected) {
        currentSocket.disconnect();
      }

      set({
        user: normalizedUser,
        isAuthenticated: true,
        error: null,
        isLoading: false,
        socket: null
      });

      // Retourner les données de l'utilisateur
      return {
        user: normalizedUser
      };
    } catch (error) {
      set({
        error: error.response?.data?.message || "Login failed",
        isLoading: false
      });
      throw error;
    }
  },

  logout: async () => {
    const { socket } = get();
    
    try {
      if (socket?.connected) {
        socket.disconnect();
      }
      
      await axios.post(`${API_URL}/logout`);
      
      set({ 
        user: null, 
        isAuthenticated: false, 
        socket: null, 
        onlineUsers: [],
        error: null,
        message: null,
        isLoading: false,
        isCheckingAuth: false,
        isUpdatingProfile: false
      });
      
      localStorage.clear();
      sessionStorage.clear();
      
      return true;
    } catch (error) {
      console.error("Logout error:", error);
      set({ 
        user: null, 
        isAuthenticated: false, 
        socket: null, 
        onlineUsers: [] 
      });
      return false;
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/check-auth`);
      const userData = response.data.user;
      
      if (!userData?._id && !userData?.id) {
        throw new Error("Invalid user data received from check-auth");
      }

      const normalizedUser = {
        ...userData,
        _id: userData._id || userData.id
      };

      set({
        user: normalizedUser,
        isAuthenticated: true,
        isCheckingAuth: false,
      });

      if (normalizedUser._id) {
        get().connectSocket();
      }

      return {
        ...response.data,
        user: normalizedUser
      };
    } catch (error) {
      set({
        user: null,
        isAuthenticated: false,
        isCheckingAuth: false,
        socket: null,
        onlineUsers: []
      });
      
      const currentSocket = get().socket;
      if (currentSocket?.connected) {
        currentSocket.disconnect();
      }
      
      throw error;
    }
  },

  connectSocket: () => {
    const { user } = get();
    
    if (!user?._id) {
      return;
    }

    const userId = user._id.toString();
    
    const currentSocket = get().socket;
    if (currentSocket?.connected) {
      currentSocket.disconnect();
    }

    const socket = io("http://localhost:5000", {
      query: { userId },
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
      transports: ['websocket']
    });

    socket.on("connect", () => {
      socket.emit("setup", userId);
    });

    socket.on("onlineUsers", (users) => {
      set({ onlineUsers: users.filter(id => id !== 'undefined') });
    });

    set({ socket });
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const response = await axios.put(`${API_URL}/update-profile`, data);
      set({ user: response.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating profile");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  forgotPassword: async (email) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/forget-password`, { email });
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Error sending reset password email"
      });
      throw error;
    }
  },

  resetPassword: async (token, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/reset-password/${token}`, { 
        password 
      });
      
      if (!response.data.success) {
        throw new Error(response.data.message || "Password reset failed");
      }
      
      set({ 
        message: response.data.message, 
        isLoading: false 
      });
      
      return response.data;
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Error resetting password"
      });
      throw error;
    }
  },

  resendVerificationCode: async (email) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/resend-verification-code`, { email });
      set({ 
        message: response.data.message, 
        isLoading: false 
      });
      return response.data;
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Error resending verification code"
      });
      throw error;
    }
  },

  verifyEmail: async (verificationCode) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/verify-email`, { 
        code: verificationCode.toString() // Ensure code is sent as string
      });
      
      if (!response.data.success) {
        throw new Error(response.data.message || "Email verification failed");
      }
      
      set({ 
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
        message: "Email verified successfully"
      });
      
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Error verifying email";
      set({
        isLoading: false,
        error: errorMessage
      });
      throw error;
    }
  }
}));
