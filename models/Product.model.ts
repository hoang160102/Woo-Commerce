import mongoose, { Model, Schema } from "~/plugins/mongoose";
import dateToString from "~/composables/useDate";

interface Product {
    name: string,
    product_images: string[]
    category: string[]
}