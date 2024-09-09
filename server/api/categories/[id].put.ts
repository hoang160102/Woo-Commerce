import { defineEventHandler } from "h3";
import multer from "multer";
import Category from "~/models/Category.model";
import cloudinary from "~/server/config/cloudinary";
import fs from "fs";
import dateToString from "~/composables/useDate";
const upload = multer({ dest: "public/categories" });

export default defineEventHandler(async (event) => {
  return new Promise((resolve, reject) => {
    upload.single("image")(event.node.req, event.node.res, async (err) => {
      if (err) {
        return reject(err);
      }
      const { name } = event.node.req.body;
      const { id } = event.context.params;
      const file = event.node.req.file;
      try {
        const cate = await Category.findById(id);
        const uploadImg = await cloudinary.uploader.upload(file.path, {
          folder: "categories",
          public_id: file.originalname,
        });
        const category = await Category.findByIdAndUpdate(id, {
          name,
          image: uploadImg.url,
          updatedAt: dateToString()
        });
        const destroyImg = await cloudinary.uploader.destroy(cate.image);
        fs.unlinkSync(file.path);
        resolve({ success: true, category });
      } catch (error) {
        if (file) {
          fs.unlinkSync(file.path);
        }
        reject(error);
      }
    });
  });
});
