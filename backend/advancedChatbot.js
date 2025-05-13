const { OpenAI } = require("openai");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const ChatbotMessage = require("./models/ChatbotMessage");
const { Ollama } = require("ollama")
const {PdfReader} = require("pdfreader")


// Configuration OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const ollama = new Ollama()

// Base de connaissances pour le chatbot
const knowledgeBase = {
  skills: [
    {
      name: "JavaScript",
      category: "Programmation",
      description: "Langage de programmation pour le web",
    },
    {
      name: "Piano",
      category: "Musique",
      description: "Instrument de musique à clavier",
    },
    {
      name: "Anglais",
      category: "Langues",
      description: "Langue internationale",
    },
    // Vous pouvez ajouter plus de compétences ici
  ],
  faqs: [
    {
      question: "Comment fonctionne SkillExchange?",
      answer:
        "SkillExchange est une plateforme qui permet aux utilisateurs d'échanger des compétences gratuitement. Vous pouvez proposer vos compétences et apprendre de nouvelles compétences auprès d'autres utilisateurs.",
    },
    {
      question: "Comment puis-je proposer mes compétences?",
      answer:
        "Vous pouvez proposer vos compétences en créant une offre dans votre profil. Précisez la compétence que vous souhaitez partager, votre niveau d'expertise et votre disponibilité.",
    },
    // Ajoutez plus de FAQs ici
  ],
};

// Historique des conversations
const conversationHistory = new Map();

// Fonction pour charger le modèle
async function loadModel() {
  console.log("Modèle de chatbot avancé chargé avec succès");
  return true;
}

// Fonction pour générer un ID de conversation unique
function generateConversationId(userId = "anonymous") {
  return `${userId}_${Date.now()}`;
}

// Fonction pour sauvegarder l'historique des messages
async function saveMessage(userId, role, content) {
  try {
    const message = new ChatbotMessage({
      userId,
      role,
      content,
      timestamp: new Date(),
    });
    await message.save();
    return message;
  } catch (error) {
    console.error("Erreur lors de la sauvegarde du message:", error);
    return null;
  }
}

// Fonction pour obtenir l'historique des messages d'un utilisateur
async function getUserHistory(userId, limit = 10) {
  try {
    const messages = await ChatbotMessage.find({ userId })
      .sort({ timestamp: -1 })
      .limit(limit);
    return messages.reverse();
  } catch (error) {
    console.error("Erreur lors de la récupération de l'historique:", error);
    return [];
  }
}

// Fonction pour détecter l'intention de l'utilisateur
async function detectIntent(message) {
  // Liste des intentions possibles
  const intents = {
    greeting: ["bonjour", "salut", "hello", "hey", "coucou"],
    farewell: ["au revoir", "bye", "à bientôt", "adieu"],
    thanks: ["merci", "thanks", "je vous remercie"],
    help: ["aide", "help", "aidez-moi", "besoin d'aide"],
    learn: ["apprendre", "étudier", "formation", "cours"],
    teach: ["enseigner", "proposer", "offrir", "partager"],
    info: ["information", "comment", "quoi", "pourquoi", "qui"],
  };

  // Convertir le message en minuscules
  const lowerMessage = message.toLowerCase();

  // Vérifier chaque intention
  for (const [intent, keywords] of Object.entries(intents)) {
    for (const keyword of keywords) {
      if (lowerMessage.includes(keyword)) {
        return intent;
      }
    }
  }

  // Si aucune intention n'est détectée, utiliser OpenAI pour l'analyse
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "Vous êtes un assistant qui analyse l'intention d'un message. Répondez uniquement avec un mot parmi: greeting, farewell, thanks, help, learn, teach, info, other.",
        },
        {
          role: "user",
          content: message,
        },
      ],
      max_tokens: 10,
    });

    return response.choices[0].message.content.trim().toLowerCase();
  } catch (error) {
    console.error(
      "Erreur lors de la détection d'intention avec OpenAI:",
      error
    );
    return "other";
  }
}

// Fonction pour générer une réponse contextuelle
async function generateResponse(userId, message, intent) {
  // Récupérer l'historique des conversations
  const history = await getUserHistory(userId, 5);
  const conversationContext = history.map((msg) => ({
    role: msg.role,
    content: msg.content,
  }));

  // Ajouter le message actuel
  conversationContext.push({
    role: "user",
    content: message,
  });

  // Préparer le prompt système en fonction de l'intention
  let systemPrompt =
    "Vous êtes un assistant virtuel pour la plateforme SkillExchange, qui permet aux utilisateurs d'échanger des compétences gratuitement.";

  // Ajouter des informations spécifiques en fonction de l'intention
  switch (intent) {
    case "greeting":
      systemPrompt += " Répondez de manière amicale à une salutation.";
      break;
    case "farewell":
      systemPrompt += " Dites au revoir de manière cordiale.";
      break;
    case "thanks":
      systemPrompt += " Répondez à un remerciement avec plaisir.";
      break;
    case "help":
      systemPrompt += " Proposez de l'aide sur l'utilisation de la plateforme.";
      break;
    case "learn":
      systemPrompt +=
        " Donnez des informations sur comment apprendre une compétence sur la plateforme.";
      break;
    case "teach":
      systemPrompt +=
        " Expliquez comment proposer ses compétences sur la plateforme.";
      break;
    case "info":
      systemPrompt +=
        " Fournissez des informations générales sur la plateforme.";
      break;
    default:
      systemPrompt += " Répondez de manière utile et concise.";
  }

  // Ajouter la base de connaissances au prompt système
  systemPrompt +=
    " Utilisez ces informations si nécessaire: " +
    JSON.stringify(knowledgeBase);

  try {
    // Générer une réponse avec OpenAI
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        ...conversationContext,
      ],
      max_tokens: 150,
      temperature: 0.7,
    });

    const botResponse = response.choices[0].message.content.trim();

    // Sauvegarder la réponse dans l'historique
    await saveMessage(userId, "assistant", botResponse);

    return {
      text: botResponse,
      intent: intent,
      confidence: 0.9, // Valeur arbitraire pour la confiance
    };
  } catch (error) {
    console.error(
      "Erreur lors de la génération de réponse avec OpenAI:",
      error
    );
    return {
      text: "Désolé, je rencontre des difficultés à traiter votre demande pour le moment.",
      intent: "error",
      confidence: 0,
    };
  }
}

// Fonction principale pour traiter les messages
async function processMessage(userId, message) {
  if (!message) return { error: "Message requis" };

  try {
    // Sauvegarder le message de l'utilisateur
    await saveMessage(userId, "user", message);

    // Détecter l'intention
    const intent = await detectIntent(message);

    // Générer une réponse
    const response = await generateResponse(userId, message, intent);

    return response;
  } catch (error) {
    console.error("Erreur lors du traitement du message:", error);
    return { error: "Erreur de traitement", details: error.message };
  }
}

async function analyzeCv(cvFilePath, taskDescription) {
  try {

    const fileContent = []
    await new Promise((resolve, reject) => {
      new PdfReader().parseFileItems(cvFilePath, function(err, item){
      if (err) reject()

      if (item?.text) {
        fileContent.push(item.text);
      }

      if (!item) {
        resolve(fileContent)
      }
    })
    })
    console.log(fileContent.length)
    const response = await ollama.chat({
      model: "llama3.2",
      messages: [
        {
          role: "system",
          content:
            "Vous êtes un assistant qui analyse des CV. Dans un bref paragraphe clôturé un score sur 10, jugez si le CV donné est adapté ou non à la tâche suivante: " +
            taskDescription,
        },
        {
          role: "user",
          content: fileContent.join("\n"),
        },
      ],
      stream: false
    });
    const analysis = response.message.content;
    return {
      analysis,
      confidence: 0.9,
    };
  } catch (error) {
    console.error("Erreur lors de l'analyse du CV:", error);
    return {
      analysis: "Désolé, je n'ai pas pu analyser le CV.",
      confidence: 0,
    };
  }
}

module.exports = {
  loadModel,
  processMessage,
  getUserHistory,
  analyzeCv,
};
