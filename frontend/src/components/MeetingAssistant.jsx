import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../styles/meetingAssistant.css';

const MeetingAssistant = ({ meetingId, messages, isOpen, onClose }) => {
  const [analysis, setAnalysis] = useState({
    keyPoints: [],
    questions: [],
    actions: [],
    summary: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('summary');
  const [question, setQuestion] = useState('');
  const [askingQuestion, setAskingQuestion] = useState(false);
  const [response, setResponse] = useState('');
  const [lastAnalysisTime, setLastAnalysisTime] = useState(null);
  const assistantRef = useRef(null);

  // Fonction pour analyser les messages avec l'API
  const analyzeMessages = async () => {
    if (!meetingId) {
      toast.error('ID de réunion manquant');
      return;
    }

    if (!messages || messages.length === 0) {
      toast.warning('Aucun message à analyser');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log(`Analyse de ${messages.length} messages pour la réunion ${meetingId}...`);
      toast.info('Analyse des messages en cours (IA)...', { autoClose: 2000 });

      const res = await axios.post('/api/meeting-assistant/analyze', {
        meetingId,
        messages
      });

      // Vérifier si la réponse contient une erreur
      if (res.data.error) {
        console.error('Erreur retournée par l\'API:', res.data.error);
        setError(res.data.error);
        toast.error(`Erreur d'analyse: ${res.data.error}`);

        // Utiliser l'analyse locale en cas d'erreur API
        const localAnalysis = extractDataFromMessages(messages);
        setAnalysis({
          ...res.data,
          keyPoints: res.data.keyPoints?.length ? res.data.keyPoints : localAnalysis.keyPoints,
          questions: res.data.questions?.length ? res.data.questions : localAnalysis.questions,
          actions: res.data.actions?.length ? res.data.actions : localAnalysis.actions
        });
      } else {
        // Analyse réussie
        setAnalysis(res.data);
        setLastAnalysisTime(new Date());

        // Déterminer si Hugging Face est utilisé en vérifiant le message de résumé
        const isHuggingFace = res.data.summary && (
          res.data.summary.includes('Hugging Face') ||
          res.data.summary.includes('Analyse locale')
        );

        toast.success(`Analyse ${isHuggingFace ? 'avec Hugging Face' : 'avec OpenAI'} terminée avec succès!`);
      }
    } catch (err) {
      console.error('Erreur lors de l\'analyse des messages:', err);

      // Extraire le message d'erreur détaillé si disponible
      const errorMessage = err.response?.data?.error ||
        err.response?.data?.details ||
        err.message ||
        'Erreur lors de l\'analyse des messages';

      setError(errorMessage);
      toast.error(`Erreur: ${errorMessage}`);

      // Utiliser l'analyse locale en cas d'échec de l'API
      const localAnalysis = extractDataFromMessages(messages);
      setAnalysis(localAnalysis);
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour récupérer l'analyse existante
  const fetchExistingAnalysis = async () => {
    if (!meetingId) {
      toast.error('ID de réunion manquant');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log(`Récupération de l'analyse existante pour la réunion ${meetingId}...`);

      const res = await axios.get(`/api/meeting-assistant/analysis/${meetingId}`);

      if (res.data) {
        setAnalysis(res.data);
        setLastAnalysisTime(new Date(res.data.lastUpdated));
        console.log('Analyse existante récupérée avec succès');
      } else {
        throw new Error('Réponse vide du serveur');
      }
    } catch (err) {
      // Si aucune analyse n'existe, on ne considère pas cela comme une erreur
      if (err.response?.status === 404) {
        console.log('Aucune analyse existante, une nouvelle analyse sera effectuée');
        toast.info('Première analyse de cette réunion en cours...', { autoClose: 3000 });
        // Analyser les messages si aucune analyse n'existe
        analyzeMessages();
      } else {
        console.error('Erreur lors de la récupération de l\'analyse:', err);

        // Extraire le message d'erreur détaillé
        const errorMessage = err.response?.data?.error ||
          err.response?.data?.details ||
          err.message ||
          'Erreur lors de la récupération de l\'analyse';

        setError(errorMessage);
        toast.error(`Erreur: ${errorMessage}`);

        // Tenter une analyse fraîche en cas d'erreur
        setTimeout(() => {
          console.log('Tentative d\'analyse fraîche après erreur...');
          analyzeMessages();
        }, 1000);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour poser une question à l'assistant
  const askQuestion = async (e) => {
    e.preventDefault();

    if (!question.trim()) {
      toast.warning('Veuillez saisir une question');
      return;
    }

    if (!meetingId) {
      toast.error('ID de réunion manquant');
      return;
    }

    setAskingQuestion(true);
    setResponse('');

    try {
      toast.info('Traitement de votre question...', { autoClose: 2000 });

      const res = await axios.post('/api/meeting-assistant/ask', {
        meetingId,
        question: question.trim()
      });

      if (res.data && res.data.response) {
        setResponse(res.data.response);
        // Effacer la question après une réponse réussie
        setQuestion('');
      } else {
        throw new Error('Réponse invalide du serveur');
      }
    } catch (err) {
      console.error('Erreur lors de la demande de réponse:', err);

      // Extraire le message d'erreur détaillé si disponible
      const errorMessage = err.response?.data?.error ||
        err.response?.data?.details ||
        err.message;

      // Message d'erreur convivial pour l'utilisateur
      setResponse(`Désolé, je n'ai pas pu répondre à votre question. ${errorMessage ? `Erreur: ${errorMessage}` : 'Veuillez réessayer plus tard.'}`);
      toast.error('Erreur lors de la demande de réponse');
    } finally {
      setAskingQuestion(false);
    }
  };

  // Récupérer l'analyse au chargement du composant
  useEffect(() => {
    if (isOpen && meetingId && messages.length > 0) {
      fetchExistingAnalysis();
    }
  }, [isOpen, meetingId]);

  // Vérifier si une nouvelle analyse est nécessaire
  useEffect(() => {
    if (isOpen && messages.length > 0 && lastAnalysisTime) {
      // Vérifier si de nouveaux messages ont été ajoutés depuis la dernière analyse
      const lastMessageTime = new Date(messages[messages.length - 1].timestamp);

      if (lastMessageTime > lastAnalysisTime) {
        // Si au moins 5 nouveaux messages ont été ajoutés depuis la dernière analyse
        const newMessagesCount = messages.filter(msg => new Date(msg.timestamp) > lastAnalysisTime).length;

        if (newMessagesCount >= 5) {
          console.log(`${newMessagesCount} nouveaux messages depuis la dernière analyse, mise à jour...`);
          analyzeMessages();
        }
      }
    }
  }, [isOpen, messages, lastAnalysisTime]);

  // Faire défiler vers le bas lorsque de nouveaux éléments sont ajoutés
  useEffect(() => {
    if (assistantRef.current) {
      assistantRef.current.scrollTop = assistantRef.current.scrollHeight;
    }
  }, [analysis, activeTab]);

  // Fonction pour extraire les données des messages avec une analyse locale (fallback)
  const extractDataFromMessages = (messages) => {
    const result = {
      keyPoints: [],
      questions: [],
      actions: [],
      summary: "Analyse locale (sans IA)"
    };

    // Fonction pour analyser le texte avec une approche plus sophistiquée
    const analyzeText = (text) => {
      // Diviser le texte en phrases
      const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);

      sentences.forEach(sentence => {
        const trimmedSentence = sentence.trim();
        const lowerSentence = trimmedSentence.toLowerCase();

        // Analyse des points clés
        // Mots-clés indiquant des points importants
        const keyPointKeywords = [
          'important', 'essentiel', 'clé', 'principal', 'crucial', 'fondamental',
          'priorité', 'objectif', 'stratégie', 'résultat', 'conclusion', 'décision',
          'accord', 'consensus', 'solution', 'problème', 'enjeu', 'défi', 'opportunité',
          'point principal', 'à retenir', 'à noter', 'notable', 'significatif', 'majeur',
          'primordial', 'vital', 'critique', 'central', 'fondamental', 'décisif'
        ];

        // Expressions indiquant un point clé
        const keyPointPhrases = [
          'il est important de', 'il faut retenir que', 'le point principal est',
          'à retenir', 'en résumé', 'en conclusion', 'pour résumer', 'en bref',
          'l\'essentiel est', 'ce qu\'il faut comprendre', 'il est crucial de',
          'nous avons convenu que', 'nous sommes d\'accord sur', 'nous avons décidé que'
        ];

        // Vérifier si la phrase contient un mot-clé ou une expression importante
        if (keyPointKeywords.some(keyword => lowerSentence.includes(keyword)) ||
          keyPointPhrases.some(phrase => lowerSentence.includes(phrase))) {
          if (!result.keyPoints.includes(trimmedSentence)) {
            result.keyPoints.push(trimmedSentence);
          }
        }

        // Analyse des questions
        // Détection des questions directes (avec point d'interrogation)
        if (lowerSentence.includes('?')) {
          if (!result.questions.includes(trimmedSentence)) {
            result.questions.push(trimmedSentence);
          }
        }
        // Détection des questions indirectes
        else if (
          lowerSentence.startsWith('qui ') ||
          lowerSentence.startsWith('que ') ||
          lowerSentence.startsWith('quoi ') ||
          lowerSentence.startsWith('quand ') ||
          lowerSentence.startsWith('comment ') ||
          lowerSentence.startsWith('pourquoi ') ||
          lowerSentence.startsWith('où ') ||
          lowerSentence.includes('est-ce que') ||
          lowerSentence.includes('pouvez-vous') ||
          lowerSentence.includes('pourriez-vous') ||
          lowerSentence.includes('peut-on') ||
          lowerSentence.includes('pourrait-on') ||
          lowerSentence.includes('je me demande') ||
          lowerSentence.includes('nous nous demandons')
        ) {
          if (!result.questions.includes(trimmedSentence)) {
            result.questions.push(trimmedSentence);
          }
        }

        // Analyse des actions à prendre
        // Mots-clés et expressions indiquant des actions
        const actionKeywords = [
          'il faut', 'nous devons', 'on doit', 'à faire', 'action', 'tâche',
          'responsabilité', 'assigné', 'délai', 'échéance', 'deadline', 'livrable',
          'prochaine étape', 'suivant', 'implémenter', 'développer', 'créer',
          'mettre en place', 'établir', 'organiser', 'planifier', 'préparer',
          'contacter', 'appeler', 'envoyer', 'écrire', 'rédiger', 'documenter',
          'vérifier', 'valider', 'tester', 'examiner', 'analyser', 'étudier'
        ];

        // Verbes d'action au futur ou à l'impératif
        const actionVerbs = [
          'fera', 'ferons', 'ferez', 'feront', 'va faire', 'allons faire', 'allez faire', 'vont faire',
          'doit', 'devons', 'devez', 'doivent', 'fais', 'faites', 'contacte', 'contactez',
          'prépare', 'préparez', 'organise', 'organisez', 'planifie', 'planifiez'
        ];

        // Vérifier si la phrase contient un mot-clé ou un verbe d'action
        if (actionKeywords.some(keyword => lowerSentence.includes(keyword)) ||
          actionVerbs.some(verb => lowerSentence.includes(verb)) ||
          lowerSentence.startsWith('faire ')) {
          if (!result.actions.includes(trimmedSentence)) {
            result.actions.push(trimmedSentence);
          }
        }
      });
    };

    // Analyser chaque message
    messages.forEach(message => {
      analyzeText(message.text);
    });

    return result;
  };

  // Si l'assistant n'est pas ouvert, ne rien afficher
  if (!isOpen) {
    return null;
  }

  return (
    <div className="meeting-assistant" ref={assistantRef}>
      <div className="assistant-header">
        <h3><i className="fas fa-brain"></i> Assistant IA de réunion</h3>
        <button className="close-button" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
      </div>

      <div className="assistant-tabs">
        <button
          className={`tab ${activeTab === 'summary' ? 'active' : ''}`}
          onClick={() => setActiveTab('summary')}
        >
          <i className="fas fa-file-alt"></i> Résumé
        </button>
        <button
          className={`tab ${activeTab === 'keyPoints' ? 'active' : ''}`}
          onClick={() => setActiveTab('keyPoints')}
        >
          <i className="fas fa-lightbulb"></i> Points clés
        </button>
        <button
          className={`tab ${activeTab === 'questions' ? 'active' : ''}`}
          onClick={() => setActiveTab('questions')}
        >
          <i className="fas fa-question-circle"></i> Questions
        </button>
        <button
          className={`tab ${activeTab === 'actions' ? 'active' : ''}`}
          onClick={() => setActiveTab('actions')}
        >
          <i className="fas fa-tasks"></i> Actions
        </button>
        <button
          className={`tab ${activeTab === 'ask' ? 'active' : ''}`}
          onClick={() => setActiveTab('ask')}
        >
          <i className="fas fa-comment-dots"></i> Poser une question
        </button>
      </div>

      <div className="assistant-content">
        {isLoading ? (
          <div className="assistant-loading">
            <div className="spinner"></div>
            <p>Analyse en cours...</p>
            <p className="loading-subtext">Traitement des messages avec l'IA...</p>
          </div>
        ) : error ? (
          <div className="assistant-error">
            <div className="error-icon">
              <i className="fas fa-exclamation-triangle"></i>
            </div>
            <h4>Une erreur est survenue</h4>
            <p>{error}</p>
            <div className="error-actions">
              <button className="retry-button" onClick={analyzeMessages}>
                <i className="fas fa-redo"></i> Réessayer l'analyse
              </button>
              <button className="fallback-button" onClick={() => {
                const localAnalysis = extractDataFromMessages(messages);
                setAnalysis(localAnalysis);
                setError(null);
                toast.info('Utilisation de l\'analyse locale (sans IA)');
              }}>
                <i className="fas fa-code"></i> Utiliser l'analyse locale
              </button>
            </div>
          </div>
        ) : (
          <>
            {activeTab === 'summary' && (
              <div className="summary-tab">
                <h4><i className="fas fa-file-alt"></i> Résumé de la réunion</h4>
                <p className="summary-text">{analysis.summary || "Aucun résumé disponible pour le moment."}</p>
                <div className="analysis-actions">
                  <button className="update-button" onClick={analyzeMessages}>
                    <i className="fas fa-sync"></i> Mettre à jour l'analyse
                  </button>
                  {lastAnalysisTime && (
                    <p className="last-update">
                      <i className="fas fa-clock"></i> Dernière mise à jour: {new Date(lastAnalysisTime).toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'keyPoints' && (
              <div className="key-points-tab">
                <h4><i className="fas fa-lightbulb"></i> Points clés discutés</h4>
                {analysis.keyPoints && analysis.keyPoints.length > 0 ? (
                  <ul className="key-points-list">
                    {analysis.keyPoints.map((point, index) => (
                      <li key={`key-${index}`}>{point}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="empty-message">Aucun point clé identifié pour le moment.</p>
                )}
              </div>
            )}

            {activeTab === 'questions' && (
              <div className="questions-tab">
                <h4><i className="fas fa-question-circle"></i> Questions posées</h4>
                {analysis.questions && analysis.questions.length > 0 ? (
                  <ul className="questions-list">
                    {analysis.questions.map((question, index) => (
                      <li key={`question-${index}`}>{question}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="empty-message">Aucune question identifiée pour le moment.</p>
                )}
              </div>
            )}

            {activeTab === 'actions' && (
              <div className="actions-tab">
                <h4><i className="fas fa-tasks"></i> Actions à entreprendre</h4>
                {analysis.actions && analysis.actions.length > 0 ? (
                  <ul className="actions-list">
                    {analysis.actions.map((action, index) => (
                      <li key={`action-${index}`}>
                        <div className="action-item">
                          <input type="checkbox" id={`action-${index}`} />
                          <label htmlFor={`action-${index}`}>{action}</label>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="empty-message">Aucune action identifiée pour le moment.</p>
                )}
              </div>
            )}

            {activeTab === 'ask' && (
              <div className="ask-tab">
                <h4><i className="fas fa-comment-dots"></i> Poser une question à l'assistant</h4>
                <form className="question-form" onSubmit={askQuestion}>
                  <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Posez votre question sur la réunion..."
                    disabled={askingQuestion}
                    className="question-input"
                  />
                  <button
                    type="submit"
                    disabled={askingQuestion || !question.trim()}
                    className="ask-button"
                  >
                    {askingQuestion ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-paper-plane"></i>}
                    {askingQuestion ? ' Traitement...' : ' Demander'}
                  </button>
                </form>

                {response && (
                  <div className="response">
                    <h5><i className="fas fa-robot"></i> Réponse:</h5>
                    <p className="response-text">{response}</p>
                  </div>
                )}
              </div>
            )}
          </>
        )}

        <div className="assistant-footer">
          <p className="assistant-note">
            <i className="fas fa-info-circle"></i> Note: L'assistant s'améliore au fur et à mesure de la conversation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MeetingAssistant;
