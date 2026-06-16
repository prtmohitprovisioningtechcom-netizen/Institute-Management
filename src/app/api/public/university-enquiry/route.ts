import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { UniversityEnquiry } from "@/models/UniversityEnquiry";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, mobile, programType, message } = body;

    if (!name || !mobile || !programType) {
      return NextResponse.json(
        { message: "Missing required fields: Name, Mobile, and Program Type are required." },
        { status: 400 }
      );
    }

    await connectDB();
    const enquiry = await UniversityEnquiry.create({
      name,
      email,
      mobile,
      programType,
      message,
    });
    return NextResponse.json({ message: "Enquiry submitted successfully", enquiry }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ message }, { status: 500 });
  }
}
