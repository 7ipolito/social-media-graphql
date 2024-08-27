import { gql } from "@apollo/client";

export const GET_WHOAMI = gql`
 query{
    whoami {
      userId 
      error {
        message
        path
      }
    }
}
`;
