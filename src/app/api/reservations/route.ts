import Customer from "@/app/models/Customer";
import ReservationModel, { Reservation } from "@/app/models/Reservation";
import Room from "@/app/models/Room";
import { dbConnect } from "@/dbConnect";
import { NextResponse } from "next/server";

export const GET = async () => {
  await dbConnect();
  try {
    Room;
    Customer;
    const reservations = await ReservationModel.find()
      .populate("roomId")
      .populate("customerId")
      .sort({ checkIn: 1 });
    return NextResponse.json(reservations);
  } catch (error) {
    console.log("Error fetching reservations", error);
    return NextResponse.json(
      { message: "Error fetching reservations" },
      { status: 500 }
    );
  }
};

export const POST = async (request: Request) => {
  await dbConnect();
  try {
    const body = await request.json();

    const { checkIn, checkOut, roomId, customerId } = body as Reservation;

    await ReservationModel.create({
      checkIn,
      checkOut,
      roomId,
      customerId,
    });

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
