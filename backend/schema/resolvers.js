module.exports = {
    Query: {
      hello: () => "👋 Hello from GraphQL!",
      users: async () => {
        // Récupère depuis MongoDB (exemple fictif)
        return await require("./models/user.model").find();
      },
    },
  };
  