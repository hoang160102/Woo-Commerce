// server/api/upload.post.ts
import Category from '~/models/Category.model';
import formidable from 'formidable';
import { join } from 'path';
import fs from 'fs';

const uploadDir = join(process.cwd(), 'public/category');

export default defineEventHandler(async (event) => { 
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
  const form = formidable({ multiples: false, uploadDir, keepExtensions: true });

  return new Promise((resolve, reject) => {
    form.parse(event.node.req, async (err: any, fields: any, files: any) => {
      if (err) {
        reject(err);
        return;
      }
      const { name } = fields;
      const file = files.image; 
      if (!name || !file) {
        reject(new Error('Name and file are required.'));
        return;
      }
      try {
        // Construct the accessible path for the uploaded file
        const filePath = `/public/category/${file[0].newFilename}`;

        const fileDocument = new Category({
          name: name[0],
          image: filePath
        });
        await fileDocument.save();
        resolve('success');
      } catch (err) {
        reject(err);
      }
    });
  });
});

