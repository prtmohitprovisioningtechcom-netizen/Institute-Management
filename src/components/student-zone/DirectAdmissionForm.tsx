"use client";

import { useMemo, useRef, useState, useEffect, type FormEvent, type ChangeEvent } from "react";
import { CheckCircle } from "lucide-react";
import { useBrand } from "@/context/BrandContext";
import SkeletonLoader from "@/components/common/SkeletonLoader";
import { ISO_DATE_MIN, isoDateToday, sanitizeIsoDateInput } from "@/lib/isoDate";

interface Course {
  _id: string;
  name: string;
  durationMonths?: number;
  courseFee?: number;
}

function computeAge(dob: string): string {
  if (!dob || !/^\d{4}-\d{2}-\d{2}$/.test(dob)) return "";
  const birth = new Date(`${dob}T00:00:00Z`);
  if (Number.isNaN(birth.getTime())) return "";
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) age -= 1;
  return age > 0 ? String(age) : "";
}

function formatDuration(months?: number): string {
  if (!months || months <= 0) return "";
  if (months === 1) return "1 Month";
  if (months < 12) return `${months} Months`;
  if (months % 12 === 0) {
    const years = months / 12;
    return years === 1 ? "1 Year" : `${years} Years`;
  }
  return `${months} Months`;
}

export default function RegistrationProcessForm() {
  const todayIso = useMemo(() => isoDateToday(), []);
  const { brandName } = useBrand();
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [availableCourses, setAvailableCourses] = useState<Course[]>([]);
  const [invalidFields, setInvalidFields] = useState<Set<string>>(new Set());
  const [registrationDate, setRegistrationDate] = useState("");
  const [dob, setDob] = useState("");
  const [age, setAge] = useState("");
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [courseDuration, setCourseDuration] = useState("");
  const [caste, setCaste] = useState("");
  const [residence, setResidence] = useState("");
  const [declarationAccepted, setDeclarationAccepted] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const selectedCourse = useMemo(
    () => availableCourses.find((c) => c.name === course),
    [availableCourses, course],
  );

  useEffect(() => {
    setIsMounted(true);
    setRegistrationDate(isoDateToday());
    void fetchCourses();
  }, []);

  useEffect(() => {
    setAge(computeAge(dob));
  }, [dob]);

  useEffect(() => {
    if (selectedCourse?.durationMonths) {
      setCourseDuration(formatDuration(selectedCourse.durationMonths));
    }
  }, [selectedCourse]);

  const fetchCourses = async () => {
    try {
      const res = await fetch("/api/public/courses");
      if (res.ok) {
        const data = await res.json();
        setAvailableCourses(Array.isArray(data) ? data : data.courses || []);
      }
    } catch (err) {
      console.error("Failed to fetch courses", err);
    }
  };

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setPhotoPreview(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setPhotoPreview(typeof reader.result === "string" ? reader.result : null);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formEl = e.currentTarget;
    const invalid = new Set<string>();

    if (!declarationAccepted) invalid.add("declarationAccepted");

    const requiredNames = [
      "name",
      "fatherName",
      "motherName",
      "dob",
      "education",
      "address",
      "mobile",
      "course",
      "courseDuration",
      "caste",
      "residence",
      "photo",
      "studentSignature",
    ];

    for (const fieldName of requiredNames) {
      const el = formEl.elements.namedItem(fieldName);
      if (el instanceof HTMLInputElement || el instanceof HTMLSelectElement || el instanceof HTMLTextAreaElement) {
        const emptyFile =
          el instanceof HTMLInputElement && el.type === "file" && (!el.files || el.files.length === 0);
        if (!el.value.trim() || emptyFile) invalid.add(fieldName);
      }
    }

    const fileInputs = formEl.querySelectorAll("input[type='file']");
    let fileError = "";
    fileInputs.forEach((el) => {
      if (!(el instanceof HTMLInputElement)) return;
      const file = el.files?.[0];
      if (file) {
        if (file.type.startsWith("image/") && file.size > 100 * 1024) {
          invalid.add(el.name);
          fileError = "Photo and signature must be under 100 KB.";
        }
      }
    });

    if (invalid.size > 0) {
      setInvalidFields(invalid);
      setMsg({
        type: "error",
        text: fileError || "Please fill all required fields highlighted in red.",
      });
      return;
    }

    setInvalidFields(new Set());
    setLoading(true);
    setMsg({ type: "success", text: "Processing your registration..." });

    try {
      const form = new FormData(formEl);
      form.set("age", age);
      form.set("declarationName", name);
      form.set("declarationAge", age);
      form.set("declarationCourse", course);
      form.set("declarationAccepted", declarationAccepted ? "true" : "false");

      const res = await fetch("/api/registration-process", { method: "POST", body: form });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to submit registration form");

      setMsg({
        type: "success",
        text: data.message || "Registration form submitted successfully!",
      });
      formEl.reset();
      setDob("");
      setAge("");
      setName("");
      setCourse("");
      setCourseDuration("");
      setCaste("");
      setResidence("");
      setDeclarationAccepted(false);
      setPhotoPreview(null);
      setRegistrationDate(isoDateToday());
    } catch (err: unknown) {
      setMsg({
        type: "error",
        text: err instanceof Error ? err.message : "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  const inputCls = (name?: string) =>
    `w-full border-b border-slate-400 bg-transparent px-1 py-1.5 text-sm outline-none focus:border-blue-600 ${
      invalidFields.has(name || "") ? "border-red-600 bg-red-50/40" : ""
    }`;
  const labelCls = (name?: string) =>
    `text-xs font-semibold uppercase tracking-wide text-slate-700 ${
      invalidFields.has(name || "") ? "text-red-700" : ""
    }`;

  if (!isMounted) {
  return (
    <div className="min-h-screen bg-gray-100 py-12 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8 space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-800">{brandName} Registration Form</h1>
          <p className="mt-2 text-sm text-gray-600">Fashion And Technology Trust – ISO 9001:2015 Certified Institute</p>
          <p className="text-xs text-gray-500">14, Arya Nagar, Firozabad - 283203</p>
        </div>

        {/* Message */}
        {msg && (
          <div
            className={`rounded-md p-4 text-sm font-medium ${msg.type === "success" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-red-50 text-red-700 border border-red-200"}`}
          >
            {msg.text}
          </div>
        )}

        {/* Form */}
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          {/* Registration Date */}
          <div>
            <label htmlFor="registrationDate" className="block text-sm font-medium text-gray-700 mb-1">
              Registration Date <span className="text-red-600">*</span>
            </label>
            <input
              id="registrationDate"
              name="registrationDate"
              type="date"
              required
              className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${invalidFields.has("registrationDate") ? "border-red-500" : ""}`}
              value={registrationDate}
              min={ISO_DATE_MIN}
              max={todayIso}
              onChange={(e) => setRegistrationDate(sanitizeIsoDateInput(e.target.value))}
            />
          </div>

          {/* Personal Details Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name <span className="text-red-600">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Student's full name"
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${invalidFields.has("name") ? "border-red-500" : ""}`}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="fatherName" className="block text-sm font-medium text-gray-700 mb-1">
                  Father's Name <span className="text-red-600">*</span>
                </label>
                <input
                  id="fatherName"
                  name="fatherName"
                  type="text"
                  required
                  placeholder="Father's name"
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${invalidFields.has("fatherName") ? "border-red-500" : ""}`}
                />
              </div>
              <div>
                <label htmlFor="motherName" className="block text-sm font-medium text-gray-700 mb-1">
                  Mother's Name <span className="text-red-600">*</span>
                </label>
                <input
                  id="motherName"
                  name="motherName"
                  type="text"
                  required
                  placeholder="Mother's name"
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${invalidFields.has("motherName") ? "border-red-500" : ""}`}
                />
              </div>
              <div>
                <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth <span className="text-red-600">*</span>
                </label>
                <input
                  id="dob"
                  name="dob"
                  type="date"
                  required
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${invalidFields.has("dob") ? "border-red-500" : ""}`}
                  value={dob}
                  min={ISO_DATE_MIN}
                  max={todayIso}
                  onChange={(e) => setDob(sanitizeIsoDateInput(e.target.value))}
                />
              </div>
              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                  Age
                </label>
                <input
                  id="age"
                  name="age"
                  type="text"
                  readOnly
                  value={age}
                  className="mt-1 block w-full rounded-md bg-gray-100 border-gray-300 shadow-sm sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="education" className="block text-sm font-medium text-gray-700 mb-1">
                  Education <span className="text-red-600">*</span>
                </label>
                <input
                  id="education"
                  name="education"
                  type="text"
                  required
                  placeholder="Highest qualification"
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${invalidFields.has("education") ? "border-red-500" : ""}`}
                />
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Address <span className="text-red-600">*</span>
                </label>
                <textarea
                  id="address"
                  name="address"
                  rows={2}
                  required
                  placeholder="Complete residential address"
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${invalidFields.has("address") ? "border-red-500" : ""}`}
                />
              </div>
              <div>
                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile Number <span className="text-red-600">*</span>
                </label>
                <input
                  id="mobile"
                  name="mobile"
                  type="tel"
                  required
                  placeholder="10‑digit mobile"
                  maxLength={10}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${invalidFields.has("mobile") ? "border-red-500" : ""}`}
                />
              </div>
            </div>
            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-1">
                  Course <span className="text-red-600">*</span>
                </label>
                <select
                  id="course"
                  name="course"
                  required
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${invalidFields.has("course") ? "border-red-500" : ""}`}
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  disabled={availableCourses.length === 0}
                >
                  <option value="">{availableCourses.length > 0 ? "Select course" : "Loading courses..."}</option>
                  {availableCourses.map((c) => (
                    <option key={c._id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="courseDuration" className="block text-sm font-medium text-gray-700 mb-1">
                  Duration <span className="text-red-600">*</span>
                </label>
                <input
                  id="courseDuration"
                  name="courseDuration"
                  type="text"
                  required
                  placeholder="e.g. 6 Months, 1 Year"
                  value={courseDuration}
                  onChange={(e) => setCourseDuration(e.target.value)}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${invalidFields.has("courseDuration") ? "border-red-500" : ""}`}
                />
              </div>
              <div>
                <label htmlFor="caste" className="block text-sm font-medium text-gray-700 mb-1">
                  Caste <span className="text-red-600">*</span>
                </label>
                <input
                  id="caste"
                  name="caste"
                  type="text"
                  required
                  placeholder="जाति"
                  value={caste}
                  onChange={(e) => setCaste(e.target.value)}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${invalidFields.has("caste") ? "border-red-500" : ""}`}
                />
              </div>
              <div>
                <label htmlFor="residence" className="block text-sm font-medium text-gray-700 mb-1">
                  Residence <span className="text-red-600">*</span>
                </label>
                <input
                  id="residence"
                  name="residence"
                  type="text"
                  required
                  placeholder="निवास स्थान"
                  value={residence}
                  onChange={(e) => setResidence(e.target.value)}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${invalidFields.has("residence") ? "border-red-500" : ""}`}
                />
              </div>
              {/* Photo Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Photo (Max 100KB) <span className="text-red-600">*</span>
                </label>
                <div className={`flex items-center justify-center h-32 border-2 border-dashed rounded-md ${invalidFields.has("photo") ? "border-red-500" : "border-gray-300"}`}>
                  {photoPreview ? (
                    <img src={photoPreview} alt="Preview" className="object-cover h-full w-full" />
                  ) : (
                    <span className="text-gray-400">No photo selected</span>
                  )}
                </div>
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  required
                  onChange={handlePhotoChange}
                  className="mt-2 block w-full text-sm text-gray-600 file:mr-2 file:rounded file:border-0 file:bg-indigo-600 file:text-white file:px-4 file:py-2"
                />
              </div>
            </div>
          </div>

          {/* Declaration */}
          <div className="border border-gray-200 rounded-md p-4 mt-6">
            <h3 className="text-sm font-bold text-gray-800 mb-2">घोषणा एवं शपथ पत्र</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              मैं <span className="font-medium">{name || "___________"}</span> जाति <span className="font-medium">{caste || "____"}</span> निवासी <span className="font-medium">{residence || "____"}</span> आयु <span className="font-medium">{age || "___"}</span> वर्ष का/की, कोर्स <span className="font-medium">{course || "___________"}</span> में प्रवेश ले रही/रहा हूँ।
              मैं घोषणा करता/करती हूँ कि उपरोक्त सभी विवरण सत्य हैं तथा संस्थान के नियमों का पालन करूँगा/करूँगी।
            </p>
            <div className="mt-4 flex items-start">
              <input
                id="declarationAccepted"
                type="checkbox"
                checked={declarationAccepted}
                onChange={(e) => setDeclarationAccepted(e.target.checked)}
                className="mt-1 h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="declarationAccepted" className="ml-2 text-sm text-gray-700">
                I accept the above declaration and confirm all details are correct. <span className="text-red-600">*</span>
              </label>
            </div>
            {/* Student Signature */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Student Signature (Max 100KB) <span className="text-red-600">*</span>
              </label>
              <input
                type="file"
                name="studentSignature"
                accept="image/*"
                required
                className="block w-full text-sm text-gray-600 file:mr-2 file:rounded file:border-0 file:bg-indigo-600 file:text-white file:px-4 file:py-2"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6 text-center">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {loading ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                </svg>
              ) : null}
              {loading ? "Submitting..." : "Submit Registration"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );


  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="overflow-hidden rounded-lg border-2 border-slate-800 bg-white shadow-lg">
        {/* Form Header */}
        <div className="border-b-2 border-slate-800 px-6 py-5 text-center">
          <h1 className="text-2xl font-black uppercase tracking-wide text-slate-900 md:text-3xl">
            {brandName}
          </h1>
          <p className="mt-1 text-sm font-semibold text-slate-600">Fashion And Technology Trust</p>
          <p className="mt-2 text-[11px] font-medium leading-relaxed text-slate-500">
            An ISO 9001:2015 Certified Institute | Regd by NCT Govt. of Delhi / Niti Aayog / IEDUP
            Lucknow / MSME Govt. of India
          </p>
          <p className="mt-1 text-xs font-semibold text-slate-600">
            14, Arya Nagar, Firozabad - 283203
          </p>
          <h2 className="mt-4 text-xl font-black uppercase tracking-widest text-slate-900 underline decoration-2 underline-offset-4">
            Registration Form
          </h2>
        </div>

        {msg && (
          <div
            className={`mx-6 mt-6 rounded-lg border p-4 text-sm font-semibold ${
              msg.type === "success"
                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                : "border-red-200 bg-red-50 text-red-700"
            }`}
          >
            {msg.text}
          </div>
        )}

        <form ref={formRef} onSubmit={handleSubmit} className="p-6 md:p-8">
          {/* Enroll No & Date row */}
          <div className="mb-6 grid grid-cols-1 gap-4 border-b border-slate-200 pb-4 md:grid-cols-2">
            <div>
              <label className={labelCls()}>Enroll No.</label>
              <input
                readOnly
                value="Assigned after approval"
                className={`${inputCls()} cursor-not-allowed text-slate-400`}
              />
            </div>
            <div>
              <label className={labelCls("registrationDate")}>Date *</label>
              <input
                required
                type="date"
                name="registrationDate"
                className={inputCls("registrationDate")}
                value={registrationDate}
                min={ISO_DATE_MIN}
                max={todayIso}
                onChange={(e) => setRegistrationDate(sanitizeIsoDateInput(e.target.value))}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_160px]">
            {/* Main Fields */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className={labelCls("name")}>Name *</label>
                  <input
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputCls("name")}
                    placeholder="Student's full name"
                  />
                </div>
                <div>
                  <label className={labelCls("fatherName")}>F. Name *</label>
                  <input required name="fatherName" className={inputCls("fatherName")} placeholder="Father's name" />
                </div>
                <div>
                  <label className={labelCls("husbandName")}>Husb. Name</label>
                  <input name="husbandName" className={inputCls("husbandName")} placeholder="Husband's name (if applicable)" />
                </div>
                <div className="md:col-span-2">
                  <label className={labelCls("motherName")}>Mother Name *</label>
                  <input required name="motherName" className={inputCls("motherName")} placeholder="Mother's name" />
                </div>
                <div>
                  <label className={labelCls("dob")}>Date of Birth *</label>
                  <input
                    required
                    type="date"
                    name="dob"
                    value={dob}
                    className={inputCls("dob")}
                    min={ISO_DATE_MIN}
                    max={todayIso}
                    onChange={(e) => setDob(sanitizeIsoDateInput(e.target.value))}
                  />
                </div>
                <div>
                  <label className={labelCls("age")}>Age</label>
                  <input readOnly name="age" value={age} className={`${inputCls("age")} bg-slate-50`} placeholder="Auto-calculated" />
                </div>
                <div className="md:col-span-2">
                  <label className={labelCls("education")}>Education *</label>
                  <input required name="education" className={inputCls("education")} placeholder="Highest qualification" />
                </div>
                <div className="md:col-span-2">
                  <label className={labelCls("address")}>Address *</label>
                  <textarea
                    required
                    name="address"
                    rows={2}
                    className={inputCls("address")}
                    placeholder="Complete residential address"
                  />
                </div>
                <div>
                  <label className={labelCls("aadharNo")}>Aadhar No.</label>
                  <input
                    name="aadharNo"
                    className={inputCls("aadharNo")}
                    placeholder="12-digit Aadhar"
                    maxLength={12}
                    inputMode="numeric"
                  />
                </div>
                <div>
                  <label className={labelCls("mobile")}>Mob. No. 1 *</label>
                  <input
                    required
                    name="mobile"
                    className={inputCls("mobile")}
                    placeholder="10-digit mobile"
                    maxLength={10}
                    inputMode="numeric"
                  />
                </div>
                <div>
                  <label className={labelCls("mobile2")}>Mob. No. 2</label>
                  <input
                    name="mobile2"
                    className={inputCls("mobile2")}
                    placeholder="Alternate mobile"
                    maxLength={10}
                    inputMode="numeric"
                  />
                </div>
                <div>
                  <label className={labelCls("course")}>Course Name *</label>
                  <select
                    required
                    name="course"
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    className={inputCls("course")}
                    disabled={availableCourses.length === 0}
                  >
                    <option value="">
                      {availableCourses.length > 0 ? "Select course" : "Loading courses..."}
                    </option>
                    {availableCourses.map((c) => (
                      <option key={c._id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelCls("courseDuration")}>Duration *</label>
                  <input
                    required
                    name="courseDuration"
                    value={courseDuration}
                    onChange={(e) => setCourseDuration(e.target.value)}
                    className={inputCls("courseDuration")}
                    placeholder="e.g. 6 Months, 1 Year"
                  />
                </div>
              </div>
            </div>

            {/* Photo Box */}
            <div className="flex flex-col items-center">
              <div
                className={`flex h-44 w-full flex-col items-center justify-center border-2 border-dashed ${
                  invalidFields.has("photo") ? "border-red-500 bg-red-50" : "border-slate-400 bg-slate-50"
                }`}
              >
                {photoPreview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={photoPreview} alt="Preview" className="h-full w-full object-cover" />
                ) : (
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Photo</span>
                )}
              </div>
              <label className={`mt-2 text-[10px] font-bold uppercase ${invalidFields.has("photo") ? "text-red-700" : "text-slate-500"}`}>
                Upload Photo * (Max 100KB)
              </label>
              <input
                required
                type="file"
                name="photo"
                accept="image/*"
                onChange={handlePhotoChange}
                className="mt-1 w-full text-[10px] file:mr-2 file:rounded file:border file:border-slate-300 file:bg-white file:px-2 file:py-1 file:text-[10px]"
              />
              <p className="mt-4 text-[10px] font-semibold uppercase text-slate-400">Sign. &amp; Seal</p>
            </div>
          </div>

          {/* Declaration Section */}
          <div className="mt-8 rounded-lg border border-slate-300 bg-slate-50 p-5">
            <h3 className="mb-3 text-center text-sm font-black uppercase tracking-wide text-slate-800">
              घोषणा एवं शपथ पत्र
            </h3>
            <p className="text-sm leading-relaxed text-slate-700">
              मैं{" "}
              <input
                readOnly
                value={name || "___________"}
                className="inline-block min-w-[120px] border-b border-slate-400 bg-transparent px-1 text-center font-semibold"
              />{" "}
              जाति{" "}
              <input
                required
                name="caste"
                value={caste}
                onChange={(e) => setCaste(e.target.value)}
                className={`inline-block min-w-[80px] border-b bg-transparent px-1 text-center font-semibold ${invalidFields.has("caste") ? "border-red-500" : "border-slate-400"}`}
                placeholder="जाति"
              />{" "}
              निवासी{" "}
              <input
                required
                name="residence"
                value={residence}
                onChange={(e) => setResidence(e.target.value)}
                className={`inline-block min-w-[120px] border-b bg-transparent px-1 text-center font-semibold ${invalidFields.has("residence") ? "border-red-500" : "border-slate-400"}`}
                placeholder="निवास स्थान"
              />{" "}
              आयु{" "}
              <input
                readOnly
                value={age || "___"}
                className="inline-block w-10 border-b border-slate-400 bg-transparent px-1 text-center font-semibold"
              />{" "}
              वर्ष का/की, कोर्स{" "}
              <input
                readOnly
                value={course || "___________"}
                className="inline-block min-w-[120px] border-b border-slate-400 bg-transparent px-1 text-center font-semibold"
              />{" "}
              में प्रवेश ले रही/रहा हूँ। मैं घोषणा करता/करती हूँ कि उपरोक्त सभी विवरण सत्य हैं तथा
              संस्थान के नियमों का पालन करूँगा/करूँगी।
            </p>

            <label className={`mt-4 flex items-start gap-2 text-sm ${invalidFields.has("declarationAccepted") ? "text-red-700" : "text-slate-700"}`}>
              <input
                type="checkbox"
                checked={declarationAccepted}
                onChange={(e) => setDeclarationAccepted(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-slate-300"
              />
              <span>I accept the above declaration and confirm all details are correct. *</span>
            </label>

            <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className={`text-xs font-semibold uppercase ${invalidFields.has("studentSignature") ? "text-red-700" : "text-slate-600"}`}>
                  Sign. of Student * (Max 100KB)
                </label>
                <input
                  required
                  type="file"
                  name="studentSignature"
                  accept="image/*"
                  className="mt-1 w-full text-xs file:mr-2 file:rounded file:border file:border-slate-300 file:bg-white file:px-2 file:py-1 file:text-[10px]"
                />
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              disabled={loading}
              type="submit"
              className="flex items-center gap-2 rounded-lg bg-blue-700 px-10 py-3 text-sm font-black uppercase tracking-wider text-white shadow-lg transition hover:bg-blue-800 disabled:opacity-70"
            >
              {loading ? (
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <CheckCircle className="h-5 w-5" />
              )}
              {loading ? "Submitting..." : "Submit Registration"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
