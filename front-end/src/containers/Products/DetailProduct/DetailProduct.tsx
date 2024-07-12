import { useWishlist } from "@/hooks/useWishlist";
import { formatRupiah } from "@/utils/formatRupiah";
import {
  Box,
  Button,
  Grid,
  GridItem,
  HStack,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  Text
} from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BsCartPlus } from "react-icons/bs";
import { FaInfoCircle } from "react-icons/fa";
import { GoHeartFill } from "react-icons/go";
import { useAuth } from "@/hooks/useAuth";
import 'dotenv/config'
import { useDetailProductAction } from "./DetailProduct.action";

const DetailProduct: React.FC = (): JSX.Element => {
  const params = useParams();
  const idParam = Number(params.id);
  const {user} = useAuth()

  const [qty, setQty] = useState(1);
  const [message, setMessage] = useState("");
  const [check, setCheck] = useState<boolean>(false);

  const { dataProduct ,cartMutation,loadingCart ,createTransaction, loadingTransaction} = useDetailProductAction(idParam);

  function handleIncrement() {
    if ((dataProduct ? dataProduct.stock : 0) <= qty) {
      setMessage(`Maximum Order ${dataProduct?.stock}`);
      setCheck(false);
      return;
    }
    setQty(qty + 1);
    setCheck(true);
  }

  function handleDecrement() {
    if (qty <= 1) {
      setMessage("Minimum order 1");
      setCheck(false);
      return;
    }
    setQty(qty - 1);
    setCheck(true);
  }


  const { addWishlist, loadingWishlist } = useWishlist();

  const handleTransaction = ()=> {
    createTransaction({
      customer: user ? user.customer_id: 0,
      product: idParam,
      quantity: qty,
      subtotal: (dataProduct ? dataProduct.price : 0) * qty,
      status_payment: "PENDING",
      status_pengiriman: "ON PROCCESS",
      price: dataProduct ? dataProduct.price: 0,
      product_id:dataProduct ? dataProduct.product_id: 0,
      product_name: dataProduct ? dataProduct.product_name: ""
    })

    
  }

  useEffect(()=> {
    const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js"
    const clientKey = "SB-Mid-client-96TrsVVWbb-rmU4a"
    const script = document.createElement("script")
    script.src =snapScript
    script.setAttribute("data-client-key", clientKey)
    script.async = true
    
    document.body.appendChild(script)
    return ()=> {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <Box px={{base: 1,md:10}}>
      <Text>{`Brand > ${dataProduct?.brand?.brand_name} > ${dataProduct?.product_name}`}</Text>
      <Grid
        rounded="md"
        p={{base: 0, md:8}}
        mt={4}
        bg="white"
        gridTemplateColumns={{ base: "1fr", md: "400px 1fr" }}
      >
        <GridItem>  
          <Box pos="relative">
            <Image w="full" alt="product" src={dataProduct?.image} />
            <IconButton
              pos="absolute"
              top={0}
              right={0}
              size="sm"
              variant="unstyled"
              onClick={()=> addWishlist(dataProduct ? dataProduct.product_id : 0)}
              aria-label="wishlist"
              icon={<GoHeartFill color="white" size={24} />}
            />
          </Box>
        </GridItem>
        <GridItem >
          <Stack p={{base: 2, md:6}}>
            <Text fontSize="xl" fontWeight="semibold">
              {dataProduct?.product_name}
            </Text>
            <Stack>
              <Text>Description</Text>
              <Text fontSize="lg" bg="rgba(0,0,0,.02)" p={{base:2,md:4}}>
                {dataProduct?.description}
              </Text>

              <Text color="gray">Stock : {dataProduct?.stock}</Text>
            </Stack>

            <HStack spacing={6}>
              <InputGroup w="100px" size="sm">
                <InputLeftElement
                  roundedLeft="lg"
                  // color="white"
                  // bg="primary"
                  fontSize="xl"
                  fontWeight="semibold"
                  onClick={handleDecrement}
                  cursor="pointer"
                >
                  -
                </InputLeftElement>
                <Input value={qty} textAlign="center" type="number" />
                <InputRightElement
                  roundedRight="lg"
                  // color="white"
                  // bg="primary"
                  fontSize="xl"
                  fontWeight="semibold"
                  onClick={handleIncrement}
                  cursor="pointer"
                >
                  +
                </InputRightElement>
              </InputGroup>

              
                <Text fontWeight="semibold" fontSize="xl">
                  {formatRupiah(dataProduct?.price ? dataProduct.price * 1 : 0)}
                </Text>
              
            </HStack>
            {message !== "" && !check && (
              <Text gap="2" color="red" display="flex" align="center">
                <FaInfoCircle size={24} /> {message}
              </Text>
            )}

            <HStack mt={6}>
              <Button
                bg="secondary"
                color="primary"
                px={{base:4, md:10}}
                rounded="none"
                leftIcon={<BsCartPlus size={24} />}
                borderColor="primary"
                variant="outline"
                onClick={()=> cartMutation({
                  quantity:qty
                })}
                isLoading={loadingCart}
              >
                Add To Cart
              </Button>
              <Button
              isLoading={loadingTransaction}
              onClick={handleTransaction}
              px={{base:"4", md:14}}
              rounded="none" bg="primary" color="white">
                Buy Now
              </Button>
            </HStack>
          </Stack>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default DetailProduct;
