import { Request, Response } from "express";
import CartServices from "../services/CartServices";
import WishlistService from "../services/WishlistService";

export default new (class CartControllers {
  addToWishlist(req: Request, res: Response) {
    WishlistService.add(req,res)
  }

})();
