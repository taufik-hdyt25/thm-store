import { useAuth } from "@/hooks/useAuth";
import { useUploadImage } from "@/hooks/useUploadImage";
import { IUpdateCustomer } from "@/interface/customer.interfaces";
import { API } from "@/libs/API";
import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useState } from "react";

export const useProfileAction = () => {
  const { token, user,getProfile } = useAuth();
  const toast = useToast();
  const { mutate: updateProfile, isPending: loadingUpdateProfile } =
    useMutation({
      mutationFn: async (body: { body: IUpdateCustomer; id: number }) => {
        const response = await API.patch(`/customer/${body.id}`, body.body, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        return response.data
      },
      onSuccess: (res) => {
        console.log(res);
        toast({
            title: res.message,
            status: "success",
            position: "top"
        })
        getProfile()
      },
      onError: (err) => {
        console.log(err);
      },
    });

    const {uploadImage: handleUpdateProfile,handleChangeImage,loadingUploadImage,selectedImageFile} = useUploadImage({
        onSuccess: (res)=> {
            updateProfile({
              body: {
                address: formData.address,
                email: formData.email,
                phone: formData.phone,
                fullname: formData.fullname,
                profile_picture: res.url ? res.url : user?.profile_picture
              },
              id: user ? user?.customer_id : 0,
            });
        },
        onError: (err)=>{
            console.log(err);
            
        }
    })

  const [formData, setFormData] = useState({
    fullname: user? user.fullname : "",
    email: user? user.email : "",
    phone: user? user.phone : "",
    address: user? user.address : "",
  });

  const handleForm = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    if (value.trim() !== "") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  


  return {
    handleUpdateProfile,
    loadingUpdateProfile,
    handleForm,
    formData,

    handleChangeImage,
    loadingUploadImage,
    selectedImageFile,
    
    
    
  };
};
