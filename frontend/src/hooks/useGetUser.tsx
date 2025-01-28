import { GetUserParams } from "@/lib/actions/shared.types";
import { getUserData } from "@/lib/actions/user.action";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export const useGetUser = () => {
  const { getToken, isLoaded, signOut, userId } = useAuth();
  const [data, setData] = useState<GetUserParams>({} as GetUserParams);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const userData = await getUserData(userId!);
        setData(userData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro desconhecido.");
      } finally {
        setLoading(false);
      }
    };

    if (isLoaded && userId) {
      fetchUserData();
    }
  }, [isLoaded, userId]);

  return { data, loading, error };
};
