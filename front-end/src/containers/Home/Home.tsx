"use client";
import CardBrand from "@/components/CardBrand";
import CardProduct from "@/components/CardProduct";
import ImageSlider from "@/components/ImageSlider";
import { Loading } from "@/components/LoadingAnimation/loadingAnimation";
import { IBrand } from "@/interface/brand.interfaces";
import { IProducts } from "@/interface/product.interface";
import { Box, Button, Flex, HStack, IconButton, Text } from "@chakra-ui/react";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import { useHomeAction } from "./Home.action";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";

const Home: React.FC = (): JSX.Element => {
  const { dataBrands, loadingBrands, dataProdutcs, loadingProducts } =
    useHomeAction();
    const router = useRouter()

  return (
    <Box>
      <Box>
        <ImageSlider />
        <Text
          bg="primary"
          color="white"
          fontWeight="bold"
          px="10"
          w="fit-content"
          fontSize="xl"
          py="2"
          roundedRight="full"
        >
          Product New
        </Text>
        <Box mt={4} pb="2" bg="primary" rounded="lg" >
          <HStack p={2} overflowX="auto" >
            {loadingBrands && (
              <Box w="full" display="flex" justifyContent="center">
                <Loading />
              </Box>
            )}
            {dataProdutcs?.data.map((data: IProducts, idx: number) => (
              <Box   key={idx} >
                <Box w="200px" boxSizing="border-box">
                <CardProduct product={data} />
                </Box>
              </Box>
            ))}
          </HStack>

          <Flex justify="center">
          <Button onClick={()=> router.push("/products")}>Show All Product</Button>
          </Flex>

        </Box>

        <Box mt={4} bg="white">
          <HStack justify="space-between">
            <Text
              bg="primary"
              color="white"
              fontWeight="bold"
              px="10"
              w="fit-content"
              fontSize="xl"
              py="2"
              roundedRight="full"
            >
              All Brand
            </Text>
          </HStack>
          <Flex
            p={4}
            overflowX="auto"
            gap={4}
            align="center"
            justify="space-between"
            mt={4}
            rounded="lg"
            border="1px solid #ebebeb"
          >
            <IconButton
              variant="ghost"
              aria-label="left"
              icon={<IoIosArrowDropleftCircle size={35} />}
            />

            <HStack overflowX="auto">
              {loadingBrands && <Loading />}
              {dataBrands?.data?.map((data: IBrand, idx: number) => (
                <Box key={idx}>
                  <CardBrand brand={data} />
                </Box>
              ))}
            </HStack>

            <IconButton
              variant="ghost"
              aria-label="left"
              icon={<IoIosArrowDroprightCircle size={35} />}
            />
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};
export default Home;
