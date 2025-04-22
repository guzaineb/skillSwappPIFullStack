import axios from "axios";
import { create } from "zustand";
import { toast } from "react-toastify";
import { useAuthStore } from "./authStore";

const API_URL = import.meta.env.MODE === "development"
  ? "http://localhost:5000/api/message"
  : "/api/message";

export const useChatStore = create((set, get) => ({
  selectedUser: null,
  messages: [],
  users: [],
  isLoading: false,
  setSelectedUser: (user) => set({ selectedUser: user }),
  isUsersLoading: false,
  isMessagesLoading: false,

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
    if (!userId) return;
    
    set({ isMessagesLoading: true });
    try {
      const res = await axios.get(`${API_URL}/${userId}`);
      set({ messages: res.data || [] });
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to load messages";
      toast.error(msg);
      set({ messages: [] });
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    const socket = useAuthStore.getState().socket;
    const currentUser = useAuthStore.getState().user;

    if (!selectedUser?._id) {
      toast.error("No user selected");
      return;
    }

    if (!messageData?.content && !messageData?.image) {
      toast.error("Message cannot be empty");
      return;
    }

    const tempMessage = {
      _id: Date.now().toString(),
      senderId: {
        _id: currentUser._id,
        fullName: currentUser.fullName,
        profilePic: currentUser.profilePic
      },
      receiverId: {
        _id: selectedUser._id,
        fullName: selectedUser.fullName,
        profilePic: selectedUser.profilePic
      },
      content: messageData.content || "",
      image: messageData.image || "",
      createdAt: new Date().toISOString(),
      pending: true
    };

    try {
      set({ messages: [...messages, tempMessage] });

      const formData = new FormData();
      if (messageData.content) formData.append('content', messageData.content);
      if (messageData.image) {
        const base64Response = await fetch(messageData.image);
        const blob = await base64Response.blob();
        formData.append('image', blob, 'image.jpg');
      }

      const res = await axios.post(
        `${API_URL}/send/${selectedUser._id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      // Mettre à jour le message avec la réponse du serveur
      set({
        messages: messages.map(msg =>
          msg._id === tempMessage._id ? res.data : msg
        )
      });

      if (socket?.connected) {
        socket.emit("sendMessage", {
          receiverId: selectedUser._id,
          content: messageData.content,
          image: res.data.image // Utiliser l'URL de l'image du serveur
        });
      }

    } catch (error) {
      console.error("Error sending message:", error);
      set({
        messages: messages.map(msg =>
          msg._id === tempMessage._id
            ? { ...msg, error: true, pending: false }
            : msg
        )
      });
      toast.error(error.response?.data?.message || "Failed to send message");
    }
  },

  handleNewMessage: (newMessage) => {
    const { messages, selectedUser } = get();
    const currentUser = useAuthStore.getState().user;

    const messageExists = messages.some(msg => msg._id === newMessage._id);
    const isRelevantMessage = selectedUser && (
      (newMessage.senderId._id === currentUser._id && newMessage.receiverId._id === selectedUser._id) ||
      (newMessage.receiverId._id === currentUser._id && newMessage.senderId._id === selectedUser._id)
    );

    if (!messageExists && isRelevantMessage) {
      set(state => ({
        messages: [...state.messages, newMessage]
      }));
      
      if (newMessage.senderId._id === selectedUser._id) {
        toast.info(`Nouveau message de ${selectedUser.name}`);
      }
    }
  },

  subscribeToMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) {
      console.error("Socket is not initialized");
      return;
    }

    get().unsubscribeFromMessages();

    socket.on("newMessage", get().handleNewMessage);
    socket.on("messageSent", get().handleNewMessage);
    socket.on("messageReceived", (data) => {
      if (data.message) {
        get().handleNewMessage(data.message);
      }
    });

    socket.on("messageError", (error) => {
      console.error("Message error:", error);
      toast.error(error.message || "Erreur lors de l'envoi du message");
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (socket) {
      socket.off("newMessage");
      socket.off("messageReceived");
      socket.off("messageSent");
      socket.off("messageError");
    }
  },

  setSelectedUser: (selectedUser) => set({ selectedUser })
}));
