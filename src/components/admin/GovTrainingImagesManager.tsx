"use client";

import { useCallback, useEffect, useState } from "react";
import { FolderOpen, ImageIcon, Loader2, Plus, Trash2, Upload } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/utils/api";
import SkeletonLoader from "@/components/common/SkeletonLoader";

const ALLOWED_ORGS = ["CFTI", "PPDC", "MSME", "CDGI", "NSIC"];

interface GovPhoto {
  _id: string;
  org: string;
  sortOrder?: number;
}

export default function GovTrainingImagesManager() {
  const { loading: authLoading, user: authUser } = useAuth();
  const [selectedOrg, setSelectedOrg] = useState<string>(ALLOWED_ORGS[0]);
  const [photos, setPhotos] = useState<GovPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [photosLoading, setPhotosLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ done: number; total: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchPhotos = useCallback(async (org: string) => {
    const res = await apiFetch(`/api/admin/training-images?org=${org}`);
    const data = await res.json();
    return (Array.isArray(data.files) ? data.files : []) as GovPhoto[];
  }, []);

  const loadOrgData = useCallback(async (org: string) => {
    setPhotosLoading(true);
    setError(null);
    try {
      setPhotos(await fetchPhotos(org));
    } catch {
      setError("Failed to load images for " + org);
    } finally {
      setPhotosLoading(false);
    }
  }, [fetchPhotos]);

  useEffect(() => {
    if (authLoading || !authUser) return;
    setLoading(false);
    loadOrgData(selectedOrg);
  }, [authLoading, authUser, selectedOrg, loadOrgData]);

  const readFileAsDataUrl = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result ?? ""));
      reader.onerror = () => reject(new Error("Read failed"));
      reader.readAsDataURL(file);
    });

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";
    if (!files.length) return;

    setUploading(true);
    setError(null);
    setUploadProgress({ done: 0, total: files.length });

    const failed: string[] = [];
    let uploaded = 0;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      setUploadProgress({ done: i, total: files.length });

      if (!file.type.startsWith("image/")) {
        failed.push(`${file.name} (not an image)`);
        continue;
      }
      if (file.size > 5 * 1024 * 1024) {
        failed.push(`${file.name} (over 5 MB)`);
        continue;
      }

      try {
        const image = await readFileAsDataUrl(file);
        const res = await apiFetch("/api/admin/training-images", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            org: selectedOrg,
            image,
          }),
        });
        const data = await res.json();
        if (!res.ok) {
          failed.push(`${file.name} (${data.message ?? "failed"})`);
        } else {
          uploaded += 1;
        }
      } catch {
        failed.push(`${file.name} (upload error)`);
      }
    }

    setUploadProgress({ done: files.length, total: files.length });

    try {
      setPhotos(await fetchPhotos(selectedOrg));
    } catch {
      setError("Upload done but refresh failed.");
    }

    if (failed.length > 0) {
      setError(`${uploaded}/${files.length} uploaded. Failed: ${failed.slice(0, 3).join(", ")}${failed.length > 3 ? "..." : ""}`);
    }

    setUploading(false);
    setUploadProgress(null);
  };

  const handleDeletePhoto = async (id: string) => {
    if (!confirm("Delete this image?")) return;
    try {
      const res = await apiFetch("/api/admin/training-images", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.message ?? "Delete failed.");
        return;
      }
      setPhotos(await fetchPhotos(selectedOrg));
    } catch {
      setError("Delete failed.");
    }
  };

  if (authLoading || loading) {
    return <SkeletonLoader type="card" className="min-h-[520px] w-full rounded-[2rem]" />;
  }

  return (
    <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl">
      {error && (
        <div className="border-b border-red-100 bg-red-50 px-6 py-3 text-sm font-semibold text-red-600">
          {error}
        </div>
      )}

      {/* Organizations Header */}
      <div className="border-b border-slate-200 bg-linear-to-r from-[#0a0a2e] to-[#0d1554] px-6 py-5">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
            <FolderOpen className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Gov Training Organizations</h3>
            <p className="text-[11px] text-blue-200">Select an organization to manage its images</p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {ALLOWED_ORGS.map((org) => {
            const active = selectedOrg === org;
            return (
              <button
                key={org}
                onClick={() => setSelectedOrg(org)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border transition text-sm font-semibold ${
                  active
                    ? "border-white bg-white text-[#0a0aa1] shadow-md"
                    : "border-white/20 bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {org}
              </button>
            );
          })}
        </div>
      </div>

      {/* Photos Area */}
      <section className="flex flex-col bg-slate-50">
        <div className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
              <ImageIcon className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">
                {selectedOrg} Images
              </h3>
              <p className="text-xs text-slate-500">
                {photos.length} item{photos.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>

          <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[#0a0aa1] px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-800">
            {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
            {uploading && uploadProgress
              ? `Uploading ${uploadProgress.done}/${uploadProgress.total}...`
              : "Upload Photos"}
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleUpload}
              disabled={uploading}
            />
          </label>
        </div>

        <div className="flex-1 p-6">
          {photosLoading ? (
            <div className="flex min-h-[400px] items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          ) : photos.length === 0 ? (
            <label className="flex h-full min-h-[400px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-blue-200 bg-blue-50/50 transition hover:border-blue-300 hover:bg-blue-50">
              {uploading ? (
                <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
              ) : (
                <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-100">
                  <Upload className="h-10 w-10 text-blue-600" />
                </div>
              )}
              <p className="text-base font-bold text-slate-700">No images yet in {selectedOrg}</p>
              <p className="mt-1 text-sm text-slate-500">Upload images to display them on the website</p>
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleUpload}
                disabled={uploading}
              />
            </label>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
              {photos.map((photo) => (
                <div
                  key={photo._id}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
                >
                  <div className="relative aspect-square bg-slate-900">
                    <img 
                      src={`/api/public/training-images/media/${photo._id}`} 
                      alt="Gov training image" 
                      className="h-full w-full object-cover" 
                      loading="lazy" 
                    />
                    <button
                      type="button"
                      onClick={() => void handleDeletePhoto(photo._id)}
                      className="absolute right-2 top-2 rounded-xl bg-red-600 p-2 text-white shadow-lg opacity-0 transition group-hover:opacity-100"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="p-2 text-xs text-slate-500 truncate w-full text-center">
                    Image ID: {photo._id}
                  </div>
                </div>
              ))}

              <label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-white text-slate-400 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-500">
                {uploading ? (
                  <Loader2 className="h-8 w-8 animate-spin" />
                ) : (
                  <>
                    <Plus className="h-8 w-8" />
                    <span className="mt-2 text-xs font-bold">Add More</span>
                  </>
                )}
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleUpload}
                  disabled={uploading}
                />
              </label>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
