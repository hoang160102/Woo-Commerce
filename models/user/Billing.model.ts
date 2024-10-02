import mongoose, { Model, Schema, Types} from "mongoose";
interface Billing {
    firstName: string,
    lastName: string,
    address1: string,
    address2: string,
    city: string,
    state: string,
    country: string,
    postal: string,
    phone: string
}

const billingSchema: Schema<Billing> = new mongoose.Schema({
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    address1: { type: String, default: '' },
    address2: { type: String, default: '' },
    city: { type: String, default: '' },
    state: { type: String, default: '' },
    country: { type: String, default: '' },
    postal: { type: String, default: '' },
    phone: { type: String, default: '' },
})

const Billing: Model<Billing> = mongoose.model<Billing>('Billing', billingSchema)
export default Billing