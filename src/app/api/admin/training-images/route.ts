import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { verifyAdmin } from "@/lib/auth";
import { GovTrainingImage } from "@/models/GovTrainingImage";

const ALLOWED_ORGS = ["CFTI", "PPDC", "MSME", "CDGI", "NSIC"];

export async function GET(req: NextRequest) {
  const admin = await verifyAdmin();
  if (!admin) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(req.url);
  const org = url.searchParams.get("org");

  if (!org || !ALLOWED_ORGS.includes(org)) {
    return NextResponse.json({ message: "Invalid organization" }, { status: 400 });
  }

  try {
    await connectDB();
    const images = await GovTrainingImage.find({ org })
      .sort({ sortOrder: 1, createdAt: -1 })
      .select("_id org sortOrder")
      .lean();

    return NextResponse.json({ files: images });
  } catch (error) {
    console.error("Error fetching training images:", error);
    return NextResponse.json({ message: "Failed to fetch images" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const admin = await verifyAdmin();
  if (!admin) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { org, image } = await req.json();

    if (!org || !ALLOWED_ORGS.includes(org)) {
      return NextResponse.json({ message: "Invalid organization" }, { status: 400 });
    }

    if (!image || !image.startsWith("data:image/")) {
      return NextResponse.json({ message: "Invalid image format" }, { status: 400 });
    }

    await connectDB();
    const count = await GovTrainingImage.countDocuments({ org });
    const newImage = await GovTrainingImage.create({
      org,
      image,
      sortOrder: count,
    });

    return NextResponse.json({
      message: "Image uploaded successfully",
      file: { _id: newImage._id, org: newImage.org, sortOrder: newImage.sortOrder },
    });
  } catch (error) {
    console.error("Error uploading training image:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const admin = await verifyAdmin();
  if (!admin) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    await connectDB();
    const deleted = await GovTrainingImage.findByIdAndDelete(id);

    if (deleted) {
      return NextResponse.json({ message: "Image deleted successfully" });
    } else {
      return NextResponse.json({ message: "Image not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error deleting training image:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
