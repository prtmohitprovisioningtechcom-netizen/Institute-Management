"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Play, X, ZoomIn, ZoomOut } from "lucide-react";
import { galleryMediaUrl, isGalleryVideo } from "@/lib/galleryMedia";

interface Category {
  _id: string;
  name: string;
}

interface Photo {
  _id: string;
  categoryId: string;
  title?: string;
  type?: "image" | "video";
}

function hasValidId(photo: Photo): boolean {
  return galleryMediaUrl(photo._id) !== null;
}

export default function GalleryContent() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    async function loadGallery() {
      try {
        const res = await fetch("/api/public/gallery");
        const data = await res.json();
        setCategories(Array.isArray(data.categories) ? data.categories : []);
        const list = Array.isArray(data.photos) ? (data.photos as Photo[]) : [];
        setPhotos(list.filter(hasValidId));
      } catch {
        setCategories([]);
        setPhotos([]);
      } finally {
        setLoading(false);
      }
    }
    void loadGallery();
  }, []);

  const visiblePhotos = useMemo(() => {
    const list = activeCategory === "all"
      ? photos
      : photos.filter((photo) => photo.categoryId === activeCategory);
    return list.filter(hasValidId);
  }, [activeCategory, photos]);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    setZoom(1);
  }, []);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setZoom(1);
  };

  const goPrev = useCallback(() => {
    setLightboxIndex((i) => {
      if (i === null || visiblePhotos.length === 0) return i;
      return (i - 1 + visiblePhotos.length) % visiblePhotos.length;
    });
    setZoom(1);
  }, [visiblePhotos.length]);

  const goNext = useCallback(() => {
    setLightboxIndex((i) => {
      if (i === null || visiblePhotos.length === 0) return i;
      return (i + 1) % visiblePhotos.length;
    });
    setZoom(1);
  }, [visiblePhotos.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightboxIndex, closeLightbox, goPrev, goNext]);

  const activePhoto = lightboxIndex !== null ? visiblePhotos[lightboxIndex] : null;
  const activeIsVideo = activePhoto ? isGalleryVideo(activePhoto) : false;
  const activeMediaUrl = activePhoto ? galleryMediaUrl(activePhoto._id) : null;

  if (loading) {
    return <div className="mx-auto mt-8 h-40 max-w-6xl animate-pulse rounded-2xl bg-slate-100" />;
  }

  return (
    <>
      <div className="mx-auto w-full max-w-6xl">
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            className={`rounded-sm border border-slate-500 px-4 py-2 text-sm transition ${
              activeCategory === "all" ? "bg-slate-700 text-white" : "bg-white text-slate-700"
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category._id}
              type="button"
              onClick={() => setActiveCategory(category._id)}
              className={`rounded-sm border border-slate-500 px-4 py-2 text-sm transition ${
                activeCategory === category._id ? "bg-slate-700 text-white" : "bg-white text-slate-700"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {visiblePhotos.length === 0 ? (
          <p className="mt-12 text-center text-sm font-semibold text-slate-500">
            No photos or videos yet.
          </p>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {visiblePhotos.map((photo, index) => {
              const isVideo = isGalleryVideo(photo);
              const mediaUrl = galleryMediaUrl(photo._id);
              if (!mediaUrl) return null;

              return (
                <button
                  key={photo._id}
                  type="button"
                  onClick={() => openLightbox(index)}
                  className="group overflow-hidden rounded-xl border border-slate-200 bg-white text-left shadow-sm transition hover:shadow-md"
                >
                  <div className="relative aspect-square overflow-hidden bg-slate-900">
                    {isVideo ? (
                      <>
                        <video
                          src={mediaUrl}
                          className="h-full w-full object-cover"
                          muted
                          playsInline
                          preload="metadata"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition group-hover:bg-black/40">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-lg">
                            <Play className="h-6 w-6 text-slate-800" />
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={mediaUrl}
                          alt={photo.title || "Gallery photo"}
                          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/20">
                          <ZoomIn className="h-8 w-8 text-white opacity-0 transition group-hover:opacity-100" />
                        </div>
                      </>
                    )}
                  </div>
                  {photo.title ? (
                    <p className="truncate px-3 py-2 text-xs font-semibold text-slate-700">{photo.title}</p>
                  ) : null}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {activePhoto && activeMediaUrl && lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 p-4"
          onClick={closeLightbox}
        >
          {visiblePhotos.length > 1 && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2 text-slate-800 shadow-md transition hover:bg-white sm:left-6"
              aria-label="Previous"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}

          <div
            className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
              <div className="flex items-center gap-2">
                {!activeIsVideo && (
                  <>
                    <button
                      type="button"
                      onClick={() => setZoom((z) => Math.max(1, z - 0.25))}
                      disabled={zoom <= 1}
                      className="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100 disabled:opacity-30"
                      aria-label="Zoom out"
                    >
                      <ZoomOut className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setZoom((z) => Math.min(2, z + 0.25))}
                      disabled={zoom >= 2}
                      className="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100 disabled:opacity-30"
                      aria-label="Zoom in"
                    >
                      <ZoomIn className="h-4 w-4" />
                    </button>
                  </>
                )}
                {visiblePhotos.length > 1 && (
                  <span className="text-xs font-medium text-slate-400">
                    {lightboxIndex + 1} / {visiblePhotos.length}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={closeLightbox}
                className="rounded-lg p-1.5 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex max-h-[70vh] items-center justify-center overflow-auto bg-slate-900 p-3">
              {activeIsVideo ? (
                <video
                  key={activePhoto._id}
                  src={activeMediaUrl}
                  controls
                  autoPlay
                  playsInline
                  preload="auto"
                  className="max-h-[60vh] w-full max-w-full"
                />
              ) : (
                <div style={{ transform: `scale(${zoom})`, transformOrigin: "center center" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={activeMediaUrl}
                    alt={activePhoto.title || "Gallery photo"}
                    className="max-h-[60vh] w-auto max-w-full object-contain"
                  />
                </div>
              )}
            </div>

            {activePhoto.title && (
              <p className="truncate border-t border-slate-100 px-4 py-2.5 text-center text-sm font-medium text-slate-600">
                {activePhoto.title}
              </p>
            )}
          </div>

          {visiblePhotos.length > 1 && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2 text-slate-800 shadow-md transition hover:bg-white sm:right-6"
              aria-label="Next"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}
        </div>
      )}
    </>
  );
}
