import crypto from "crypto";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const fileHash = crypto.randomBytes(10).toString("hex");
    const fileName = `${fileHash}-${file.originalname.split(".")[0]}`;

    return {
      folder: "avatar",
      public_id: fileName,
    };
  },
});

const upload = multer({ storage: storage });

export default upload;
