'use client';

import { useState } from "react";
import Image from "next/image";
import InternalPageLayout from "@/components/InternalPageLayout";
import { getBrandName } from "@/lib/settings";

// All achievement photos
const achievementPhotos = [
  "WhatsApp Image 2026-06-15 at 18.58.57.jpeg",
  "WhatsApp Image 2026-06-15 at 18.58.58 (1).jpeg",
  "WhatsApp Image 2026-06-15 at 18.58.58 (2).jpeg",
  "WhatsApp Image 2026-06-15 at 18.58.58.jpeg",
  "WhatsApp Image 2026-06-15 at 18.58.59 (1).jpeg",
  "WhatsApp Image 2026-06-15 at 18.58.59.jpeg",
  "WhatsApp Image 2026-06-15 at 18.59.00 (1).jpeg",
  "WhatsApp Image 2026-06-15 at 18.59.00 (2).jpeg",
  "WhatsApp Image 2026-06-15 at 18.59.00.jpeg",
  "WhatsApp Image 2026-06-15 at 18.59.01 (1).jpeg",
  "WhatsApp Image 2026-06-15 at 18.59.01.jpeg",
  "WhatsApp Image 2026-06-15 at 18.59.24.jpeg",
  "WhatsApp Image 2026-06-15 at 18.59.25.jpeg",
  "WhatsApp Image 2026-06-15 at 18.59.26 (1).jpeg",
  "WhatsApp Image 2026-06-15 at 18.59.26.jpeg",
  "WhatsApp Image 2026-06-15 at 18.59.27 (1).jpeg",
  "WhatsApp Image 2026-06-15 at 18.59.27.jpeg",
  "WhatsApp Image 2026-06-15 at 18.59.28 (1).jpeg",
  "WhatsApp Image 2026-06-15 at 18.59.28.jpeg",
  "WhatsApp Image 2026-06-15 at 18.59.29 (1).jpeg",
  "WhatsApp Image 2026-06-15 at 18.59.29 (2).jpeg",
  "WhatsApp Image 2026-06-15 at 18.59.29.jpeg",
  "WhatsApp Image 2026-06-15 at 18.59.30 (1).jpeg",
  "WhatsApp Image 2026-06-15 at 18.59.30 (2).jpeg",
  "WhatsApp Image 2026-06-15 at 18.59.30.jpeg",
  "WhatsApp Image 2026-06-15 at 18.59.31 (1).jpeg",
  "WhatsApp Image 2026-06-15 at 18.59.31.jpeg",
  "WhatsApp Image 2026-06-15 at 18.59.32 (1).jpeg",
  "WhatsApp Image 2026-06-15 at 18.59.32.jpeg",
  "WhatsApp Image 2026-06-15 at 18.59.33 (1).jpeg",
  "WhatsApp Image 2026-06-15 at 18.59.33.jpeg",
  "WhatsApp Image 2026-06-15 at 18.59.34 (1).jpeg",
  "WhatsApp Image 2026-06-15 at 18.59.34 (2).jpeg",
  "WhatsApp Image 2026-06-15 at 18.59.34.jpeg",
  "WhatsApp Image 2026-06-15 at 18.59.35.jpeg",
];

const achievements = [
  "Successful implementation of skill development and vocational training programmes across India",
  "Training in Fashion Designing, Interior Designing, Glass Designing, Leather Goods, Embroidery and more",
  "Special focus on training unemployed youth, especially from Scheduled Castes and Scheduled Tribes",
  "Active participation in trade fairs, exhibitions and vendor development programmes",
  "Entrepreneurship and self-employment support through practical industry-oriented training",
  "MDP-ESDP and government-linked awareness programmes for industrial development",
  "Growing network of Authorized Training Centers (ATC) and franchise partners",
  "Strong emphasis on employability, wage employment and self-employment outcomes",
];

export default function AchievementPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <InternalPageLayout
      title="Achievement"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "About Us", href: "/about-institute" },
        { label: "Achievement" },
      ]}
    >
      <div className="mx-auto w-full max-w-6xl space-y-8">
        <div className="max-w-4xl space-y-4 text-sm leading-8 text-slate-500 sm:text-base sm:leading-9">
          <h2 className="text-2xl font-extrabold text-slate-900">Our Achievements</h2>
          <p>
            Skillindia, undertaken by Sunil Group of Education Fashion and Technology Trust
            (SGEFTT), has steadily built a strong reputation in skill development, vocational education
            and industry-oriented training across India. Under the leadership of Dr. Sunil Kumar Jain,
            the institute has worked to bridge the gap between formal education and real employment
            needs in a rapidly changing economy.
          </p>
         
        </div>

        

        <div className="max-w-4xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-extrabold text-slate-900">Key Milestones</h3>
          <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-8 text-slate-600 sm:text-base">
            {achievements.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Achievement Photos Gallery */}
        <div className="w-full space-y-4">
         
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {achievementPhotos.map((photo, index) => (
              <div
                key={index}
                className="relative aspect-square overflow-hidden rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedImage(`/Achievement/${photo}`)}
              >
                <Image
                  src={`/Achievement/${photo}`}
                  alt={`Achievement ${index + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Image Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative w-full max-w-2xl">
              <Image
                src={selectedImage}
                alt="Achievement"
                width={800}
                height={600}
                className="rounded-lg w-full h-auto"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-slate-100"
              >
                <svg
                  className="w-6 h-6 text-slate-900"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}

        <div className="max-w-4xl space-y-4 text-sm leading-8 text-slate-500 sm:text-base sm:leading-9">
          <h3 className="text-xl font-extrabold text-slate-900">Courses & Training Areas</h3>
          <p>
            Over the years, Skillindia has expanded its training scope to cover Electrician programmes,
            Mobile Repairing, AC Repairing, Solar Panel Installation, Leather Stitching, Fashion
            Designing, Khadi Products, Interior Designing, Makeup Artist, Beautician, Computer Education,
            Leather Goods, Shoe Making, Jute Handicraft, Glass Designing, Glass Art and many other
            skill development courses.
          </p>
          <p>
            Through seminars, industrial grievance resolution support, government scheme awareness,
            vendor development and training &amp; awareness programmes, the institute continues to
            create new opportunities for learners to build independent and sustainable careers.
          </p>
        </div>
      </div>
    </InternalPageLayout>
  );
}
