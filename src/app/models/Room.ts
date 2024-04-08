import mongoose, { ObjectId, Schema } from "mongoose";

export type Room = {
  _id: ObjectId;
  room_number: number;
  room_type: string;
  price_per_night: number;
  status: "available" | "" | "occupied";
  description: string;
};

const RoomSchema = new Schema<Room>({
  room_number: { type: Number, required: true },
  room_type: { type: String, required: true },
  price_per_night: { type: Number, required: true },
  description: { type: String, required: false },
});

// Crear el modelo basado en el esquema de la habitación
const RoomModel = mongoose.models.Room || mongoose.model("Room", RoomSchema);

export default RoomModel;
