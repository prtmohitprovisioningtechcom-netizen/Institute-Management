import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { OUR_CERTIFICATES_SETTINGS_KEY, parseOurCertificatesJson } from "@/lib/ourCertificates";
import { Settings } from "@/models/Settings";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectDB();
    const row = await Settings.findOne({ key: OUR_CERTIFICATES_SETTINGS_KEY }).lean();
    const certificates = parseOurCertificatesJson(row?.value);
    return NextResponse.json(certificates);
  } catch {
    return NextResponse.json({ message: "Internal server error." }, { status: 500 });
  }
}
