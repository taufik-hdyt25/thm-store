import { useAuth } from "@/hooks/useAuth";
import { API } from "@/libs/API";
import { useQuery } from "@tanstack/react-query";


export const useCustomer = () => {
  const { token } = useAuth();
  const { data: dataCustomer, refetch } = useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      const response = await API.get("/customers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    console.log(response)
      return response.data;
    },
  });

  return {
    dataCustomer,
    refetch,
  };
};
