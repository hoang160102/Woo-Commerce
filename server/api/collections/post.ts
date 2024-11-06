import cloudinary from "~/server/config/cloudinary";
import Collection from "~/models/Collection.model";
import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
  filename: function (req: any, file: any, cb: any) {
    cb(null, file.originalname);
  },
});
const upload = multer({storage: storage});
export default defineEventHandler(async (event: any) => {
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
            folder: 'collections',
            public_id: file.originalname
          });
          const newCollect = new Collection({
            name,
            image: result.url
          })
          newCollect.save()
          resolve({ success: true, collection: newCollect });
        } catch (error) {
          fs.unlinkSync(file.path);
          reject(error);
        }
      });
    });
  });
