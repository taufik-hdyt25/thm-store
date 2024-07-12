import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { validationSchemaLogin } from "@/utils/validation";
import { useMutation } from "@tanstack/react-query";
import { Ilogin } from "@/interface/customer.interfaces";
import { API} from "@/libs/API";
import axios from "axios";
import { setCookie } from 'nookies';

export const useLoginAction = () => {
  const toast = useToast();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: () => {
      loginCustomer({
        email: formik.values.email,
        password: formik.values.password,
      });
    },
    validationSchema: validationSchemaLogin,
  });

  const handleForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    formik.setFieldValue(target.name, target.value);
  };

  const { mutate: loginCustomer ,isPending:loadingLogin} = useMutation({
    mutationFn: async (body: Ilogin) => {
      const response = await API.post("/login", body);
      return response.data
    },

    onSuccess: (res) => {
      toast({
        title: res.message,
        status:"success",
        position: "top"
      })
      setCookie(null,'token', res.token, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });
      router.push("/")    
    },
    onError: (err) => {
      console.log(err);
      
      if (axios.isAxiosError(err)) {
        toast({
          title: err.response?.data.message,
          status: "error",
          position: "top"
        })
      }
    },
  });

  return {
    handleForm,
    formik,
    loadingLogin
  };
};
