import Layout from "@/components/Layout";
import DetailProduct from "@/containers/Products/DetailProduct";
import { useAuth } from "@/hooks/useAuth";
import { Text } from "@chakra-ui/react";
import { NextPage, NextPageContext } from "next";
import { useRouter } from "next/router";
import nookies from "nookies"

const DetailProductPage: NextPage = (): JSX.Element => {
  const {user,token} = useAuth()
  const router = useRouter()
  
  
    if(token && user?.email === "admin@gmail.com"){
       router.push("/admin")
    }
  
  return (
    <Layout isNavMobile headTitle="Detail Product">
      <DetailProduct />
    </Layout>
  );
};

export async function getServerSideProps(context:NextPageContext){
  const cookies = nookies.get(context)
  if(!cookies.token){
    return {
      redirect: {
        destination: "/login"
      }
    }
  }

  return {
    props: {
      title: "Detail Product"
    }
  }
}

export default DetailProductPage;
