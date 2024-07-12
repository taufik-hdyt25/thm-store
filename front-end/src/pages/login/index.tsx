import Layout from "@/components/Layout";
import Login from "@/containers/Login";
import { NextPage, NextPageContext } from "next";
import nookies from 'nookies'

const LoginPage: NextPage = (): JSX.Element => {
  return (
    <Layout headTitle="Login">
      <Login />
    </Layout>
  );
};


export async function getServerSideProps(context:NextPageContext){
  const cookies = nookies.get(context)
  if(cookies.token){
    return {
      redirect: {
        destination: "/"
      }
    }
  }

  return {
    props: {
      title: "login"
    }
  }
}

export default LoginPage;
