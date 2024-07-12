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
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { ICustomer } from "@/interface/customer.interfaces";
import { useQuery } from "@tanstack/react-query";
import { API } from "@/libs/API";
import { useAuth } from "@/hooks/useAuth";
import moment from "moment";
import { ITransaction } from "@/interface/transaction.interfaces";
import { formatRupiah } from "@/utils/formatRupiah";
import { AlertConfirm } from ".";
import { useState } from "react";
import { useTransaction } from "../hooks/useTransaction";

const Orders: React.FC = (): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [notrans, setNotrans] = useState("");
  const handleOpenAlert = (id: string) => {
    setNotrans(id);
    onOpen();
  };

  const {dataTransaction,refetch} = useTransaction()
  
  

  return (
    <TableContainer mt={3}>
      <Table>
        <Thead>
          <Tr>
            <Th>No Transaction</Th>
            <Th>Product Name</Th>
            <Th>Quantity</Th>
            <Th>Subtotal</Th>
            <Th>Status Payment</Th>
            <Th>Delivery status</Th>
            <Th>Transaction date</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {dataTransaction?.data.map((data: ITransaction, idx: number) => {
            const waktuMoment = moment(
              data.transaction_date,
              "HH:mm:ss.SSSSSSZ"
            );
            const transactionDate = waktuMoment.format("YYYY-MM-DD");
            return (
              <Tr key={idx}>
                <Td>{data.no_transaction}</Td>
                <Td
                  style={{
                    maxWidth: "180px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {data.product.product_name}
                </Td>
                <Td>{data.quantity}</Td>
                <Td>{formatRupiah(data.subtotal)}</Td>
                <Td
                  fontWeight="semibold"
                  color={data.status_payment === "SUCCESS" ? "green" : "orange"}
                >
                  {data.status_payment}
                </Td>
                <Td
                  fontWeight="semibold"
                  color={
                    data.status_pengiriman === "PENDING"
                      ? "orange"
                      : data.status_pengiriman === "ON DELIVERY"
                      ? "green"
                      : ""
                  }
                >
                  {data.status_pengiriman}
                </Td>
               
                <Td>{transactionDate}</Td>

                <Td>
                  <Button
                    isDisabled={data.status_payment === "PENDING" || data.status_pengiriman === "ON DELIVERY" }
                    onClick={() => handleOpenAlert(data.no_transaction)}
                    bg="primary"
                    color="white"
                  >
                    {data.status_pengiriman === "PENDING"
                      ? "Send Product"
                      : data.status_pengiriman === "ON DELIVERY"
                      ? "Already Sent"
                      : ""}
                  </Button>
                </Td>
              </Tr>
            );
          })}
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

export default Orders;
