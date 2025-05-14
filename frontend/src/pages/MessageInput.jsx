import { useState, useRef, useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/authStore";
import { toast } from "react-toastify";
import { Mic, Image, Paperclip, Send, X, Play, Pause, File, ChevronDown, Smile } from "lucide-react";
import ContentWarning from "../components/ContentWarning";

const MessageInput = ({ isDarkMode }) => {
  const { sendMessage, selectedUser } = useChatStore();
  const { user } = useAuthStore();
  const [text, setText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [audioPreview, setAudioPreview] = useState(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [documentPreview, setDocumentPreview] = useState(null);
  const [documentName, setDocumentName] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [showEmojiMenu, setShowEmojiMenu] = useState(false);
  const [activeEmojiCategory, setActiveEmojiCategory] = useState("smileys");
  const [showWarning, setShowWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  
  const textInputRef = useRef(null);
  const fileInputRef = useRef(null);
  const documentInputRef = useRef(null);
  const audioRef = useRef(null);
  const recordingTimerRef = useRef(null);
  const emojiMenuRef = useRef(null);
  
  const effectiveDarkMode = isDarkMode;
  
  // Catégories d'emojis
  const emojiCategories = [
    { id: "smileys", name: "Smileys", icon: "😊" },
    { id: "people", name: "Personnes", icon: "👨" },
    { id: "animals", name: "Animaux", icon: "🐶" },
    { id: "food", name: "Nourriture", icon: "🍔" },
    { id: "travel", name: "Voyage", icon: "✈️" },
    { id: "activities", name: "Activités", icon: "⚽" },
    { id: "objects", name: "Objets", icon: "💡" },
    { id: "symbols", name: "Symboles", icon: "❤️" },
    { id: "flags", name: "Drapeaux", icon: "🏁" }
  ];
  
  // Emojis par catégorie
  const emojis = {
    smileys: ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚"],
    people: ["👶", "👧", "🧒", "👦", "👩", "🧑", "👨", "👵", "🧓", "👴", "👲", "👳‍♀️", "👳‍♂️", "🧕", "👮‍♀️", "👮‍♂️", "👷‍♀️", "👷‍♂️", "💂‍♀️", "💂‍♂️"],
    animals: ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁", "🐮", "🐷", "🐸", "🐵", "🙈", "🙉", "🙊", "🐒", "🐔"],
    food: ["🍏", "🍎", "🍐", "🍊", "🍋", "🍌", "🍉", "🍇", "🍓", "🍈", "🍒", "🍑", "🥭", "🍍", "🥥", "🥝", "🍅", "🍆", "🥑", "🥦"],
    travel: ["🚗", "🚕", "🚙", "🚌", "🚎", "🏎", "🚓", "🚑", "🚒", "🚐", "🚚", "🚛", "🚜", "🛴", "🚲", "🛵", "🏍", "🚨", "🚔", "🚍"],
    activities: ["⚽", "🏀", "🏈", "⚾", "🥎", "🎾", "🏐", "🏉", "🥏", "🎱", "🏓", "🏸", "🥅", "🏒", "🏑", "🥍", "🏏", "⛳", "🏹", "🎣"],
    objects: ["⌚", "📱", "📲", "💻", "⌨️", "🖥", "🖨", "🖱", "🖲", "🕹", "🗜", "💽", "💾", "💿", "📀", "📼", "📷", "📸", "📹", "🎥"],
    symbols: ["❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "♥️", "💘", "💝", "💖", "💗", "💓", "💞", "💕", "💌", "💟", "❣️", "💔", "💋"],
    flags: ["🏁", "🚩", "🎌", "🏴", "🏳️", "🏳️‍🌈", "🏴‍☠️", "🇦🇨", "🇦🇩", "🇦🇪", "🇦🇫", "🇦🇬", "🇦🇮", "🇦🇱", "🇦🇲", "🇦🇴", "🇦🇶", "🇦🇷", "🇦🇸", "🇦🇹"]
  };
  
  // Fermer le menu emoji lorsqu'on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiMenuRef.current && !emojiMenuRef.current.contains(event.target) && 
          !event.target.closest('.emoji-button')) {
        setShowEmojiMenu(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

  // Gérer la sélection d'emoji
  const handleEmojiClick = (emoji) => {
    setText(prevText => prevText + emoji);
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
  };
  
  // Changer de catégorie d'emoji
  const handleCategoryChange = (categoryId) => {
    setActiveEmojiCategory(categoryId);
  };
  
  // Gérer la lecture audio
  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
      if (isAudioPlaying) {
        audioElement.play().catch(error => {
          console.error("Error playing audio:", error);
          setIsAudioPlaying(false);
        });
      } else {
        audioElement.pause();
      }
    }
    
    return () => {
      if (audioElement) {
        audioElement.pause();
      }
    };
  }, [isAudioPlaying]);
  
  // Nettoyer les ressources lors du démontage
  useEffect(() => {
    return () => {
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }
      
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
      
      if (audioPreview) {
        URL.revokeObjectURL(audioPreview);
      }
      
      if (documentPreview) {
        URL.revokeObjectURL(documentPreview);
      }
    };
  }, [imagePreview, audioPreview, documentPreview]);
  
  // Gérer la fin de la lecture audio
  const handleAudioEnded = () => {
    setIsAudioPlaying(false);
  };
  
  // Basculer la lecture audio
  const toggleAudioPlayback = () => {
    setIsAudioPlaying(!isAudioPlaying);
  };
  
  // Gérer le changement d'image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("L'image ne doit pas dépasser 5 Mo");
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        toast.error("Veuillez sélectionner une image valide");
        return;
      }
      
      console.log("Image selected:", file.name, "Size:", file.size, "bytes");
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      setShowAttachMenu(false);
    }
  };
  
  // Gérer le changement de document
  const handleDocumentChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error("Le document ne doit pas dépasser 10 Mo");
        return;
      }
      
      console.log("Document selected:", file.name, "Size:", file.size, "bytes");
      const documentUrl = URL.createObjectURL(file);
      setDocumentPreview(documentUrl);
      setDocumentName(file.name);
      setShowAttachMenu(false);
    }
  };

  // Supprimer l'aperçu de l'image
  const removeImagePreview = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
      setImagePreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  // Supprimer l'aperçu du document
  const removeDocumentPreview = () => {
    if (documentPreview) {
      URL.revokeObjectURL(documentPreview);
      setDocumentPreview(null);
      setDocumentName(null);
      if (documentInputRef.current) {
        documentInputRef.current.value = "";
      }
    }
  };

  // Supprimer l'aperçu audio
  const removeAudioPreview = () => {
    if (audioPreview) {
      URL.revokeObjectURL(audioPreview);
      setAudioPreview(null);
      setAudioChunks([]);
    }
  };

  // Démarrer/arrêter l'enregistrement audio
  const toggleRecording = async () => {
    if (isRecording) {
      // Arrêter l'enregistrement
      if (mediaRecorder && mediaRecorder.state === "recording") {
        mediaRecorder.stop();
        console.log("Recording stopped");
      }
      return;
    }
    
    // Démarrer l'enregistrement
    try {
      console.log("Requesting microphone access...");
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log("Microphone access granted");
      
      const chunks = [];
      
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
      setAudioChunks(chunks);
      
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
          console.log("Audio chunk received, size:", e.data.size);
          setAudioChunks([...chunks]);
        }
      };
      
      // Démarrer le timer d'enregistrement
      setRecordingTime(0);
      setIsRecording(true);
      recordingTimerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
      recorder.onstop = () => {
        clearInterval(recordingTimerRef.current);
        console.log("Processing audio chunks...");
        
        if (chunks.length === 0) {
          console.error("No audio chunks recorded");
          toast.error("Aucun audio enregistré");
          setIsRecording(false);
          return;
        }
        
        const audioBlob = new Blob(chunks, { type: 'audio/mp3' });
        console.log("Audio blob created, size:", audioBlob.size);
        
        if (audioBlob.size === 0) {
          console.error("Audio blob is empty");
          toast.error("L'enregistrement audio est vide");
          setIsRecording(false);
          return;
        }
        
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioPreview(audioUrl);
        setIsRecording(false);
        
        // Arrêter toutes les pistes audio
        stream.getTracks().forEach(track => track.stop());
        
        console.log("Audio recording completed and ready to send");
      };
      
      console.log("Starting audio recording...");
      recorder.start(100); // Collecter des données toutes les 100ms
      
      // Arrêter automatiquement après 60 secondes
      setTimeout(() => {
        if (recorder.state === "recording") {
          console.log("Maximum recording time reached (60s)");
          recorder.stop();
          toast.info("Enregistrement terminé (limite de 60 secondes atteinte)");
        }
      }, 60000);
      
    } catch (error) {
      console.error("Erreur lors de l'enregistrement audio:", error);
      toast.error("Impossible d'accéder au microphone");
      setIsRecording(false);
    }
  };

  // Formater le temps d'enregistrement
  const formatRecordingTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Ajouter une fonction pour vérifier le contenu avant l'envoi
  const checkContentBeforeSend = async (text) => {
    if (!text || !text.trim()) return { isInappropriate: false };
    
    try {
      // Vérifier d'abord avec une liste locale de mots interdits
      const localForbiddenWords = [
        "tuer", "mort", "violence", "haine", "sexe", "drogue",
        "putain", "connard", "salope", "pute", "enculé"
      ];
      
      const lowerText = text.toLowerCase();
      for (const word of localForbiddenWords) {
        if (lowerText.includes(word)) {
          console.log("Mot interdit détecté localement:", word);
          return { 
            isInappropriate: true, 
            reason: `Le message contient un mot interdit: "${word}"` 
          };
        }
      }
      
      // Si aucun mot interdit n'est détecté localement, vérifier avec le serveur
      if (socket?.connected) {
        return new Promise((resolve) => {
          console.log("Vérification du contenu via socket:", text);
          socket.emit('checkContent', text, (response) => {
            console.log("Réponse de la vérification:", response);
            resolve(response);
          });
        });
      }
      
      // Si pas de socket, faire une vérification via API
      const response = await axios.post('/api/check-content', { text });
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la vérification du contenu:", error);
      return { isInappropriate: false }; // En cas d'erreur, permettre l'envoi
    }
  };

  // Modifier la fonction handleSendMessage pour vérifier le contenu
  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    // Vérifier si le message est vide (pas de texte et pas de fichiers)
    const messageIsEmpty = !text.trim() && !imagePreview && !audioPreview && !documentPreview;
    
    if (messageIsEmpty || isRecording) {
      console.log("Message vide ou enregistrement en cours, annulation de l'envoi");
      if (messageIsEmpty) {
        toast.warning("Le message ne peut pas être vide");
      }
      return;
    }
    
    try {
      // Vérifier le contenu du message si du texte est présent
      if (text.trim()) {
        const contentCheck = await checkContentBeforeSend(text.trim());
        
        if (contentCheck.isInappropriate) {
          console.log("Contenu inapproprié détecté:", contentCheck);
          setWarningMessage(contentCheck.reason || "Votre message contient du contenu inapproprié");
          setShowWarning(true);
          
          // Optionnel: utiliser la synthèse vocale pour l'avertissement
          speakWarning(contentCheck.reason || "Votre message contient du contenu inapproprié");
          
          return;
        }
      }
      
      // Créer un objet avec uniquement les propriétés non vides
      const messageData = {};
      
      if (text.trim()) messageData.content = text.trim();
      if (imagePreview) messageData.image = imagePreview;
      if (audioPreview) messageData.audio = audioPreview;
      if (documentPreview) {
        messageData.document = documentPreview;
        messageData.documentName = documentName;
      }
      
      console.log("Envoi du message avec:", messageData);
      
      await sendMessage(messageData);
      
      // Réinitialiser le formulaire
      setText("");
      setImagePreview(null);
      setAudioPreview(null);
      setDocumentPreview(null);
      setDocumentName(null);
      
      // Réinitialiser les inputs de fichiers
      if (fileInputRef.current) fileInputRef.current.value = "";
      if (documentInputRef.current) documentInputRef.current.value = "";
      
      // Focus sur l'input texte
      if (textInputRef.current) {
        textInputRef.current.focus();
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi du message:", error);
      toast.error("Erreur lors de l'envoi du message");
    }
  };

  // Basculer l'affichage du menu emoji
  const toggleEmojiMenu = () => {
    setShowEmojiMenu(!showEmojiMenu);
  };

  return (
    <>
      {/* Composant d'alerte pour contenu inapproprié */}
      {showWarning && (
        <ContentWarning 
          message={warningMessage} 
          onClose={() => setShowWarning(false)} 
        />
      )}
      
      <div 
        className="message-input-container p-3 border-top position-relative"
        style={{
          backgroundColor: effectiveDarkMode ? "#1a1c23" : "#ffffff",
          borderColor: effectiveDarkMode ? "#2d3748" : "#e2e8f0",
          transition: "background-color 0.3s ease"
        }}
      >
        {/* Aperçu de l'image */}
        {imagePreview && (
          <div 
            className="image-preview mb-3 position-relative"
            style={{
              maxWidth: "200px",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
            }}
          >
            <img 
              src={imagePreview} 
              alt="Preview" 
              className="img-fluid rounded"
            />
            <button
              type="button"
              className="btn btn-sm btn-danger position-absolute top-0 end-0 m-1 p-0 d-flex align-items-center justify-content-center"
              onClick={removeImagePreview}
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "50%"
              }}
            >
              <X size={14} />
            </button>
          </div>
        )}
        
        {/* Aperçu du document */}
        {documentPreview && (
          <div 
            className="document-preview mb-3 p-2 rounded d-flex align-items-center"
            style={{
              backgroundColor: effectiveDarkMode ? "rgba(45, 55, 72, 0.5)" : "rgba(226, 232, 240, 0.5)",
              maxWidth: "300px"
            }}
          >
            <File size={24} className="me-2" color="#3b82f6" />
            <div className="flex-grow-1 text-truncate">
              <span className="d-block text-truncate" style={{ maxWidth: "200px" }}>
                {documentName || "Document"}
              </span>
              <small className="text-muted">Cliquez pour prévisualiser</small>
            </div>
            <button
              type="button"
              className="btn btn-sm btn-danger ms-2 p-0 d-flex align-items-center justify-content-center"
              onClick={removeDocumentPreview}
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "50%"
              }}
            >
              <X size={14} />
            </button>
          </div>
        )}
        
        {/* Aperçu audio */}
        {audioPreview && (
          <div 
            className="audio-preview mb-3 p-2 rounded d-flex align-items-center"
            style={{
              backgroundColor: effectiveDarkMode ? "rgba(45, 55, 72, 0.5)" : "rgba(226, 232, 240, 0.5)",
              maxWidth: "300px"
            }}
          >
            <div className="d-flex align-items-center">
              <button
                type="button"
                className="btn btn-sm me-2"
                onClick={toggleAudioPlayback}
                style={{
                  backgroundColor: effectiveDarkMode ? "rgba(59, 130, 246, 0.2)" : "rgba(59, 130, 246, 0.1)",
                  color: "#3b82f6",
                  border: "none",
                  borderRadius: "50%",
                  width: "32px",
                  height: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 0
                }}
              >
                {isAudioPlaying ? <Pause size={16} /> : <Play size={16} />}
              </button>
              
              <audio 
                ref={audioRef} 
                src={audioPreview} 
                onEnded={handleAudioEnded} 
                className="d-none"
              />
              
              <span className="text-muted">
                Message vocal
              </span>
            </div>
            
            <button
              type="button"
              className="btn btn-sm btn-danger ms-auto p-0 d-flex align-items-center justify-content-center"
              onClick={removeAudioPreview}
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "50%"
              }}
            >
              <X size={14} />
            </button>
          </div>
        )}
        
        {/* Afficher le temps d'enregistrement */}
        {isRecording && (
          <div 
            className="recording-indicator mb-3 p-2 rounded d-flex align-items-center"
            style={{
              backgroundColor: "rgba(239, 68, 68, 0.1)",
              color: "#ef4444",
              maxWidth: "200px"
            }}
          >
            <div className="recording-dot me-2" style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "#ef4444",
              animation: "pulse 1.5s infinite"
            }} />
            <span>Enregistrement: {formatRecordingTime(recordingTime)}</span>
          </div>
        )}
        
        {/* Menu d'attachement */}
        {showAttachMenu && (
          <div 
            className="attach-menu mb-2 p-2 rounded d-flex gap-2"
            style={{
              backgroundColor: effectiveDarkMode ? "#2d3748" : "#e2e8f0",
              maxWidth: "200px"
            }}
          >
            <button
              type="button"
              className="btn btn-sm"
              onClick={() => fileInputRef.current?.click()}
              style={{
                backgroundColor: effectiveDarkMode ? "rgba(59, 130, 246, 0.2)" : "rgba(59, 130, 246, 0.1)",
                color: "#3b82f6",
                border: "none",
                borderRadius: "8px",
                padding: "8px 12px",
                display: "flex",
                alignItems: "center",
                gap: "6px"
              }}
            >
              <Image size={16} />
              <span>Image</span>
            </button>
            
            <button
              type="button"
              className="btn btn-sm"
              onClick={() => documentInputRef.current?.click()}
              style={{
                backgroundColor: effectiveDarkMode ? "rgba(59, 130, 246, 0.2)" : "rgba(59, 130, 246, 0.1)",
                color: "#3b82f6",
                border: "none",
                borderRadius: "8px",
                padding: "8px 12px",
                display: "flex",
                alignItems: "center",
                gap: "6px"
              }}
            >
              <File size={16} />
              <span>Fichier</span>
            </button>
            
            {/* Hidden document input */}
            <input
              type="file"
              className="d-none"
              ref={documentInputRef}
              onChange={handleDocumentChange}
            />
          </div>
        )}
        
        {/* Sélecteur d'emoji */}
        {showEmojiMenu && (
          <div
            ref={emojiMenuRef}
            className="emoji-menu-container position-absolute bottom-100 start-0 mb-2"
            style={{ 
              zIndex: 1000,
              width: "300px",
              maxHeight: "350px",
              overflow: "hidden",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              backgroundColor: effectiveDarkMode ? "#2d3748" : "#ffffff"
            }}
          >
            {/* Navigation des catégories */}
            <div className="emoji-categories d-flex overflow-auto p-2 border-bottom" style={{
              borderColor: effectiveDarkMode ? "#4a5568" : "#e2e8f0"
            }}>
              {emojiCategories.map(category => (
                <button
                  key={category.id}
                  type="button"
                  className={`btn p-1 mx-1 ${activeEmojiCategory === category.id ? 'active' : ''}`}
                  onClick={() => handleCategoryChange(category.id)}
                  style={{
                    borderRadius: "8px",
                    backgroundColor: activeEmojiCategory === category.id 
                      ? (effectiveDarkMode ? "#4a5568" : "#e2e8f0") 
                      : "transparent",
                    minWidth: "36px",
                    border: "none"
                  }}
                >
                  <span role="img" aria-label={category.name}>{category.icon}</span>
                </button>
              ))}
            </div>
            
            {/* Grille d'emojis */}
            <div className="emoji-grid p-2" style={{
              display: "grid",
              gridTemplateColumns: "repeat(6, 1fr)",
              gap: "4px",
              maxHeight: "250px",
              overflowY: "auto"
            }}>
              {emojis[activeEmojiCategory].map((emoji, index) => (
                <button
                  key={index}
                  type="button"
                  className="btn p-1"
                  onClick={() => handleEmojiClick(emoji)}
                  style={{
                    borderRadius: "8px",
                    backgroundColor: "transparent",
                    border: "none",
                    fontSize: "1.2rem",
                    transition: "transform 0.1s ease",
                    cursor: "pointer"
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "scale(1.2)";
                    e.currentTarget.style.backgroundColor = effectiveDarkMode ? "#4a5568" : "#f1f5f9";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        )}
        
        <form onSubmit={handleSendMessage} className="d-flex align-items-end">
          <div 
            className="flex-grow-1 d-flex align-items-center rounded px-3 py-2"
            style={{
              backgroundColor: effectiveDarkMode ? "#2d3748" : "#f1f5f9",
              transition: "background-color 0.3s ease",
              border: isFocused 
                ? (effectiveDarkMode ? "1px solid #4b5563" : "1px solid #cbd5e1") 
                : (effectiveDarkMode ? "1px solid #2d3748" : "1px solid #f1f5f9")
            }}
          >
            {/* Attachment button */}
            <button
              type="button"
              className="btn p-0 me-2 d-flex align-items-center justify-content-center"
              onClick={() => setShowAttachMenu(!showAttachMenu)}
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                backgroundColor: "transparent",
                color: effectiveDarkMode ? "#a0aec0" : "#64748b",
                border: "none"
              }}
            >
              {showAttachMenu ? <ChevronDown size={20} /> : <Paperclip size={20} />}
            </button>
            
            {/* Emoji button */}
            <button
              type="button"
              className="btn p-0 me-2 d-flex align-items-center justify-content-center emoji-button"
              onClick={toggleEmojiMenu}
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                backgroundColor: "transparent",
                color: effectiveDarkMode ? "#a0aec0" : "#64748b",
                border: "none"
              }}
            >
              <Smile size={20} />
            </button>
            
            {/* Text input */}
            <input
              ref={textInputRef}
              type="text"
              className="form-control border-0 shadow-none"
              placeholder={`Message ${selectedUser?.fullName || selectedUser?.name || '...'}${isRecording ? ' (Recording...)' : ''}`}
              value={isRecording ? "Recording voice message..." : text}
              onChange={(e) => setText(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              disabled={isRecording}
              style={{
                backgroundColor: "transparent",
                color: effectiveDarkMode ? "#e2e8f0" : "#1e293b",
                fontSize: "0.95rem",
                transition: "background-color 0.3s ease",
                border: isFocused 
                  ? (effectiveDarkMode ? "1px solid #4b5563" : "1px solid #cbd5e1") 
                  : (effectiveDarkMode ? "1px solid #2d3748" : "1px solid #f1f5f9")
              }}
            />
          </div>
          <button
            type="button"
            className="btn p-0 me-2 d-flex align-items-center justify-content-center"
            onClick={toggleRecording}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              backgroundColor: "transparent",
              color: effectiveDarkMode ? "#a0aec0" : "#64748b",
              border: "none"
            }}
          >
            {isRecording ? <Pause size={20} /> : <Mic size={20} />}
          </button>
          <button
            type="submit"
            className="btn p-0"
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              backgroundColor: "transparent",
              color: effectiveDarkMode ? "#a0aec0" : "#64748b",
              border: "none"
            }}
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </>
  );
};

export default MessageInput;
