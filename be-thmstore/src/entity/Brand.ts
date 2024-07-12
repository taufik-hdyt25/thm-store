import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToMany
  } from "typeorm";
import { Product } from "./Product";
  
  @Entity("brands")
  export class Brand {
    @PrimaryGeneratedColumn()
    brand_id: number;
  
    @Column()
    brand_name: string;
  
    @Column()
    logo_brand: string;

    @CreateDateColumn({ type: "time with time zone" })
    createdAt: Date;

    @OneToMany(() => Product, (product) => product.brand)
    product: Product[];

  }
  