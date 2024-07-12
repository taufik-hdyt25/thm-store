import * as express from "express";
import { jwtAuth } from "../middlewares/jwtAuth";
import TransactionControllers from "../controllers/TransactionControllers";

const router = express.Router();

// products
router.post("/transaction", jwtAuth, TransactionControllers.createTransaction);
router.get("/transactions", jwtAuth, TransactionControllers.find);
router.patch("/transaction/:noTransaction", jwtAuth, TransactionControllers.update);
router.post("/payment", jwtAuth, TransactionControllers.paymentToken);
router.post("/paymentNotification", TransactionControllers.callbackMidtrans);

export default router;
