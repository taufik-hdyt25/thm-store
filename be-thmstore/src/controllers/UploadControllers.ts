import { Request, Response } from "express";
import UploadServices from "../services/UploadServices";

export default new (class CustomerControllers {
  uploadImage(req: Request, res: Response) {
    UploadServices.uploadToCloudinary(req,res)
  }
})();
