import ReservationModel, { Reservation } from "@/app/models/Reservation";
import RoomModel from "@/app/models/Room";
import { dbConnect } from "@/dbConnect";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  await dbConnect();
  try {
    const body = await request.json();

    const { checkIn, checkOut, roomId, customerId } = body as Reservation;

    console.log("llamando api reservations");

    await ReservationModel.create({
      checkIn,
      checkOut,
      roomId,
      customerId,
    });

    console.log("room id", roomId);

    return NextResponse.json(
      { message: "Reservation created" },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error creating reservation", error);
    return NextResponse.json(
      { message: "Error creating reservation" },
      { status: 500 }
    );
  }
};
