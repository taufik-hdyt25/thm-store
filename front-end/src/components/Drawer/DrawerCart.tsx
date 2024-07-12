import { useAuth } from "@/hooks/useAuth";
import { ICart } from "@/interface/customer.interfaces";
import { formatRupiah } from "@/utils/formatRupiah";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  IconButton,
  Stack,
  Text
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import CartItem from "../CartItem";
import Empty from "../Empty";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}
const DrawerCart: React.FC<IProps> = ({ isOpen, onClose }): JSX.Element => {
  const { user, getProfile } = useAuth();

  const [totalPrice, setTotalPrice] = useState(0);

  const calculateTotalPrice = () => {
    let total = 0;
    user?.cart.forEach((item: ICart) => {
      total += item.product.price * item.quantity;
    });
    setTotalPrice(total);

    getProfile();
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [user]);

  return (
    <Drawer size="sm" isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent pt="20">
        <DrawerHeader display="flex" justifyContent="space-between">
          <Text>MyCart</Text>
          <IconButton variant="unstyled" onClick={onClose} aria-label="close" icon={<IoIosCloseCircleOutline size={24} />} />
        </DrawerHeader>
        {!user?.cart.length ? (
          <Empty
            image="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-7359557-6024626.png"
            description="Your cart is still empty!!!"
          />
        ) : (
          <>
            <DrawerBody maxH="100vh">
              <Stack>
                {user?.cart.map((data: ICart, idx: number) => (
                  <CartItem key={idx} data={data} />
                ))}
              </Stack>
            </DrawerBody>
            <DrawerFooter borderTop="2px solid #ebebeb">
              <Stack align="center" w="full">
                <HStack justify="space-between" w="full">
                  <Text fontWeight="bold">Total</Text>
                  <Text fontWeight="semibold">{formatRupiah(totalPrice)}</Text>
                </HStack>
                <Button bg="primary" color="white" w="full">
                  Checkout
                </Button>
              </Stack>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerCart;
