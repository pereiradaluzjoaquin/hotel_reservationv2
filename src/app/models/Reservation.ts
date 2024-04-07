import mongoose, { ObjectId, Schema } from "mongoose";

export type Reservation = {
  _id: ObjectId;
  checkIn: Date;
  checkOut: Date;
  roomId: ObjectId;
  customerId: ObjectId;
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
