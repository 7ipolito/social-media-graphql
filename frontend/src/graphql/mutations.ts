import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(loginInput: { username: $username, password: $password }) {
      user {
        _id
        username
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateAccount($username: String!, $password: String!, $confirmPassword: String!, $email: String!) {
    register(registerInput: { username: $username, password: $password, confirmPassword: $confirmPassword, email: $email }) {
      user {
        _id
        username
        email
      }

    }
  }
`;