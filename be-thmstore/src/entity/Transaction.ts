import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "./Customer";
import { Product } from "./Product";
import { generateRandomNumber } from "../utils/randomNumber";

@Entity("transactions")
export class Transaction {
    @PrimaryGeneratedColumn()
    transaction_id: number
    @Column({nullable:true})
    no_transaction: string = `TRX-${generateRandomNumber()}`
    @CreateDateColumn({ type: "time with time zone" })
    transaction_date: Date;
    @Column()
    status_payment: string
    @Column()
    status_pengiriman: string
    @Column()
    quantity: number
    @Column()
    subtotal:number
    @ManyToOne(()=> Customer, (customer)=> customer.transactions)
    @JoinColumn({name: "customer_id"})
    customer: Customer
    @ManyToOne(()=> Product, (product)=> product.transactions)
    @JoinColumn({name: "product_id"})
    product: Product
    @Column({nullable:true})
    snap_token: string
    @Column({nullable:true})
    redirect_url: string
}