import { useAuth } from "@/hooks/useAuth";
import { API } from "@/libs/API";
import { useQuery } from "@tanstack/react-query";

export const useHomeAction = () => {
  const { token } = useAuth();

  // DATA  BRANDS
  const {
    data: dataBrands,
    isLoading: loadingBrands,
    refetch: refetchBrands,
  } = useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      const response = await API.get("/brands", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data
    },
  });
  
  // DATA  PRODUCT
  const {
    data: dataProdutcs,
    isLoading: loadingProducts,
    refetch: refetchProducts,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await API.get("/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data
    },
  });
  
  return {
    dataBrands,
    loadingBrands,
    refetchBrands,
    dataProdutcs,
    loadingProducts,
    refetchProducts
  };
};
