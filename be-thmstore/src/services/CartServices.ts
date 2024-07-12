import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Request, Response, response } from "express";
import { Product } from "../entity/Product";
import { Customer } from "../entity/Customer";
import { Cart } from "../entity/Cart";

export default new (class BrandServices {
  private readonly ProductRepository: Repository<Product> =
    AppDataSource.getRepository(Product);
    private readonly CustomerRepository: Repository<Customer> =
    AppDataSource.getRepository(Customer);
    private readonly CartRepository: Repository<Cart> =
    AppDataSource.getRepository(Cart);

  async addCart(req: Request, res: Response): Promise<Response> {
    try {
      const {id} = req.params
      const {quantity} = req.body
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
      const cartSelected: Cart | null = await this.CartRepository.findOne({
        where: {
          customer:{
            customer_id: customer.customer_id
          },
          product: {
            product_id: product.product_id
          }
        }
      })

      // check jika ada cart maka akan di hapus
      if(cartSelected){
        cartSelected.customer =customer
        cartSelected.product = product
        cartSelected.quantity = quantity
        await this.CartRepository.save(cartSelected)
        return res.status(200).json({
          message: "Update Cart",
          data: cartSelected
        })
      }

      // check jika tidak ada cart
      const cart = new Cart()
      cart.customer = customer 
      cart.product = product
      cart.quantity = quantity
      await this.CartRepository.save(cart)
      return res.status(200).json({
        message: "Add to cart",
        status: "success"
      })

  
    } catch (error) {
      console.log(error);
      
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  async deleteCart(req:Request,res:Response):Promise<Response>{
    try {
      const id = Number(req.params.id)
      const cartSelected = await this.CartRepository.findOne({
        where:{
          cart_id: id
        }
      })
      if(!cartSelected) return res.status(404).json({
        message: "Cart not found"
      })
      await this.CartRepository.delete(id)
      return res.status(200).json({message: "Deleted Cart"})
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: error.message,
      });
    }
  }


})();
