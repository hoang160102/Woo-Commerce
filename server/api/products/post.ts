import Product from "~/models/Product.model";
import cloudinary from "~/server/config/cloudinary";
import multer from "multer";

const storage = multer.diskStorage({
  filename: function (req: any, file: any, cb: any) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage })
export default defineEventHandler(async (event: any) => {
    
})