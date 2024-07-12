import { Request, Response } from "express";
import { ILike, Repository } from "typeorm";
import { Product } from "../entity/Product";
import { AppDataSource } from "../data-source";
import { Brand } from "../entity/Brand";

export default new (class ProductServices {
  private readonly ProductRepository: Repository<Product> =
    AppDataSource.getRepository(Product);
    private readonly BrandRepository: Repository<Brand> =
    AppDataSource.getRepository(Brand);

  async find(req: Request, res: Response): Promise<Response> {
    try {
      const {search= ""} = req.query
      const products = await this.ProductRepository.find({
        where: [
          {product_name:  ILike(`%${search}%`)},
          {brand: {brand_name:   ILike(`%${search}%`)}},
        ]
        ,
        order: {
          product_name: "DESC"
        },
        relations: ["brand"]
      });

      return res.status(200).json({
        data: products,
        message: "Success get all products",
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  async findOne(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id)
      const products = await this.ProductRepository.findOne({
        where: {
          product_id: id
        },
        relations: ["brand"]
      })
      return res.status(200).json({
        data: products,
        message: "Success get product",
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const {name,price,stock,brand_id,description,image} = req.body
  
      const brand = await this.BrandRepository.findOne({
        where: {
          brand_id: brand_id
        }
      })

      if(!brand) return res.status(404).json({
        message: "Brand not found"
      })      


      const product = this.ProductRepository.create({
        product_name: name,
        brand: brand_id,
        stock: stock,
        price: price,
        description: description,
        image: image,
      })



      const createProduct = await this.ProductRepository.save(product)
      return res.status(200).json({
        message: "Success add product",
        data: createProduct
      })
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {

      const id = Number(req.params.id)
      const product = await this.ProductRepository.findOne({
        where: {
          product_id: id
        }
      })
      if(!product)return res.status(404).json({
        message: "Product not found"
      })

      await this.ProductRepository.delete(id)
      
      return res.status(200).json({
        message: "Success delete product",
        status: true
      })

    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id)
      const {name,price,stock,brand_id,description,image} = req.body
  
      const brand = await this.BrandRepository.findOne({
        where: {
          brand_id: brand_id
        }
      })

      if(!brand) return res.status(404).json({
        message: "Brand not found"
      })    

      const product = await this.ProductRepository.findOne({
        where: {
          product_id: id
        }
      })
      if(!product) return res.status(404).json({
        message: "Product not found"
      })

      product.product_name = name
      product.stock = stock
      product.description = description
      product.price = price
      product.image = image

      await this.ProductRepository.save(product)
      return res.status(200).json({
        message: "Product Update Success",
        status: true
      })



     
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
})();
