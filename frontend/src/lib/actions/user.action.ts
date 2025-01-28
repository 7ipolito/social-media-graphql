"use server";

import { CREATE_USER, DELETE_USER } from "@/graphql/mutations";
import client from "../client";
import { GET_WHOAMI } from "@/graphql/queries";
import {
  CreateUserParams,
  DeleteUserParams,
  GetUserParams,
} from "./shared.types";

export async function createUser(userData: CreateUserParams) {
  const { clerkUserId, email, image, username } = userData;

  try {
    await client.mutate({
      mutation: CREATE_USER,
      variables: {
        email: email,
        clerkUserId: clerkUserId,
        image: image,
        username: username,
      },
    });
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    throw error;
  }
}

export async function deleteUser(deleteUserData: DeleteUserParams) {
  const { clerkUserId } = deleteUserData;

  try {
    await client.mutate({
      mutation: DELETE_USER,
      variables: {
        id: clerkUserId,
      },
    });
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    throw error;
  }
}

export async function getUserData(userId: string): Promise<GetUserParams> {
  try {
    console.log(userId);

    const response = await client.query({
      query: GET_WHOAMI,
      variables: {
        userId: userId,
      },
    });
    console.log(response.data.whoami);
    return response.data.whoami;
  } catch (error) {
    console.log(userId);

    console.error("Erro ao buscar dados do usuário:", error);
    throw new Error("Não foi possível buscar os dados do usuário.");
  }
}
