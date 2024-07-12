import { Repository } from "typeorm";
import { Brand } from "../entity/Brand";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";

export default new (class BrandServices {
  private readonly BrandRepository: Repository<Brand> =
    AppDataSource.getRepository(Brand);

  async addBrand(req: Request, res: Response): Promise<Response> {
    try {
      const { brand_name, brand_logos } = req.body;

      const checkBrand = await this.BrandRepository.findOne({
        where: {
          brand_name: brand_name,
        },
      });

      if (checkBrand)
        return res.status(400).json({
          message: "Brand name is already",
        });

      const brand = this.BrandRepository.create({
        brand_name: brand_name,
        logo_brand: brand_logos,
      });

      const createBrand = await this.BrandRepository.save(brand);
      return res.status(200).json({
        message: "Successfully added a brand",
        data: createBrand,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
  async findBrands(req: Request, res: Response): Promise<Response> {
    try {
      const brands = await this.BrandRepository.find();
      return res.status(200).json({
        data: brands,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  async findOne(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      const brand = await this.BrandRepository.findOne({
        where: {
          brand_id: id,
        },
      });
      return res.status(200).json({
        data: brand,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  async delete(req:Request,res:Response):Promise<Response>{
    try {
        const id = parseInt(req.params.id)
        const brand = this.BrandRepository.findOne({
            where: {
                brand_id: id
            }
        })

        if(!brand) return res.status(404).json({
            message: "Brand not found"
        })

        await this.BrandRepository.delete(id)
        return res.status(200).json({
            message: "Brand successfully deleted"
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message,
          });
    }
  }

  async update(req:Request,res:Response):Promise<Response>{
    try {
        const id = parseInt(req.params.id)
        const {brand_name, brand_logos} = req.body
        const brand = await this.BrandRepository.findOne({
            where: {
                brand_id: id
            }
        })

        if(!brand) return res.status(404).json({
            message: "Brand not found"
        })

        brand.brand_name = brand_name
        brand.logo_brand = brand_logos
        const update = await this.BrandRepository.save(brand)
        return res.status(200).json({
            data: update,
            message: "The brand has been successfully changed"
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message,
          });
    }
  }
})();
