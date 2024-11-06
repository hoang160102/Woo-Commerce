import ShippingMethod from "~/models/ShippingMethod.model";
export default defineEventHandler(async (event: any) => {
  const body = await readBody(event);
  const { name, price } = body;
  try {
    const newShippingMethod = new ShippingMethod({
      name,
      price,
    });
    await newShippingMethod.save()
    return { success: true, newShippingMethod}
  } catch (err) {
    console.log(err);
  }
});
