import { useAuth } from "@/hooks/useAuth";
import { useWishlist } from "@/hooks/useWishlist";
import { IWishlist } from "@/interface/customer.interfaces";
import { IProducts } from "@/interface/product.interface";
import { formatRupiah } from "@/utils/formatRupiah";
import { Box, HStack, IconButton, Image, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { GoHeartFill } from "react-icons/go";

interface IProps {
  product?: IProducts;
}
const CardProduct: React.FC<IProps> = ({ product }): JSX.Element => {
  const customStyleTitle: React.CSSProperties = {
    display: "-webkit-box",
    WebkitLineClamp: 1,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  };

  const { addWishlist, loadingWishlist } = useWishlist();
  const { user } = useAuth();
  const isWishlist = user?.wishlist
    .map((data: IWishlist) => data.product.product_id)
    .includes(product ? product.product_id : 0);

  return (
    <Box p={2} h="full" border="1px solid #ebebeb" rounded="lg" bg="#eaeaea">
      <Box pos="relative">
        <Image
          w="full"
          h="170px"
          rounded="lg"
          src={product?.image}
          alt={product?.product_name}
        />
        <IconButton
          pos="absolute"
          top={0}
          right={0}
          size="sm"
          isLoading={loadingWishlist}
          variant="unstyled"
          aria-label="wishlist"
          onClick={() => addWishlist(product ? product.product_id : 0)}
          icon={
            isWishlist ? (
              <GoHeartFill color="red" size={24} />
            ) : (
              <GoHeartFill color="#ebebeb" size={27} />
            )
          }
        />
      </Box>
      <Link href={`detail-product/${product?.product_id}`}>
        <Text style={customStyleTitle} mt="2" fontWeight="medium">
          {product?.product_name}
        </Text>
      </Link>
      <Stack spacing={0} >
        <Text
          fontSize={{ base: "xs", md: "md" }}
          fontWeight="medium"
          color="primary"
        >
          {formatRupiah(product?.price)}
        </Text>

        {/* <Box cursor="pointer">
            <FaCartPlus color="#39A7FF" size={24} />
          </Box> */}
        <Text color="gray" fontSize="xs">
          stock: {product?.stock}
        </Text>
      </Stack>
    </Box>
  );
};

export default CardProduct;
