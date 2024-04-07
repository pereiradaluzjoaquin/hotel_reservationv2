import CustomerModel from "@/app/models/Customer";
import { dbConnect } from "@/dbConnect";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  try {
    const { id } = params;

    const customer = await CustomerModel.findById(id);
    console.log("customer", customer);
    if (!customer) {
      return NextResponse.json(
        { message: "Customer not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ customer }, { status: 200 });
  } catch (error) {
    console.log("Error fetching customer", error);
    return NextResponse.json(
      { message: "Error fetching customer" },
      { status: 500 }
    );
  }
}
