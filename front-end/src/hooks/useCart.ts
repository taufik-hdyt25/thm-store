import { API } from "@/libs/API";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import { useToast } from "@chakra-ui/react";

export const useCart = () => {
  const { token, getProfile } = useAuth();
  const toast = useToast();

  const { mutate: deleteCart, isPending: loadingDelete } = useMutation({
    mutationFn: async (id: number) => {
      const response = await API.delete(`/cart/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
    onSuccess: (res) => {
      getProfile();
      toast({
        title: res.message,
        position: "top",
        status: "success",
      });
    },
  });

  const { mutate: cartMutation, isPending:loadingCart } = useMutation({
    mutationFn: async (data:{body: { quantity: number },productId:number}) => {
      const response = await API.post(
        `/product/${data.productId}/cart`,
        data.body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    },
    onSuccess: (res) => {
      getProfile();
      toast({
        title: res.message,
        position: "top",
        status: "success",
      });
    },
  });

  return {
    deleteCart,
    loadingDelete,
    cartMutation,
    loadingCart
  };
};
