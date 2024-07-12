import { useAuth } from "@/hooks/useAuth";
import { IWishlist } from "@/interface/customer.interfaces";
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Stack,
  Text
} from "@chakra-ui/react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Empty from "../Empty/Empty";
import WishlistItem from "../Wishlist";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}
const DrawerWichlist: React.FC<IProps> = ({ isOpen, onClose }): JSX.Element => {
  const { user } = useAuth();
  return (
    <Drawer size="sm" isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent pt="20">
        <DrawerCloseButton />
        <DrawerHeader display="flex" justifyContent="space-between">
          <Text>Wishlist</Text>
          <IconButton variant="unstyled" onClick={onClose} aria-label="close" icon={<IoIosCloseCircleOutline size={24} />} />
        </DrawerHeader>
        {!user?.wishlist.length ? (
          <Empty description="Your wishlist is still empty" image="https://www.edeleita.com/assets/img/empty_wishlist.png" />
        ) : (
          <>
            <DrawerBody maxH="100vh">
              <Stack>
                {user?.wishlist.map((data: IWishlist, idx: number) => (
                  <WishlistItem key={idx} data={data} />
                ))}
              </Stack>
            </DrawerBody>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerWichlist;
