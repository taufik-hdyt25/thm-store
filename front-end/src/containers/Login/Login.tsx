import {
  Text,
  Box,
  Image,
  Grid,
  Stack,
  Input,
  Button,
  GridItem,
  InputGroup,
  InputRightElement,
  FormControl,
  FormErrorMessage,
  Link,
} from "@chakra-ui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import React, { useState } from "react";
import { useLoginAction } from "./Login.action";

const Login: React.FC = (): JSX.Element => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { formik, handleForm, loadingLogin } = useLoginAction();



  return (
    <Box>
      <Grid
        gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }}
        rowGap={{ base: "6", md: "" }}
        mt={8}
      >
        <GridItem display={{ base: "none", md: "block" }}>
          <Image
            roundedRight="xl"
            h="80vh"
            w="full"
            bgSize="cover"
            src="https://i.pinimg.com/736x/0f/d8/57/0fd8577fe8c1c38f28280f9cc3e8d237.jpg"
            alt="image"
          />
        </GridItem>

        <Stack justify="center" align="center" px={{ base: 2, md: 0 }} >
          <form
            onSubmit={formik.handleSubmit}
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Stack w={{ base: "full", md: "400px" }} bg="white" rounded="lg" p="3">
              <Text fontSize="3xl" fontWeight="600">
                Log in
              </Text>
              <Text>Enter your details below</Text>

              <Box mt={8}>
                <FormControl isInvalid={formik.errors.email ? true : false}>
                  <Input
                    name="email"
                    variant="flushed"
                    placeholder="Email"
                    onChange={handleForm}
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
              </Box>
              <Button textAlign="end" fontWeight="400" variant="unstyled">
                Forgot Password ?
              </Button>

              <Button
                isLoading={loadingLogin}
                type="submit"
                colorScheme="blue"
                size="lg"
                bg="primary"
                color="white"
              >
                Login
              </Button>

              <Text mt={4} justifyContent="center" display="flex" gap={2}>
                Already have account?{" "}
                <Link href="/register">
                  <Text fontWeight="semibold" color="primary">
                    Register
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



export default Login;
