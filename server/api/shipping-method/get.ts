import ShippingMethod from "~/models/ShippingMethod.model";
export default defineEventHandler(async (event: any) => {
    const shippingMethods = await ShippingMethod.find()
    return shippingMethods
})