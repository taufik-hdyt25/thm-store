import {
  Box,
  Button,
  Card,
  Divider,
  Flex,
  FormControl,
  Grid,
  GridItem,
  HStack,
  Input,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { IoCallOutline } from "react-icons/io5";
import { MdOutlineMail } from "react-icons/md";

const Contact: React.FC = (): JSX.Element => {
  return (
    <Box px={{ base: 6, md: 20 }}>
      <Grid
        gridTemplateColumns={{ base: "1fr", md: "300px 1fr" }}
        gap={6}
      >
        <GridItem border="1px solid #ebebeb" rounded="lg" px={4} py={6}>
          <Stack>
            <HStack>
              <Box bg="primary" p={2} w="fit-content" rounded="full">
                <IoCallOutline color="white" size={24} />
              </Box>
              <Text fontWeight="semibold">Call To Us</Text>
            </HStack>
            <Text mt={3} fontSize="sm">We are available 24/7, 7 days a week.</Text>
            <Text fontSize="sm">Phone: 083871940605</Text>

            <Divider mt={4} borderColor="black"/>

            <HStack mt={6}>
              <Box bg="primary" p={2} w="fit-content" rounded="full">
                <MdOutlineMail color="white" size={24} />
              </Box>
              <Text fontWeight="semibold">Write To Us</Text>
            </HStack>
            <Text mt={3} fontSize="sm">Fill out our form and we will contact you within 24 hours.</Text>
            <Text fontSize="sm">Email: taufikhdyt2599@gmail.com</Text>
          </Stack>
        </GridItem>
        <GridItem>
          <Card px={4} py={6}>
            <Grid gridTemplateColumns={{base: "1fr", md: "1fr 1fr 1fr"}} gap={4}>
                <FormControl isRequired>
                    <Input variant="filled" placeholder="Your Name" />
                </FormControl>
                <FormControl isRequired>
                    <Input variant="filled" placeholder="Your Email" />
                </FormControl>
                <FormControl isRequired>
                    <Input variant="filled" placeholder="Your Phone" />
                </FormControl>
            </Grid>
            <Textarea rows={10} variant="filled" mt={10} placeholder="Your Message" />
            <Flex mt={6} justify="end">
                <Button rounded="none" color="white" bg="primary">Send Message</Button>
            </Flex>
          </Card>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Contact;
