import { Request, Response } from "express";
import TransactionServices from "../services/TransactionServices";

export default new (class TransactionControllers {
  createTransaction(req: Request, res: Response) {
    TransactionServices.addTransaction(req,res)
  }
  paymentToken(req: Request, res: Response) {
    TransactionServices.payment(req,res)
  }
  callbackMidtrans(req: Request, res: Response) {
    TransactionServices.midtransCallback(req,res)
  }
  find(req: Request, res: Response) {
    TransactionServices.find(req,res)
  }
  update(req: Request, res: Response) {
    TransactionServices.update(req,res)
  }
})();
