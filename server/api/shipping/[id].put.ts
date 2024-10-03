import Shipping from "~/models/user/Shipping.model";
export default defineEventHandler(async (event: any) => {
  const body = await readBody(event);
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
    company,
    email,
  } = body;
  const { id } = event.context.params;
  const updateShip = await Shipping.findByIdAndUpdate(id, {
    firstName,
    lastName,
    address1,
    address2,
    city,
    state,
    country,
    postal,
    phone,
    company, email
  });
  return updateShip
});
