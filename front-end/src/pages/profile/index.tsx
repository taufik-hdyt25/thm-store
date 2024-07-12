import Layout from "@/components/Layout";
import Profile from "@/containers/Profile";
import { useAuth } from "@/hooks/useAuth";
import { NextPage, NextPageContext } from "next";
import { useRouter } from "next/router";
import nookies from 'nookies'

const ProfilePage: NextPage = (): JSX.Element => {
  const {user,token} = useAuth()
  const router = useRouter()
  
  
    if(token && user?.email === "admin@gmail.com"){
       router.push("/admin")
    }
  
  return (
    <Layout isNavMobile headTitle="Home">
      <Profile />
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
      title: "Profile"
    }
  }
}

export default ProfilePage;
