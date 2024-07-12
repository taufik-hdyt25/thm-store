import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Input,
  InputGroup,
  InputRightElement,
  HStack,
  Button,
} from "@chakra-ui/react";
import { ICustomer } from "@/interface/customer.interfaces";
import { useQuery } from "@tanstack/react-query";
import { API } from "@/libs/API";
import { useAuth } from "@/hooks/useAuth";
import moment from "moment";
import { FiSearch, FiPlus } from "react-icons/fi";

const Users: React.FC = (): JSX.Element => {
  const { token } = useAuth();

  const { data: dataUsers } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await API.get("/customers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
  });

  return (
    <>
      <HStack mt={4} justify="space-between">
        <InputGroup maxW={"300px"}>
          <Input bg="white" variant="filled" placeholder="Search user" />
          <InputRightElement>
            <FiSearch size={24} />
          </InputRightElement>
        </InputGroup>

        {/* <Button rightIcon={<FiPlus size={24} />} color="white" bg="primary">New User</Button> */}
      </HStack>
      <TableContainer mt={5}>
        <Table>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Fullname</Th>
              <Th>Email</Th>
              <Th>Phone</Th>
              <Th>Address</Th>
              <Th>CreatedAt</Th>
            </Tr>
          </Thead>
          <Tbody>
            {dataUsers?.customers.map((data: ICustomer, idx: number) => {
              const waktuMoment = moment(data.createdAt, "HH:mm:ss.SSSSSSZ");
              const transactionDate = waktuMoment.format("YYYY-MM-DD");
              return (
                <Tr key={idx}>
                  <Td>{data.customer_id}</Td>
                  <Td>{data.fullname}</Td>
                  <Td>{data.email}</Td>
                  <Td>{data.phone}</Td>
                  <Td>{data.address}</Td>
                  <Td>{transactionDate}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Users;
