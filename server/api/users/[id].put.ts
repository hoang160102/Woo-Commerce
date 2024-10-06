import multer from "multer";
import fs from "fs";
import cloudinary from "~/server/config/cloudinary";
import User from "~/models/user/User.model";
import bcrypt from "bcrypt";

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

export default defineEventHandler(async (event: any) => {
  const { id } = event.context.params;
  const findUser: any = await User.findById(id);
  // const body: any = await readBody(event);

  return new Promise((resolve, reject) => {
    upload.single("profile_img")(
      event.node.req,
      event.node.res,
      async (err: any) => {
        if (err) {
          return reject(err);
        }
        const file = event.node.req.file;
        const body = event.node.req.body
        let updateData: Record<string, any> = {};
        try {
          if (file) {
            const result = await cloudinary.uploader.upload(file.path, {
              folder: `users_avatar/${id}`,
              public_id: file.originalname,
            });
            updateData.profile_img = result.url;
            fs.unlinkSync(file.path);
          }
          if (body.name) {
            updateData = { ...updateData, ...body };
            console.log(updateData)
          }

          if (body.oldPassword) {
            const isValidOldPassword = await bcrypt.compare(
              body.oldPassword,
              findUser?.password
            );
            
            if (!isValidOldPassword) {
              return resolve({ success: false, message: "Incorrect old password" });
            }

            // Hash the new password and add it to updateData
            updateData.password = await bcrypt.hash(body.newPassword, 10);
            return resolve({ success: true, message: 'Updated password successfully'})
          }

          const user = await User.findByIdAndUpdate(id, updateData, { new: true });

          if (!user) {
            return reject({ success: false, message: "User not found" });
          }

          await user.save();
          resolve({ success: true, user });
        } catch (error) {
          if (file) fs.unlinkSync(file.path);
          console.log(error)
          reject({ success: false, message: "Update failed", error });
        }
      }
    );
  });
});
