import multer from "multer";
import fs from "fs";
import cloudinary from "~/server/config/cloudinary";
import User from "~/models/user/User.model";
import formidable from "formidable"
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

export default defineEventHandler(async (event: any) => {
  const { id } = event.context.params;
    return new Promise((resolve, reject) => {
      upload.single("profile_img")(
        event.node.req,
        event.node.res,
        async (err: any) => {
          if (err) {
            return reject(err);
          }
          const file = event.node.req.file;
          try {
            const result = await cloudinary.uploader.upload(file.path, {
              folder: `users_avatar/${id}`,
              public_id: file.originalname,
            });
            const user = await User.findByIdAndUpdate(
              id,
              { profile_img: result.url },
              { new: true }
            );
            user?.save();
            fs.unlinkSync(file.path);
            resolve({ success: true, user });
          } catch (err) {
            if (file) {
              fs.unlinkSync(file.path);
            }
            reject(err);
          }
        }
      );
    });
});
