import {
  HStack,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { FaUser } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoCartOutline, IoHomeSharp } from "react-icons/io5";
import { MdLibraryMusic } from "react-icons/md";
import { RiLogoutCircleFill } from "react-icons/ri";
import { destroyCookie } from "nookies";

const NavbarMobile: React.FC = (): JSX.Element => {
  const router = useRouter();
  function handleLogout() {
    destroyCookie(null, "token");
    router.push("/login");
  }

  return (
    <HStack pos="fixed" bottom={0} p={1} roundedTop="xl" bg="primary" w="full">
      <HStack justify="space-between" w="full" rounded="lg" p="2">
        <Link href="/">
          <Stack align="center" spacing={1}>
            <IoHomeSharp size={24} color="white" />

            <Text fontSize="xs" color="white  " fontWeight="semibold">
              Home
            </Text>
          </Stack>
        </Link>
        <Link href="/products">
          <Stack align="center" spacing={1}>
            <MdLibraryMusic size={24} color="white" />

            <Text fontSize="xs" color="white  " fontWeight="semibold">
              Products
            </Text>
          </Stack>
        </Link>
        <Link href="/cart">
          <Stack align="center" spacing={1}>
            <IoCartOutline size={24} color="white" />

            <Text fontSize="xs" color="white  " fontWeight="semibold">
              Cart
            </Text>
          </Stack>
        </Link>

        <Menu>
          <MenuButton>
            <Stack spacing={1} align="center">
              <FaRegCircleUser color="white" size={24} />
              <Text fontSize="xs" color="white  " fontWeight="semibold">
                Profile
              </Text>
            </Stack>
          </MenuButton>

          <MenuList>
            <MenuItem onClick={() => router.push("/profile")} icon={<FaUser />}>
              Profile
            </MenuItem>
            <MenuItem onClick={handleLogout} icon={<RiLogoutCircleFill />}>
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </HStack>
  );
};

export default NavbarMobile;
