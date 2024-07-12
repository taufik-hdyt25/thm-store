import { Box, Center, HStack, Stack, Text } from "@chakra-ui/react";
import { FaSortAmountUp ,FaStickyNote} from "react-icons/fa";
import { MdLabel } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { useTransaction } from "../hooks/useTransaction";
import { ITransaction } from "@/interface/transaction.interfaces";
import { useCustomer } from "../hooks/useCustomer";
import { formatRupiah } from "@/utils/formatRupiah";

                    

  const Dashboard: React.FC = (): JSX.Element => {
    const {dataTransaction} = useTransaction()
    const {dataCustomer} = useCustomer()

    const totalOrder = dataTransaction?.data.length
    const totalOrders = dataTransaction?.data.filter((data:ITransaction)=> data.status_payment === "SUCCESS")
    const totalRevenue = totalOrders?.reduce((acc:any, transaction:ITransaction) => acc  + transaction.subtotal, 0);

    
    
  
    return (
      <Box bg="white" p={3} rounded="lg" w="fit-content" mt={10}>
        <Text>Sales Summary</Text>

        <HStack mt={4} spacing={6} >
          <Box  boxSize="120px" rounded="lg" p={2} bg="#FFE2E5">
            <Center h="full">
              <Stack>
            <FaSortAmountUp size={20} color="black" />
            <Stack mt={2} spacing={0}>
            <Text fontWeight="semibold" >{formatRupiah(totalRevenue)}</Text>
            <Text fontSize="sm">Total Sales</Text>
            </Stack>
              </Stack>
            </Center>
          </Box>
          <Box  boxSize="120px" rounded="lg" p={2} bg="#FFF4DE">
            <Center h="full">
              <Stack>
            <FaStickyNote size={20} color="black" />
            <Stack mt={2} spacing={0}>      
            <Text fontWeight="semibold">{totalOrder}</Text>
            <Text fontSize="sm">Total Order</Text>
            </Stack>
              </Stack>
            </Center>
          </Box>
          <Box  boxSize="120px" rounded="lg" p={2} bg="#DCFCE7">
            <Center h="full">
              <Stack>
            <MdLabel size={20} color="black" />
            <Stack mt={2} spacing={0}>
            <Text fontWeight="semibold">{totalOrders?.length}</Text>
            <Text fontSize="sm">Product Sold</Text>
            </Stack>
              </Stack>
            </Center>
          </Box>
          <Box  boxSize="120px" rounded="lg" p={2} bg="#F3E8FF">
            <Center h="full">
              <Stack>
            <FaUsers size={20} color="black" />
            <Stack mt={2} spacing={0}>
            <Text fontWeight="semibold">{dataCustomer?.customers.length}</Text>
            <Text fontSize="sm">All Customer</Text>
            </Stack>
              </Stack>
            </Center>
          </Box>
        </HStack>

      </Box>
    );
  };
  
  export default Dashboard;
  