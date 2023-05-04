const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    # Add a queryable field to retrieve an array of Class objects
    dogInfo: [Dog]
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
  }
`;

module.exports = typeDefs;
