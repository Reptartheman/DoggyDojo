import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_DOG = gql`
mutation Mutation($username: String!, $activity: String!, $training: String!, $size: String!) {
  addDog(username: $username, activity: $activity, training: $training, size: $size) {
    _id
    size
    activity
    training
  }
}`

export const ADD_NOTE = gql`
mutation Mutation($username: String!, $text: String!) {
 addNote(username: $username, text: $text) {
      _id
      text
        }
      }
`;
