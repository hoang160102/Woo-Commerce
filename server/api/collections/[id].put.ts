import multer from "multer";
import Collection from "~/models/Collection.model";
import cloudinary from "~/server/config/cloudinary";
import fs from "fs";
import dateToString from "~/composables/useDate";
const upload = multer({ dest: "public/collections" });

export default defineEventHandler(async (event) => {
  return new Promise((resolve, reject) => {
    upload.single("image")(event.node.req, event.node.res, async (err) => {
      if (err) {
        return reject(err);
      }
      const { name } = event.node.req.body
      const { id } = event.context.params
      const file = event.node.req.file
      try {
        const collect: any = await Collection.findById(id)
        const uploadImg = await cloudinary.uploader.upload(file.path, {
            folder: 'categories',
            public_id: file.originalname
        })
        const collection = await Collection.findByIdAndUpdate(id, {
            name,
            image: uploadImg.url,
            updatedAt: dateToString()
        })
        const destroyImg = await cloudinary.uploader.destroy(collect.image)
        fs.unlinkSync(file.path);
        resolve({ success: true, collection})
      } catch(err) {
        if (file) {
            fs.unlinkSync(file.path);
          }
          reject(err);
      }
    });
  });
});
