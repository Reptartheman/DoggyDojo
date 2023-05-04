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
const server = new ApolloServer({
  typeDefs,
  resolvers,
  tracing: true
});

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

const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });
  
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
  };
  
  // Call the async function to start the server
  startApolloServer();
