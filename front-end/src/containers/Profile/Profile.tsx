import { useAuth } from "@/hooks/useAuth";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Box,
  Button,
  Card,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  List,
  ListIcon,
  ListItem,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoMdListBox, IoIosStats, IoMdHeartEmpty } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { MyProfile, Transaction } from "./partials";
import CartItem from "@/components/CartItem";
import { ICart, IWishlist } from "@/interface/customer.interfaces";
import WishlistItem from "@/components/Wishlist";
import { FaRegCircleUser } from "react-icons/fa6";
import Empty from "@/components/Empty";

const Profile: React.FC = (): JSX.Element => {
  const { user } = useAuth();

  const [selectedMenu, setSelectedMenu] = useState("profile");

  return (
    <Grid gridTemplateColumns={{base: "1fr", md: "300px 1fr"}}>
      <GridItem>
        <Accordion defaultIndex={[0, 1]} allowMultiple>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box fontWeight="semibold" as="span" flex="1" textAlign="left">
                  Transaction
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <List spacing={3}>
                <ListItem cursor="pointer" onClick={() => setSelectedMenu("transaction")}>
                  <ListIcon fontSize={24} as={IoMdListBox} color="primary"  />
                  Transaction list
                </ListItem>
                {/* <ListItem cursor="pointer">
                  <ListIcon fontSize={24} as={IoIosStats} color="primary" />
                  Transaction status
                </ListItem> */}
              </List>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box fontWeight="semibold" as="span" flex="1" textAlign="left">
                  My Profile
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <List spacing={3}>
                <ListItem
                  cursor="pointer"
                  onClick={() => setSelectedMenu("cart")}
                >
                  <ListIcon fontSize={24} as={IoCartOutline} color="primary" />
                  Cart
                </ListItem>
                <ListItem
                  cursor="pointer"
                  onClick={() => setSelectedMenu("wishlist")}
                >
                  <ListIcon fontSize={24} as={IoMdHeartEmpty} color="primary" />
                  Wishlist
                </ListItem>
                <ListItem
                  cursor="pointer"
                  onClick={() => setSelectedMenu("profile")}
                  
                >
                  <ListIcon
                    fontSize={24}
                    as={FaRegCircleUser}
                    color="primary"
                  />
                  Profile
                </ListItem>
              </List>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </GridItem>
      <GridItem
        px={6}
        py={10}
        border="1px solid #ebebeb"
        h="100vh"
        overflowY="auto"
      >
        {selectedMenu === "profile" && user && <MyProfile user={user} />}
        {selectedMenu === "cart" && user && (
          <>
            {!user.cart.length ? (
              <Empty
                image="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-7359557-6024626.png"
                description="Your cart is still empty!!!"
              />
            ) : (
              <Stack>
                <Text fontWeight="semibold">My Cart</Text>
                {user?.cart.map((data: ICart, idx: number) => (
                  <CartItem key={idx} data={data} />
                ))}
              </Stack>
            )}
          </>
        )}
        {selectedMenu === "wishlist" && (
          <>
            {!user?.wishlist.length ? (
              <Empty
                description="Your wishlist is still empty"
                image="https://www.edeleita.com/assets/img/empty_wishlist.png"
              />
            ) : (
              <Stack>
                <Text fontWeight="semibold">My Wishlist</Text>
                {user?.wishlist.map((data: IWishlist, idx: number) => (
                  <WishlistItem key={idx} data={data} />
                ))}
              </Stack>
            )}
          </>
        )}

        {
          selectedMenu === "transaction" && <>
          <Transaction />
          </>
        }
      </GridItem>
    </Grid>
  );
};

export default Profile;
