"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

// PDF view of four job Excel images
const jobExcelImages = [
  "/jobexcel1.png",
  "/jobexcel2.png",
  "/jobexcel3.png",
  "/jobexcel4.png",
];

export default function JobsSupportPdfView() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section className="min-h-screen bg-gray-50 text-gray-900 flex flex-col items-center py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Job Excel Documents (PDF View)</h1>
      <div className="w-full max-w-4xl space-y-8">
        {jobExcelImages.map((src) => (
          <div key={src} className="relative rounded-md overflow-hidden shadow-md cursor-pointer" onClick={() => setSelectedImage(src)}>
            <Image src={src} alt="Job Excel page" width={1200} height={1600} className="w-full h-auto object-contain" priority />
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50" onClick={() => setSelectedImage(null)}>
          <div className="relative max-w-3xl max-h-screen" onClick={(e) => e.stopPropagation()}>
            <button className="absolute top-2 right-2 text-white" onClick={() => setSelectedImage(null)}>
              <X className="h-6 w-6" />
            </button>
            <Image src={selectedImage} alt="Enlarged page" fill className="object-contain" />
          </div>
        </div>
      )}
    </section>
  );
}
