import { GET_POSTS } from "@/graphql/queries";
import client from "../client";
import { GetPostParams } from "./shared.types";

export async function getAllPosts(): Promise<GetPostParams[]> {
  try {
    const response = await client.query({
      query: GET_POSTS,
      fetchPolicy: "no-cache",
    });
    return response.data.posts; // Retorna um array diretamente
  } catch (error) {
    console.error("Erro ao buscar posts:", error);
    throw new Error("Não foi possível buscar todos os posts.");
  }
}
