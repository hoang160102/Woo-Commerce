import Product from "~/models/Product.model";
import multer from "multer";
import cloudinary from "~/server/config/cloudinary";
import dateToString from "~/composables/useDate";

const storage = multer.diskStorage({
  filename: function (req: any, file: any, cb: any) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
export default defineEventHandler(async (event: any) => {
  return new Promise((resolve, reject) => {
    upload.array("product_images", 20)(
      event.node.req,
      event.node.res,
      async (err: any) => {
        if (err) {
          return reject(err);
        }
        const nameParam = event.context.params.name;
        console.log(event.node.req.body);
        let { saleExpiration } = event.node.req.body;
        const {
          name,
          category,
          productCollection,
          gender,
          quanity,
          price,
          sale,
          color,
          size,
          description,
        } = event.node.req.body;
        // const product = await Product.findOneAndUpdate({ name: nameParam });
        // console.log(product)
        // resolve({success: true, product})
      }
    );
  });
});
