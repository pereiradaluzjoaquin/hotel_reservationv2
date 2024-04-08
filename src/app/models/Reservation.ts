import mongoose, { ObjectId, Schema } from "mongoose";
import { Room } from "./Room";
import { Customer } from "./Customer";

export type Reservation = {
  _id: ObjectId;
  checkIn: Date;
  checkOut: Date;
  roomId: Room;
  customerId: Customer;
};

const ReservationSchema = new Schema<Reservation>({
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  roomId: { type: Schema.Types.ObjectId, ref: "Room", required: true },
  customerId: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
});

const ReservationModel =
  mongoose.models.Reservation ||
  mongoose.model("Reservation", ReservationSchema);

export default ReservationModel;
