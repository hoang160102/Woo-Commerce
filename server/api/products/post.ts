import Product from "~/models/Product.model";
import cloudinary from "~/server/config/cloudinary";
import multer from "multer";

const storage = multer.diskStorage({
  filename: function (req: any, file: any, cb: any) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
export default defineEventHandler(async (event: any) => {
  return new Promise((resolve, reject) => {
    upload.array("product_images", 10)(
      event.node.req,
      event.node.res,
      async (err: any) => {
        if (err) {
          return reject(err);
        }
        let { saleExpiration } = event.node.req.body
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
        const { files } = event.node.req
        const collectionArr = productCollection.split(',')
        const colorArr = JSON.parse(color)
        const sizeArr = JSON.parse(size)
        if (saleExpiration) {
          saleExpiration = new Date(saleExpiration)
        }
        try {
          const result = await Promise.all(
            files.map(async (file: any) => {
              const uploadResponse = await cloudinary.uploader.upload(file.path, {
                folder: `products/${name}`,
                public_id: file.originalname
              });
              return uploadResponse.url;
            })
          )
          const newProduct = new Product({
            name,
            category,
            productCollection: collectionArr,
            gender,
            quanity,
            price,
            sale,
            saleExpiration,
            color: colorArr,
            size: sizeArr,
            description,
            product_images: result
          })
          newProduct.save()
          resolve({ success: true, product: newProduct })
        }
        catch(err) {
          reject(err)
        }
      }
    );
  });
});
