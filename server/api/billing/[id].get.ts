import Billing from "~/models/user/Billing.model";
export default defineEventHandler(async (event: any) => {
    const { id } = event.context.params
    console.log(id)
    const billing = await Billing.findById(id)
    return billing 
})