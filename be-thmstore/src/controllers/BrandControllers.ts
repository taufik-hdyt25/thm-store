import { Request, Response } from "express";
import BrandServices from "../services/BrandServices";

export default new (class BrandControllers {
  addBrand(req: Request, res: Response) {
    BrandServices.addBrand(req,res)
  }
  findBrands(req: Request, res: Response) {
    BrandServices.findBrands(req,res)
  }
  findOne(req: Request, res: Response) {
    BrandServices.findOne(req,res)
  }
  delete(req: Request, res: Response) {
    BrandServices.delete(req,res)
  }

  update(req: Request, res: Response) {
    BrandServices.update(req,res)
  }

})();
