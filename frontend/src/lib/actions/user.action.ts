import { CREATE_USER, DELETE_USER } from "@/graphql/mutations";
import client from "../client";
import { CreateUserParams, DeleteUserParams } from "./shared.types";

export async function createUser(userData: CreateUserParams) {
  const { clerkId, email, image, username } = userData;
  try {
    await client.mutate({
      mutation: CREATE_USER,
      variables: {
        email: email,
        clerkUserId: clerkId,
        image: image,
        username: username,
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteUser(deleteUserData: DeleteUserParams) {
  const { clerkId } = deleteUserData;
  try {
    await client.mutate({
      mutation: DELETE_USER,
      variables: {
        id: clerkId,
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
