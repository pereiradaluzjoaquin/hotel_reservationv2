import ReservationModel from "@/app/models/Reservation";
import { dbConnect } from "@/dbConnect";
import { ObjectId } from "mongoose";
import { NextResponse } from "next/server";

export const DELETE = async (
  request: Request,
  { params }: { params: { id: ObjectId } }
) => {
  await dbConnect();

  try {
    const { id } = params;
    await ReservationModel.findByIdAndDelete(id);
    return NextResponse.json(
      { message: "Reservation deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error deleting reservation", error);
    return NextResponse.json(
      { message: "Error deleting reservation" },
      { status: 500 }
    );
  }
};
