import RoomModel from "@/app/models/Room";
import { dbConnect } from "@/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  try {
    const rooms = await RoomModel.find();
    return NextResponse.json({ rooms }, { status: 200 });
  } catch (error) {
    console.log("Error fetching rooms", error);
    return NextResponse.json(
      { message: "Error fetching rooms" },
      { status: 500 }
    );
  }
}
