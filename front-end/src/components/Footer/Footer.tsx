import {
  Avatar,
  Box,
  Divider,
  Grid,
  GridItem,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { FaInstagram, FaLinkedin, FaTiktok, FaYoutube } from "react-icons/fa";

const Footer: React.FC = (): JSX.Element => {
  return (
    <Box px={10} pt={10} borderTop="1px solid #ebebeb">
      <Grid gridTemplateColumns={{base: "1fr", md: "1fr .5fr .5fr .5fr"}} gap={8}>
        <HStack align="center">
          <Avatar
            src="https://res.cloudinary.com/doushe6hn/image/upload/v1702611440/thm-store/wsgtz2aummbaotpeq0qq.png"
            size="xl"
          />
          {/* <Text>
            THM Store
          </Text> */}
        </HStack>
        <GridItem>
          <Stack>
            <Text fontWeight="semibold">Company</Text>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/help">Help</Link>
          </Stack>
        </GridItem>
        <GridItem>
          <Stack>
            <Text fontWeight="semibold">Privacy</Text>
            <Link href="#">Privacy policy</Link>
            <Link href="#">Cookie policy</Link>
            <Link href="#">Usage policy</Link>
          </Stack>
        </GridItem>
        <GridItem>
          <Stack>
            <Text fontWeight="semibold">Follow Us</Text>
            <HStack>
              <FaInstagram size={24} />
              <FaLinkedin size={24} />
              <FaYoutube size={24} />
              <FaTiktok size={24} />
            </HStack>
          </Stack>
        </GridItem>
      </Grid>
      <Divider mt={8} />
      <Text py={4} color="GrayText" textAlign="center">
        Copyright THMstore 2023. All right reserved
      </Text>
    </Box>
  );
};

export default Footer;
