import * as express from "express";
import CustomerControllers from "../controllers/CustomerControllers";
import {
  runvalidation,
  validatioRegister,
  validationLogin,
} from "../utils/validator";
import { jwtAuth } from "../middlewares/jwtAuth";

const router = express.Router();

// Login Register And Auth
router.post(
  "/register",
  validatioRegister,
  runvalidation,
  CustomerControllers.register
);
router.post(
  "/login",
  validationLogin,
  runvalidation,
  CustomerControllers.login
);

router.get("/user/me", jwtAuth, CustomerControllers.auth);

// customers
router.get("/customers", jwtAuth, CustomerControllers.find);
router.get("/customer/:id", jwtAuth, CustomerControllers.findOne);
router.patch("/customer/:id", jwtAuth, CustomerControllers.update);
router.delete("/customer/:id", jwtAuth, CustomerControllers.delete);

export default router;
