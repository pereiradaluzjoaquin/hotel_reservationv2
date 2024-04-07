import mongoose, { ObjectId, Schema } from "mongoose";

export type Customer = {
  _id: ObjectId;
  name: string;
  lastname: string;
  email: string;
  phone: string;
};

const CustomerSchema = new Schema<Customer>({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
});

const CustomerModel =
  mongoose.models.Customer || mongoose.model("Customer", CustomerSchema);

export default CustomerModel;
