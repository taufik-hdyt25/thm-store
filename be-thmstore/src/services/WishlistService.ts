import { Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Customer } from "../entity/Customer";
import { Product } from "../entity/Product";
import { Wishlist } from "../entity/Wichlist";

export default new (class BrandServices {
  private readonly ProductRepository: Repository<Product> =
    AppDataSource.getRepository(Product);
    private readonly CustomerRepository: Repository<Customer> =
    AppDataSource.getRepository(Customer);
    private readonly WishlistRepository: Repository<Wishlist> =
    AppDataSource.getRepository(Wishlist);

  async add(req: Request, res: Response): Promise<Response> {
    try {
      const {id} = req.params
      if(!id) return res.status(400).json({
        message: "Id is not valid"
      })
      const customer: Customer | null = await this.CustomerRepository.findOne({
        where: {
            customer_id: res.locals.auth.id
        }
      })
      const product: Product | null = await this.ProductRepository.findOne({
        where: {
          product_id: Number(id)
        }
      })
      if(!customer) return res.status(400).json({
        message: "Customer not found"
      })
      if(!product) {
        return res.status(404).json({
          message: "product not found"
        })
      }
      // tambahkan ke dalam cart
      const wishlistSelected: Wishlist | null = await this.WishlistRepository.findOne({
        where: {
          customer:{
            customer_id: customer.customer_id
          },
          product: {
            product_id: product.product_id
          }
        }
      })

      // check jika ada wishlist maka akan di hapus
      if(wishlistSelected){
        await this.WishlistRepository.delete(wishlistSelected.wishlist_id)
        return res.status(200).json({
            message: "Deleted wishlist"
        })
      }

      // check jika tidak ada cart
      const wishlist = new Wishlist()
      wishlist.customer = customer 
      wishlist.product = product
      await this.WishlistRepository.save(wishlist)
      return res.status(200).json({
        message: "Add to Wishlist",
        status: "Success"
      })

  
    } catch (error) {
      console.log(error);
      
      return res.status(500).json({
        message: error.message,
      });
    }
  }



})();
