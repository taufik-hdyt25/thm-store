import { IProducts } from "./product.interface";

export interface ICreateTransaction {
  status_payment: "SUCCESS" | "PENDING" | "CANCELED";
  status_pengiriman: "ON PROCCESS" | "ON DELIVERED" | "DELIVERED";
  quantity: number;
  subtotal: number;
  customer: number;
  product: number;
  product_name: string;
  price: number;
  product_id: number;
}

export interface ITransaction {
  transaction_id: number
  no_transaction: string
  customer: number
  transaction_date: string
  status_payment: string
  status_pengiriman: string
  quantity: number
  subtotal: number
  product: IProducts
  snap_token: string 
  redirect_url: string
}

