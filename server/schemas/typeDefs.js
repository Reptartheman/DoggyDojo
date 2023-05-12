const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    dogs: [Dog]
    notes: [Note]
  }

  type Dog {
    _id: ID
    size: String
    activity: String
    training: String
  }

  type Note {
    _id: ID
    text: String
    editedAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addDog(username: String!, size: String!, activity: String!, training: String!): Dog
    addNote (username: String!, text: String!): Note
  }
`;

module.exports = typeDefs;
