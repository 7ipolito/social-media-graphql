import { CREATE_USER, DELETE_USER } from "@/graphql/mutations";
import client from "../client";
import {
  CreateUserParams,
  DeleteUserParams,
  GetUserParams,
} from "./shared.types";
import { GET_WHOAMI } from "@/graphql/queries";
import getToken from "./token.action";

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

export async function getUserData(retryCount = 0): Promise<GetUserParams> {
  const { token } = await getToken();

  try {
    const response = await client.query({
      query: GET_WHOAMI,
      context: {
        headers: {
          authorization: token ? `Bearer ${token}` : "",
        },
      },
    });
    return response.data.whoami;
  } catch (error) {
    if (retryCount < 3) {
      console.warn(`Tentativa ${retryCount + 1} falhou. Tentando novamente...`);
      return await getUserData(retryCount + 1);
    }
    throw new Error(
      "Não foi possível buscar os dados do usuário após 3 tentativas."
    );
  }
}
