import { Box, Divider, useDisclosure } from "@chakra-ui/react";
import Head from "../Head/Head";
import Header from "../Header/Header";
import useScreenSize from "@/utils/screenSize";
import NavbarMobile from "../NavbarMobile/NavbarMobile";
import Footer from "../Footer";
import { DrawerCart, DrawerWichlist } from "../Drawer";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";

interface IProps {
  children?: React.ReactNode;
  headTitle?: string;
  isNavMobile?: boolean;
}
const Layout: React.FC<IProps> = ({
  children,
  headTitle,
  isNavMobile,
}): JSX.Element => {
  const screenSize = useScreenSize();
  const {
    isOpen: isOpenCart,
    onClose: closeCart,
    onOpen: onOpenCart,
  } = useDisclosure();
  const {
    isOpen: isOpenWichlist,
    onClose: closeWichlist,
    onOpen: onOpenWichlist,
  } = useDisclosure();
  const router = useRouter();

  const { token } = useAuth();

  const openCart = () => {
    if (isOpenWichlist) {
      closeWichlist();
    }
    if (!token) {
      return router.push("/login");
    } else {
      onOpenCart();
    }
  };
  const openWichlist = () => {
    if (isOpenCart) {
      closeCart();
    }
    if (!token) {
      return router.push("/login");
    } else {
      onOpenWichlist();
    }
  };

  return (
    <Box>
      <Head title={headTitle} />
      <Header onOpenCart={openCart} openWichlist={openWichlist} />
      <Box px={{ base: 2, md: 20 }} minH="100vh" pt={24} pb={10}>
        {children}
      </Box>
      <Footer />
      {screenSize.width < 768 && isNavMobile && <NavbarMobile />}

      {isOpenCart && <DrawerCart isOpen={isOpenCart} onClose={closeCart} />}

      {isOpenWichlist && (
        <DrawerWichlist isOpen={isOpenWichlist} onClose={closeWichlist} />
      )}
    </Box>
  );
};

export default Layout;
