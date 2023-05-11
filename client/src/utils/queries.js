import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      dogs {
        _id
        size
        activity
        training
      }
    }
  }
`;

export const QUERY_DOGS = gql`
  query getDogs {
    dogs {
      _id
      size
      activity
      training
    }
  }
`;

export const QUERY_NOTE = gql`
  query getNote {
    note {
      _id
      noteText
      createdAt
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      dogs {
        _id
        size
        activity
        training
      }
      notes {
        _id
        text
        createdAt
        score
      }
    }
  }
`;
