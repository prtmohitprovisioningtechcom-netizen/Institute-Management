"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

// Array of hero images (public folder)
const heroImages = ["/job1.jpeg", "/job2.jpeg"];

// Gallery images located in public/Jobs folder
const galleryImages = [
  "/Jobs/WhatsApp Image 2026-06-17 at 11.38.55 (1).jpeg",
  "/Jobs/WhatsApp Image 2026-06-17 at 11.38.55 (2).jpeg",
  "/Jobs/WhatsApp Image 2026-06-17 at 11.38.55.jpeg",
  "/Jobs/WhatsApp Image 2026-06-17 at 11.38.56.jpeg",
  "/Jobs/WhatsApp Image 2026-06-17 at 11.38.58 (1).jpeg",
  "/Jobs/WhatsApp Image 2026-06-17 at 11.38.58.jpeg",
  "/Jobs/WhatsApp Image 2026-06-17 at 11.38.59 (1).jpeg",
  "/Jobs/WhatsApp Image 2026-06-17 at 11.38.59.jpeg",
  "/Jobs/WhatsApp Image 2026-06-17 at 11.39.00 (1).jpeg",
  "/Jobs/WhatsApp Image 2026-06-17 at 11.39.00 (2).jpeg",
  "/Jobs/WhatsApp Image 2026-06-17 at 11.39.00.jpeg",
  "/Jobs/WhatsApp Image 2026-06-17 at 11.39.01 (1).jpeg",
  "/Jobs/WhatsApp Image 2026-06-17 at 11.39.01.jpeg",
];

// Excel document images (4 pages)
const jobExcelImages = ["/jobexcel1.png", "/jobexcel2.png", "/jobexcel3.png", "/jobexcel4.png"];

export default function JobsSupportPage() {
  const [selectedModalImage, setSelectedModalImage] = useState<string | null>(null);
  const [excelPageIndex, setExcelPageIndex] = useState<number>(0);

  const goToPrevExcel = () => {
    setExcelPageIndex((prev) => (prev > 0 ? prev - 1 : jobExcelImages.length - 1));
  };

  const goToNextExcel = () => {
    setExcelPageIndex((prev) => (prev < jobExcelImages.length - 1 ? prev + 1 : 0));
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white flex flex-col items-center py-12 px-4">
      {/* Hero */}
      <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-center drop-shadow-lg">Jobs Support</h1>
      <p className="max-w-2xl text-center text-lg md:text-xl mb-8 drop-shadow-md">
        We offer career guidance, placement assistance, and job‑ready training for our graduates.
      </p>
      <a
        href="/"
        className="inline-flex items-center gap-2 rounded-md bg-white text-indigo-900 px-6 py-3 font-semibold hover:bg-gray-100 transition mb-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Website
      </a>

      {/* Hero images */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl mb-12">
        {heroImages.map((src) => (
          <div
            key={src}
            className="relative rounded-xl overflow-hidden shadow-lg bg-white/10 backdrop-blur-sm cursor-pointer"
            onClick={() => setSelectedModalImage(src)}
          >
            <Image
              src={src}
              alt="Job support"
              width={1200}
              height={800}
              className="object-cover w-full h-full"
              priority
            />
          </div>
        ))}
      </div>

      {/* Gallery */}
      <h2 className="text-2xl font-bold text-white mb-6">Job Gallery</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full max-w-6xl">
        {galleryImages.map((src) => (
          <div
            key={src}
            className="relative rounded-lg overflow-hidden shadow-md bg-white/5 backdrop-filter backdrop-blur-sm aspect-video cursor-pointer"
            onClick={() => setSelectedModalImage(src)}
          >
            <Image src={src} alt="Job gallery" fill className="object-cover" />
          </div>
        ))}
      </div>

      {/* Lightbox Modal for hero/gallery images */}
      {selectedModalImage && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setSelectedModalImage(null)}
        >
          <div
            className="relative max-w-4xl max-h-screen w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 z-10"
              onClick={() => setSelectedModalImage(null)}
            >
              <X className="h-6 w-6" />
            </button>
            <div className="relative w-full h-full max-h-[90vh]">
              <Image
                src={selectedModalImage}
                alt="Enlarged"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}

      {/* Excel Document Viewer (PDF-like) */}
      <div className="w-full max-w-4xl mt-16">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Job Excel Documents</h2>
        <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
          {/* Page display */}
          <div className="relative w-full aspect-[3/4] md:aspect-[4/3] bg-gray-100 flex items-center justify-center">
            <div className="relative w-full h-full">
              <Image
                src={jobExcelImages[excelPageIndex]}
                alt={`Excel document page ${excelPageIndex + 1}`}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-t border-gray-200">
            <button
              onClick={goToPrevExcel}
              className="flex items-center gap-1 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition disabled:opacity-50"
              disabled={jobExcelImages.length <= 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </button>
            <span className="text-sm font-medium text-gray-700">
              Page {excelPageIndex + 1} of {jobExcelImages.length}
            </span>
            <button
              onClick={goToNextExcel}
              className="flex items-center gap-1 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition disabled:opacity-50"
              disabled={jobExcelImages.length <= 1}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}