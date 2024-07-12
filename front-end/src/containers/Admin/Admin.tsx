import {
  Box,
  Button,
  Grid,
  GridItem,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import {
  Brands,
  Dashboard,
  ModalAddProduct,
  Orders,
  Sidebar,
  Users,
} from "./partials";
import { useState } from "react";
import { IProducts } from "@/interface/product.interface";
import CardProductAdmin from "./partials/CardProduct";
import { useHomeAction } from "../Home/Home.action";
import { FiPlus, FiSearch } from "react-icons/fi";

const Admin: React.FC = (): JSX.Element => {
  const [selected, setSelected] = useState("dashboard");
  const { dataProdutcs } = useHomeAction();
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Grid gridTemplateColumns="300px 1fr">
      <GridItem bg="white">
        <Sidebar selected={selected} setState={setSelected} />
      </GridItem>
      <GridItem bg="#ebebeb" h="100vh" p={6} overflowY="auto">
        {selected === "products" && (
          <>
            <Text>All Product</Text>
            <HStack mt={4} justify="space-between">
              <InputGroup maxW={"300px"}>
                <Input
                  bg="white"
                  variant="filled"
                  placeholder="Search product"
                />
                <InputRightElement>
                  <FiSearch size={24} />
                </InputRightElement>
              </InputGroup>

              <Button
                rightIcon={<FiPlus size={24} />}
                color="white"
                bg="primary"
                onClick={onOpen}
              >
                New Product
              </Button>
            </HStack>
            <Grid mt={8} gridTemplateColumns="repeat(5,1fr)" gap={2}>
              {dataProdutcs?.data.map((data: IProducts, idx: number) => (
                <Box key={idx}>
                  <CardProductAdmin product={data} />
                </Box>
              ))}
            </Grid>
          </>
        )}
        {selected === "users" && (
          <>
            <Text>All User</Text>
            <Users />
          </>
        )}

        {selected === "orders" && (
          <>
            <Text>All Order</Text>
            <Orders />
          </>
        )}

        {selected === "brands" && (
          <>
            <Text>All Brand</Text>
            <Brands />
          </>
        )}

        {selected === "dashboard" && (
          <>
            <Text fontWeight="semibold">Dashboard</Text>
            <Dashboard />
          </>
        )}
      </GridItem>

      {isOpen && <ModalAddProduct isOpen={isOpen} onClose={onClose} />}
    </Grid>
  );
};

export default Admin;
