const { OpenAI } = require('openai');
const dotenv = require('dotenv');

// Charger les variables d'environnement
dotenv.config();

// Configuration OpenAI
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  console.error('ERREUR: Clé API OpenAI non définie dans les variables d\'environnement');
  console.error('Veuillez définir la variable d\'environnement OPENAI_API_KEY');
}

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY
});

/**
 * Analyse les messages de la réunion pour extraire les points clés, questions et actions
 * @param {Array} messages - Liste des messages de la réunion
 * @returns {Object} - Résultats de l'analyse
 */
async function analyzeMeetingMessages(messages) {
  try {
    console.log(`Analyse de ${messages?.length || 0} messages avec OpenAI...`);

    // Vérifier si la clé API est définie
    if (!OPENAI_API_KEY) {
      console.error('Erreur: Clé API OpenAI non définie');
      return {
        keyPoints: [],
        questions: [],
        actions: [],
        summary: "Impossible d'analyser les messages: Clé API OpenAI non configurée.",
        error: "Configuration OpenAI manquante"
      };
    }

    // Si aucun message, retourner un résultat vide
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return {
        keyPoints: [],
        questions: [],
        actions: [],
        summary: "Aucun message à analyser."
      };
    }

    // Filtrer les messages valides (avec du texte)
    const validMessages = messages.filter(msg => msg && msg.text && typeof msg.text === 'string');

    if (validMessages.length === 0) {
      return {
        keyPoints: [],
        questions: [],
        actions: [],
        summary: "Aucun message valide à analyser."
      };
    }

    // Préparer les messages pour l'API OpenAI
    const messagesText = validMessages.map(msg => `${msg.sender || 'Utilisateur'}: ${msg.text}`).join('\n');

    // Créer le prompt pour l'analyse
    const prompt = `
    Voici une transcription de messages d'une réunion en ligne. Analyse ces messages et extrais:
    1. Les points clés discutés (idées principales, décisions, informations importantes)
    2. Les questions posées qui nécessitent une réponse
    3. Les actions à entreprendre (tâches, responsabilités, prochaines étapes)
    4. Un résumé concis de la discussion (3-5 phrases)

    Format de réponse:
    {
      "keyPoints": ["point 1", "point 2", ...],
      "questions": ["question 1", "question 2", ...],
      "actions": ["action 1", "action 2", ...],
      "summary": "Résumé concis de la discussion."
    }

    IMPORTANT: Ta réponse doit être uniquement au format JSON valide comme indiqué ci-dessus.

    Messages de la réunion:
    ${messagesText}
    `;

    // Appeler l'API OpenAI avec gestion des erreurs
    let response;
    try {
      response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "Tu es un assistant de réunion intelligent qui analyse les conversations pour extraire les informations importantes. Tu réponds toujours avec un JSON valide."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 1000,
        response_format: { type: "json_object" } // Forcer le format JSON
      });
    } catch (apiError) {
      console.error('Erreur lors de l\'appel à l\'API OpenAI:', apiError);

      // Vérifier le type d'erreur
      if (apiError.status === 401) {
        return {
          keyPoints: [],
          questions: [],
          actions: [],
          summary: "Erreur d'authentification avec l'API OpenAI. Veuillez vérifier votre clé API.",
          error: "Erreur d'authentification API"
        };
      } else if (apiError.status === 429) {
        return {
          keyPoints: [],
          questions: [],
          actions: [],
          summary: "Limite de requêtes OpenAI atteinte. Veuillez réessayer plus tard.",
          error: "Limite de requêtes atteinte"
        };
      } else {
        return {
          keyPoints: [],
          questions: [],
          actions: [],
          summary: "Une erreur s'est produite lors de l'appel à l'API OpenAI.",
          error: apiError.message
        };
      }
    }

    // Extraire la réponse
    const content = response.choices[0].message.content;

    // Tenter de parser la réponse JSON
    try {
      // Essayer de parser directement le contenu comme JSON
      const result = JSON.parse(content);

      console.log('Analyse réussie:', {
        keyPoints: result.keyPoints?.length || 0,
        questions: result.questions?.length || 0,
        actions: result.actions?.length || 0,
        summary: result.summary ? 'Présent' : 'Absent'
      });

      // Valider et nettoyer les données
      return {
        keyPoints: Array.isArray(result.keyPoints) ? result.keyPoints.filter(item => item && typeof item === 'string') : [],
        questions: Array.isArray(result.questions) ? result.questions.filter(item => item && typeof item === 'string') : [],
        actions: Array.isArray(result.actions) ? result.actions.filter(item => item && typeof item === 'string') : [],
        summary: typeof result.summary === 'string' ? result.summary : "Aucun résumé généré."
      };
    } catch (parseError) {
      console.error('Erreur lors du parsing de la réponse JSON:', parseError);

      // Rechercher un objet JSON dans la réponse (fallback)
      try {
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const jsonStr = jsonMatch[0];
          const result = JSON.parse(jsonStr);

          return {
            keyPoints: Array.isArray(result.keyPoints) ? result.keyPoints : [],
            questions: Array.isArray(result.questions) ? result.questions : [],
            actions: Array.isArray(result.actions) ? result.actions : [],
            summary: typeof result.summary === 'string' ? result.summary : "Aucun résumé généré."
          };
        }
      } catch (fallbackError) {
        console.error('Échec du fallback JSON:', fallbackError);
      }

      // Analyse manuelle si le parsing JSON échoue
      const keyPointsMatch = content.match(/points clés.*?:([\s\S]*?)(?=questions|$)/i);
      const questionsMatch = content.match(/questions.*?:([\s\S]*?)(?=actions|$)/i);
      const actionsMatch = content.match(/actions.*?:([\s\S]*?)(?=résumé|summary|$)/i);
      const summaryMatch = content.match(/(?:résumé|summary).*?:([\s\S]*?)(?=$)/i);

      const extractItems = (match) => {
        if (!match) return [];
        return match[1]
          .split(/\n/)
          .map(line => line.replace(/^[•\-\d\.\s]+/, '').trim())
          .filter(line => line.length > 0);
      };

      return {
        keyPoints: extractItems(keyPointsMatch),
        questions: extractItems(questionsMatch),
        actions: extractItems(actionsMatch),
        summary: summaryMatch ? summaryMatch[1].trim() : "Aucun résumé généré."
      };
    }
  } catch (error) {
    console.error('Erreur lors de l\'analyse des messages avec OpenAI:', error);
    return {
      keyPoints: [],
      questions: [],
      actions: [],
      summary: "Une erreur s'est produite lors de l'analyse.",
      error: error.message
    };
  }
}

// Fonction pour générer une réponse à une question spécifique
async function generateAssistantResponse(messages, question) {
  try {
    console.log(`Génération d'une réponse à la question: "${question}"`);

    // Vérifier si la clé API est définie
    if (!OPENAI_API_KEY) {
      console.error('Erreur: Clé API OpenAI non définie');
      return "Impossible de générer une réponse: Clé API OpenAI non configurée.";
    }

    // Valider les entrées
    if (!question || typeof question !== 'string' || question.trim() === '') {
      return "Veuillez poser une question valide.";
    }

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return "Aucun contexte de réunion disponible pour répondre à cette question.";
    }

    // Filtrer les messages valides (avec du texte)
    const validMessages = messages.filter(msg => msg && msg.text && typeof msg.text === 'string');

    if (validMessages.length === 0) {
      return "Aucun message valide dans le contexte de la réunion pour répondre à cette question.";
    }

    // Préparer le contexte avec les messages précédents
    const context = validMessages.map(msg => `${msg.sender || 'Utilisateur'}: ${msg.text}`).join('\n');

    // Créer le prompt pour l'API
    const prompt = `
    Contexte de la réunion:
    ${context}

    Question: ${question}

    Réponds à cette question de manière concise et utile en te basant sur le contexte de la réunion.
    Si la réponse ne peut pas être trouvée dans le contexte, indique-le clairement.
    `;

    // Appeler l'API OpenAI avec gestion des erreurs
    let response;
    try {
      response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "Tu es un assistant de réunion intelligent qui aide à répondre aux questions des participants. Tu bases tes réponses uniquement sur le contexte fourni."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      });
    } catch (apiError) {
      console.error('Erreur lors de l\'appel à l\'API OpenAI:', apiError);

      // Vérifier le type d'erreur
      if (apiError.status === 401) {
        return "Erreur d'authentification avec l'API OpenAI. Veuillez vérifier votre clé API.";
      } else if (apiError.status === 429) {
        return "Limite de requêtes OpenAI atteinte. Veuillez réessayer plus tard.";
      } else {
        return `Désolé, je n'ai pas pu générer une réponse en raison d'une erreur: ${apiError.message}`;
      }
    }

    // Extraire et retourner la réponse
    const answer = response.choices[0].message.content.trim();

    // Vérifier si la réponse est vide
    if (!answer) {
      return "Je n'ai pas pu générer une réponse pertinente à cette question basée sur le contexte de la réunion.";
    }

    return answer;

  } catch (error) {
    console.error('Erreur lors de la génération de la réponse:', error);
    return `Désolé, je n'ai pas pu générer une réponse en raison d'une erreur: ${error.message}`;
  }
}

module.exports = {
  analyzeMeetingMessages,
  generateAssistantResponse
};
