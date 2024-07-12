import { useCart } from "@/hooks/useCart";
import { ICart } from "@/interface/customer.interfaces";
import { formatRupiah } from "@/utils/formatRupiah";
import {
  HStack,
  IconButton,
  Image,
  Stack,
  Text
} from "@chakra-ui/react";
import { RiDeleteBin6Line } from "react-icons/ri";

interface IProps {
  data?: ICart;
}
const CartItem: React.FC<IProps> = ({ data }): JSX.Element => {
  const customStyleTitle: React.CSSProperties = {
    display: "-webkit-box",
    WebkitLineClamp: 1,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  };
  

  const {loadingDelete,deleteCart} = useCart()

  return (
    
    <HStack p={2} border="1px solid #ebebeb" rounded="lg"  w="full"  >
      <Image
        minW="80px"
        h="80px"
        src={data?.product.image}
        alt={data?.product.product_name}
      />

      <HStack w="full" justify="space-between" >
        <Stack spacing={0}>
        <Text style={customStyleTitle}>{data?.product.product_name}</Text>
          <Text fontWeight="semibold">{formatRupiah(data?.product.price)}</Text>
          <Text>Qty: {data?.quantity}</Text>
        </Stack>
        <HStack justify="space-between" >
          <IconButton
            aria-label="delete"
            variant="unstyled"
            icon={<RiDeleteBin6Line size={24} color="red" />}
            onClick={() => deleteCart(data ? data.cart_id: 0)}
            isLoading={loadingDelete}
          />
        </HStack>
      </HStack>
    </HStack>
  
  );
};

export default CartItem;

// CART PLUS

  /* <HStack bg="#ebebeb" w="fit-content">
  <IconButton
    bg="primary"
    color="white"
    size="sm"
    aria-label="icon"
    icon={<TiMinus size={24} />}
    isDisabled={count <= 1}
    
    onClick={decrement}
  />
  <Text w="20px" fontWeight="semibold" textAlign="center">
    {count + (data ? data.quantity : 0)}
  </Text>
  <IconButton
    rounded="sm"
    bg="primary"
    color="white"
    size="sm"
    aria-label="icon"
    isDisabled={count + (data ? data.quantity : 0) <= 1}
    icon={<TiPlus size={24} />}
    onClick={increment}
  />
</HStack> */

