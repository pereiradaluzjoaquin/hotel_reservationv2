import Customer from "@/app/models/Customer";
import ReservationModel from "@/app/models/Reservation";
import { dbConnect } from "@/dbConnect";
import { ObjectId } from "mongoose";
import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  { params }: { params: { id: ObjectId } }
) => {
  await dbConnect();

  try {
    Customer;
    const { id } = params;
    const reservation = await ReservationModel.findById(id).populate(
      "customerId"
    );
    return NextResponse.json(reservation);
  } catch (error) {
    console.log("Error fetching reservation", error);
    return NextResponse.json(
      { message: "Error fetching reservation" },
      { status: 500 }
    );
  }
};

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
