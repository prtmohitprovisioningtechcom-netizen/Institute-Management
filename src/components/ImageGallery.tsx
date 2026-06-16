"use client";

import { useState } from "react";

interface ImageGalleryProps {
  images: string[];
  basePath: string;
}

export default function ImageGallery({ images, basePath }: ImageGalleryProps) {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const getImgUrl = (img: string) => {
    if (img.startsWith("http")) {
      return img;
    }
    if (img.startsWith("/")) {
      const parts = img.split("/");
      const filename = parts.pop() || "";
      return [...parts, encodeURIComponent(filename)].join("/");
    }
    return `${basePath}/${encodeURIComponent(img)}`;
  };

  return (
    <>
      {/* 2-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {images.length > 0 ? (
          images.map((img, idx) => {
            const url = getImgUrl(img);
            return (
              <div 
                key={idx} 
                onClick={() => setSelectedImg(url)}
                className="cursor-pointer overflow-hidden rounded-xl shadow-lg border-4 border-slate-100 hover:shadow-2xl transition-transform duration-300 hover:scale-[1.02]"
              >
                <img 
                  src={url} 
                  alt={`Gallery Image ${idx + 1}`} 
                  className="w-full h-auto object-cover" 
                  loading="lazy" 
                />
              </div>
            );
          })
        ) : (
          <p className="text-slate-500 col-span-2 text-center">No images available in this folder yet.</p>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedImg && (
        <div
          onClick={() => setSelectedImg(null)}
          className="fixed inset-0 z-[9999] bg-black/85 flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-[90vw] max-h-[90vh] bg-transparent rounded-xl overflow-hidden"
          >
            <button
              onClick={() => setSelectedImg(null)}
              className="absolute top-2 right-2 bg-black/70 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl cursor-pointer z-10 hover:bg-red-600 transition-colors"
            >
              ✕
            </button>
            <img
              src={selectedImg}
              alt="Enlarged"
              className="max-w-[90vw] max-h-[85vh] block object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
