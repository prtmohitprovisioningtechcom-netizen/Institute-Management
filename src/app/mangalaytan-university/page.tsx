"use client";

import { useState } from "react";
import InternalPageLayout from "@/components/InternalPageLayout";
import Image from "next/image";
import { CheckCircle2, User, Phone, Mail, MessageSquare, X, Loader2 } from "lucide-react";
import Link from "next/link";

export default function UniversityCoursesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [selectedProgram, setSelectedProgram] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean | null>(null);
  const [submitError, setSubmitError] = useState("");

 



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.mobile) {
      setSubmitError("Name and Mobile number are required.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");
    try {
      const response = await fetch("/api/public/university-enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          mobile: formData.mobile,
          programType: selectedProgram,
          message: formData.message,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setSubmitSuccess(true);
        // Reset form after a delay
        setTimeout(() => {
          setIsModalOpen(false);
          setSubmitSuccess(null);
        }, 3000);
      } else {
        setSubmitError(data.message || "Something went wrong. Please try again.");
        setSubmitSuccess(false);
      }
    } catch (error) {
      console.error(error);
      setSubmitError("Failed to connect to the server. Please check your connection.");
      setSubmitSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <InternalPageLayout
      title="University Courses"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "University Courses" },
      ]}
    >
      <div className="mx-auto w-full max-w-6xl space-y-16">
        {/* University Logo Section */}
        <section className="flex flex-col items-center py-4">
          <div className="relative flex h-36 w-72 items-center justify-center rounded-2xl bg-white p-4 shadow-md ring-1 ring-slate-100 sm:h-44 sm:w-80 md:h-48 md:w-96">
            <Image
  src="/mangalaytan-university-logo.png"
  alt="University Courses Logo"
  className="max-h-full max-w-full object-contain"
  width={500}
  height={200}
  priority
/>
          </div>
          {/* Image Gallery from public/Mangal */}
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <Image
  src="/Mangal/WhatsApp Image 2026-06-15 at 18.12.49.jpeg"
  alt="Mangal Image 1"
  className="h-64 w-full object-cover rounded-lg cursor-pointer"
  width={400}
  height={256}
  onClick={() => setSelectedImg('/Mangal/WhatsApp Image 2026-06-15 at 18.12.49.jpeg')}
/>
            <Image
  src="/Mangal/WhatsApp Image 2026-06-15 at 18.12.50 (1).jpeg"
  alt="Mangal Image 2"
  className="h-64 w-full object-cover rounded-lg cursor-pointer"
  width={400}
  height={256}
  onClick={() => setSelectedImg('/Mangal/WhatsApp Image 2026-06-15 at 18.12.50 (1).jpeg')}
/>
            <Image
  src="/Mangal/WhatsApp Image 2026-06-15 at 18.12.50.jpeg"
  alt="Mangal Image 3"
  className="h-64 w-full object-cover rounded-lg cursor-pointer"
  width={400}
  height={256}
  onClick={() => setSelectedImg('/Mangal/WhatsApp Image 2026-06-15 at 18.12.50.jpeg')}
/>
          </div>
        </section>

        {selectedImg && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent" onClick={() => setSelectedImg(null)}>
            <div className="relative" onClick={e => e.stopPropagation()}>
              <button className="absolute top-2 right-2 text-white text-2xl" onClick={() => setSelectedImg(null)}>&times;</button>
{selectedImg && (
  <Image
    src={selectedImg}
    alt="Enlarged"
    className="max-w-full max-h-[90vh]"
    width={800}
    height={600}
  />
)}
            </div>
          </div>
        )}

      {/* Program Options Grid */}
        <section className="space-y-8">
          <div className="text-center">
            <h3 className="text-xl font-extrabold uppercase tracking-wide text-slate-800 sm:text-2xl lg:text-3xl">Admission Counselor Distance Online Learning Programs</h3>
            <div className="mt-6">
              <Link href="/black" className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 px-6 text-xs font-bold uppercase tracking-wider text-white hover:bg-blue-700" onClick={() => setSelectedProgram('Admission Counselor Distance Online Learning Programs')}>Click Here</Link>
            </div>
            <h3 className="mt-6 text-xl font-extrabold uppercase tracking-wide text-slate-800 sm:text-2xl lg:text-3xl">Vocational Training Provider and Admission Counselor</h3>
            <div className="mt-6">
              <Link href="/vocational" className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 px-6 text-xs font-bold uppercase tracking-wider text-white hover:bg-blue-700" onClick={() => setSelectedProgram('Vocational Training Provider and Admission Counselor')}>Click Here</Link>
            </div>
          </div>
        </section>


      </div>

      {/* Inquiry Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
            onClick={() => !isSubmitting && setIsModalOpen(false)}
          />

          {/* Modal Container */}
          <div className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-2xl transition-all border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              disabled={isSubmitting}
              className="absolute right-4 top-4 rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Success state */}
            {submitSuccess === true ? (
              <div className="py-8 text-center space-y-4">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">Inquiry Submitted!</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Thank you for your interest. A counselor will get in touch with you shortly.
                </p>
              </div>
            ) : (
              // Form Content
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-extrabold uppercase tracking-wide text-slate-800">
                    Apply / Inquire Now
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Selected Stream: <strong className="text-blue-700">{selectedProgram}</strong>
                  </p>
                </div>

                {submitError && (
                  <div className="rounded-lg bg-red-50 p-3 text-xs text-red-600 border border-red-100">
                    {submitError}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        placeholder="ENTER YOUR FULL NAME"
                        className="h-10 w-full rounded-lg border border-slate-300 bg-white pl-9 pr-3 text-xs tracking-wide text-slate-700 outline-none transition focus:border-[#0a0aa1] focus:ring-1 focus:ring-[#0a0aa1]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                      Mobile Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                      <input
                        type="tel"
                        name="mobile"
                        required
                        pattern="[0-9]{10}"
                        title="Please enter a valid 10-digit mobile number."
                        value={formData.mobile}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        placeholder="ENTER 10-DIGIT MOBILE NUMBER"
                        className="h-10 w-full rounded-lg border border-slate-300 bg-white pl-9 pr-3 text-xs tracking-wide text-slate-700 outline-none transition focus:border-[#0a0aa1] focus:ring-1 focus:ring-[#0a0aa1]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                      Email Address (Optional)
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        placeholder="ENTER YOUR EMAIL ID"
                        className="h-10 w-full rounded-lg border border-slate-300 bg-white pl-9 pr-3 text-xs tracking-wide text-slate-700 outline-none transition focus:border-[#0a0aa1] focus:ring-1 focus:ring-[#0a0aa1]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                      Message / Queries (Optional)
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                      <textarea
                        name="message"
                        rows={3}
                        value={formData.message}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        placeholder="WRITE YOUR MESSAGE OR QUERIES HERE..."
                        className="w-full rounded-lg border border-slate-300 bg-white pl-9 pr-3 py-2 text-xs tracking-wide text-slate-700 outline-none transition focus:border-[#0a0aa1] focus:ring-1 focus:ring-[#0a0aa1]"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 py-3 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-green-700 disabled:opacity-75"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <span>Submit Details</span>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </InternalPageLayout>
  );
}
