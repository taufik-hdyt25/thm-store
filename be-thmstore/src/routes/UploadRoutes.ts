import * as express from "express";
import CustomerControllers from "../controllers/CustomerControllers";
import { jwtAuth } from "../middlewares/jwtAuth";
import uploadImages from "../middlewares/uploadImages";
import UploadControllers from "../controllers/UploadControllers";

const router = express.Router();
router.post("/upload", jwtAuth,uploadImages.single("image"), UploadControllers.uploadImage);

export default router;
