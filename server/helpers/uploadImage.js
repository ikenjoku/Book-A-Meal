import cloudinary from 'cloudinary';
import cloudinaryStorage from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.cloud_api_key,
  api_secret: process.env.cloud_api_secret,
});

const storage = cloudinaryStorage({
  cloudinary,
  folder: 'bookameal/',
  allowedFormats: ['jpg', 'png', 'gif', 'jpeg'],
  filename: (req, file, cb) => {
    cb(undefined, new Date().toISOString() + file.originalname);
  },
});

const uploadImage = multer({ storage });

export default uploadImage;
