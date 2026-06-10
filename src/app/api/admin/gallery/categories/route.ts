import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { verifyAdmin } from "@/lib/auth";
import { GalleryCategory } from "@/models/GalleryCategory";
import { GalleryPhoto } from "@/models/GalleryPhoto";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const admin = await verifyAdmin();
    if (!admin) return NextResponse.json({ message: "Unauthorized." }, { status: 401 });

    await connectDB();
    const categories = await GalleryCategory.find().sort({ sortOrder: 1, name: 1 }).lean();
    return NextResponse.json({ categories });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const admin = await verifyAdmin();
    if (!admin) return NextResponse.json({ message: "Unauthorized." }, { status: 401 });

    const body = (await request.json()) as { name?: string };
    const name = body.name?.trim();
    if (!name) {
      return NextResponse.json({ message: "Category name is required." }, { status: 400 });
    }

    await connectDB();
    const existing = await GalleryCategory.findOne({ name });
    if (existing) {
      return NextResponse.json({ message: "Category already exists." }, { status: 409 });
    }

    const count = await GalleryCategory.countDocuments();
    const category = await GalleryCategory.create({ name, sortOrder: count });
    return NextResponse.json({ category }, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const admin = await verifyAdmin();
    if (!admin) return NextResponse.json({ message: "Unauthorized." }, { status: 401 });

    const { id } = (await request.json()) as { id?: string };
    if (!id) {
      return NextResponse.json({ message: "Category id is required." }, { status: 400 });
    }

    await connectDB();
    await GalleryPhoto.deleteMany({ categoryId: id });
    await GalleryCategory.findByIdAndDelete(id);
    return NextResponse.json({ message: "Category deleted." });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json({ message }, { status: 500 });
  }
}
