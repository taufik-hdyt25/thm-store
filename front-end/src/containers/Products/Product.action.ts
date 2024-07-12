import { useAuth } from "@/hooks/useAuth";
import { API } from "@/libs/API";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const useProductAction = () => {
  const { token } = useAuth();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResult, setSearchResult] = useState<string>("");

  const {
    data: dataProducts,
    isLoading: loadingProducts,
    refetch,
  } = useQuery({
    queryKey: ["productss"],
    queryFn: async () => {
      const response = await API.get(`/products?search=${searchResult}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
  });


  function handleSearch() {
    setSearchResult(searchQuery);
    setTimeout(()=> {
      refetch()
    },100)
  }

  return {
    dataProducts,
    loadingProducts,
    handleSearch,
    setSearchQuery,
    searchResult,
    refetch,
    setSearchResult
  };
};
