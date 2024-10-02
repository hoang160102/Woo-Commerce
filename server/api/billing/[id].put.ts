import Billing from "~/models/user/Billing.model";
export default defineEventHandler(async (event) => {
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
  } = body;
});
