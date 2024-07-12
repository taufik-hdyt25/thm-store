import {
  Avatar,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  HStack,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Stack,
  Text
} from "@chakra-ui/react";
import Link from "next/link";

import { useAuth } from "@/hooks/useAuth";
import { ICart } from "@/interface/customer.interfaces";
import { formatRupiah } from "@/utils/formatRupiah";
import useScrolledSize from "@/utils/scrolledSize";
import { useRouter } from "next/router";
import { destroyCookie } from "nookies";
import { CiSearch } from "react-icons/ci";
import { IoIosHeartEmpty, IoIosLogOut } from "react-icons/io";
import { IoCartOutline, IoPerson } from "react-icons/io5";
import { isNullOrUndefined } from "util";

interface IProps {
  onOpenCart?: () => void;
  openWichlist?: () => void;
}

const Header: React.FC<IProps> = ({
  onOpenCart,
  openWichlist,
}): JSX.Element => {
  const { token, user,getProfile } = useAuth();
  const totalQuantity = user?.cart.reduce(
    (total, currentItem) => total + currentItem.quantity,
    0
  );

  const router = useRouter();
  function handleLogout() {
    destroyCookie(null, "token");
    router.push("/login");
    getProfile()
  }

  const scrolled = useScrolledSize();

  const customStyleTitle: React.CSSProperties = {
    display: "-webkit-box",
    WebkitLineClamp: 1,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  };

  return (
    <HStack
      justify="space-between"
      px={{ base: 2, md: 10 }}
      py={2}
      pos="fixed"
      top="0"
      zIndex={9999}
      bg="white"
      w="full"
      boxShadow={scrolled ? "lg" : "none"}
    >
      <Link href="/">
        <Flex align="center">
          <Image
            w="60px"
            src="https://res.cloudinary.com/doushe6hn/image/upload/v1702611440/thm-store/wsgtz2aummbaotpeq0qq.png"
            alt="logo"
          />
          <Text fontWeight="semibold">THM Store</Text>
        </Flex>
      </Link>
      1
      <HStack>
        <InputGroup w="fit-content" display={{ base: "none", md: "block" }}>
          <InputRightElement>
            <CiSearch size={24} />
          </InputRightElement>
          <Input placeholder="Search for items" />
        </InputGroup>

        <Stack direction="row" h="60px" p={4}>
          <Divider orientation="vertical" />
        </Stack>

        <Popover trigger="hover">
          <PopoverTrigger>
            <Box pos="relative">
              <IconButton
                variant="ghost"
                aria-label="cart"
                icon={<IoCartOutline size={30} />}
                onClick={()=> router.push("/cart")}
              />
              {token && user?.cart.length !== 0 && (
                <Center
                  bg="primary"
                  w="20px"
                  h="20px"
                  rounded="full"
                  pos="absolute"
                  top="-1"
                  right={-1}
                >
                  <Text fontSize="x-small" fontWeight="semibold" color="white">
                    {totalQuantity}
                  </Text>
                </Center>
              )}
            </Box>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverHeader display="flex" justifyContent="space-between">
              <Text fontSize="sm" fontWeight="semibold">
                Cart ({totalQuantity})
              </Text>
              <Text cursor="pointer" onClick={()=> router.push("/cart")} fontSize="sm" fontWeight="semibold" color="primary">
                view all
              </Text>
            </PopoverHeader>
            <PopoverBody>
              {user?.cart.map((data: ICart, idx: number) => (
                <HStack
                  key={idx}
                  p={2}
                  borderBottom="1px solid #ebebeb"
                  w="full"
                  
                >
                  <Image
                    minW="50px"
                    h="50px"
                    src={data?.product.image}
                    alt={data?.product.product_name}
                  />

                  <HStack w="full" justify="space-between">
                    <Stack spacing={0} w="full">
                      <Text style={customStyleTitle} fontSize="sm">
                        {data?.product.product_name}
                      </Text>
                      <HStack justify="space-between"  >
                      <Text fontSize="xs" fontWeight="semibold">
                        {formatRupiah(data?.product.price)}
                      </Text>
                      <Text fontSize="xs" >Qty: {data?.quantity}</Text>
                      </HStack>
                    </Stack>
                  </HStack>
                </HStack>
              ))}
            </PopoverBody>
          </PopoverContent>
        </Popover>

        <Box pos="relative">
          <IconButton
            variant="ghost"
            aria-label="wichlist"
            icon={<IoIosHeartEmpty size={30} />}
            onClick={openWichlist}
          />
          {token && user?.wishlist.length !== 0 && (
            <Center
              bg="primary"
              w="20px"
              h="20px"
              rounded="full"
              pos="absolute"
              top="-1"
              right={-1}
            >
              <Text fontSize="x-small" fontWeight="semibold" color="white">
                {user?.wishlist.length}
              </Text>
            </Center>
          )}
        </Box>

        <Stack
          display={{ base: "none", md: "flex" }}
          direction="row"
          h="60px"
          p={4}
        >
          <Divider orientation="vertical" />
        </Stack>

        <Box display={{ base: "none", md: "flex" }} gap={3}>
          {token ? (
            <Menu>
              <MenuButton>
                <Avatar
                  cursor="pointer"
                  as={Link}
                  href="/profile"
                  size="sm"
                  src={user?.profile_picture}
                />
              </MenuButton>
              <MenuList>
                <MenuItem
                  onClick={() => router.push("/profile")}
                  icon={<IoPerson size={24} />}
                >
                  Profile
                </MenuItem>
                <MenuItem
                  onClick={() => handleLogout()}
                  icon={<IoIosLogOut size={24} />}
                >
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <>
              <Button
                variant="outline"
                color="primary"
                border="1px solid #39A7FF"
                as={Link}
                href="/login"
              >
                Sign in
              </Button>
              <Button bg="primary" color="white" as={Link} href="/register">
                Sign Up
              </Button>
            </>
          )}
        </Box>
      </HStack>
    </HStack>
  );
};

export default Header;
