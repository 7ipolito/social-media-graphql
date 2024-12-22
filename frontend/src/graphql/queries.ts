import { gql } from "@apollo/client";

export const GET_WHOAMI = gql`
  query {
    whoami {
      clerkUserId
      email
      image
      username
      createdAt
    }
  }
`;

export const GET_POSTS = gql`
  query {
    posts {
      body
    }
  }
`;
