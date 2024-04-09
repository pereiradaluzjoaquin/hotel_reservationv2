import ReservationModel from "@/app/models/Reservation";
import RoomModel from "@/app/models/Room";
import { dbConnect } from "@/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (request: NextRequest) => {
  await dbConnect();
  try {
    const checkIn = request.nextUrl.searchParams.get("checkIn");
    const checkOut = request.nextUrl.searchParams.get("checkOut");
    const roomType = request.nextUrl.searchParams.get("roomType");

    const existingReservations = await ReservationModel.find({
      $or: [
        { checkIn: { $lte: checkIn }, checkOut: { $gt: checkIn } },
        { checkIn: { $lt: checkOut }, checkOut: { $gte: checkOut } },
        { checkIn: { $gte: checkIn }, checkOut: { $lte: checkOut } },
      ],
    });

    const reserveRoomIds = existingReservations.map((reservation) =>
      reservation.roomId.toString()
    );

    const allRooms = await RoomModel.find({ room_type: roomType });

    const roomsWithStatus = allRooms.map((room) => {
      if (reserveRoomIds.includes(room._id.toString())) {
        return { ...room.toJSON(), status: "occupied" };
      }
      return { ...room.toJSON(), status: "available" };
    });

    return NextResponse.json(
      { rooms: roomsWithStatus, message: "Check available rooms" },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error checking rooms", error);
    return NextResponse.json(
      { message: "Error checking rooms" },
      { status: 500 }
    );
  }
};
