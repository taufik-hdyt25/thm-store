import Layout from "@/components/Layout";
import Register from "@/containers/Register";
import { NextPage, NextPageContext } from "next";
import nookies from 'nookies'

const RegisterPage: NextPage = (): JSX.Element => {
  return (
    <Layout headTitle="Register">
      <Register />
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
      title: "Register"
    }
  }
}

export default RegisterPage;
