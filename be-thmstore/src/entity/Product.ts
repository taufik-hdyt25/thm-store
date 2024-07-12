import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { Brand } from "./Brand";
import { Cart } from "./Cart";
import { Wishlist } from "./Wichlist";
import { Transaction } from "./Transaction";

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn()
  product_id: number;

  @Column()
  product_name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  stock: number;

  @Column()
  image: string;

  @CreateDateColumn({ type: "time with time zone" })
  createdAt: Date;

  @ManyToOne(() => Brand, (brand) => brand.product, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  @JoinColumn({name: "brand_id"})
  brand: Brand;

  @OneToMany(()=> Cart, (cart)=> cart.product)
  cart: Cart[]

  @OneToMany(()=> Wishlist, (wishlist)=> wishlist.product)
  wishlist: Wishlist[]

  @OneToMany(()=>Transaction, (transaction)=> transaction.product)
  transactions: Transaction[]

}
