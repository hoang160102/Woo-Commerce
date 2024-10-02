import mongoose, { Model, Schema, Types} from "mongoose"; 
interface Shipping {
    firstName: string,
    lastName: string,
    phone: string,
    address1: string,
    address2: string,
    company: string,
    state: string,
    postal: string,
    city: string,
    country: string
    email: string
}

const shippingSchema: Schema<Shipping> = new mongoose.Schema({
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    phone: { type: String, default: '' },
    address1: { type: String, default: '' },
    address2: { type: String, default: '' },
    company: { type: String, default: '' },
    city: { type: String, default: '' },
    state: { type: String, default: '' },
    country: { type: String, default: '' },
    postal: { type: String, default: '' },
    email: { type: String, default: '' }
})

const Shipping: Model<Shipping> = mongoose.model<Shipping>('Shipping', shippingSchema)
export default Shipping