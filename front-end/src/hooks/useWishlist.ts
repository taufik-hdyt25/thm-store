import { useMutation } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import { useToast } from "@chakra-ui/react";
import { API } from "@/libs/API";



export const useWishlist = ()=> {
    const { token,getProfile } = useAuth();
  const toast = useToast()
  const {mutate: addWishlist,isPending: loadingWishlist} = useMutation({
    mutationFn: async (id:number) => {
      const response = await API.post(
        `/product/${id}/wishlist`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data
    },
    onSuccess: (res)=> {
      getProfile()
      toast({
        title: res.message,
        position:  "top",
        status: "success"
      })
    }
  });

  return {
    loadingWishlist,
    addWishlist
  }
}