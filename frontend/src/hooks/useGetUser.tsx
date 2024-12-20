import { GetUserParams } from "@/lib/actions/shared.types";
import { getUserData } from "@/lib/actions/user.action";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export const useGetUser = () => {
  const { getToken, isLoaded } = useAuth();
  const [data, setData] = useState<GetUserParams>({} as GetUserParams);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const fetchedToken = await getToken({ template: "__session" });
        if (fetchedToken) {
          const userData = await getUserData(fetchedToken);
          setData(userData);
        } else {
          setError("Token não encontrado.");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro desconhecido.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [getToken, isLoaded]);

  return { data, loading, error };
};
