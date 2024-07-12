import * as express from "express";
import WishlistControllers from "../controllers/WishlistControllers";
import { jwtAuth } from "../middlewares/jwtAuth";


const router = express.Router();

// CART
router.post("/product/:id/wishlist", jwtAuth, WishlistControllers.addToWishlist);
// router.delete("/cart/:id", jwtAuth, );

export default router;
