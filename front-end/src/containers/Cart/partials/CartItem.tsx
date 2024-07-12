import { useCart } from "@/hooks/useCart";
import { ICart } from "@/interface/customer.interfaces";
import { formatRupiah } from "@/utils/formatRupiah";
import { HStack, IconButton, Image, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TiMinus, TiPlus } from "react-icons/ti";

interface IProps {
  data: ICart;
}
const CartItem: React.FC<IProps> = ({ data}): JSX.Element => {
  const { cartMutation, deleteCart, loadingDelete } = useCart();
  

  const customStyleTitle: React.CSSProperties = {
    display: "-webkit-box",
    WebkitLineClamp: 1,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  };

  const [count, setCount] = useState(0);

  const increment = () => {
    if (data && data.product.stock < count) {
      return alert("tidak bisa nambah");
    }
    setCount(count + 1);
    cartMutation({
      body: {
        quantity: (data?.quantity ? data.quantity : 0) + 1,
      },
      productId: data?.product ? data.product.product_id : 0,
    });
  };
  const decrement = () => {
    if (data && data.quantity <= 1) {
      return alert("tidak bisa");
    }
    setCount(count - 1);
    cartMutation({
      body: {
        quantity: (data?.quantity ? data.quantity : 0) - 1,
      },
      productId: data?.product ? data.product.product_id : 0,
    });
  };

  
  const [selected, setSelected] = useState<number | null >(null);
  
  function handleSelected(productId: number) {
    setSelected((prevSelected: number | null) => prevSelected === productId ? null : productId)
  }



  return (
    <HStack cursor="pointer"  onClick={()=>handleSelected(data?.product.product_id)} p={2} border="1px solid #ebebeb" rounded="lg" w="full">
      <Image
        minW="80px"
        h="80px"
        src={data?.product.image}
        alt={data?.product.product_name}
      />

      <Stack spacing={0} w="full">
        <Text fontSize="lg" style={customStyleTitle}>
          {data?.product.product_name}
        </Text>
        <Text fontWeight="semibold">{formatRupiah(data?.product.price)}</Text>

        <HStack justify="space-between">
          <Text>Qty: {data?.quantity}</Text>

          <HStack justify="space-between" spacing={6}>
            <HStack bg="#ebebeb" w="fit-content">
              <IconButton
                bg="primary"
                color="white"
                size="sm"
                aria-label="icon"
                icon={<TiMinus size={24} />}
                isDisabled={(data ? data?.quantity : 0) <= 1}
                onClick={decrement}
              />
              <Text w="20px" fontWeight="semibold" textAlign="center">
                {data?.quantity}
              </Text>
              <IconButton
                rounded="sm"
                bg="primary"
                color="white"
                size="sm"
                aria-label="icon"
                icon={<TiPlus size={24} />}
                isDisabled={
                  (data ? data.quantity : 0) >= (data ? data.product.stock : 0)
                }
                onClick={increment}
              />
            </HStack>
            <IconButton
              aria-label="delete"
              variant="unstyled"
              icon={<RiDeleteBin6Line size={24} color="red" />}
              onClick={() => deleteCart(data ? data.cart_id : 0)}
              isLoading={loadingDelete}
            />
          </HStack>
        </HStack>
      </Stack>
    </HStack>
  );
};

export default CartItem;
