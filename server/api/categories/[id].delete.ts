import Category from "~/models/Category.model";

export default defineEventHandler(async (event: any) => {
  const { id } = event.context.params;
  try {
    const deleteItem = await Category.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
  }
});
