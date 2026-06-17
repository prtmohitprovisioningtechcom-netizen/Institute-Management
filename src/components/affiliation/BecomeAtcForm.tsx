"use client";

import { Fragment, type FormEvent, useMemo, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Building2, User, Layers, CreditCard, ChevronDown,
  Send, RotateCcw, CheckCircle, MapPin, Phone, Mail,
  BookOpen, Briefcase, Calendar, Camera, Home, QrCode, X, FileText, Upload
} from "lucide-react";
import PaymentReceipt, { type ReceiptData, type InfraRow } from "./PaymentReceipt";
import AffiliationZoneFeeBlock from "./AffiliationZoneFeeBlock";
import {
  DISTRICTS_BY_STATE,
  getYearOptions,
} from "@/utils/atcSettings";
import type { FeeCalculationSnapshot, ZoneFeeRow } from "@/utils/affiliationFeeShared";
import { apiFetch } from "@/utils/api";
import { useBrand } from "@/context/BrandContext";
import { ISO_DATE_MIN, isValidIsoDate, normalizeIsoDate } from "@/lib/isoDate";

type FormState = {
  affiliationYear: string; trainingPartnerName: string; trainingPartnerAddress: string;
  postalAddressOffice: string; zones: string[];
  totalName: string; district: string; state: string; pin: string; country: string;
  mobile: string; email: string; statusOfInstitution: string; yearOfEstablishment: string;
  chiefName: string; designation: string; educationQualification: string;
  professionalExperience: string; dob: string; aadharNo: string; paymentMode: string;
  paidAmount: string; transactionNo: string;
  city: string; postOffice: string; classRoom: string; officeRoom: string;
  institutePhone: string; instituteStd: string; instituteCell: string; website: string;
  directorAddress: string; directorCity: string; directorPostOffice: string;
  directorPinCode: string; directorDistrict: string; directorState: string;
  directorCountry: string; directorPhone: string; directorStd: string; directorCell: string;
  govPresident: string; govVicePresident: string; govSecretary: string;
  govAssistantSecretary: string; govTreasurer: string; govMember1: string; govMember2: string;
  applicationDate: string;
};

const initialFormState: FormState = {
  affiliationYear: "", trainingPartnerName: "", trainingPartnerAddress: "", postalAddressOffice: "", zones: [],
  totalName: "", district: "", state: "", pin: "", country: "INDIA", mobile: "", email: "",
  statusOfInstitution: "Trust", yearOfEstablishment: "2024", chiefName: "", designation: "Director",
  educationQualification: "", professionalExperience: "", dob: "1990-01-01", aadharNo: "000000000000", paymentMode: "gpay",
  paidAmount: "", transactionNo: "",
  city: "", postOffice: "", classRoom: "", officeRoom: "", institutePhone: "", instituteStd: "", instituteCell: "", website: "",
  directorAddress: "", directorCity: "", directorPostOffice: "", directorPinCode: "", directorDistrict: "", directorState: "",
  directorCountry: "INDIA", directorPhone: "", directorStd: "", directorCell: "",
  govPresident: "", govVicePresident: "", govSecretary: "", govAssistantSecretary: "", govTreasurer: "", govMember1: "", govMember2: "",
  applicationDate: "",
};

const infraFields = ["Staff Room", "Class Room", "Computer Lab", "Reception", "Toilets", "Any Other"] as const;
const emptyInfra: Record<(typeof infraFields)[number], InfraRow> = {
  "Staff Room": { rooms: "N/A", seats: "N/A", area: "N/A" },
  "Class Room": { rooms: "N/A", seats: "N/A", area: "N/A" },
  "Computer Lab": { rooms: "N/A", seats: "N/A", area: "N/A" },
  Reception: { rooms: "N/A", seats: "N/A", area: "N/A" },
  Toilets: { rooms: "N/A", seats: "N/A", area: "N/A" },
  "Any Other": { rooms: "N/A", seats: "N/A", area: "N/A" },
};

const INDIAN_STATES = Object.keys(DISTRICTS_BY_STATE);

// ── Reusable styled components ─────────────────────────────────────────────
const inputCls = [
  "w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800",
  "placeholder-slate-400 outline-none transition",
  "focus:border-[#0a0aa1] focus:ring-2 focus:ring-[#0a0aa1]/10",
  "hover:border-slate-300",
].join(" ");

const selectCls = inputCls + " appearance-none cursor-pointer";

const Label = ({ children }: { children: React.ReactNode }) => (
  <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
    {children}
  </label>
);

const SectionCard = ({
  icon: Icon, title, subtitle, children, color = "#0a0aa1",
}: { icon: React.ElementType; title: string; subtitle?: string; children: React.ReactNode; color?: string }) => (
  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
    <div className="flex items-center gap-3 px-4 sm:px-5 py-4 border-b border-slate-100"
      style={{ background: `linear-gradient(135deg, ${color}08 0%, ${color}04 100%)` }}>
      <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-sm"
        style={{ background: `linear-gradient(135deg, ${color} 0%, ${color}cc 100%)` }}>
        <Icon className="w-4 h-4 text-white" />
      </div>
      <div>
        <h3 className="font-bold text-slate-800 text-sm">{title}</h3>
        {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
      </div>
    </div>
    <div className="px-4 sm:px-5 py-5">{children}</div>
  </div>
);

const SelectWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="relative">
    {children}
    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
  </div>
);

export default function BecomeAtcForm() {
  const { brandName, brandLogo } = useBrand();
  const [form, setForm] = useState<FormState>(initialFormState);
  const [photo, setPhoto] = useState<File | null>(null);
  const [logo, setLogo] = useState<File | null>(null);
  const [signature, setSignature] = useState<File | null>(null);
  const [aadharDoc, setAadharDoc] = useState<File | null>(null);
  const [marksheetDoc, setMarksheetDoc] = useState<File | null>(null);
  const [otherDocs, setOtherDocs] = useState<File | null>(null);
  const [instituteDocument, setInstituteDocument] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [receiptData, setReceiptData] = useState<ReceiptData | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [lastRefNumber, setLastRefNumber] = useState("");
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [feeCalculation, setFeeCalculation] = useState<FeeCalculationSnapshot | null>(null);
  const [infra, setInfra] = useState<Record<(typeof infraFields)[number], InfraRow>>(emptyInfra);
  const [invalidFields, setInvalidFields] = useState<Set<string>>(new Set());

  const onFeeCalculationUpdate = useCallback((c: FeeCalculationSnapshot | null) => {
    setFeeCalculation(c);
  }, []);

  const [zoneCatalog, setZoneCatalog] = useState<ZoneFeeRow[]>([]);
  const [zoneCatalogLoading, setZoneCatalogLoading] = useState(true);

  useEffect(() => {
    apiFetch("/api/public/settings?key=qr_code")
      .then(res => res.json())
      .then(data => setQrCode(data.value))
      .catch(() => {});
  }, []);

  useEffect(() => {
    let cancelled = false;
    setZoneCatalogLoading(true);
    apiFetch("/year-plans")
      .then((r) => r.json())
      .then((d: { zones?: ZoneFeeRow[] }) => {
        if (cancelled) return;
        const rows = Array.isArray(d.zones)
          ? d.zones
              .filter((z): z is ZoneFeeRow => z != null && typeof z.name === "string" && typeof z.amount === "number")
              .map((z) => ({ name: z.name.trim(), amount: Math.round(z.amount) }))
          : [];
        setZoneCatalog(rows);
      })
      .catch(() => {
        if (!cancelled) setZoneCatalog([]);
      })
      .finally(() => {
        if (!cancelled) setZoneCatalogLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const districtOptions = DISTRICTS_BY_STATE[form.state] ?? [];
  const dobMax = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const setStateField = (value: string) => {
    setForm((current) => ({
      ...current,
      state: value,
      district: DISTRICTS_BY_STATE[value]?.includes(current.district) ? current.district : "",
    }));
  };

  const errors = useMemo(() => {
    const r: string[] = [];
    return { list: r, requiredSet: new Set<string>() };
  }, []);

  const setField = (field: keyof FormState, value: string) => {
    setForm((c) => ({ ...c, [field]: value }));
    if (invalidFields.has(field)) {
      setInvalidFields((prev) => {
        const next = new Set(prev);
        next.delete(field);
        return next;
      });
    }
  };

  const requiredHint = (field: string) =>
    invalidFields.has(field) ? <p className="mt-1 text-xs font-semibold text-red-700">Required field</p> : null;

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    if (errors.list.length) {
      setError(errors.list[0]);
      setInvalidFields(errors.requiredSet);
      return;
    }
    setLoading(true);
    try {
      const payload = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        let val = String(value ?? "").trim();
        if (key === "zones") {
          payload.append(key, JSON.stringify([]));
        } else if (key === "paymentMode") {
          payload.append(key, "offline");
        } else {
          if (!val) {
            if (key === "trainingPartnerName") val = "Not Provided";
            else if (key === "trainingPartnerAddress") val = "Not Provided";
            else if (key === "district") val = "Not Provided";
            else if (key === "state") val = "Delhi";
            else if (key === "pin") val = "110001";
            else if (key === "mobile") val = "0000000000";
            else if (key === "email") val = `atc-${Date.now()}@example.com`;
            else if (key === "statusOfInstitution") val = "Trust";
            else if (key === "yearOfEstablishment") val = "2024";
            else if (key === "chiefName") val = "Not Provided";
            else if (key === "designation") val = "Director";
            else if (key === "educationQualification") val = "Not Provided";
            else if (key === "professionalExperience") val = "Not Provided";
            else if (key === "dob") val = "1990-01-01";
            else if (key === "affiliationYear") val = "1";
          }
          payload.append(key, val);
        }
      });
      payload.set("paymentMode", "offline");
      payload.set("zones", JSON.stringify([]));
      if (photo) payload.append("photo", photo);
      if (logo) payload.append("logo", logo);
      if (signature) payload.append("signature", signature);
      if (aadharDoc) payload.append("aadharDoc", aadharDoc);
      if (marksheetDoc) payload.append("marksheetDoc", marksheetDoc);
      if (otherDocs) payload.append("otherDocs", otherDocs);
      if (instituteDocument) payload.append("instituteDocument", instituteDocument);
      payload.append("infrastructure", JSON.stringify(infra));
      
      const response = await fetch("/api/send-to-phone", { method: "POST", body: payload });
      const data = (await response.json()) as { whatsappUrl?: string; refNumber?: string; message?: string };
      if (!response.ok) { setError(data.message ?? "Form submission failed. Try again."); return; }
      if (data.whatsappUrl) {
        window.open(data.whatsappUrl, "_blank");
      }
      const newRef = data.refNumber ?? Date.now().toString().slice(-6);
      setLastRefNumber(newRef);
      setReceiptData({
        refNumber: newRef,
        submitDate: new Date().toLocaleString("en-IN"),
        ...form,
        infrastructure: infra as Record<string, InfraRow>,
        signatureUrl: signature ? URL.createObjectURL(signature) : undefined,
      });
      setShowSuccessModal(true);
    } catch {
      setError("Network error while submitting form.");
    } finally {
      setLoading(false);
    }
  };

  const onReset = () => {
    setForm(initialFormState); setInfra(emptyInfra);
    setPhoto(null); setLogo(null); setSignature(null); setAadharDoc(null); setMarksheetDoc(null); setOtherDocs(null);
    setInstituteDocument(null); setError(null); setReceiptData(null);
    setFeeCalculation(null);
    setInvalidFields(new Set());
  };

  if (receiptData && !showSuccessModal) {
    return <PaymentReceipt data={receiptData} onBack={onReset} />;
  }

  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden mb-12">
        {/* HEADER SECTION */}
        <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-[#0a0aa1] p-8 text-white flex flex-col sm:flex-row items-center gap-6">
          <div className="w-28 h-28 shrink-0 bg-white rounded-2xl p-1 shadow-lg shadow-black/20 flex items-center justify-center overflow-hidden">
            {brandLogo ? (
              <img src={brandLogo} alt={brandName} className="w-full h-full object-contain" />
            ) : (
              <div className="w-full h-full rounded-xl border-2 border-dashed border-blue-200 flex items-center justify-center text-center text-[10px] font-bold text-blue-900 leading-tight p-2 bg-blue-50">
                SUNIL GROUP<br/>OF EDUCATION<br/>TRUST
              </div>
            )}
          </div>
          
          <div className="flex-1 text-center sm:text-left space-y-2">
            <h1 className="text-xl sm:text-2xl font-black uppercase tracking-wider text-blue-50">SUNIL GROUP OF EDUCATION FASHION AND TECHNOLOGY TRUST</h1>
            <p className="text-xs sm:text-sm text-blue-200 font-medium leading-relaxed">
              REGD BY-NCT GOVT.OF DELHI, MSME, NITI AAYOG, MCA GOVT. OF INDIA<br/>
              AN ISO-9001-2015 CERTIFIED INSTITUTE<br/>
              HO - SUBHASH VIHAR DELHI, RO ARYA NAGAR, FIROZABAD, U.P
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-bold mt-2">
              <span className="bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm">goodlucksunil212@gmail.com</span>
              <span className="bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm">MOB. 9258410701</span>
              <span className="bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm">sgeftskillindia.com</span>
            </div>
          </div>
          
          <div className="w-32 shrink-0 flex flex-col">
            <label className="border-2 border-dashed border-white/40 rounded-2xl w-full h-28 flex flex-col items-center justify-center cursor-pointer hover:bg-white/10 transition relative overflow-hidden bg-white/5 backdrop-blur-sm group">
              {photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={URL.createObjectURL(photo)} alt="Photo" className="w-full h-full object-cover" />
              ) : (
                <>
                  <Upload className="w-8 h-8 text-white/60 group-hover:text-white mb-2 transition" />
                  <span className="font-bold tracking-widest text-xs text-white/80 group-hover:text-white transition">PHOTO</span>
                </>
              )}
              <input type="file" accept="image/jpeg,image/png" className="hidden" onChange={(e) => setPhoto(e.target.files?.[0] ?? null)} />
            </label>
          </div>
        </div>

        <div className="bg-amber-50 border-b border-amber-100 p-4 text-center">
          <h2 className="text-lg font-black text-amber-900 uppercase tracking-widest">Affiliation Form</h2>
          <p className="text-xs text-amber-700 font-medium">Please fill in block letters</p>
        </div>

        <form onSubmit={onSubmit} onReset={onReset} className="p-6 sm:p-10 space-y-12">
          
          {/* SECTION 1: INSTITUTE'S OFFICE ADDRESS */}
          <section className="space-y-6">
            <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight border-b-2 border-blue-600 pb-3 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm">1</span> 
              INSTITUTE'S OFFICE ADDRESS
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Institute Name</label>
                <input className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition uppercase font-bold text-slate-800" placeholder="Enter Institute Name" value={form.trainingPartnerName} onChange={e => setField('trainingPartnerName', e.target.value.toUpperCase())} />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Full Address</label>
                <input className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition uppercase text-slate-800" placeholder="Enter Full Address" value={form.trainingPartnerAddress} onChange={e => setField('trainingPartnerAddress', e.target.value.toUpperCase())} />
              </div>
              
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">City</label>
                <input className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition uppercase text-slate-800" value={form.city} onChange={e => setField('city', e.target.value.toUpperCase())} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Post Office</label>
                <input className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition uppercase text-slate-800" value={form.postOffice} onChange={e => setField('postOffice', e.target.value.toUpperCase())} />
              </div>
              
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Pin Code</label>
                <input className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition uppercase text-slate-800" value={form.pin} onChange={e => setField('pin', e.target.value.toUpperCase())} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">District</label>
                <input className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition uppercase text-slate-800" value={form.district} onChange={e => setField('district', e.target.value.toUpperCase())} />
              </div>
              
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">State</label>
                <input className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition uppercase text-slate-800" value={form.state} onChange={e => setField('state', e.target.value.toUpperCase())} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Country</label>
                <input className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition uppercase text-slate-800" value={form.country} onChange={e => setField('country', e.target.value.toUpperCase())} />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Class Room</label>
                  <input className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition uppercase text-slate-800" value={form.classRoom} onChange={e => setField('classRoom', e.target.value.toUpperCase())} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Office Room</label>
                  <input className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition uppercase text-slate-800" value={form.officeRoom} onChange={e => setField('officeRoom', e.target.value.toUpperCase())} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Phone</label>
                  <input className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition uppercase text-slate-800" value={form.institutePhone} onChange={e => setField('institutePhone', e.target.value.toUpperCase())} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">STD</label>
                  <input className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition uppercase text-slate-800" value={form.instituteStd} onChange={e => setField('instituteStd', e.target.value.toUpperCase())} />
                </div>
              </div>
              
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Cell (Mobile)</label>
                <input className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition uppercase text-slate-800" value={form.mobile} onChange={e => setField('mobile', e.target.value.toUpperCase())} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Email</label>
                <input type="email" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition uppercase text-slate-800" value={form.email} onChange={e => setField('email', e.target.value.toUpperCase())} />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Website</label>
                <input className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition text-slate-800" value={form.website} onChange={e => setField('website', e.target.value)} />
              </div>
            </div>
          </section>

          {/* SECTION 2: DIRECTOR'S NAME & ADDRESS */}
          <section className="space-y-6 pt-4">
            <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight border-b-2 border-amber-500 pb-3 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-sm">2</span> 
              DIRECTOR'S NAME & ADDRESS
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Director's Name</label>
                <input className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition uppercase font-bold text-slate-800" value={form.chiefName} onChange={e => setField('chiefName', e.target.value.toUpperCase())} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Qualification</label>
                <input className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition uppercase text-slate-800" value={form.educationQualification} onChange={e => setField('educationQualification', e.target.value.toUpperCase())} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Occupation</label>
                <input className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition uppercase text-slate-800" value={form.professionalExperience} onChange={e => setField('professionalExperience', e.target.value.toUpperCase())} />
              </div>
              
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Full Address</label>
                <input className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition uppercase text-slate-800" value={form.directorAddress} onChange={e => setField('directorAddress', e.target.value.toUpperCase())} />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">City</label>
                <input className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition uppercase text-slate-800" value={form.directorCity} onChange={e => setField('directorCity', e.target.value.toUpperCase())} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Post Office</label>
                <input className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition uppercase text-slate-800" value={form.directorPostOffice} onChange={e => setField('directorPostOffice', e.target.value.toUpperCase())} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Pin Code</label>
                <input className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition uppercase text-slate-800" value={form.directorPinCode} onChange={e => setField('directorPinCode', e.target.value.toUpperCase())} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">District</label>
                <input className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition uppercase text-slate-800" value={form.directorDistrict} onChange={e => setField('directorDistrict', e.target.value.toUpperCase())} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">State</label>
                <input className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition uppercase text-slate-800" value={form.directorState} onChange={e => setField('directorState', e.target.value.toUpperCase())} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Country</label>
                <input className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition uppercase text-slate-800" value={form.directorCountry} onChange={e => setField('directorCountry', e.target.value.toUpperCase())} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Phone</label>
                  <input className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition uppercase text-slate-800" value={form.directorPhone} onChange={e => setField('directorPhone', e.target.value.toUpperCase())} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">STD</label>
                  <input className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition uppercase text-slate-800" value={form.directorStd} onChange={e => setField('directorStd', e.target.value.toUpperCase())} />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Cell</label>
                <input className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition uppercase text-slate-800" value={form.directorCell} onChange={e => setField('directorCell', e.target.value.toUpperCase())} />
              </div>
            </div>
          </section>

          {/* SECTION 3: GOVERNING BODY */}
          <section className="space-y-6 pt-4">
            <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight border-b-2 border-emerald-500 pb-3 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm">3</span> 
              GOVERNING BODY
              <span className="text-xs text-slate-400 font-normal ml-2 tracking-normal capitalize">(IF YES, FILL THE BLANKS)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                { label: "PRESIDENT", field: "govPresident" },
                { label: "VICE-PRESIDENT", field: "govVicePresident" },
                { label: "SECRETARY", field: "govSecretary" },
                { label: "ASSISTANT SECRETARY", field: "govAssistantSecretary" },
                { label: "TREASURER", field: "govTreasurer" },
                { label: "MEMBER", field: "govMember1" },
                { label: "MEMBER", field: "govMember2" }
              ].map((item) => (
                <div className="space-y-1.5" key={item.field}>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">{item.label}</label>
                  <input className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition uppercase text-slate-800" value={(form as any)[item.field]} onChange={e => setField(item.field as keyof FormState, e.target.value.toUpperCase())} />
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 4: APPLICATION DETAILS */}
          <section className="space-y-6 pt-4">
            <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight border-b-2 border-purple-500 pb-3 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-sm">4</span> 
              APPLICATION DETAILS
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-purple-50/50 p-6 rounded-2xl border border-purple-100">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Apply For (Years)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">Years:</span>
                  <input className="w-full pl-16 pr-4 py-3 rounded-xl bg-white border border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition text-slate-800 font-bold" value={form.affiliationYear} onChange={e => setField('affiliationYear', e.target.value.replace(/\D/g, ''))} />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Application Date</label>
                <input type="date" className="w-full px-4 py-3 rounded-xl bg-white border border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition text-slate-800" value={form.applicationDate} onChange={e => setField('applicationDate', e.target.value)} />
              </div>
            </div>
          </section>

          {/* OFFICE USE ONLY SECTION */}
          <div className="mt-8 rounded-2xl border border-slate-800 overflow-hidden bg-gradient-to-r from-[#ffebeb] to-[#fff5f5] pb-6 shadow-sm">
            <div className="bg-[#d32f2f] text-white font-black text-center py-2.5 text-sm sm:text-base uppercase tracking-widest border-b border-slate-800">
              OFFICE USE ONLY
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-6 p-6">
              {/* Left Column: Form Fields */}
              <div className="space-y-4">
                {/* Approved Institute Code */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="border border-slate-800 px-3 py-1 bg-white text-[10px] sm:text-xs font-bold uppercase text-slate-800 whitespace-nowrap">
                    APPROVED INSTITUTE CODE
                  </div>
                  <input
                    type="text"
                    className="w-36 h-8 bg-[#ffffcc] border border-slate-800 outline-none px-2 text-slate-800 font-bold"
                  />
                </div>

                {/* Approved Years */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="border border-slate-800 px-3 py-1 bg-white text-[10px] sm:text-xs font-bold uppercase text-slate-800 whitespace-nowrap">
                    APPROVED YEARS
                  </div>
                  <input
                    type="text"
                    className="w-20 h-8 bg-[#ffffcc] border border-slate-800 outline-none px-2 text-center text-slate-800 font-bold"
                  />
                </div>

                {/* Date */}
                <div className="flex flex-wrap items-center gap-2 mt-4 text-[10px] sm:text-xs font-bold text-slate-800">
                  <span className="whitespace-nowrap uppercase tracking-wider text-slate-800">DATE :</span>
                  <div className="flex items-center gap-1">
                    <div className="flex gap-0.5">
                      <input type="text" maxLength={1} className="w-6 h-6 sm:w-7 sm:h-7 border border-slate-800 bg-white text-center font-bold text-slate-800 outline-none" />
                      <input type="text" maxLength={1} className="w-6 h-6 sm:w-7 sm:h-7 border border-slate-800 bg-white text-center font-bold text-slate-800 outline-none" />
                    </div>
                    <span className="text-slate-800 font-black px-0.5"> </span>
                    <div className="flex gap-0.5">
                      <input type="text" maxLength={1} className="w-6 h-6 sm:w-7 sm:h-7 border border-slate-800 bg-white text-center font-bold text-slate-800 outline-none" />
                      <input type="text" maxLength={1} className="w-6 h-6 sm:w-7 sm:h-7 border border-slate-800 bg-white text-center font-bold text-slate-800 outline-none" />
                    </div>
                    <span className="text-slate-800 font-black px-0.5"> </span>
                    <div className="flex gap-0.5">
                      <input type="text" maxLength={1} className="w-6 h-6 sm:w-7 sm:h-7 border border-slate-800 bg-white text-center font-bold text-slate-800 outline-none" />
                      <input type="text" maxLength={1} className="w-6 h-6 sm:w-7 sm:h-7 border border-slate-800 bg-white text-center font-bold text-slate-800 outline-none" />
                      <input type="text" maxLength={1} className="w-6 h-6 sm:w-7 sm:h-7 border border-slate-800 bg-white text-center font-bold text-slate-800 outline-none" />
                      <input type="text" maxLength={1} className="w-6 h-6 sm:w-7 sm:h-7 border border-slate-800 bg-white text-center font-bold text-slate-800 outline-none" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Signature Block */}
              <div className="flex justify-start md:justify-end items-center mt-4 md:mt-0">
                <label className="w-full max-w-[280px] border border-slate-800 bg-white flex flex-col justify-between overflow-hidden shadow-sm cursor-pointer hover:bg-slate-50/50 transition relative group">
                  <div className="h-16 flex flex-col items-center justify-center relative">
                    {signature ? (
                      <img src={URL.createObjectURL(signature)} alt="Signature" className="h-full object-contain p-1" />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-slate-400">
                        <Upload className="w-5 h-5 mb-1 text-slate-400 group-hover:text-slate-600 transition" />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-slate-600 transition">Upload Signature</span>
                      </div>
                    )}
                  </div>
                  <div className="border-t border-slate-800 bg-slate-50 py-1.5 text-center text-xs font-bold uppercase tracking-wider text-slate-800">
                    Signature
                  </div>
                  <input type="file" accept="image/jpeg,image/png" className="hidden" onChange={(e) => setSignature(e.target.files?.[0] ?? null)} />
                </label>
              </div>
            </div>
          </div>

          {error && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 font-bold text-sm flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-500 shrink-0">!</span>
              {error}
            </div>
          )}
          
          <button type="submit" disabled={loading} className="w-full mt-8 bg-gradient-to-r from-blue-700 to-[#0a0aa1] text-white font-black px-8 py-5 rounded-2xl text-lg uppercase tracking-widest hover:shadow-xl hover:shadow-blue-900/20 active:scale-[0.98] transition-all disabled:opacity-70 disabled:active:scale-100 flex items-center justify-center gap-3">
             {loading ? <><span className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin"></span> Processing...</> : "Submit Application"}
          </button>
        </form>
      </div>

      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl w-full max-w-sm p-8 text-center shadow-2xl animate-in zoom-in-95">
             <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
               <CheckCircle className="w-10 h-10 text-green-500" />
             </div>
             <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight mb-2">Success!</h3>
             <p className="text-sm text-slate-500 mb-6 leading-relaxed">Your application has been submitted successfully.<br/><span className="inline-block mt-2 font-mono bg-slate-100 px-3 py-1 rounded-lg text-slate-700 font-bold">Ref: {lastRefNumber}</span></p>
             <button onClick={() => setShowSuccessModal(false)} className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition shadow-lg shadow-slate-900/20">Close & Return</button>
          </div>
        </div>
      )}
    </div>
  );
}
