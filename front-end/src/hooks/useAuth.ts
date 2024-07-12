import { ICustomer } from "@/interface/customer.interfaces";
import { createContext, useContext } from "react";

export type authContextType = {
  user: ICustomer | null;
  token: string | null;
  getProfile: () => void;
};

const authContextDefaultValues: authContextType = {
  user: null,
  token: null,
  getProfile: () => {},
};

const AuthContext = createContext<authContextType>(authContextDefaultValues);

function useAuth() {
  return useContext(AuthContext);
}

export { useAuth, AuthContext };
