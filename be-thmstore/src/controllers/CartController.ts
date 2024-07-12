import { Request, Response } from "express";
import CartServices from "../services/CartServices";

export default new (class CartControllers {
  addToCart(req: Request, res: Response) {
    CartServices.addCart(req, res);
  }
  deleteCart(req: Request, res: Response) {
    CartServices.deleteCart(req, res);
  }
})();
