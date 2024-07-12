import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { ICreateCustomer } from "@/interface/customer.interfaces";
import { API } from "@/libs/API";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { validationSchemaRegister } from "@/utils/validation";

export const useRegisterAction = () => {
  const toast = useToast();
  const router = useRouter();
  const { mutate: createCustomer, isPending: loadingCreateCustomer } =
    useMutation({
      mutationFn: async (body: ICreateCustomer) => {
        const response = await API.post("/register", body);
        return response.data
      },
      onSuccess: (res) => {
        toast({
          title: res.message,
          position: "top",
          status: "success",
        });
        router.push("/login");
      },
      onError: (err) => {
        if (axios.isAxiosError(err)) {
          toast({
            title: err.response?.data.message,
            position: "top",
            status: "error",
          });
        }
      },
    });

  function handleSubmit() {
    createCustomer({
      fullname: formik.values.fullname,
      email: formik.values.email,
      password: formik.values.password,
    });
  }

  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
    },
    onSubmit: handleSubmit,
    validationSchema: validationSchemaRegister,
  });

  const handleForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    formik.setFieldValue(target.name, target.value);
  };

  return {
    handleForm,
    formik,
    loadingCreateCustomer,
  };
};
