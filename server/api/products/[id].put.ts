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

        const { id } = event.context.params;
        const { files } = event.node.req;
        let { saleExpiration } = event.node.req.body;
        if (saleExpiration) {
          saleExpiration = new Date(saleExpiration);
        }
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
        const colorArr = JSON.parse(color);
        const sizeArr = JSON.parse(size);

        try {
          let productData: any = {
            name,
            category,
            productCollection,
            gender,
            quanity,
            price,
            sale,
            color: colorArr,
            size: sizeArr,
            description,
            updatedAt: dateToString(),
          };

          if (files.length > 0) {
            const result = await Promise.all(
              files.map(async (file: any) => {
                const uploadResponse = await cloudinary.uploader.upload(file.path, {
                  folder: `products/${name}`,
                  public_id: file.originalname,
                });
                return uploadResponse.url;
              })
            );
            productData.product_images = result;
          }

          const product = await Product.findByIdAndUpdate(id, productData, {
            new: true,
            lean: true, // This ensures we get a plain JavaScript object
          });

          resolve({ success: true, product });
        } catch (err) {
          console.log(err);
          reject({ success: false, error: err });
        }
      }
    );
  });
});
