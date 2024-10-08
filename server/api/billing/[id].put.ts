import Billing from "~/models/user/Billing.model";
export default defineEventHandler(async (event: any) => {
  const body = await readBody(event);
  console.log(body);
  const {
    firstName,
    lastName,
    address1,
    address2,
    city,
    state,
    country,
    postal,
    phone,
  } = body;
  const { id } = event.context.params;
  const updateBill = await Billing.findByIdAndUpdate(id, {
    firstName,
    lastName,
    address1,
    address2,
    city,
    state,
    country,
    postal,
    phone,
  });
  return updateBill;
});
