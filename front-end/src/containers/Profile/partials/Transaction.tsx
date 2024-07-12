import { useAuth } from "@/hooks/useAuth";
import { ITransaction } from "@/interface/transaction.interfaces";
import { formatRupiah } from "@/utils/formatRupiah";

import {
  Box,
  Button,
  Card,
  HStack,
  Stack,
  Text,
  Image,
  Flex,
} from "@chakra-ui/react";
import { MdOutlineShoppingBag } from "react-icons/md";
import moment from "moment";
import Empty from "@/components/Empty";
import { useEffect } from "react";

const Transaction: React.FC = (): JSX.Element => {
  const customStyleTitle: React.CSSProperties = {
    display: "-webkit-box",
    WebkitLineClamp: 1,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  };

  const { user } = useAuth();



  useEffect(() => {
    const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js";
    const clientKey = "SB-Mid-client-96TrsVVWbb-rmU4a";
    const script = document.createElement("script");
    script.src = snapScript;
    script.setAttribute("data-client-key", clientKey);
    script.async = true;

    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Box>
      {/* <HStack>
        <Button size="sm" variant="unstyled">
          Status
        </Button>
        <Button
          size="sm"
          color="primary"
          borderColor="primary"
          variant="outline"
        >
          All
        </Button>
        <Button size="sm" variant="outline">
          Success
        </Button>
        <Button size="sm" variant="outline">
          Failed
        </Button>
        <Button size="sm" variant="outline">
          Pending
        </Button>
      </HStack> */}
      <Text fontWeight="semibold">All Transaction</Text>

      <Stack mt={6} spacing={4}>
        {!user?.transactions.length && (
          <Empty
            image="https://png.pngtree.com/png-vector/20231201/ourmid/pngtree-transactions-icon-payment-png-image_10805663.png"
            description="Transaction Empty"
          />
        )}
        {user?.transactions.map((data: ITransaction, idx: number) => {
          const waktuMoment = moment(data.transaction_date, "HH:mm:ss.SSSSSSZ");
          const transactionDate = waktuMoment.format("YYYY-MM-DD");
          return (
            <Card key={idx} p={4}>

              <Flex   overflowX="auto">
              <HStack w="100%" spacing={4} >
                <MdOutlineShoppingBag size={24} />
                <Text  fontSize="xs">{transactionDate}</Text>
                <Text
                  fontSize="sm"
                  px="3"
                  border={data.status_payment === "SUCCESS" ? "1px solid green" : data.status_payment === "PENDING" ? "1px solid #FF9800" : data.status_payment === "FAILED" ? "1px solid red" : ""}
                  rounded="xl"
                  color={data.status_payment === "SUCCESS" ? "green" : data.status_payment === "PENDING" ? "#FF9800" : data.status_payment === "FAILED" ? "red" : ""}
                  fontWeight="semibold"
                  
                >
                  {data.status_payment}
                </Text>
                <Text   fontSize="sm">{data.no_transaction}</Text>
                {data.status_payment === "SUCCESS" && <Text>Delivery : <strong style={{color: '#39A7FF'}}>{data.status_pengiriman}</strong></Text>}
              </HStack>
              </Flex>
              

              <HStack mt="2">
                <Image
                  w="100px"
                  h="100px"
                  src={data.product.image}
                  alt={data.product.product_name}
                />
                <Stack spacing={0} w="full">
                  <Text fontWeight="semibold" style={customStyleTitle}>
                    {data.product.product_name}
                  </Text>
                  <HStack justify="space-between">
                    <Text fontSize="xs">
                      Qty {data.quantity} x {formatRupiah(data.product.price)}
                    </Text>
                    <Stack spacing={0}>
                      <Box display={{ base: "none", md: "block" }}>
                        <Text fontWeight="semibold">Total</Text>
                        <Text fontWeight="semibold">
                          {formatRupiah(data.subtotal)}
                        </Text>
                      </Box>
                    </Stack>
                  </HStack>
                  <Box display={{ base: "block", md: "none" }}>
                    <Text fontWeight="semibold">Total</Text>
                    <Text fontWeight="semibold">
                      {formatRupiah(data.subtotal)}
                    </Text>
                  </Box>
                </Stack>
              </HStack>
              {data.status_payment === "PENDING" && (
                <Flex justify="end">
                  <Button
                    onClick={()=>{
                      if(data.snap_token){
                        snap.pay(data.snap_token)
                      }
                    }}
                    bg="primary"
                    color="white"
                    w="fit-content"
                    size="sm"
                  >
                    Pay now
                  </Button>
                </Flex>
              )}
            </Card>
          );
        })}
      </Stack>
    </Box>
  );
};

export default Transaction;
