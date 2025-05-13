import axios from 'axios';

// Local fallback quotes
const localQuotes = [
    { content: "You miss 100% of the shots you don't take.", author: "Wayne Gretzky" },
    { content: "Whether you think you can or you think you can't, you're right.", author: "Henry Ford" },
    { content: "I have not failed. I've just found 10,000 ways that won't work.", author: "Thomas Edison" },
    { content: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { content: "The expert in anything was once a beginner.", author: "Helen Hayes" },
    { content: "Success is the sum of small efforts repeated day in and day out.", author: "Robert Collier" },
    { content: "Education is the most powerful weapon you can use to change the world.", author: "Nelson Mandela" },
    { content: "It always seems impossible until it's done.", author: "Nelson Mandela" },
    { content: "Push yourself, because no one else is going to do it for you.", author: "Unknown" },
    { content: "Don’t watch the clock; do what it does. Keep going.", author: "Sam Levenson" }
  ];
  

export const fetchRandomQuote = async () => {
  try {
    // First try our backend
    try {
      const backendResponse = await axios.get('http://localhost:5000/api/quiz/random-quote', {
        timeout: 2000
      });
      if (backendResponse.data && backendResponse.data.content) {
        return backendResponse.data;
      }
    } catch (backendError) {
      console.log("Backend quote failed:", backendError.message);
    }

    // If backend fails, try ZenQuotes API
    try {
      const zenResponse = await axios.get('https://zenquotes.io/api/random', {
        timeout: 2000
      });
      if (zenResponse.data && zenResponse.data[0]) {
        return {
          content: zenResponse.data[0].q,
          author: zenResponse.data[0].a || "Unknown"
        };
      }
    } catch (zenError) {
      console.log("ZenQuotes API failed:", zenError.message);
    }

    // If ZenQuotes fails, try Forismatic API
    try {
      const forisResponse = await axios.get('https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en', {
        timeout: 2000
      });
      if (forisResponse.data && forisResponse.data.quoteText) {
        return {
          content: forisResponse.data.quoteText,
          author: forisResponse.data.quoteAuthor || "Unknown"
        };
      }
    } catch (forisError) {
      console.log("Forismatic API failed:", forisError.message);
    }

    // If all else fails, return a random local quote
    return localQuotes[Math.floor(Math.random() * localQuotes.length)];

  } catch (error) {
    console.error("All quote methods failed:", error);
    return localQuotes[0]; // Return first quote as final fallback
  }
};