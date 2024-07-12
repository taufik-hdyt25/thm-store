import { useAuth } from "@/hooks/useAuth";
import { API } from "@/libs/API";
import {
  Avatar,
  HStack,
  IconButton,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { AlertConfirm } from ".";
import { IBrand } from "@/interface/brand.interfaces";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { RiDeleteBin6Fill } from "react-icons/ri";

const Brands: React.FC = (): JSX.Element => {
  const { token } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [notrans, setNotrans] = useState("");
  const handleOpenAlert = (id: string) => {
    setNotrans(id);
    onOpen();
  };

  const { data: dataBrand, refetch } = useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      const response = await API.get("/brands", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
  });

  const { mutate: deleteBrand, isPending } = useMutation({
    mutationFn: async (id: number) => {
      const response = await API.delete(`brand/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },

      });

      return response.data;
    },
    onSuccess: ()=> {
        refetch()
    }
  });

  return (
    <TableContainer mt={3}>
      <Table>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Brand Name</Th>
            <Th>Logo</Th>
            <Th display="flex" gap={4} >Action {isPending && <Spinner color="#39A7FF" />}</Th>
            
          </Tr>
        </Thead>
        <Tbody>
          {dataBrand?.data.map((data: IBrand, idx: number) => (
            <Tr key={idx}>
              <Td>{data.brand_id}</Td>
              <Td>{data.brand_name}</Td>
              <Td>
                <Avatar src={data.logo_brand} />
              </Td>
              <Td>
                <HStack>
                  <IconButton
                    variant="unstyled"
                    aria-label="delete"
                    icon={
                      <HiOutlinePencilAlt
                        size={24}
                        color="#39A7FF"
                        cursor="pointer"
                      />
                    }
                  />
                  <IconButton
                    onClick={() => deleteBrand(data.brand_id)}
                    variant="unstyled"
                    aria-label="delete"
                    icon={
                      <RiDeleteBin6Fill
                        color="red"
                        cursor="pointer"
                        size={24}
                      />
                    }
                  />
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {isOpen && (
        <AlertConfirm
          refetch={refetch}
          isOpen={isOpen}
          onCLose={onClose}
          noTransaction={notrans}
        />
      )}
    </TableContainer>
  );
};

export default Brands;
