import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Box, ChakraProvider, HStack, Text } from "@chakra-ui/react";
import { myNewTheme } from "@/styles/theme";
import nookies from 'nookies'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/providers/AuthProvider";
import { useAuth } from "@/hooks/useAuth";
import { Loading } from "@/components/LoadingAnimation/loadingAnimation";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

export default function App({ Component, pageProps }: AppProps) {
  const { token } = nookies.get();
  
  return (
    <AuthProvider token={token}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={myNewTheme}>
         <Component {...pageProps} />
        </ChakraProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}

{/* <Box display="flex" justifyContent="center" alignContent="center" h="100vh">
              <HStack>
              <Loading />
              <Text>Loading...</Text>
              </HStack>
            </Box> */}