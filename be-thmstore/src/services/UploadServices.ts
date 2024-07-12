import { Request, Response } from "express";
import { uploadToCloudinary } from "../utils/cloudinary";
import { deleteFile } from "../utils/fileHelper";


export default new class UploadServices{

    async uploadToCloudinary(req:Request,res: Response):Promise<Response>{
        try {
            let image : string | undefined = undefined
            if(req.file?.filename){
                image = await uploadToCloudinary(req.file)
                deleteFile(req.file.path)
            }
            return res.status(200).json({
                status: "success",
                message: "Upload image success",
                url: image
            })
         } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }

    }
}