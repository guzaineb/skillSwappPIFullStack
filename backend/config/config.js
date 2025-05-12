module.exports = {
  // Autres configurations existantes
  
  // Configuration pour l'API OpenAI
  openai: {
    apiKey: process.env.OPENAI_API_KEY || 'votre_clé_api',
  },
  
  // Liste de mots interdits (solution de secours)
  forbiddenWords: [
    // Liste de mots violents, haineux ou NSFW à filtrer
    "insulte1", "insulte2", "mot_violent", "terme_haineux"
  ]
};
