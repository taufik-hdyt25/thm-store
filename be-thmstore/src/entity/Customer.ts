import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { Cart } from "./Cart";
import { Wishlist } from "./Wichlist";
import { Transaction } from "./Transaction";

@Entity("customers")
export class Customer {
  @PrimaryGeneratedColumn()
  customer_id: number;

  @Column()
  fullname: string;

  @Column()
  email: string;

  @Column({nullable: true,type: "varchar"})
  phone: string;

  @Column()
  password: string;

  @Column({nullable:true})
  profile_picture: string;

  @Column ({nullable: true})
  address: string;

  @CreateDateColumn({ type: "time with time zone" })
  createdAt: Date;

  @OneToMany(()=> Cart, (cart)=> cart.customer)
  cart: Cart[]

  @OneToMany(()=> Wishlist, (wishlist)=> wishlist.customer)
  wishlist: Wishlist[]

  @OneToMany(()=>Transaction, (transaction)=> transaction.customer)
  transactions: Transaction[]
}
