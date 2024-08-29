import { defineEventHandler, readBody } from 'h3';
import multer from 'multer';
import Category from '~/models/Category.model';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const upload = multer({ dest: 'public/categories' });

export default defineEventHandler(async (event) => {
  return new Promise((resolve, reject) => {
    upload.single('image')(event.req, event.res, async (err) => {
      if (err) {
        return reject(err);
      }

      const { name } = event.req.body;
      const file = event.req.file;

      if (!name || !file) {
        return reject(new Error('Name and file are required'));
      }

      const filePath = path.join('public/categories', `${uuidv4()}-${file.originalname}`);
      fs.renameSync(file.path, filePath);

      try {
        await Category.create({ name, image: filePath });
        resolve({ success: true });
      } catch (error) {
        reject(error);
      }
    });
  });
});
