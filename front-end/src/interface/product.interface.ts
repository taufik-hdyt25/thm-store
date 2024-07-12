import { IBrand } from "./brand.interfaces";

export interface IProducts {
  product_id: number;
  product_name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  createdAt: Date;
  brand: IBrand;
}

export interface ICreateProduct {
  name: string
  brand_id: number
  stock: number;
  price: number;
  description: string
  image:string
}
