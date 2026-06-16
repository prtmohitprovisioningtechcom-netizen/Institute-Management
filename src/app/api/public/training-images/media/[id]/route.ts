import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { GovTrainingImage } from "@/models/GovTrainingImage";
import { parseDataUrl } from "@/lib/galleryMedia";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function toResponseBody(buffer: Buffer, contentType: string): Blob {
  const bytes = Uint8Array.from(buffer);
  return new Blob([bytes], { type: contentType });
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    await connectDB();

    const item = await GovTrainingImage.findById(id).select("image").lean();
    if (!item?.image) {
      return NextResponse.json({ message: "Not found." }, { status: 404 });
    }

    const parsed = parseDataUrl(item.image);
    if (!parsed) {
      return NextResponse.json({ message: "Invalid media." }, { status: 400 });
    }

    const { contentType, buffer } = parsed;
    const total = buffer.length;

    return new NextResponse(toResponseBody(buffer, contentType), {
      headers: {
        "Content-Type": contentType,
        "Content-Length": String(total),
        "Accept-Ranges": "bytes",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json({ message }, { status: 500 });
  }
}
