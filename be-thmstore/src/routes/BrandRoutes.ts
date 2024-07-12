import * as express from "express";
import { jwtAuth } from "../middlewares/jwtAuth";
import BrandControllers from "../controllers/BrandControllers";

const router = express.Router();

// brands
router.post("/brand", jwtAuth, BrandControllers.addBrand);
router.get("/brands", jwtAuth, BrandControllers.findBrands);
router.get("/brand/:id", jwtAuth, BrandControllers.findOne);
router.patch("/brand/:id", jwtAuth, BrandControllers.update);
router.delete("/brand/:id", jwtAuth, BrandControllers.delete);

export default router;
