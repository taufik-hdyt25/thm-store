import Layout from "@/components/Layout";
import Cart from "@/containers/Cart";
import { useAuth } from "@/hooks/useAuth";
import { NextPage, NextPageContext } from "next";
import { useRouter } from "next/router";
import nookies from "nookies"

const CartPage: NextPage = (): JSX.Element => {
  const {user,token} = useAuth()
  const router = useRouter()
  
  
    if(token && user?.email === "admin@gmail.com"){
       router.push("/admin")
    }
  
  return (
    <Layout isNavMobile headTitle="Cart">
      <Cart />
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
      title: "Cart"
    }
  }
}

export default CartPage;
