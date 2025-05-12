import { useState, useEffect, useRef, useCallback } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/authStore";
import { useChatStore } from "../store/useChatStore";
import { formatMessageTime } from "../lib/utils";
import { Check, CheckCheck, Clock, AlertCircle, Download, Reply, Trash, Star, FileText, Play, Pause, Volume2, Smile, MoreHorizontal } from "lucide-react";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { user, socket } = useAuthStore();
  const messageEndRef = useRef(null);
  const chatBodyRef = useRef(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showDate, setShowDate] = useState(false);
  const [lastDate, setLastDate] = useState(null);
  const [showReactionPicker, setShowReactionPicker] = useState(null);
  const [messageWithMenu, setMessageWithMenu] = useState(null);
  
  // Réactions disponibles
  const availableReactions = ["👍", "❤️", "😂", "😮", "😢", "🙏"];
  
  // Fonction pour gérer l'ajout d'une réaction
  const handleAddReaction = (messageId, reaction) => {
    // Appel à l'API (à implémenter)
    console.log(`Réaction ${reaction} ajoutée au message ${messageId}`);
    
    // Mise à jour locale temporaire pour voir la réaction immédiatement
    const updatedMessages = messages.map(msg => {
      if (msg._id === messageId) {
        // Vérifier si le message a déjà des réactions
        const existingReactions = msg.reactions || [];
        
        // Vérifier si cette réaction existe déjà
        const existingReactionIndex = existingReactions.findIndex(r => r.emoji === reaction);
        
        if (existingReactionIndex >= 0) {
          // Augmenter le compteur si la réaction existe déjà
          const updatedReactions = [...existingReactions];
          updatedReactions[existingReactionIndex] = {
            ...updatedReactions[existingReactionIndex],
            count: updatedReactions[existingReactionIndex].count + 1
          };
          return { ...msg, reactions: updatedReactions };
        } else {
          // Ajouter une nouvelle réaction
          return { 
            ...msg, 
            reactions: [...existingReactions, { emoji: reaction, count: 1, users: [user._id] }] 
          };
        }
      }
      return msg;
    });
    
    // Mettre à jour le store avec les messages modifiés
    // Vous devrez ajouter cette fonction à votre useChatStore
    useChatStore.setState({ messages: updatedMessages });
    
    // Fermer le sélecteur de réactions
    setShowReactionPicker(null);
  };
  
  // Fonction pour supprimer un message
  const handleDeleteMessage = (messageId) => {
    // Appel à l'API (à implémenter)
    console.log(`Suppression du message ${messageId}`);
    
    // Supprimer le message localement
    const updatedMessages = messages.filter(msg => msg._id !== messageId);
    useChatStore.setState({ messages: updatedMessages });
    
    // Fermer le menu du message
    setMessageWithMenu(null);
  };
  
  // Fonction pour gérer le clic sur un message
  const handleMessageClick = (messageId) => {
    setSelectedMessage(selectedMessage === messageId ? null : messageId);
  };
  
  // Fermer les menus lorsqu'on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showReactionPicker && !e.target.closest('.reaction-picker')) {
        setShowReactionPicker(null);
      }
      if (messageWithMenu && !e.target.closest('.message-menu')) {
        setMessageWithMenu(null);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showReactionPicker, messageWithMenu]);

  // Détecter le mode sombre du système
  useEffect(() => {
    const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(darkModeQuery.matches);
    
    const handleChange = (e) => setIsDarkMode(e.matches);
    darkModeQuery.addEventListener("change", handleChange);
    
    return () => darkModeQuery.removeEventListener("change", handleChange);
  }, []);

  // Charger les messages et s'abonner aux mises à jour
  useEffect(() => {
    if (!selectedUser?._id) return;
    
    getMessages(selectedUser._id);
    
    if (socket?.connected) {
      subscribeToMessages();
    }

    return () => {
      unsubscribeFromMessages();
    };
  }, [selectedUser?._id, getMessages, subscribeToMessages, unsubscribeFromMessages, socket]);

  // Faire défiler vers le bas lorsque de nouveaux messages arrivent
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Grouper les messages par date avec mémoisation
  const groupMessagesByDate = useCallback(() => {
    if (!Array.isArray(messages) || messages.length === 0) return [];
    
    const groups = [];
    let currentDate = null;
    let currentGroup = [];
    
    messages.forEach(message => {
      const messageDate = new Date(message.createdAt).toLocaleDateString();
      
      if (messageDate !== currentDate) {
        if (currentGroup.length > 0) {
          groups.push({
            date: currentDate,
            messages: currentGroup
          });
        }
        currentDate = messageDate;
        currentGroup = [message];
      } else {
        currentGroup.push(message);
      }
    });
    
    if (currentGroup.length > 0) {
      groups.push({
        date: currentDate,
        messages: currentGroup
      });
    }
    
    return groups;
  }, [messages]);

  const messageGroups = groupMessagesByDate();

  // Fonction pour afficher l'état du message
  const renderMessageStatus = (message) => {
    if (message.error) {
      return <AlertCircle size={14} color="#ef4444" />;
    } else if (message.pending) {
      return <Clock size={14} color={isDarkMode ? "#a0aec0" : "#64748b"} />;
    } else if (message.read) {
      return <CheckCheck size={14} color="#3b82f6" />;
    } else {
      return <Check size={14} color={isDarkMode ? "#a0aec0" : "#64748b"} />;
    }
  };

  // Fonction pour déterminer la couleur du message en fonction du type
  const getMessageBubbleStyle = (message, isOwnMessage) => {
    // Couleurs de base pour les messages
    const baseStyle = {
      maxWidth: "100%",
      wordBreak: "break-word",
      boxShadow: isDarkMode ? "0 2px 4px rgba(0,0,0,0.2)" : "0 1px 2px rgba(0,0,0,0.1)",
      borderRadius: "1rem",
      position: "relative",
      padding: "12px 16px",
      transition: "all 0.2s ease",
    };

    // Couleurs distinctes pour les messages envoyés et reçus
    if (message.messageType === "sender") {
      return {
        ...baseStyle,
        backgroundColor: isDarkMode ? "#1a56db" : "#1e88e5", // Bleu vif pour les messages envoyés
        color: "#ffffff",
        borderBottomRightRadius: isOwnMessage ? "0.25rem" : "1rem",
        borderRight: `4px solid ${isDarkMode ? "#0f3e99" : "#0d47a1"}` // Bordure droite plus foncée
      };
    } else if (message.messageType === "receiver") {
      return {
        ...baseStyle,
        backgroundColor: isDarkMode ? "#2e7d32" : "#43a047", // Vert vif pour les messages reçus
        color: "#ffffff",
        borderBottomLeftRadius: !isOwnMessage ? "0.25rem" : "1rem",
        borderLeft: `4px solid ${isDarkMode ? "#1b5e20" : "#2e7d32"}` // Bordure gauche plus foncée
      };
    } else {
      // Style par défaut si aucun type n'est spécifié
      return {
        ...baseStyle,
        backgroundColor: isDarkMode ? "#4b5563" : "#9e9e9e", // Gris pour les messages sans type
        color: "#ffffff"
      };
    }
  };

  return (
    <div 
      className="d-flex flex-column h-100"
      style={{
        backgroundColor: isDarkMode ? "#1a1c23" : "#f8fafc",
        transition: "background-color 0.3s ease"
      }}
    >
      <ChatHeader />
      
      <div 
        ref={chatBodyRef}
        className="flex-grow-1 overflow-y-auto px-4 py-3"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: isDarkMode ? "#4b5563 #1a1c23" : "#cbd5e1 #f8fafc"
        }}
      >
        {isMessagesLoading ? (
          // Afficher des skeletons pendant le chargement
          Array(5).fill(0).map((_, index) => (
            <MessageSkeleton key={index} isOwnMessage={index % 2 === 0} isDarkMode={isDarkMode} />
          ))
        ) : messageGroups.length > 0 ? (
          messageGroups.map((group, groupIndex) => (
            <div key={group.date} className="message-group mb-4">
              {/* Date separator */}
              <div className="text-center mb-4 position-relative">
                <div 
                  className="position-absolute w-100" 
                  style={{ height: "1px", top: "50%", backgroundColor: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)" }}
                ></div>
                <span 
                  className="badge position-relative px-3 py-2 rounded-pill"
                  style={{ 
                    backgroundColor: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
                    color: isDarkMode ? "#a0aec0" : "#64748b",
                    fontSize: "0.75rem"
                  }}
                >
                  {new Date(group.date).toLocaleDateString(undefined, { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
              
              {/* Messages for this date */}
              {group.messages.map((message, index) => {
                const isOwnMessage = message.senderId._id === user._id;
                const showAvatar = index === 0 || 
                  group.messages[index - 1].senderId._id !== message.senderId._id;
                
                return (
                  <div
                    key={message._id}
                    className={`d-flex ${isOwnMessage ? "justify-content-end" : "justify-content-start"} mb-3`}
                  >
                    <div 
                      className={`d-flex gap-2 max-width-75 ${isOwnMessage ? "flex-row-reverse" : "flex-row"}`}
                      style={{ maxWidth: "75%" }}
                    >
                      {/* Avatar - only show if it's a different sender than previous message */}
                      {showAvatar ? (
                        <div className="avatar align-self-end mb-1">
                          <div 
                            className="rounded-circle overflow-hidden shadow-sm" 
                            style={{ 
                              width: "32px", 
                              height: "32px",
                              border: isDarkMode ? "2px solid #2d3748" : "2px solid #ffffff"
                            }}
                          >
                            <img
                              src={
                                isOwnMessage
                                  ? user.profilePic || "/avatar.png"
                                  : selectedUser.profilePic || "/avatar.png"
                              }
                              alt="profile pic"
                              className="w-100 h-100 object-cover"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "/avatar.png";
                              }}
                            />
                          </div>
                        </div>
                      ) : (
                        <div style={{ width: "32px" }}></div>
                      )}
                      
                      {/* Message content */}
                      <div 
                        className={`message-container ${
                          selectedMessage === message._id ? "selected" : ""
                        } ${message.messageType === "sender" ? "sender-message" : "receiver-message"}`}
                        onClick={() => handleMessageClick(message._id)}
                      >
                        {/* Type indicator badge */}
                        <div 
                          className="position-absolute"
                          style={{
                            top: "-10px",
                            [isOwnMessage ? "right" : "left"]: "10px",
                            zIndex: 1
                          }}
                        >
                          <span 
                            className="badge rounded-pill"
                            style={{ 
                              backgroundColor: message.messageType === "sender" ? 
                                (isDarkMode ? "#0f3e99" : "#0d47a1") : 
                                (isDarkMode ? "#1b5e20" : "#2e7d32"),
                              color: "white",
                              fontSize: "0.65rem",
                              padding: "2px 6px"
                            }}
                          >
                            {message.messageType === "sender" ? "Envoyé" : "Reçu"}
                          </span>
                        </div>
                        
                        {/* Time */}
                        <div className={`mb-1 d-flex ${isOwnMessage ? "justify-content-end" : "justify-content-start"}`}>
                          <small 
                            style={{ 
                              color: isDarkMode ? "#a0aec0" : "#64748b",
                              fontSize: "0.7rem"
                            }}
                          >
                            {formatMessageTime(message.createdAt)}
                          </small>
                        </div>
                        
                        {/* Message bubble with dynamic styling */}
                        <div 
                          className={`message-bubble ${message.pending ? "opacity-70" : ""} ${message.error ? "border border-danger" : ""}`}
                          style={getMessageBubbleStyle(message, isOwnMessage)}
                        >
                          {/* Image */}
                          {message.fileType === 'image' && message.fileUrl && (
                            <div className="message-image-container mb-2 position-relative">
                              <img
                                src={message.fileUrl}
                                alt="Message attachment"
                                className="img-fluid rounded"
                                style={{ 
                                  maxWidth: "250px", 
                                  maxHeight: "250px", 
                                  objectFit: "cover",
                                  cursor: "pointer"
                                }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.open(message.fileUrl, '_blank');
                                }}
                                onError={(e) => {
                                  console.error("Image loading error:", e);
                                  e.target.style.display = 'none';
                                }}
                              />
                              <div 
                                className="position-absolute bottom-0 end-0 m-2 p-1 rounded-circle"
                                style={{
                                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                                  cursor: "pointer"
                                }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const link = document.createElement('a');
                                  link.href = message.fileUrl;
                                  link.download = 'image.jpg';
                                  link.click();
                                }}
                              >
                                <Download size={16} color="#ffffff" />
                              </div>
                            </div>
                          )}
                          
                          {/* Document */}
                          {message.fileType === 'document' && message.fileUrl && (
                            <div className="message-document-container mb-2">
                              <div 
                                className="d-flex align-items-center gap-2 p-2 rounded"
                                style={{
                                  backgroundColor: "rgba(0, 0, 0, 0.05)",
                                  cursor: "pointer"
                                }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.open(message.fileUrl, '_blank');
                                }}
                              >
                                <FileText size={24} color="#3b82f6" />
                                <div className="d-flex flex-column">
                                  <span className="text-truncate" style={{ maxWidth: "180px", fontSize: "0.9rem" }}>
                                    {message.fileName || "Document"}
                                  </span>
                                  <small className="text-muted">Cliquez pour ouvrir</small>
                                </div>
                                <div 
                                  className="ms-auto p-1 rounded-circle"
                                  style={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    const link = document.createElement('a');
                                    link.href = message.fileUrl;
                                    link.download = message.fileName || 'document';
                                    link.click();
                                  }}
                                >
                                  <Download size={16} color="#3b82f6" />
                                </div>
                              </div>
                            </div>
                          )}
                          
                          {/* Audio */}
                          {message.fileType === 'audio' && message.fileUrl && (
                            <div className="message-audio-container mb-2">
                              <div 
                                className="d-flex align-items-center gap-2 p-2 rounded"
                                style={{
                                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                                  borderRadius: "12px",
                                  padding: "8px 12px"
                                }}
                              >
                                <AudioPlayer 
                                  audioUrl={message.fileUrl} 
                                  isDarkMode={isDarkMode} 
                                />
                              </div>
                            </div>
                          )}
                          
                          {/* Text content */}
                          {message.content && (
                            <p 
                              className="mb-0"
                              style={{
                                fontSize: "0.95rem",
                                lineHeight: "1.5"
                              }}
                            >
                              {message.content}
                            </p>
                          )}
                          
                          {/* Message status */}
                          {isOwnMessage && (
                            <div 
                              className="position-absolute"
                              style={{
                                bottom: "4px",
                                right: "8px",
                                fontSize: "0.7rem"
                              }}
                            >
                              {renderMessageStatus(message)}
                            </div>
                          )}
                        </div>
                        
                        {/* Message actions - visible when selected */}
                        {selectedMessage === message._id && (
                          <div 
                            className={`message-actions mt-2 d-flex gap-2 ${
                              isOwnMessage ? "justify-content-end" : "justify-content-start"
                            }`}
                          >
                            <button 
                              className="btn btn-sm p-1"
                              style={{
                                backgroundColor: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
                                borderRadius: "50%",
                                width: "28px",
                                height: "28px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                border: "none",
                                transition: "all 0.2s ease"
                              }}
                              title="Reply"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Logique pour répondre
                              }}
                            >
                              <Reply size={14} color={isDarkMode ? "#e2e8f0" : "#64748b"} />
                            </button>
                            
                            {/* Bouton de réaction avec sélecteur */}
                            <div className="position-relative reaction-picker">
                              <button 
                                className="btn btn-sm p-1"
                                style={{
                                  backgroundColor: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
                                  borderRadius: "50%",
                                  width: "28px",
                                  height: "28px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  border: "none",
                                  transition: "all 0.2s ease"
                                }}
                                title="Add reaction"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setShowReactionPicker(showReactionPicker === message._id ? null : message._id);
                                }}
                              >
                                <Smile size={14} color={isDarkMode ? "#e2e8f0" : "#64748b"} />
                              </button>
                              
                              {showReactionPicker === message._id && (
                                <div 
                                  className="position-absolute d-flex gap-1 p-1 rounded"
                                  style={{
                                    bottom: "100%",
                                    [isOwnMessage ? "right" : "left"]: "0",
                                    marginBottom: "8px",
                                    backgroundColor: isDarkMode ? "#1e293b" : "white",
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                                    zIndex: 10,
                                    border: isDarkMode ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.05)"
                                  }}
                                >
                                  {availableReactions.map(reaction => (
                                    <button
                                      key={reaction}
                                      className="btn p-1"
                                      style={{
                                        fontSize: "1.2rem",
                                        lineHeight: 1,
                                        transition: "transform 0.2s ease"
                                      }}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleAddReaction(message._id, reaction);
                                      }}
                                      onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.2)"}
                                      onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                                    >
                                      {reaction}
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                            
                            <button 
                              className="btn btn-sm p-1"
                              style={{
                                backgroundColor: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
                                borderRadius: "50%",
                                width: "28px",
                                height: "28px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                border: "none",
                                transition: "all 0.2s ease"
                              }}
                              title="Star message"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Logique pour marquer en favori
                              }}
                            >
                              <Star size={14} color={isDarkMode ? "#e2e8f0" : "#64748b"} />
                            </button>
                            
                            {/* Menu contextuel avec plus d'options */}
                            <div className="position-relative message-menu">
                              <button 
                                className="btn btn-sm p-1"
                                style={{
                                  backgroundColor: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
                                  borderRadius: "50%",
                                  width: "28px",
                                  height: "28px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  border: "none",
                                  transition: "all 0.2s ease"
                                }}
                                title="More options"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setMessageWithMenu(messageWithMenu === message._id ? null : message._id);
                                }}
                              >
                                <MoreHorizontal size={14} color={isDarkMode ? "#e2e8f0" : "#64748b"} />
                              </button>
                              
                              {messageWithMenu === message._id && (
                                <div 
                                  className="position-absolute py-1 rounded"
                                  style={{
                                    bottom: "100%",
                                    [isOwnMessage ? "right" : "left"]: "0",
                                    marginBottom: "8px",
                                    backgroundColor: isDarkMode ? "#1e293b" : "white",
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                                    zIndex: 10,
                                    border: isDarkMode ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.05)",
                                    minWidth: "150px"
                                  }}
                                >
                                  <div 
                                    className="px-3 py-2 d-flex align-items-center gap-2"
                                    style={{
                                      cursor: "pointer",
                                      transition: "background-color 0.2s ease",
                                      color: isDarkMode ? "#e2e8f0" : "#1e293b",
                                      fontSize: "0.875rem"
                                    }}
                                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"}
                                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      // Logique pour transférer
                                    }}
                                  >
                                    <Reply size={14} style={{transform: "scaleX(-1)"}} />
                                    <span>Transférer</span>
                                  </div>
                                  
                                  {isOwnMessage && (
                                    <>
                                      <div 
                                        className="px-3 py-2 d-flex align-items-center gap-2"
                                        style={{
                                          cursor: "pointer",
                                          transition: "background-color 0.2s ease",
                                          color: isDarkMode ? "#e2e8f0" : "#1e293b",
                                          fontSize: "0.875rem"
                                        }}
                                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"}
                                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          // Logique pour modifier
                                        }}
                                      >
                                        <i className="bx bx-edit-alt" style={{fontSize: "14px"}}></i>
                                        <span>Modifier</span>
                                      </div>
                                      
                                      <div 
                                        className="px-3 py-2 d-flex align-items-center gap-2"
                                        style={{
                                          cursor: "pointer",
                                          transition: "background-color 0.2s ease",
                                          color: "#ef4444",
                                          fontSize: "0.875rem"
                                        }}
                                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = isDarkMode ? "rgba(239,68,68,0.1)" : "rgba(239,68,68,0.05)"}
                                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleDeleteMessage(message._id);
                                        }}
                                      >
                                        <Trash size={14} />
                                        <span>Supprimer</span>
                                      </div>
                                    </>
                                  )}
                                  
                                  {!isOwnMessage && (
                                    <div 
                                      className="px-3 py-2 d-flex align-items-center gap-2"
                                      style={{
                                        cursor: "pointer",
                                        transition: "background-color 0.2s ease",
                                        color: "#ef4444",
                                        fontSize: "0.875rem"
                                      }}
                                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = isDarkMode ? "rgba(239,68,68,0.1)" : "rgba(239,68,68,0.05)"}
                                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        // Logique pour signaler
                                      }}
                                    >
                                      <i className="bx bx-dislike" style={{fontSize: "14px"}}></i>
                                      <span>Signaler</span>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                        
                        {/* Affichage des réactions (si le message en a) */}
                        {message.reactions && message.reactions.length > 0 && (
                          <div 
                            className={`d-flex gap-1 mt-1 ${isOwnMessage ? "justify-content-end" : "justify-content-start"}`}
                          >
                            {message.reactions.map((reaction, index) => (
                              <div 
                                key={index}
                                className="d-flex align-items-center px-1 py-0"
                                style={{
                                  backgroundColor: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
                                  borderRadius: "12px",
                                  fontSize: "0.8rem"
                                }}
                              >
                                <span>{reaction.emoji}</span>
                                {reaction.count > 1 && (
                                  <span className="ms-1" style={{fontSize: "0.7rem", color: isDarkMode ? "#a0aec0" : "#64748b"}}>
                                    {reaction.count}
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))
        ) : (
          <div className="d-flex flex-column align-items-center justify-content-center h-100 py-5">
            <div 
              className="rounded-circle mb-3 d-flex align-items-center justify-content-center"
              style={{
                width: "80px",
                height: "80px",
                backgroundColor: isDarkMode ? "rgba(255,255,255,0.05)" : "rgba(59, 130, 246, 0.1)"
              }}
            >
              <MessageSquare 
                size={40} 
                color={isDarkMode ? "#a0aec0" : "#3b82f6"} 
                strokeWidth={1.5} 
              />
            </div>
            <h5 
              className="mb-2"
              style={{
                color: isDarkMode ? "#e2e8f0" : "#1e293b",
                fontWeight: "600"
              }}
            >
              No messages yet
            </h5>
            <p 
              className="text-center mb-0"
              style={{
                color: isDarkMode ? "#a0aec0" : "#64748b",
                maxWidth: "300px",
                fontSize: "0.9rem"
              }}
            >
              Start the conversation with {selectedUser?.fullName || selectedUser?.name || "this user"}
            </p>
          </div>
        )}
        <div ref={messageEndRef} />
      </div>
      
      <MessageInput isDarkMode={isDarkMode} />
      
      {/* Styles for scrollbar and other elements */}
      <style jsx>{`
        /* Custom scrollbar for Webkit browsers */
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-track {
          background: ${isDarkMode ? "#1a1c23" : "#f8fafc"};
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background-color: ${isDarkMode ? "#4b5563" : "#cbd5e1"};
          border-radius: 6px;
        }
        
        /* Message container hover effect */
        .message-container {
          transition: all 0.2s ease;
          cursor: pointer;
        }
        
        .message-container:hover .message-bubble {
          filter: brightness(${isDarkMode ? "1.1" : "0.98"});
        }
        
        .message-container.selected .message-bubble {
          filter: brightness(${isDarkMode ? "1.15" : "0.95"});
        }
        
        /* Animation for new messages */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .message-bubble {
          animation: fadeIn 0.3s ease;
        }
      `}</style>
    </div>
  );
};

// Ajout du composant MessageSquare manquant
const MessageSquare = ({ size, color, strokeWidth }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth={strokeWidth} 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
  );
};

const AudioPlayer = ({ audioUrl, isDarkMode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const audioRef = useRef(null);
  const waveformRef = useRef(null);
  
  useEffect(() => {
    const audio = audioRef.current;
    
    const setAudioData = () => {
      setDuration(audio.duration);
      audio.volume = volume;
    };
    
    const setAudioTime = () => {
      setCurrentTime(audio.currentTime);
    };
    
    const handleAudioEnd = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };
    
    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);
    audio.addEventListener('ended', handleAudioEnd);
    
    // Générer une forme d'onde aléatoire plus réaliste
    if (waveformRef.current) {
      const bars = waveformRef.current.querySelectorAll('.waveform-bar');
      const pattern = generateWaveformPattern(bars.length);
      
      bars.forEach((bar, index) => {
        bar.style.height = `${pattern[index]}px`;
      });
    }
    
    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
      audio.removeEventListener('ended', handleAudioEnd);
    };
  }, [volume]);
  
  // Génère un motif d'onde sonore plus naturel
  const generateWaveformPattern = (length) => {
    const baseHeight = 5;
    const maxHeight = 18;
    const pattern = [];
    
    // Créer une courbe plus naturelle avec des pics et des creux
    for (let i = 0; i < length; i++) {
      // Utiliser une fonction sinusoïdale pour créer un motif plus naturel
      const sinValue = Math.sin((i / length) * Math.PI * 4);
      const randomFactor = 0.3 + Math.random() * 0.7; // Ajouter un peu d'aléatoire
      const height = baseHeight + (maxHeight - baseHeight) * Math.abs(sinValue) * randomFactor;
      pattern.push(Math.round(height));
    }
    
    return pattern;
  };
  
  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(err => console.error("Erreur de lecture audio:", err));
    }
    setIsPlaying(!isPlaying);
  };
  
  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  const handleSliderChange = (e) => {
    const audio = audioRef.current;
    audio.currentTime = e.target.value;
    setCurrentTime(e.target.value);
  };
  
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };
  
  const toggleVolumeControl = () => {
    setShowVolumeControl(!showVolumeControl);
  };
  
  // Calculer la progression pour l'animation de l'onde sonore
  const getProgress = () => {
    if (!duration) return 0;
    return (currentTime / duration);
  };
  
  const progress = getProgress();
  const waveformBars = 28; // Nombre de barres dans la forme d'onde
  
  return (
    <div className="audio-player-container w-100">
      <audio ref={audioRef} src={audioUrl} preload="metadata" />
      
      <div className="d-flex align-items-center gap-2 p-1" 
           style={{
             background: isDarkMode ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.9)",
             borderRadius: "16px",
             padding: "8px 12px",
             boxShadow: isDarkMode ? "0 4px 6px rgba(0,0,0,0.2)" : "0 2px 10px rgba(0,0,0,0.05)",
             border: isDarkMode ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.05)"
           }}>
        
        {/* Bouton play/pause avec animation */}
        <button 
          onClick={togglePlay}
          className="btn p-0 d-flex align-items-center justify-content-center"
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            backgroundColor: isPlaying 
              ? (isDarkMode ? "#4f46e5" : "#4338ca") 
              : (isDarkMode ? "#3b82f6" : "#2563eb"),
            color: "white",
            border: "none",
            flexShrink: 0,
            transition: "all 0.2s ease",
            transform: isPlaying ? "scale(1.05)" : "scale(1)",
            boxShadow: isPlaying 
              ? "0 0 10px rgba(59, 130, 246, 0.5)" 
              : "0 2px 4px rgba(0,0,0,0.2)"
          }}
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
        </button>
        
        {/* Partie centrale avec forme d'onde et contrôles */}
        <div className="d-flex flex-column flex-grow-1 gap-1">
          {/* Temps et durée */}
          <div className="d-flex justify-content-between align-items-center">
            <span style={{ 
              fontSize: "0.75rem", 
              fontWeight: "500",
              color: isDarkMode ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.7)"
            }}>
              {formatTime(currentTime)}
            </span>
            <span style={{ 
              fontSize: "0.75rem", 
              color: isDarkMode ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.5)"
            }}>
              {formatTime(duration)}
            </span>
          </div>
          
          {/* Barre de progression stylisée */}
          <div className="position-relative" style={{ height: "4px", marginBottom: "6px" }}>
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "4px",
              backgroundColor: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
              borderRadius: "2px"
            }}></div>
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: `${progress * 100}%`,
              height: "4px",
              backgroundColor: isDarkMode ? "#60a5fa" : "#3b82f6",
              borderRadius: "2px",
              transition: "width 0.1s linear"
            }}></div>
            <input 
              type="range" 
              value={currentTime}
              min={0}
              max={duration || 0}
              step={0.01}
              onChange={handleSliderChange}
              className="position-absolute w-100"
              style={{
                top: "-2px",
                height: "8px",
                opacity: 0,
                cursor: "pointer"
              }}
            />
          </div>
          
          {/* Visualisation de l'onde sonore améliorée */}
          <div 
            ref={waveformRef}
            className="d-flex align-items-center justify-content-between gap-1"
            style={{ height: "24px", padding: "0 2px" }}
          >
            {Array(waveformBars).fill(0).map((_, i) => (
              <div 
                key={i}
                className="waveform-bar"
                style={{
                  width: "2px",
                  height: "10px", // Hauteur par défaut, sera remplacée par JS
                  backgroundColor: i < (progress * waveformBars) 
                    ? (isDarkMode ? "#60a5fa" : "#3b82f6") 
                    : (isDarkMode ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)"),
                  borderRadius: "1px",
                  transition: "background-color 0.2s ease"
                }}
              />
            ))}
          </div>
        </div>
        
        {/* Contrôles de volume et téléchargement */}
        <div className="d-flex align-items-center gap-2">
          {/* Contrôle du volume avec popover */}
          <div className="position-relative">
            <button 
              onClick={toggleVolumeControl}
              className="btn p-1"
              style={{
                borderRadius: "50%",
                backgroundColor: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
              title="Ajuster le volume"
            >
              <Volume2 size={14} color={isDarkMode ? "#e2e8f0" : "#64748b"} />
            </button>
            
            {showVolumeControl && (
              <div 
                className="position-absolute"
                style={{
                  bottom: "100%",
                  right: 0,
                  marginBottom: "8px",
                  width: "120px",
                  padding: "8px",
                  backgroundColor: isDarkMode ? "#1e293b" : "white",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  zIndex: 10,
                  border: isDarkMode ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.05)"
                }}
              >
                <input 
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="form-range"
                  style={{
                    accentColor: isDarkMode ? "#3b82f6" : "#3b82f6"
                  }}
                />
              </div>
            )}
          </div>
          
          {/* Bouton de téléchargement */}
          <button 
            onClick={() => {
              const link = document.createElement('a');
              link.href = audioUrl;
              link.download = 'audio.mp3';
              link.click();
            }}
            className="btn p-1"
            style={{
              borderRadius: "50%",
              backgroundColor: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
            title="Télécharger l'audio"
          >
            <Download size={14} color={isDarkMode ? "#e2e8f0" : "#64748b"} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;



















