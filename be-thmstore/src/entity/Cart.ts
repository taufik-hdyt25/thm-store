import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "./Customer";
import { Product } from "./Product";

@Entity("carts")
export class Cart {
    @PrimaryGeneratedColumn()
    cart_id: number

    @ManyToOne(()=> Customer, (customer)=> customer.cart)
    @JoinColumn({name: "id_customer"})
    customer: Customer

    @ManyToOne(()=> Product, (product)=> product.cart, {onDelete: "CASCADE", onUpdate: "CASCADE"})
    @JoinColumn({name: "id_product"})
    product: Product

    @Column( {default: 1})
    quantity: number
}