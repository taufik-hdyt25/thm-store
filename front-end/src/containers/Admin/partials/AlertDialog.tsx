  import { useAuth } from "@/hooks/useAuth";
  import { API } from "@/libs/API";
  import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
  } from "@chakra-ui/react";
  import { QueryObserverResult, RefetchOptions, useMutation } from "@tanstack/react-query";
  import { useRef } from "react";

  interface IProps {
    isOpen: boolean;
    onCLose: () => void;
    noTransaction: string;
    refetch: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<any, Error>>
  }
  export default function ALertConfirm({
    isOpen,
    onCLose,
    noTransaction,
    refetch
  }: IProps) {

    const cancelRef = useRef(null);
    const { token } = useAuth();

    const { mutate: updateTransaction, isPending } = useMutation({
      mutationFn: async (body: { delivery_status: string }) => {
        const response = await API.patch(`/transaction/${noTransaction}`, body, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      },
      onSuccess: ()=> {
        refetch()
        onCLose() 
      }
    });

    return (
      <AlertDialog
        isCentered
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onCLose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Send Product
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure the item is ready to be sent?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onCLose}>
                Cancel
              </Button>
              <Button
                isLoading={isPending}
                bg="primary"
                color="white"
                ml={3}
                onClick={() => {
                  updateTransaction({
                    delivery_status: "ON DELIVERY",
                  });
                }}
              >
                Send
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    );
  }
