import {
  Divider,
  HStack,
  IconButton,
  Image,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { TiMinus, TiPlus } from "react-icons/ti";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IWishlist } from "@/interface/customer.interfaces";
import { formatRupiah } from "@/utils/formatRupiah";
import { useMutation } from "@tanstack/react-query";
import { API } from "@/libs/API";
import { useAuth } from "@/hooks/useAuth";
import { useWishlist } from "@/hooks/useWishlist";

interface IProps {
  data?: IWishlist;
}
const WichlistItem: React.FC<IProps> = ({ data }): JSX.Element => {
  const customStyleTitle: React.CSSProperties = {
    display: "-webkit-box",
    WebkitLineClamp: 1,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  };

  const { addWishlist, loadingWishlist } = useWishlist();

  return (
    <HStack border="1px solid #ebebeb" justify="space-between" rounded="lg">
      <HStack>
        <Image
          w="80px"
          h="80px"
          src={data?.product.image}
          alt="products"
        />
        <Stack>
          <Text style={customStyleTitle}>{data?.product.product_name}</Text>
          <HStack justify="space-between" pr={4}>
            <Text fontWeight="semibold">
              {formatRupiah(data ? data.product.price : 0)}
            </Text>
          </HStack>
        </Stack>
      </HStack>
      <Stack direction="row" h="100px" p={4} align="center">
        <Divider orientation="vertical" />
        <IconButton
          isLoading={loadingWishlist}
          aria-label="wishlist"
          variant="unstyled"
          onClick={()=> addWishlist(data ? data.product.product_id: 0)}
          icon={<RiDeleteBin6Line size={30} color="red" />}
        />
      </Stack>
    </HStack>
  );
};

export default WichlistItem;
