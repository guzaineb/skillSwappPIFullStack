const axios = require('axios');
const cheerio = require('cheerio');
const natural = require('natural');

class WikipediaQuizGenerator {
  constructor() {
    this.tokenizer = new natural.WordTokenizer();
    this.tagger = new natural.BrillPOSTagger(
      natural.BrillPOSTagger.defaultRules,
      natural.BrillPOSTagger.defaultLexicon
    );
    this.cache = new Map();
  }

  async fetchWikipediaContent(topic) {
    const cacheKey = `content-${topic}`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      const { data } = await axios.get(
        'https://fr.wikipedia.org/w/api.php',
        {
          params: {
            action: 'query',
            prop: 'extracts',
            exintro: true,
            explaintext: true,
            titles: topic,
            format: 'json',
            redirects: true
          },
          timeout: 8000 // 8 secondes timeout pour l'API Wikipedia
        }
      );

      const page = Object.values(data.query.pages)[0];
      if (!page || page.missing) {
        throw new Error('Article non trouvé');
      }

      const content = page.extract;
      this.cache.set(cacheKey, content);
      return content;
    } catch (error) {
      console.error('Erreur Wikipedia API:', error);
      throw new Error('Impossible de récupérer le contenu Wikipedia');
    }
  }

  async generateQuiz({ topic, difficulty = 'medium', questionCount = 5 }) {
    try {
      const startTime = Date.now();
      const content = await this.fetchWikipediaContent(topic);
      
      // Optimisation: Traitement par lots
      const sentences = this.extractSentences(content);
      const questions = this.generateQuestions(sentences, questionCount, difficulty);

      if (questions.length === 0) {
        throw new Error('Aucune question valide n\'a pu être générée pour ce sujet');
      }

      console.log(`Génération terminée en ${Date.now() - startTime}ms`);
      return {
        title: `Quiz: ${topic}`,
        questions,
        difficulty,
        source: 'wikipedia',
        generatedAt: new Date()
      };
    } catch (error) {
      console.error('Erreur génération quiz:', error);
      throw error;
    }
  }

  extractSentences(content) {
    return content.split('\n')
      .filter(para => para.trim().length > 50) // Ignore les petits paragraphes
      .flatMap(para => para.match(/[^.!?]+[.!?]+/g) || [])
      .filter(s => s.length > 30); // Ignore les phrases trop courtes
  }

  generateQuestions(sentences, count, difficulty) {
    const questions = [];
    const usedSentences = new Set();

    for (let i = 0; i < Math.min(count, sentences.length); i++) {
      let sentence;
      do {
        sentence = sentences[Math.floor(Math.random() * sentences.length)];
      } while (usedSentences.has(sentence) && usedSentences.size < sentences.length);

      if (!sentence) continue;

      usedSentences.add(sentence);
      const question = this.createQuestion(sentence, difficulty);
      if (question) questions.push(question);
    }

    return questions.slice(0, count);
  }

  createQuestion(sentence, difficulty) {
    try {
      const tokens = this.tokenizer.tokenize(sentence);
      if (!tokens || tokens.length === 0) return null;

      // Solution de secours si le tagger échoue
      let tagged;
      try {
        tagged = this.tagger.tag(tokens);
      } catch (tagError) {
        console.warn('Erreur de tagging, utilisation de méthode alternative');
        // Méthode alternative simple basée sur la longueur des mots
        tagged = tokens.map(token => [token, token.length > 4 ? 'NN' : 'JJ']);
      }

      // Filtre les mots importants selon la difficulté
      const importantWords = tagged
        .filter(([word, tag]) => {
          if (!word || !tag) return false;
          
          // Filtre selon la difficulté
          switch(difficulty) {
            case 'easy':
              return word.length <= 6 && (tag === 'NN' || tag === 'JJ');
            case 'hard':
              return word.length > 6 && (tag === 'NNP' || tag === 'NN' || tag === 'JJ');
            default: // medium
              return (tag === 'NNP' || tag === 'NN' || tag === 'JJ');
          }
        })
        .map(([word]) => word)
        .filter(word => word && word.length > 3);

      if (importantWords.length === 0) return null;

      const answer = importantWords[Math.floor(Math.random() * importantWords.length)];
      const questionText = sentence.replace(answer, '______');

      return {
        question: `Complétez: ${questionText}`,
        options: this.generateOptions(answer, importantWords, difficulty),
        answer,
        difficulty
      };
    } catch (error) {
      console.error('Erreur dans createQuestion:', error);
      return null;
    }
  }

  generateOptions(correct, words, difficulty) {
    const options = new Set([correct]);
    
    // Génère des options plausibles en fonction de la difficulté
    while (options.size < 4 && words.length > 1) {
      const word = words[Math.floor(Math.random() * words.length)];
      if (word !== correct) {
        // Pour les difficultés faciles, on s'assure que les options sont similaires
        if (difficulty === 'easy') {
          if (word.length <= correct.length + 2 && word.length >= correct.length - 2) {
            options.add(word);
          }
        } else {
          options.add(word);
        }
      }
    }

    // Options par défaut si nécessaire
    const defaults = [
      'Aucune de ces réponses',
      'Toutes ces réponses',
      'Je ne sais pas',
      'Peut-être'
    ];
    
    while (options.size < 4) {
      options.add(defaults[options.size - 1]);
    }

    return Array.from(options).sort(() => Math.random() - 0.5);
  }
}

module.exports = new WikipediaQuizGenerator();