import * as express from "express";
import { jwtAuth } from "../middlewares/jwtAuth";
import CartController from "../controllers/CartController";


const router = express.Router();

// CART
router.post("/product/:id/cart", jwtAuth, CartController.addToCart);
router.delete("/cart/:id", jwtAuth, CartController.deleteCart);

export default router;
