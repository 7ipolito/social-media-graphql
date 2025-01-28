import { gql } from "@apollo/client";

export const GET_WHOAMI = gql`
  query ($userId: String!) {
    whoami(whoamiInput: { userId: $userId }) {
      _id
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
      id
      body
      likes {
        email
      }
      user {
        clerkUserId
        username
        image
        email
      }
      countLikes
    }
  }
`;
