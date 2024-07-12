import dynamic from "next/dynamic";

export const Sidebar = dynamic(import("./Sidebar"));
export const Users = dynamic(import("./Users"));
export const Orders = dynamic(import("./Orders"));
export const AlertConfirm = dynamic(import("./AlertDialog"));
export const Brands = dynamic(import("./Brands"));
export const ModalAddProduct = dynamic(import("./ModalAddProduct"));
export const Dashboard = dynamic(import("./Dashboard"));
