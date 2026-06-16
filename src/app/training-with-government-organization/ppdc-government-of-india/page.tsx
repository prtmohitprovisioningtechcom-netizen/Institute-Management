import InternalPageLayout from "@/components/InternalPageLayout";
import { getBrandName } from "@/lib/settings";
import fs from "fs";
import path from "path";
import ImageGallery from "@/components/ImageGallery";

export default async function PpdcGovernmentOfIndiaPage() {
  const brandName = await getBrandName();
  
  const publicDir = path.join(process.cwd(), "public", "training", "PPDC");
  let images: string[] = [];
  try {
    images = fs.readdirSync(publicDir).filter(file => file.match(/\.(jpg|jpeg|png|gif)$/i));
  } catch (error) {
    console.error("Error reading directory:", error);
  }

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
