import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { GalleryCategory } from "@/models/GalleryCategory";
import { GalleryPhoto } from "@/models/GalleryPhoto";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectDB();

    const categories = await GalleryCategory.find().sort({ sortOrder: 1, name: 1 }).lean();
    const rawPhotos = await GalleryPhoto.find()
      .sort({ sortOrder: 1, createdAt: -1 })
      .select("_id categoryId title type image sortOrder createdAt")
      .lean();

    const photos = rawPhotos.map(({ image, type, ...rest }) => ({
      ...rest,
      type:
        type === "video" || (typeof image === "string" && image.startsWith("data:video/"))
          ? "video"
          : "image",
    }));

    return NextResponse.json({ categories, photos });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json({ message }, { status: 500 });
  }
}
