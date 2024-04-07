import RoomModel from "@/app/models/Room";
import { dbConnect } from "@/dbConnect";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  try {
    const { id } = params;

    const room = await RoomModel.findById(id);
    console.log("room", room);
    if (!room) {
      return NextResponse.json({ message: "Room not found" }, { status: 404 });
    }
    return NextResponse.json({ room }, { status: 200 });
  } catch (error) {
    console.log("Error fetching room", error);
    return NextResponse.json(
      { message: "Error fetching room" },
      { status: 500 }
    );
  }
}
