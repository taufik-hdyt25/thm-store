import "dotenv/config";

import { v2 as cloudinary } from "cloudinary";

export const uploadToCloudinary = (
  file: Express.Multer.File
): Promise<string | undefined> => {


  cloudinary.config({
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    cloud_name: process.env.CLOUD_NAME,
  });
  return new Promise((resolve, reject) => {
    const opt = { folder: "thm-store" };
    cloudinary.uploader.upload(file.path, opt, function (err, res) {
      if (err) {
        return reject(err);
      }
      return resolve(res?.secure_url);
    });
  });
};
