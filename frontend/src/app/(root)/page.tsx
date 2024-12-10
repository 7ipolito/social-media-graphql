import { GET_WHOAMI } from "@/graphql/queries";
import getToken from "@/lib/actions/token.action";
import client from "@/lib/client";
import { UserButton } from "@clerk/nextjs";

async function fetchUserData(token: string, retryCount = 0) {
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
      return await fetchUserData(token, retryCount + 1);
    }
    throw new Error(
      "Não foi possível buscar os dados do usuário após 3 tentativas."
    );
  }
}

export default async function Dashboard() {
  const { token } = await getToken();

  try {
    const user = await fetchUserData(token);

    return (
      <div className="flex flex-col flex-1 items-center w-full h-screen bg-primary">
        <UserButton />
        <h1 className="text-white">Welcome to social media graphql</h1>
        {user ? (
          <p className="text-white">Seu email é: {user.email}</p>
        ) : (
          <p className="text-red-500">
            Erro: Dados de usuário não encontrados. Complete seu cadastro!
          </p>
        )}
      </div>
    );
  } catch (error) {
    console.error("Erro ao buscar os dados do usuário:", error);

    return (
      <div className="flex flex-col flex-1 items-center w-full h-screen bg-primary">
        <UserButton />
        <h1 className="text-white">Welcome to social media graphql</h1>
        <p className="text-red-500">
          Não foi possível carregar os dados. Por favor, tente novamente mais
          tarde.
        </p>
      </div>
    );
  }
}
