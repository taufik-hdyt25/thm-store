import {
  Text,
  Box,
  Image,
  Grid,
  Stack,
  Input,
  Button,
  GridItem,
  FormControl,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import Link from "next/link";

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRegisterAction } from "./Register.action";

const Register: React.FC = (): JSX.Element => {
  const { formik, handleForm, loadingCreateCustomer } = useRegisterAction();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <Box>
      <Grid
        gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }}
        rowGap={{ base: "6", md: "" }}
        mt={8}
      >
        <GridItem display={{base: "none", md: "block"}}>
          <Image
            roundedRight="xl"
            h="80vh"
            w="full"
            bgSize="cover"
            src="https://i.pinimg.com/736x/0f/d8/57/0fd8577fe8c1c38f28280f9cc3e8d237.jpg"
            alt="image"
          />
        </GridItem>
        <Stack justify="center" align="center"  px={{ base: 3, md: 0 }} >
            <form onSubmit={formik.handleSubmit} style={{width:"100%", display: "flex", justifyContent: "center"}}>
          <Stack w={{ base: "full", md: "400px" }} bg="white" rounded="lg" p={3 }>
            <Text fontSize="3xl" fontWeight="600">
              Create an account
            </Text>
            <Text>Enter your details below</Text>
              <Stack spacing={4} mt={8} >
                <FormControl isInvalid={formik.errors.fullname ? true : false}>
                  <Input
                    onChange={handleForm}
                    variant="flushed"
                    type="text"
                    placeholder="Name"
                    name="fullname"
                  />
                  <FormErrorMessage>{formik.errors.fullname}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={formik.errors.email ? true : false}>
                  <Input
                    onChange={handleForm}
                    variant="flushed"
                    type="email"
                    placeholder="Email"
                    name="email"
                  />
                  <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={formik.errors.password ? true : false}>
                <InputGroup mt={4}>
                    <Input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      variant="flushed"
                      placeholder="Password"
                      onChange={handleForm}
                    />
                    <InputRightElement
                      onClick={() => setShowPassword(!showPassword)}
                      cursor="pointer"
                    >
                      {showPassword ? (
                        <FaEyeSlash color="gray.300" />
                      ) : (
                        <FaEye color="gray.300" />
                      )}
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                </FormControl>
              </Stack>

              <Button
                w="full"
                type="submit"
                color="white"
                mt={6}
                size="lg"
                rounded="sm"
                bg="#39A7FF"
                colorScheme="blue"
                isLoading={loadingCreateCustomer}
              >
                Create Account
              </Button>

            <Text display="flex" gap={2}>
              Already have account?{" "}
              <Link href="/login">
                <Text fontWeight="semibold" color="primary">
                  Login
                </Text>
              </Link>
            </Text>
          </Stack>
            </form>
        </Stack>
      </Grid>
    </Box>
  );
};

export default Register;
