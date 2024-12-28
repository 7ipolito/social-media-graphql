import { gql } from "@apollo/client";

export const GET_WHOAMI = gql`
  query {
    whoami {
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
        _id
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
