import { AuthContext, authContextType } from "@/hooks/useAuth";
import { ICustomer } from "@/interface/customer.interfaces";
import callApi from "@/utils/fetcher/fetcher";
import { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
  token: string;
};

export function AuthProvider({ children, token }: Props) {
  const [user, setUser] = useState<ICustomer | null>(null);
  

  const getProfile = () => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    callApi({
      ctx: {},
      method: "GET",
      params: {},
      uri: "/user/me",
    })
      .then((res) =>{
        setUser(res.data.data)
      })
      .catch((err) => console.log(err));
  };

  const value: authContextType = {
    user: user,
    token: token,
    getProfile: getProfile,
  };
  
  

  useEffect(() => {
    if (token) {
      getProfile();
    }
  }, [token]);

  

  return (
    <>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </>
  );
}
