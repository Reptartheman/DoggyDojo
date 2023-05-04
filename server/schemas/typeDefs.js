const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    dogs: [Dog]
  }

  type Dog {
    _id: ID
    name: String
    size: String
    activity: String
    training: String
  }

  type Query {
    users: [User]
    dogs: [Dog]
  }
`;

module.exports = typeDefs;
