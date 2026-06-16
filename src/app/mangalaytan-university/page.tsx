"use client";

import { useState } from "react";
import InternalPageLayout from "@/components/InternalPageLayout";
import { GraduationCap, BookOpen, Briefcase, CheckCircle2, User, Phone, Mail, MessageSquare, ArrowRight, X, Loader2 } from "lucide-react";

export default function MangalayatanUniversityPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const programs = [
    {
      id: "distance-learning",
      title: "Distance & Online Learning Programs",
      subtitle: "Admission Counselor",
      description:
        "Accelerate your career with flexible, fully online and distance learning programs approved by UGC-DEB. Learn at your own pace from industry-expert faculty with modern learning management systems.",
      icon: BookOpen,
      badge: "UGC-DEB Approved",
      color: "from-blue-600 to-indigo-700",
      features: [
        "UGC-DEB Approved Degree & Diploma Programs",
        "100% Online Classes & Flexible Learning Management System (LMS)",
        "Self-paced Examination & Learning Options",
        "Dedicated Student Support & Academic Counseling",
      ],
    },
    {
      id: "vocational-training",
      title: "Vocational Training & Admission Counselor",
      subtitle: "Skill Development Partner",
      description:
        "Gain hands-on skills with specialized vocational training programs designed to make you industry-ready. Our expert counselors will guide you through government-aligned certifications and job-oriented diplomas.",
      icon: Briefcase,
      badge: "Skill India Aligned",
      color: "from-orange-500 to-red-600",
      features: [
        "Career-centric Vocational Diplomas & Certificates",
        "Practical, Lab-intensive Training Curriculum",
        "Government & Industry Recognized Certifications",
        "Job Placement Assistance & Counseling Support",
      ],
    },
  ];

  const openInquiryModal = (programTitle: string) => {
    setSelectedProgram(programTitle);
    setSubmitSuccess(null);
    setSubmitError("");
    setFormData({ name: "", email: "", mobile: "", message: "" });
    setIsModalOpen(true);
  };

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
    } catch (err) {
      setSubmitError("Failed to connect to the server. Please check your connection.");
      setSubmitSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <InternalPageLayout
      title="Mangalayatan University"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Mangalayatan University" },
      ]}
    >
      <div className="mx-auto w-full max-w-6xl space-y-16">
        {/* University Logo Section */}
        <section className="flex justify-center py-4">
          <div className="relative flex h-28 w-64 items-center justify-center rounded-2xl bg-white p-4 shadow-md ring-1 ring-slate-100 sm:h-32 sm:w-72 md:h-36 md:w-80">
            <img
              src="/mangalaytan-university-logo.png"
              alt="Mangalayatan University Logo"
              className="max-h-full max-w-full object-contain"
            />
          </div>
        </section>

        {/* Program Options Grid */}
        <section className="space-y-8">
          <div className="text-center">
            <h3 className="text-xl font-extrabold uppercase tracking-wide text-slate-800 sm:text-2xl lg:text-3xl">
              Academic & Vocational Programs
            </h3>
            <p className="mx-auto mt-2 max-w-xl text-xs text-slate-500 sm:text-sm">
              Explore our special learning streams and speak directly to an expert counselor to secure your admission.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {programs.map((prog) => {
              const IconComponent = prog.icon;
              return (
                <article
                  key={prog.id}
                  className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:scale-[1.01] hover:shadow-lg"
                >
                  <div className="space-y-6">
                    {/* Card Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#0a0aa1]">
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-600">
                        {prog.badge}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="space-y-2.5">
                      <p className="text-xs font-bold uppercase tracking-wider text-orange-600">
                        {prog.subtitle}
                      </p>
                      <h4 className="text-lg font-black uppercase leading-tight text-slate-800 transition group-hover:text-[#0a0aa1]">
                        {prog.title}
                      </h4>
                      <p className="text-xs leading-relaxed text-slate-500">
                        {prog.description}
                      </p>
                    </div>

                    {/* Features checklist */}
                    <ul className="space-y-2 pt-2">
                      {prog.features.map((feat, index) => (
                        <li key={index} className="flex items-start gap-2.5 text-xs text-slate-600">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Button Action */}
                  <div className="mt-8">
                    <button
                      onClick={() => openInquiryModal(prog.title)}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0a0aa1] py-3 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#070773] hover:shadow-md active:scale-95"
                    >
                      <span>Click Here</span>
                      <ArrowRight className="h-4 w-4 transition duration-300 group-hover:translate-x-1" />
                    </button>
                  </div>
                </article>
              );
            })}
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
