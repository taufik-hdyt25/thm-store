import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "./Customer";
import { Product } from "./Product";

@Entity("wishlist")
export class Wishlist {
    @PrimaryGeneratedColumn()
    wishlist_id: number

    @ManyToOne(()=> Customer, (customer)=> customer.wishlist)
    @JoinColumn({name: "customer_id"})
    customer: Customer

    @ManyToOne(()=> Product, (product)=> product.wishlist)
    @JoinColumn({name: "product_id"})
    product : Product
}
