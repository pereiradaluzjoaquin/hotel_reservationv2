import CustomerModel from "@/app/models/Customer";
import { dbConnect } from "@/dbConnect";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  await dbConnect();
  try {
    const body = await request.json();

    const { name, lastname, email, phone } = body;

    const existingCustomer = await CustomerModel.findOne({ email });
    if (existingCustomer) {
      return NextResponse.json({ customer: existingCustomer }, { status: 400 });
    }

    const customer = await CustomerModel.create({
      name,
      lastname,
      email,
      phone,
    });
    return NextResponse.json({ customer }, { status: 201 });
  } catch (error) {
    console.log("Error creating customer", error);
    return NextResponse.json(
      { message: "Error creating customer" },
      { status: 500 }
    );
  }
};
