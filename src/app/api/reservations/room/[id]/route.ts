import Customer from "@/app/models/Customer";
import ReservationModel from "@/app/models/Reservation";
import { dbConnect } from "@/dbConnect";
import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  await dbConnect();
  try {
    Customer;
    const { id } = params;
    const reservation = await ReservationModel.findOne({ roomId: id }).populate(
      "customerId"
    );
    if (!reservation) {
      return NextResponse.json(
        { message: "Reservation not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ reservation }, { status: 200 });
  } catch (error) {
    console.log("Error fetching reservation", error);
    return NextResponse.json(
      { message: "Error fetching reservation" },
      { status: 500 }
    );
  }
};
