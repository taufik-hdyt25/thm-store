import { ICustomer } from "@/interface/customer.interfaces";
import {
  Avatar,
  Box,
  Button,
  Card,
  FormControl,
  FormLabel,
  Grid,
  IconButton,
  Input,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { RiLockPasswordFill } from "react-icons/ri";
import { useProfileAction } from "../Profile.action";
import { FaPenToSquare } from "react-icons/fa6";
import { useRef } from "react";

interface IProps {
  user?: ICustomer | null;
}
const Profile: React.FC<IProps> = ({ user }): JSX.Element => {
  const { handleUpdateProfile, loadingUpdateProfile, formData, handleForm,handleChangeImage,selectedImageFile,loadingUploadImage } =
    useProfileAction();

    const inputRefImage = useRef<HTMLInputElement>(null)

  return (
    <Box>
      <Card px={4} py={6}>
        <Text fontWeight="semibold" color="primary">
          Edit Your Profile
        </Text>
        <Box mt={8} display="flex" justifyContent="center" >
          <Box pos="relative">
          <Avatar src={selectedImageFile ? selectedImageFile : user?.profile_picture} size="xl" />
          <IconButton onClick={()=> {
            if(inputRefImage.current){
              inputRefImage.current.click()
            }
          }} bottom={0} right={-1} pos="absolute" size="sm"  rounded="full" bg="primary" color="white" aria-label="edit" icon={<FaPenToSquare size={17} />} />
          </Box>

          <Input
                onChange={handleChangeImage}
                name="image"
                display="none"
                type="file"
                ref={inputRefImage}
              />
        </Box>

        <Stack mt={10}>
          <Grid gridTemplateColumns="1fr 1fr" gap={{ base: 2, md: 6 }}>
            <FormControl>
              <FormLabel>Fullname</FormLabel>
              <Input
                onChange={handleForm}
                value={formData.fullname}
                placeholder="fullname"
                name="fullname"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                onChange={handleForm}
                value={formData.email}
                placeholder="Email"
                name="email"
              />
            </FormControl>
          </Grid>
          <FormControl>
            <FormLabel>Address</FormLabel>
            <Textarea
              onChange={handleForm}
              value={formData.address}
              resize="none"
              name="address"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Phone</FormLabel>
            <Input
              onChange={handleForm}
              value={formData.phone}
              w="full"
              name="phone"
            />
          </FormControl>

          <Button
            color="primary"
            variant="unstyled"
            w="fit-content"
            rightIcon={<RiLockPasswordFill />}
          >
            Change Password
          </Button>
          <Box display="flex" justifyContent="end">
            <Button
              isLoading={loadingUpdateProfile || loadingUploadImage}
              onClick={()=>handleUpdateProfile()}
              w="fit-content"
              bg="primary"
              color="white"
            >
              Update
            </Button>
          </Box>
        </Stack>
      </Card>
    </Box>
  );
};

export default Profile;
