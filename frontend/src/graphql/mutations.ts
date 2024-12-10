import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(loginInput: { username: $username, password: $password }) {
      error {
        message
        path
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateAccount(
    $email: String!
    $clerkUserId: String!
    $image: String!
    $username: String!
  ) {
    register(
      registerInput: {
        email: $email
        clerkUserId: $clerkUserId
        image: $image
        username: $username
      }
    ) {
      error {
        message
        path
      }
    }
  }
`;

export const LOGOUT = gql`
  mutation {
    logout
  }
`;

export const DELETE_USER = gql`
  mutation ($id: String!) {
    deleteUser(deleteInput: { id: $id }) {
      error {
        message
        path
      }
    }
  }
`;
