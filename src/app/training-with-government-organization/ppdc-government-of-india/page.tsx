import InternalPageLayout from "@/components/InternalPageLayout";
import { getBrandName } from "@/lib/settings";
import fs from "fs";
import path from "path";
import ImageGallery from "@/components/ImageGallery";
import { connectDB } from "@/lib/mongodb";
import { GovTrainingImage } from "@/models/GovTrainingImage";

export const dynamic = "force-dynamic";

export default async function PpdcGovernmentOfIndiaPage() {
  const brandName = await getBrandName();
  
  // Fetch from DB
  let dbUrls: string[] = [];
  try {
    await connectDB();
    const dbImages = await GovTrainingImage.find({ org: "PPDC" })
      .sort({ sortOrder: 1, createdAt: -1 })
      .select("_id")
      .lean();
    dbUrls = dbImages.map(img => `/api/public/training-images/media/${img._id}`);
  } catch (error) {
    console.error("Error reading from DB:", error);
  }

  // Fallback / Combine with public folder local files
  const publicDir = path.join(process.cwd(), "public", "training", "PPDC");
  let localImages: string[] = [];
  try {
    if (fs.existsSync(publicDir)) {
      localImages = fs.readdirSync(publicDir)
        .filter(file => file.match(/\.(jpg|jpeg|png|gif)$/i))
        .map(file => `/training/PPDC/${file}`);
    }
  } catch (error) {
    console.error("Error reading directory:", error);
  }

  const images = [...dbUrls, ...localImages];

  return (
    <InternalPageLayout
      title="PPDC Government of India"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Training with Government Organization", href: "/training-with-government-organization" },
        { label: "PPDC Government of India" },
      ]}
    >
      <div className="mx-auto w-full max-w-5xl">
        <h2 className="text-3xl font-extrabold text-center text-slate-900 mb-10">PPDC Government of India</h2>
        <div className="mt-8">
          <ImageGallery images={images} basePath="/training/PPDC" />
        </div>
      </div>
    </InternalPageLayout>
  );
}
