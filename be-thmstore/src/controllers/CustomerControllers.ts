import { Request, Response } from "express";
import CustomerServices from "../services/CustomerServices";
import AuthServices from "../services/AuthServices";

export default new (class CustomerControllers {
  register(req: Request, res: Response) {
    AuthServices.register(req, res);
  }

  login(req: Request, res: Response) {
    AuthServices.login(req, res);
  }
  auth(req: Request, res: Response) {
    AuthServices.profileMe(req, res);
  }

  // ==========================
  find(req: Request, res: Response) {
    CustomerServices.find(req, res);
  }
  findOne(req: Request, res: Response) {
    CustomerServices.findOne(req, res);
  }
  update(req: Request, res: Response) {
    CustomerServices.update(req, res);
  }
  delete(req: Request, res: Response) {
    CustomerServices.delete(req, res);
  }
})();
