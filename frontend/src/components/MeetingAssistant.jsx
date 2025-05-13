import React, { useState, useEffect, useRef } from 'react';
import '../styles/meetingAssistant.css';

const MeetingAssistant = ({ messages, isOpen, onClose }) => {
  const [summary, setSummary] = useState({
    keyPoints: [],
    questions: [],
    actions: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [lastAnalyzedIndex, setLastAnalyzedIndex] = useState(-1);
  const assistantRef = useRef(null);

  // Analyser les messages pour extraire les points clés, questions et actions
  useEffect(() => {
    if (!isOpen || messages.length === 0 || lastAnalyzedIndex === messages.length - 1) {
      return;
    }

    setIsLoading(true);

    // Analyser uniquement les nouveaux messages
    const newMessages = messages.slice(lastAnalyzedIndex + 1);

    // Simuler un délai d'analyse (à remplacer par un appel API réel)
    setTimeout(() => {
      analyzeMessages(newMessages);
      setLastAnalyzedIndex(messages.length - 1);
      setIsLoading(false);
    }, 1000);
  }, [messages, isOpen, lastAnalyzedIndex]);

  // Faire défiler vers le bas lorsque de nouveaux éléments sont ajoutés
  useEffect(() => {
    if (assistantRef.current) {
      assistantRef.current.scrollTop = assistantRef.current.scrollHeight;
    }
  }, [summary]);

  // Fonction d'analyse des messages
  const analyzeMessages = (newMessages) => {
    // Extraire les points clés, questions et actions des messages
    const extractedData = extractDataFromMessages(newMessages);

    // Mettre à jour le résumé
    setSummary(prevSummary => ({
      keyPoints: [...prevSummary.keyPoints, ...extractedData.keyPoints],
      questions: [...prevSummary.questions, ...extractedData.questions],
      actions: [...prevSummary.actions, ...extractedData.actions]
    }));
  };

  // Fonction pour extraire les données des messages avec une analyse plus avancée
  const extractDataFromMessages = (messages) => {
    const result = {
      keyPoints: [],
      questions: [],
      actions: []
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

      <div className="assistant-content">
        {isLoading && (
          <div className="assistant-loading">
            <div className="spinner"></div>
            <p>Analyse en cours...</p>
          </div>
        )}

        <div className="assistant-intro">
          <p>
            L'assistant IA analyse la conversation et identifie automatiquement les points importants,
            les questions et les actions à prendre.
          </p>
        </div>

        <div className="assistant-section">
          <h4><i className="fas fa-lightbulb"></i> Points clés</h4>
          {summary.keyPoints.length > 0 ? (
            <ul className="key-points-list">
              {summary.keyPoints.map((point, index) => (
                <li key={`key-${index}`}>{point}</li>
              ))}
            </ul>
          ) : (
            <p className="empty-message">Aucun point clé identifié pour le moment.</p>
          )}
        </div>

        <div className="assistant-section">
          <h4><i className="fas fa-question-circle"></i> Questions</h4>
          {summary.questions.length > 0 ? (
            <ul className="questions-list">
              {summary.questions.map((question, index) => (
                <li key={`question-${index}`}>{question}</li>
              ))}
            </ul>
          ) : (
            <p className="empty-message">Aucune question identifiée pour le moment.</p>
          )}
        </div>

        <div className="assistant-section">
          <h4><i className="fas fa-tasks"></i> Actions à prendre</h4>
          {summary.actions.length > 0 ? (
            <ul className="actions-list">
              {summary.actions.map((action, index) => (
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
