"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Award, Loader2, Pencil, Plus, Save, Trash2, Upload } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/utils/api";
import {
  OUR_CERTIFICATES_SETTINGS_KEY,
  parseOurCertificatesJson,
  serializeOurCertificatesJson,
  type OurCertificateItem,
} from "@/lib/ourCertificates";
import SkeletonLoader from "@/components/common/SkeletonLoader";

function newId() {
  return `cert_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export default function OurCertificatesManager() {
  const { loading: authLoading, user: authUser } = useAuth();
  const [certificates, setCertificates] = useState<OurCertificateItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoDataUrl, setLogoDataUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const readFileAsDataUrl = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result ?? ""));
      reader.onerror = () => reject(new Error("Read failed"));
      reader.readAsDataURL(file);
    });

  const resetForm = () => {
    setEditingId(null);
    setLogoPreview(null);
    setLogoDataUrl(null);
    setError(null);
  };

  const fetchCertificates = useCallback(async () => {
    const res = await apiFetch(`/api/admin/settings?key=${OUR_CERTIFICATES_SETTINGS_KEY}`);
    const data = (await res.json()) as { value: string | null };
    if (!res.ok) throw new Error("Failed to load certificates");
    setCertificates(parseOurCertificatesJson(data.value));
  }, []);

  const loadAll = useCallback(async () => {
    if (authLoading || !authUser) return;
    setLoading(true);
    setError(null);
    try {
      await fetchCertificates();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load certificates");
    } finally {
      setLoading(false);
    }
  }, [authLoading, authUser, fetchCertificates]);

  useEffect(() => {
    void loadAll();
  }, [loadAll]);

  const persist = async (next: OurCertificateItem[]) => {
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await apiFetch("/api/admin/settings", {
        method: "POST",
        body: JSON.stringify({
          key: OUR_CERTIFICATES_SETTINGS_KEY,
          value: serializeOurCertificatesJson(next),
        }),
      });
      if (!res.ok) throw new Error("Failed to save");
      setCertificates(next);
      setSuccess("Certificates updated. Changes appear on all website pages.");
      resetForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handleLogoUpload = async (file: File | null) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Only image files are allowed.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setError("Image must be under 2 MB.");
      return;
    }
    try {
      const dataUrl = await readFileAsDataUrl(file);
      setLogoDataUrl(dataUrl);
      setLogoPreview(dataUrl);
      setError(null);
    } catch {
      setError("Failed to read image.");
    }
  };

  const startEdit = (cert: OurCertificateItem) => {
    setEditingId(cert.id);
    setLogoPreview(cert.logo);
    setLogoDataUrl(null);
    setError(null);
    setSuccess(null);
  };

  const handleSave = async () => {
    const logo = logoDataUrl ?? logoPreview;
    if (!logo) {
      setError("Please upload a certificate image.");
      return;
    }

    if (editingId) {
      const next = certificates.map((c) =>
        c.id === editingId ? { ...c, logo } : c,
      );
      await persist(next);
      return;
    }

    const next = [...certificates, { id: newId(), logo }];
    await persist(next);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this certificate from the website?")) return;
    await persist(certificates.filter((c) => c.id !== id));
  };

  if (loading) {
    return (
      <div className="max-w-4xl">
        <SkeletonLoader type="card" className="h-64 w-full rounded-4xl" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div className="bg-white rounded-4xl border border-slate-100 shadow-xl p-8 space-y-6">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center border border-amber-100">
            <Award className="w-7 h-7 text-amber-600" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Our Certificates</h3>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Upload certificate logos only. They appear above the footer on every public page.
            </p>
          </div>
        </div>

        {error ? (
          <p className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {error}
          </p>
        ) : null}
        {success ? (
          <p className="rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
            {success}
          </p>
        ) : null}

        <div className="max-w-sm mx-auto space-y-4">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1 block text-center">
            Certificate Image
          </label>
          <div className="relative aspect-square bg-slate-50 rounded-4xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center overflow-hidden group hover:border-amber-300 transition">
            {logoPreview ? (
              <div className="relative w-full h-full p-8">
                <Image src={logoPreview} alt="Certificate preview" width={280} height={280} unoptimized className="w-full h-full object-contain" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <label className="cursor-pointer bg-white text-slate-900 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-amber-50 transition">
                    Change Image
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => void handleLogoUpload(e.target.files?.[0] ?? null)} />
                  </label>
                </div>
              </div>
            ) : (
              <label className="flex flex-col items-center gap-3 cursor-pointer p-10 text-center">
                <Upload className="w-10 h-10 text-slate-300" />
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Upload Certificate</p>
                <input type="file" accept="image/*" className="hidden" onChange={(e) => void handleLogoUpload(e.target.files?.[0] ?? null)} />
              </label>
            )}
          </div>
          <p className="text-[10px] text-center text-slate-400 font-medium uppercase tracking-tight">
            PNG/JPG recommended
          </p>

          <button
            type="button"
            onClick={() => void handleSave()}
            disabled={saving}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-slate-900 text-white text-xs font-black uppercase tracking-widest hover:bg-amber-600 transition disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : editingId ? <Save className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            {saving ? "Saving..." : editingId ? "Update Certificate" : "Add Certificate"}
          </button>

          {editingId ? (
            <button
              type="button"
              onClick={resetForm}
              className="w-full py-3 rounded-2xl border border-slate-200 text-xs font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50"
            >
              Cancel Edit
            </button>
          ) : null}
        </div>
      </div>

      {certificates.length > 0 ? (
        <div className="bg-white rounded-4xl border border-slate-100 shadow-xl p-8">
          <h4 className="text-sm font-black uppercase tracking-widest text-slate-500 mb-6">
            Published ({certificates.length})
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="relative rounded-2xl border border-slate-100 bg-slate-50 p-3"
              >
                <div className="relative aspect-square rounded-xl bg-white border border-slate-100 p-3">
                  <Image src={cert.logo} alt="Certificate" fill unoptimized className="object-contain p-1" />
                </div>
                <div className="absolute top-2 right-2 flex gap-1">
                  <button
                    type="button"
                    onClick={() => startEdit(cert)}
                    className="p-1.5 rounded-lg bg-white text-slate-500 shadow-sm hover:text-amber-600"
                    aria-label="Edit certificate"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => void handleDelete(cert.id)}
                    disabled={saving}
                    className="p-1.5 rounded-lg bg-white text-slate-500 shadow-sm hover:text-red-600 disabled:opacity-50"
                    aria-label="Delete certificate"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center text-sm font-medium text-slate-400 py-8">
          No certificates added yet. Upload your first certificate above.
        </p>
      )}
    </div>
  );
}
