import axios from "axios";
import { create } from "zustand";
import { toast } from "react-toastify";
import { useAuthStore } from "./authStore";

<<<<<<< HEAD
// Fonction pour la synthèse vocale
const speakWarning = (message) => {
  if ('speechSynthesis' in window) {
    const speech = new SpeechSynthesisUtterance();
    speech.text = message;
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    speech.lang = 'fr-FR'; // Langue française
    
    // Optionnel: choisir une voix spécifique
    window.speechSynthesis.onvoiceschanged = () => {
      const voices = window.speechSynthesis.getVoices();
      const frenchVoice = voices.find(voice => voice.lang.includes('fr'));
      if (frenchVoice) {
        speech.voice = frenchVoice;
      }
    };
    
    window.speechSynthesis.speak(speech);
  }
};

=======
>>>>>>> origin/tasks
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
<<<<<<< HEAD
      
      // Assurez-vous que les types de messages sont correctement définis
      const currentUser = useAuthStore.getState().user;
      const processedMessages = res.data.map(msg => {
        // Vérifiez si le type de message est déjà défini correctement
        if (msg.messageType) return msg;
        
        // Sinon, définissez-le en fonction de l'expéditeur
        return {
          ...msg,
          messageType: msg.senderId._id === currentUser._id ? "sender" : "receiver"
        };
      });
      
      set({ messages: processedMessages || [] });
=======
      set({ messages: res.data || [] });
>>>>>>> origin/tasks
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

<<<<<<< HEAD
    if (!messageData?.content && !messageData?.image && !messageData?.audio && !messageData?.document) {
=======
    if (!messageData?.content && !messageData?.image) {
>>>>>>> origin/tasks
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
<<<<<<< HEAD
      fileUrl: messageData.image || messageData.audio || messageData.document || "",
      fileType: messageData.image ? "image" : messageData.audio ? "audio" : messageData.document ? "document" : null,
      fileName: messageData.documentName || null,
      messageType: "sender", // Toujours "sender" pour les messages envoyés
=======
      image: messageData.image || "",
>>>>>>> origin/tasks
      createdAt: new Date().toISOString(),
      pending: true
    };

<<<<<<< HEAD
    // Ajouter le message temporaire à l'état
    set(state => ({
      messages: [...state.messages, tempMessage]
    }));

    try {
      const formData = new FormData();
      if (messageData.content) formData.append('content', messageData.content);
      
      // Gérer les différents types de fichiers
      if (messageData.image) {
        const base64Response = await fetch(messageData.image);
        const blob = await base64Response.blob();
        formData.append('file', blob, 'image.jpg');
      } else if (messageData.audio) {
        const base64Response = await fetch(messageData.audio);
        const blob = await base64Response.blob();
        formData.append('file', blob, 'audio.mp3');
      } else if (messageData.document) {
        const base64Response = await fetch(messageData.document);
        const blob = await base64Response.blob();
        formData.append('file', blob, messageData.documentName || 'document.pdf');
      }
      
      formData.append('messageType', 'sender'); // Ajouter le type de message
=======
    try {
      set({ messages: [...messages, tempMessage] });

      const formData = new FormData();
      if (messageData.content) formData.append('content', messageData.content);
      if (messageData.image) {
        const base64Response = await fetch(messageData.image);
        const blob = await base64Response.blob();
        formData.append('image', blob, 'image.jpg');
      }
>>>>>>> origin/tasks

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

<<<<<<< HEAD
      // Vérifier si le socket est connecté avant d'émettre l'événement
      if (socket?.connected) {
        console.log("Emitting sendMessage event with data:", {
          senderId: currentUser._id,
          receiverId: selectedUser._id,
          content: messageData.content || "",
          fileUrl: res.data.fileUrl,
          fileType: res.data.fileType,
          fileName: res.data.fileName,
          messageType: "sender"
        });
        
        socket.emit("sendMessage", {
          senderId: currentUser._id,
          receiverId: selectedUser._id,
          content: messageData.content || "",
          fileUrl: res.data.fileUrl,
          fileType: res.data.fileType,
          fileName: res.data.fileName,
          messageType: "sender"
        });
      } else {
        console.warn("Socket is not connected, cannot emit sendMessage event");
      }

      return res.data;
    } catch (error) {
      console.error("Error sending message:", error);
      
      // Vérifier si l'erreur est liée à du contenu inapproprié
      if (error.response?.data?.error && error.response.data.error.includes('contenu inapproprié')) {
        // Alerte vocale pour contenu inapproprié
        speakWarning("Attention! Votre message contient du contenu inapproprié et n'a pas été envoyé.");
        
        // Notification visuelle
        toast.error(error.response.data.error, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        toast.error("Failed to send message");
      }
      
      // Mettre à jour le message temporaire pour indiquer l'échec
      set({
        messages: messages.map(msg =>
          msg._id === tempMessage._id ? { ...msg, error: true, pending: false } : msg
        )
      });
      
      throw error;
=======
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
>>>>>>> origin/tasks
    }
  },

  handleNewMessage: (newMessage) => {
    const { messages, selectedUser } = get();
    const currentUser = useAuthStore.getState().user;

<<<<<<< HEAD
    // Assurez-vous que le type de message est correctement défini
    if (!newMessage.messageType) {
      if (newMessage.senderId._id === currentUser._id) {
        newMessage.messageType = "sender";
      } else {
        newMessage.messageType = "receiver";
      }
    }

=======
>>>>>>> origin/tasks
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
<<<<<<< HEAD
        toast.info(`Nouveau message de ${selectedUser.fullName}`);
=======
        toast.info(`Nouveau message de ${selectedUser.name}`);
>>>>>>> origin/tasks
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

<<<<<<< HEAD
    socket.on("newMessage", (message) => {
      // Forcer le type à "receiver" pour les nouveaux messages
      const processedMessage = {...message, messageType: "receiver"};
      get().handleNewMessage(processedMessage);
    });
    
    socket.on("messageSent", (message) => {
      // Forcer le type à "sender" pour les messages envoyés
      const processedMessage = {...message, messageType: "sender"};
      get().handleNewMessage(processedMessage);
    });
    
    socket.on("messageReceived", (data) => {
      if (data.message) {
        const currentUser = useAuthStore.getState().user;
        // Déterminer le type en fonction de l'expéditeur
        const messageType = data.message.senderId._id === currentUser._id 
          ? "sender" 
          : "receiver";
        
        const processedMessage = {...data.message, messageType};
        get().handleNewMessage(processedMessage);
=======
    socket.on("newMessage", get().handleNewMessage);
    socket.on("messageSent", get().handleNewMessage);
    socket.on("messageReceived", (data) => {
      if (data.message) {
        get().handleNewMessage(data.message);
>>>>>>> origin/tasks
      }
    });

    socket.on("messageError", (error) => {
      console.error("Message error:", error);
<<<<<<< HEAD
      
      // Vérifier si l'erreur est liée à du contenu inapproprié
      if (error.error && error.error.includes('contenu inapproprié')) {
        // Alerte vocale pour contenu inapproprié
        speakWarning("Attention! Votre message contient du contenu inapproprié et n'a pas été envoyé.");
        
        // Notification visuelle
        toast.error(error.error, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        toast.error(error.error || "Erreur lors de l'envoi du message");
      }
      
      // Supprimer le message temporaire qui a échoué
      set({
        messages: get().messages.filter(msg => !msg.pending)
      });
=======
      toast.error(error.message || "Erreur lors de l'envoi du message");
>>>>>>> origin/tasks
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

<<<<<<< HEAD
  setSelectedUser: (selectedUser) => set({ selectedUser }),

  // Pour ajouter une réaction à un message
  addReaction: (messageId, reaction, userId) => {
    set((state) => {
      const updatedMessages = state.messages.map(msg => {
        if (msg._id === messageId) {
          const existingReactions = msg.reactions || [];
          const existingReactionIndex = existingReactions.findIndex(r => r.emoji === reaction);
          
          if (existingReactionIndex >= 0) {
            const updatedReactions = [...existingReactions];
            updatedReactions[existingReactionIndex] = {
              ...updatedReactions[existingReactionIndex],
              count: updatedReactions[existingReactionIndex].count + 1,
              users: [...updatedReactions[existingReactionIndex].users, userId]
            };
            return { ...msg, reactions: updatedReactions };
          } else {
            return { 
              ...msg, 
              reactions: [...existingReactions, { emoji: reaction, count: 1, users: [userId] }] 
            };
          }
        }
        return msg;
      });
      
      return { ...state, messages: updatedMessages };
    });
    
    // Appel API pour persister la réaction
    try {
      // Implémentez l'appel API ici
      // api.post('/messages/reaction', { messageId, reaction, userId });
    } catch (error) {
      console.error("Erreur lors de l'ajout de la réaction:", error);
    }
  },

  // Pour supprimer un message
  deleteMessage: async (messageId) => {
    // Optimistic update - supprimer d'abord localement
    set((state) => ({
      ...state,
      messages: state.messages.filter(msg => msg._id !== messageId)
    }));
    
    // Appel API pour supprimer définitivement
    try {
      // Implémentez l'appel API ici
      // await api.delete(`/messages/${messageId}`);
    } catch (error) {
      console.error("Erreur lors de la suppression du message:", error);
      // Recharger les messages en cas d'erreur
      getMessages(state.selectedUser._id);
    }
  }
}));
=======
  setSelectedUser: (selectedUser) => set({ selectedUser })
}));
>>>>>>> origin/tasks
