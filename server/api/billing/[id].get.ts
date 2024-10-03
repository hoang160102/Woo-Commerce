import Billing from "~/models/user/Billing.model";
export default defineEventHandler(async (event: any) => {
    const { id } = event.context.params
    const billing = await Billing.findById(id)
    return billing 
})