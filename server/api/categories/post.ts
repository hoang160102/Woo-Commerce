import cloudinary from '~/server/config/cloudinary';
import { defineEventHandler } from 'h3';
import Category from '~/models/Category.model';
import multer from 'multer'
import fs from 'fs'
  
const storage = multer.diskStorage({
  filename: function (req: any,file: any, cb: any) {
    cb(null, file.originalname)
  }
});
const upload = multer({storage: storage});
export default defineEventHandler(async (event) => {
  return new Promise((resolve, reject) => {
    upload.single('image')(event.node.req, event.node.res, async (err: any) => {
      if (err) {
        return reject(err);
      }

      const { name } = event.node.req.body;
      const file = event.node.req.file;

      if (!name || !file) {
        return reject(new Error('Name and file are required'));
      }
      try {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: 'categories',
          public_id: file.originalname
        });
        const newCate = new Category({
          name,
          image: result.url
        })
        newCate.save()
        resolve({ success: true, category: newCate });
      } catch (error) {
        fs.unlinkSync(file.path);
        reject(error);
      }
    });
  });
});