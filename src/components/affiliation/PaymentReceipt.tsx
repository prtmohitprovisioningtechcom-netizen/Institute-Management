"use client";

import { Printer, Home } from "lucide-react";
import { useBrand } from "@/context/BrandContext";

export type InfraRow = { rooms: string; seats: string; area: string };

export interface ReceiptData {
  refNumber: string;
  submitDate: string;
  trainingPartnerName: string;
  trainingPartnerAddress: string;
  postalAddressOffice: string;
  totalName: string;
  district: string;
  state: string;
  pin: string;
  country: string;
  mobile: string;
  email: string;
  statusOfInstitution: string;
  yearOfEstablishment: string;
  chiefName: string;
  designation: string;
  educationQualification: string;
  professionalExperience: string;
  dob: string;
  infrastructure: Record<string, InfraRow>;
  zones: string[];
  signatureUrl?: string;

  // Additional form fields
  city?: string;
  postOffice?: string;
  classRoom?: string;
  officeRoom?: string;
  institutePhone?: string;
  instituteStd?: string;
  instituteCell?: string;
  website?: string;

  directorAddress?: string;
  directorCity?: string;
  directorPostOffice?: string;
  directorPinCode?: string;
  directorDistrict?: string;
  directorState?: string;
  directorCountry?: string;
  directorPhone?: string;
  directorStd?: string;
  directorCell?: string;

  govPresident?: string;
  govVicePresident?: string;
  govSecretary?: string;
  govAssistantSecretary?: string;
  govTreasurer?: string;
  govMember1?: string;
  govMember2?: string;
  applicationDate?: string;
  affiliationYear?: string;
}

interface Props {
  data: ReceiptData;
  onBack: () => void;
}

export default function PaymentReceipt({ data, onBack }: Props) {
  const { brandName, brandLogo } = useBrand();

  return (
    <>
      {/* Print-only global styles */}
      <style>{`
        .receipt-logo {
          height: 40px !important;
          width: auto !important;
          max-height: 40px !important;
          display: block !important;
          margin-left: auto !important;
          margin-right: auto !important;
        }
        @media print {
          .no-print { display: none !important; }
          body * { visibility: hidden; }
          .receipt-wrapper, .receipt-wrapper * { visibility: visible; }
          .receipt-wrapper { 
            position: absolute; 
            left: 0; 
            top: 0; 
            width: 100%;
            box-shadow: none !important; 
            border: none !important; 
          }
          body { background: white !important; }
          .receipt-logo {
            height: 40px !important;
            width: auto !important;
            max-height: 40px !important;
            display: block !important;
            margin-left: auto !important;
            margin-right: auto !important;
          }
        }
      `}</style>

      {/* Action Buttons */}
      <div className="no-print flex gap-3 mb-6 justify-end">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-100 transition"
        >
          <Home className="w-4 h-4" /> Back to Form
        </button>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition shadow"
        >
          <Printer className="w-4 h-4" /> Print Form Summary
        </button>
      </div>

      {/* Receipt Wrapped for Responsiveness */}
      <div className="max-w-4xl mx-auto px-1 sm:px-0">
        <div className="sm:hidden mb-2 text-center">
           <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider animate-pulse border border-blue-100">
             Scroll Right to View Full Details &rarr;
           </span>
         </div>
        <div className="receipt-wrapper overflow-x-auto bg-white border border-slate-300 shadow-lg rounded-sm scrollbar-thin scrollbar-thumb-slate-200">
          <div className="min-w-[700px] sm:min-w-0 p-6 sm:p-8">
            {/* Header */}
            <div className="flex flex-col items-center justify-center gap-1 border-b border-slate-200 pb-4 text-center">
              {brandLogo ? (
                <img
                  src={brandLogo}
                  alt={brandName || "Institution"}
                  className="receipt-logo object-contain mx-auto"
                  style={{ height: "40px", width: "auto" }}
                />
              ) : (
                <img
                  src="/ygroup-logo.svg"
                  alt={brandName || "Institution"}
                  className="receipt-logo object-contain mx-auto"
                  style={{ height: "40px", width: "auto" }}
                />
              )}
              <p className="text-xs font-black uppercase tracking-widest text-slate-800 mt-1">
                {brandName || "Institution"}
              </p>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                HO - SUBHASH VIHAR DELHI, RO ARYA NAGAR, FIROZABAD, U.P
              </p>
            </div>

            {/* Title */}
            <div className="text-center py-4 border-b border-slate-200">
              <p className="text-sm font-black text-slate-900 uppercase tracking-widest">
                ATC Affiliation Application Summary
              </p>
            </div>

            {/* Reference & Date Row */}
            <table className="w-full border-collapse text-xs mt-4">
              <tbody>
                <tr>
                  <td className="border border-slate-300 px-3 py-2 font-bold bg-slate-50 w-36">Reference Number</td>
                  <td className="border border-slate-300 px-3 py-2 font-mono font-bold text-blue-700 text-sm">{data.refNumber}</td>
                  <td className="border border-slate-300 px-3 py-2 font-bold bg-slate-50 w-36">Submission Date</td>
                  <td className="border border-slate-300 px-3 py-2 font-medium text-slate-800">{data.submitDate}</td>
                </tr>
              </tbody>
            </table>

            {/* Section 1: INSTITUTE'S OFFICE ADDRESS */}
            <table className="w-full border-collapse text-xs mt-3">
              <tbody>
                <tr className="bg-slate-100">
                  <td className="border border-slate-300 px-3 py-2 font-bold text-slate-850 uppercase tracking-wide" colSpan={4}>
                    1. INSTITUTE'S OFFICE ADDRESS
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-300 px-3 py-2 font-semibold w-48 bg-slate-50">Institute Name</td>
                  <td className="border border-slate-300 px-3 py-2" colSpan={3}>{data.trainingPartnerName || "—"}</td>
                </tr>
                <tr>
                  <td className="border border-slate-300 px-3 py-2 font-semibold bg-slate-50">Full Address</td>
                  <td className="border border-slate-300 px-3 py-2" colSpan={3}>{data.trainingPartnerAddress || "—"}</td>
                </tr>
                <tr>
                  <td className="border border-slate-300 px-3 py-2 font-semibold bg-slate-50">City</td>
                  <td className="border border-slate-300 px-3 py-2">{data.city || "—"}</td>
                  <td className="border border-slate-300 px-3 py-2 font-semibold bg-slate-50 w-32">Post Office</td>
                  <td className="border border-slate-300 px-3 py-2">{data.postOffice || "—"}</td>
                </tr>
                <tr>
                  <td className="border border-slate-300 px-3 py-2 font-semibold bg-slate-50">Pin Code</td>
                  <td className="border border-slate-300 px-3 py-2">{data.pin || "—"}</td>
                  <td className="border border-slate-300 px-3 py-2 font-semibold bg-slate-50">District</td>
                  <td className="border border-slate-300 px-3 py-2">{data.district || "—"}</td>
                </tr>
                <tr>
                  <td className="border border-slate-300 px-3 py-2 font-semibold bg-slate-50">State</td>
                  <td className="border border-slate-300 px-3 py-2">{data.state || "—"}</td>
                  <td className="border border-slate-300 px-3 py-2 font-semibold bg-slate-50">Country</td>
                  <td className="border border-slate-300 px-3 py-2">{data.country || "INDIA"}</td>
                </tr>
                <tr>
                  <td className="border border-slate-300 px-3 py-2 font-semibold bg-slate-50">Class Room</td>
                  <td className="border border-slate-300 px-3 py-2">{data.classRoom || "—"}</td>
                  <td className="border border-slate-300 px-3 py-2 font-semibold bg-slate-50">Office Room</td>
                  <td className="border border-slate-300 px-3 py-2">{data.officeRoom || "—"}</td>
                </tr>
                <tr>
                  <td className="border border-slate-300 px-3 py-2 font-semibold bg-slate-50">Phone</td>
                  <td className="border border-slate-300 px-3 py-2">{data.institutePhone || "—"}</td>
                  <td className="border border-slate-300 px-3 py-2 font-semibold bg-slate-50">STD</td>
                  <td className="border border-slate-300 px-3 py-2">{data.instituteStd || "—"}</td>
                </tr>
                <tr>
                  <td className="border border-slate-300 px-3 py-2 font-semibold bg-slate-50">Cell (Mobile)</td>
                  <td className="border border-slate-300 px-3 py-2">{data.mobile || "—"}</td>
                  <td className="border border-slate-300 px-3 py-2 font-semibold bg-slate-50">Email</td>
                  <td className="border border-slate-300 px-3 py-2">{data.email || "—"}</td>
                </tr>
                <tr>
                  <td className="border border-slate-300 px-3 py-2 font-semibold bg-slate-50">Website</td>
                  <td className="border border-slate-300 px-3 py-2" colSpan={3}>{data.website || "—"}</td>
                </tr>
              </tbody>
            </table>

            {/* Section 2: DIRECTOR'S NAME & ADDRESS */}
            <table className="w-full border-collapse text-xs mt-3">
              <tbody>
                <tr className="bg-slate-100">
                  <td className="border border-slate-300 px-3 py-2 font-bold text-slate-850 uppercase tracking-wide" colSpan={4}>
                    2. DIRECTOR'S NAME & ADDRESS
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-300 px-3 py-2 font-semibold bg-slate-50 w-48">Director's Name</td>
                  <td className="border border-slate-300 px-3 py-2">{data.chiefName || "—"}</td>
                  <td className="border border-slate-300 px-3 py-2 font-semibold bg-slate-50 w-48">Qualification</td>
                  <td className="border border-slate-300 px-3 py-2">{data.educationQualification || "—"}</td>
                </tr>
                <tr>
                  <td className="border border-slate-300 px-3 py-2 font-semibold bg-slate-50">Occupation</td>
                  <td className="border border-slate-300 px-3 py-2">{data.professionalExperience || "—"}</td>
                  <td className="border border-slate-300 px-3 py-2 font-semibold bg-slate-50">Full Address</td>
                  <td className="border border-slate-300 px-3 py-2">{data.directorAddress || "—"}</td>
                </tr>
                <tr>
                  <td className="border border-slate-300 px-3 py-2 font-semibold bg-slate-50">City</td>
                  <td className="border border-slate-300 px-3 py-2">{data.directorCity || "—"}</td>
                  <td className="border border-slate-300 px-3 py-2 font-semibold bg-slate-50">Post Office</td>
                  <td className="border border-slate-300 px-3 py-2">{data.directorPostOffice || "—"}</td>
                </tr>
                <tr>
                  <td className="border border-slate-300 px-3 py-2 font-semibold bg-slate-50">Pin Code</td>
                  <td className="border border-slate-300 px-3 py-2">{data.directorPinCode || "—"}</td>
                  <td className="border border-slate-300 px-3 py-2 font-semibold bg-slate-50">District</td>
                  <td className="border border-slate-300 px-3 py-2">{data.directorDistrict || "—"}</td>
                </tr>
                <tr>
                  <td className="border border-slate-300 px-3 py-2 font-semibold bg-slate-50">State</td>
                  <td className="border border-slate-300 px-3 py-2">{data.directorState || "—"}</td>
                  <td className="border border-slate-300 px-3 py-2 font-semibold bg-slate-50">Country</td>
                  <td className="border border-slate-300 px-3 py-2">{data.directorCountry || "INDIA"}</td>
                </tr>
                <tr>
                  <td className="border border-slate-300 px-3 py-2 font-semibold bg-slate-50">Phone</td>
                  <td className="border border-slate-300 px-3 py-2">{data.directorPhone || "—"}</td>
                  <td className="border border-slate-300 px-3 py-2 font-semibold bg-slate-50">STD</td>
                  <td className="border border-slate-300 px-3 py-2">{data.directorStd || "—"}</td>
                </tr>
                <tr>
                  <td className="border border-slate-300 px-3 py-2 font-semibold bg-slate-50">Cell</td>
                  <td className="border border-slate-300 px-3 py-2" colSpan={3}>{data.directorCell || "—"}</td>
                </tr>
              </tbody>
            </table>

            {/* Section 3: GOVERNING BODY */}
            <table className="w-full border-collapse text-xs mt-3">
              <tbody>
                <tr className="bg-slate-100">
                  <td className="border border-slate-300 px-3 py-2 font-bold text-slate-850 uppercase tracking-wide" colSpan={4}>
                    3. GOVERNING BODY <span className="text-[10px] lowercase tracking-normal font-normal ml-2">(IF YES, FILL THE BLANKS)</span>
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-300 px-3 py-2 font-semibold bg-slate-50 w-48">PRESIDENT</td>
                  <td className="border border-slate-300 px-3 py-2">{data.govPresident || "—"}</td>
                  <td className="border border-slate-300 px-3 py-2 font-semibold bg-slate-50 w-48">VICE-PRESIDENT</td>
                  <td className="border border-slate-300 px-3 py-2">{data.govVicePresident || "—"}</td>
                </tr>
                <tr>
                  <td className="border border-slate-300 px-3 py-2 font-semibold bg-slate-50">SECRETARY</td>
                  <td className="border border-slate-300 px-3 py-2">{data.govSecretary || "—"}</td>
                  <td className="border border-slate-300 px-3 py-2 font-semibold bg-slate-50">ASSISTANT SECRETARY</td>
                  <td className="border border-slate-300 px-3 py-2">{data.govAssistantSecretary || "—"}</td>
                </tr>
                <tr>
                  <td className="border border-slate-300 px-3 py-2 font-semibold bg-slate-50">TREASURER</td>
                  <td className="border border-slate-300 px-3 py-2">{data.govTreasurer || "—"}</td>
                  <td className="border border-slate-300 px-3 py-2 font-semibold bg-slate-50">MEMBER</td>
                  <td className="border border-slate-300 px-3 py-2">{data.govMember1 || "—"}</td>
                </tr>
                <tr>
                  <td className="border border-slate-300 px-3 py-2 font-semibold bg-slate-50">MEMBER</td>
                  <td className="border border-slate-300 px-3 py-2" colSpan={3}>{data.govMember2 || "—"}</td>
                </tr>
              </tbody>
            </table>

            {/* Section 4: APPLICATION DETAILS */}
            <table className="w-full border-collapse text-xs mt-3">
              <tbody>
                <tr className="bg-slate-100">
                  <td className="border border-slate-300 px-3 py-2 font-bold text-slate-850 uppercase tracking-wide" colSpan={4}>
                    4. APPLICATION DETAILS
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-300 px-3 py-2 font-semibold bg-slate-50 w-48">Apply For (Years)</td>
                  <td className="border border-slate-300 px-3 py-2">{data.affiliationYear || "1"} Year(s)</td>
                  <td className="border border-slate-300 px-3 py-2 font-semibold bg-slate-50 w-48">Application Date</td>
                  <td className="border border-slate-300 px-3 py-2">{data.applicationDate || "—"}</td>
                </tr>
              </tbody>
            </table>

            {/* OFFICE USE ONLY SECTION */}
            <div className="mt-4 rounded-xl border border-slate-800 overflow-hidden bg-gradient-to-r from-[#ffebeb] to-[#fff5f5] pb-4 shadow-sm">
              <div className="bg-[#d32f2f] text-white font-black text-center py-2 text-xs uppercase tracking-widest border-b border-slate-800">
                OFFICE USE ONLY
              </div>
              
              <div className="grid grid-cols-[1.4fr_1fr] gap-6 p-4">
                {/* Left Column: Form Fields */}
                <div className="space-y-3">
                  {/* Approved Institute Code */}
                  <div className="flex items-center gap-2">
                    <div className="border border-slate-800 px-2 py-0.5 bg-white text-[9px] font-bold uppercase text-slate-800 whitespace-nowrap">
                      APPROVED INSTITUTE CODE
                    </div>
                    <div className="w-32 h-6 bg-[#ffffcc] border border-slate-800"></div>
                  </div>

                  {/* Approved Years */}
                  <div className="flex items-center gap-2">
                    <div className="border border-slate-800 px-2 py-0.5 bg-white text-[9px] font-bold uppercase text-slate-800 whitespace-nowrap">
                      APPROVED YEARS
                    </div>
                    <div className="w-16 h-6 bg-[#ffffcc] border border-slate-800"></div>
                  </div>

                  {/* Date */}
                  <div className="flex items-center gap-2 mt-2 text-[9px] font-bold text-slate-800">
                    <span className="whitespace-nowrap uppercase tracking-wider text-slate-800">DATE :</span>
                    <div className="flex items-center gap-0.5">
                      <div className="flex gap-0.5">
                        <div className="w-5 h-5 border border-slate-800 bg-white"></div>
                        <div className="w-5 h-5 border border-slate-800 bg-white"></div>
                      </div>
                      <span className="text-slate-800 font-bold px-0.5"> </span>
                      <div className="flex gap-0.5">
                        <div className="w-5 h-5 border border-slate-800 bg-white"></div>
                        <div className="w-5 h-5 border border-slate-800 bg-white"></div>
                      </div>
                      <span className="text-slate-800 font-bold px-0.5"> </span>
                      <div className="flex gap-0.5">
                        <div className="w-5 h-5 border border-slate-800 bg-white"></div>
                        <div className="w-5 h-5 border border-slate-800 bg-white"></div>
                        <div className="w-5 h-5 border border-slate-800 bg-white"></div>
                        <div className="w-5 h-5 border border-slate-800 bg-white"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Signature Block */}
                <div className="flex justify-end items-center">
                  <div className="w-full max-w-[200px] border border-slate-800 bg-white flex flex-col justify-between overflow-hidden">
                    <div className="h-12 flex items-center justify-center relative">
                      {data.signatureUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={data.signatureUrl} alt="Signature" className="h-full object-contain p-1" />
                      ) : (
                        <div className="w-24 h-6 border border-dashed border-slate-300 flex items-center justify-center text-[8px] text-slate-400">
                          Sign Here
                        </div>
                      )}
                    </div>
                    <div className="border-t border-slate-800 bg-slate-50 py-1 text-center text-[9px] font-bold uppercase tracking-wider text-slate-800">
                      Signature
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Buttons */}
            <div className="no-print flex items-center justify-center gap-4 py-5 border-t border-slate-200 mt-4">
              <button
                onClick={() => window.print()}
                className="px-8 py-2.5 rounded bg-green-600 text-white font-bold text-sm hover:bg-green-700 transition shadow"
              >
                Print
              </button>
              <button
                onClick={onBack}
                className="px-8 py-2.5 rounded bg-blue-700 text-white font-bold text-sm hover:bg-blue-800 transition shadow"
              >
                Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
