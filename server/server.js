const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");
const { User } = require("./models");
const { signToken } = require("./utils/auth");
const path = require("path");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./config");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "..", "client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "..", "client", "build", "index.html")
    );
  });
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    // Get the token from the headers
    const token = req.headers.authorization || "";

    try {
      // If the token exists, decode it and get the user's information
      let user = null;
      if (token && token.startsWith("Bearer ")) {
        const actualToken = token.slice(7);
        const data = jwt.verify(actualToken, JWT_SECRET);
        user = await User.findById(data._id);
      }

      // Return the context with the user information
      return { user, signToken };
    } catch (err) {
      console.error(err);
      return {};
    }
  },
});

server.applyMiddleware({ app });

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(
      `Use GraphQL at https://studio.apollographql.com/sandbox/explorer`
    );
  });
});
