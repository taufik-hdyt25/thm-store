import Layout from "@/components/Layout";
import Admin from "@/containers/Admin";
import { useAuth } from "@/hooks/useAuth";
import { NextPage, NextPageContext } from "next";
import { useRouter } from "next/router";
import nookies from "nookies";
import { useEffect } from "react";

const AdminPage: NextPage = (): JSX.Element => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user?.email !== "admin@gmail.com") {
      router.push("/");
    }
  }, [user]);

  return <Admin />;
};

export async function getServerSideProps(context: NextPageContext) {
  const cookies = nookies.get(context);
  if (!cookies.token) {
    return {
      redirect: {
        destination: "/login",
      },
    };
  }

  return {
    props: {
      title: "Admin",
    },
  };
}

export default AdminPage;
