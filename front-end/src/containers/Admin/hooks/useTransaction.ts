import { useAuth } from "@/hooks/useAuth";
import { API } from "@/libs/API";
import { useQuery } from "@tanstack/react-query";


export const useTransaction = () => {
  const { token } = useAuth();
  const { data: dataTransaction, refetch } = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const response = await API.get("/transactions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
  });

  return {
    dataTransaction,
    refetch,
  };
};
