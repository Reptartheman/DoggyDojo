const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    dogs: [Dog]
    notes: Note
  }

  type Dog {
    _id: ID
    name: String
    size: String
    activity: String
    training: String
  }

  type Note {
    _id: ID
    thoughtText: String
    editedAt: String
    score: Int
  }

  type Query {
    users: [User]
    dogs: [Dog]
    notes: [Note]
  }
`;

module.exports = typeDefs;
