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
  mutation CreateAccount($email: String!, $clerkUserId: String!) {
    register(registerInput: { email: $email, clerkUserId: $clerkUserId }) {
      error {
        message
        path
    }

    }
  }
`;

export const LOGOUT = gql`
  mutation{
    logout
  }
`