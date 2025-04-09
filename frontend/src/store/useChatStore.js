import axios from "axios";
import { create } from "zustand";
import { toast } from "react-toastify";
import { useAuthStore } from "./authStore";
import { io } from "socket.io-client";

const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/message"
    : "/api/message";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const useChatStore = create((set, get) => ({
  users: [],
  messages: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  socketInstance: null,  // Ajout d'une instance de socket dédiée au chat

  // Initialisation du socket
  initializeSocket: () => {
    const socket = io('http://localhost:5000', {
      withCredentials: true,
      autoConnect: true
    });
    set({ socketInstance: socket });
    return socket;
  },

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axios.get(`${API_URL}/users`);
      set({ users: res.data });
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to load users";
      toast.error(msg);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axios.get(`/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to load messages";
      toast.error(msg);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages, socketInstance } = get();
    try {
      const res = await axios.post(`${API_URL}/send/${selectedUser._id}`, messageData);
      const newMessage = res.data;
      
      // Mise à jour locale immédiate
      set({ messages: [...messages, newMessage] });
      
      // Émission via socket si disponible
      if (socketInstance) {
        socketInstance.emit('sendMessage', newMessage);
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to send message";
      toast.error(msg);
    }
  },

  subscribeToMessages: () => {
    const { selectedUser, socketInstance } = get();
    
    if (!selectedUser) {
      console.warn('No selected user for message subscription');
      return () => {};
    }

    const socket = socketInstance || useAuthStore.getState().socket;
    
    if (!socket) {
      console.error('Socket connection not available');
      return () => {};
    }

    const messageHandler = (newMessage) => {
      if (newMessage.senderId === selectedUser.id) {
        set(state => ({
          messages: [...state.messages, newMessage]
        }));
      }
    };

    socket.on("newMessage", messageHandler);

    // Retourne une fonction de nettoyage
    return () => {
      socket.off("newMessage", messageHandler);
    };
  },

  unsubscribeFromMessages: () => {
    const { socketInstance } = get();
    const socket = socketInstance || useAuthStore.getState().socket;
    
    if (socket) {
      socket.off("newMessage");
    }
  },

  cleanupSocket: () => {
    const { socketInstance } = get();
    if (socketInstance) {
      socketInstance.disconnect();
      set({ socketInstance: null });
    }
  },

  setSelectedUser: (selectedUser) => {
    // Désabonnement des messages précédents avant de changer d'utilisateur
    get().unsubscribeFromMessages();
    set({ selectedUser });
  },
}));