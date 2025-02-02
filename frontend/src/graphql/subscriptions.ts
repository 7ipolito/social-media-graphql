import { gql } from "@apollo/client";

export const COMMENT_ADDED = gql`
  subscription commentAdded($postId: String!) {
    commentAdded(postId: $postId) {
      comments {
        text
        user {
          username
          image
        }
        createdAt
      }
    }
  }
`;
