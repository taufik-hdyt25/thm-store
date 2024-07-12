import * as express from "express";
import { jwtAuth } from "../middlewares/jwtAuth";
import ProductControllers from "../controllers/ProductControllers";

const router = express.Router();

// products
router.get("/products", jwtAuth, ProductControllers.find);
router.get("/product/:id", jwtAuth, ProductControllers.findOne);
router.post("/product", jwtAuth, ProductControllers.create);
router.delete("/product/:id", jwtAuth, ProductControllers.delete);
router.patch("/product/:id", jwtAuth, ProductControllers.update);

export default router;
