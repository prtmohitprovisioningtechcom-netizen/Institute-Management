"use client";

import { useState } from "react";
import { FileText, Download, BookOpen, Layers, Award, Sparkles } from "lucide-react";

type CourseDetail = {
  name: string;
  duration?: string;
  regFee?: string;
  monthlyFee?: string;
  examFee?: string;
  practicalFee?: string;
  description?: string;
  syllabus: string[];
};

export default function DocxProspectusViewer() {
  const [activeTab, setActiveTab] = useState<"computer" | "fashion" | "beautician" | "short">("computer");

  const computerCourses: CourseDetail[] = [
    {
      name: "Computer Teacher Training (CTT)",
      duration: "1 Year",
      regFee: "2,150/-",
      monthlyFee: "1,000/- P.M",
      examFee: "1,650/-",
      practicalFee: "900/-",
      description: "Comprehensive training program for prospective computer science teachers, covers IT fundamentals, office automation, web design, and programming languages.",
      syllabus: [
        "Part I: Introduction to Information Technology, MS-DOS, Windows (Paint, WordPad), MS-Office (MS-Word, MS-Excel, MS-PowerPoint)",
        "Part II: PageMaker, CorelDraw, Photoshop",
        "Part III: HTML, DHTML",
        "Part IV: Programming in C, Programming in C++, Visual Basic",
        "Note: 3 Months Training after the completion of course"
      ]
    },
    {
      name: "Diploma in Financial Account (DFA)",
      duration: "6 Months",
      regFee: "1,200/-",
      monthlyFee: "450/- P.M",
      examFee: "850/-",
      syllabus: [
        "Fundamentals of Computer",
        "MS-DOS (Microsoft Disk Operating System)",
        "Windows (Paint, WordPad)",
        "MS-Office: MS-Word, MS-Excel",
        "Tally 6.3, 7.2, 8.1, 9.0 with VAT Version"
      ]
    },
    {
      name: "Diploma in Desktop Publishing (DTP)",
      duration: "6 Months",
      regFee: "1,200/-",
      monthlyFee: "450/- P.M",
      examFee: "850/-",
      syllabus: [
        "Fundamentals of Computer",
        "MS-DOS (Microsoft Disk Operating System)",
        "Windows (Paint, WordPad)",
        "MS-Word, MS-PowerPoint",
        "CorelDraw / PageMaker",
        "Photoshop / Flash"
      ]
    },
    {
      name: "Diploma in Information Technology (DIT)",
      duration: "6 Months",
      regFee: "1,200/-",
      monthlyFee: "450/- P.M",
      examFee: "850/-",
      syllabus: [
        "Semester I: Introduction to IT, MS-DOS, Windows, MS-Word, MS-PowerPoint",
        "Semester II: C (with Data Structure) OR C++ (with OOPS), Visual Basic, HTML"
      ]
    },
    {
      name: "Basic Computer Course",
      duration: "3 Months",
      regFee: "200/-",
      syllabus: [
        "MS-DOS (Microsoft Disk Operating System)",
        "Windows (Paint, WordPad)",
        "MS-Office: MS-Word, MS-Excel"
      ]
    },
    {
      name: "Advance Diploma in Computer Tally & Accounts",
      duration: "6 Months",
      regFee: "850/-",
      monthlyFee: "400/- P.M",
      examFee: "750/-",
      practicalFee: "500/-",
      syllabus: [
        "Tally 7.2, 8.1, 9.0 & 9.2 (VAT, Payroll & Taxes)",
        "Accounting Concepts",
        "Manage & Operate Ledger",
        "Account Vouchers",
        "Export & Import of Data",
        "Working Project"
      ]
    },
    {
      name: "Advance Diploma in Web Designing",
      duration: "6 Months",
      regFee: "800/-",
      monthlyFee: "400/- P.M",
      examFee: "750/-",
      practicalFee: "700/-",
      syllabus: [
        "MS-Office",
        "PageMaker",
        "CorelDraw",
        "Photoshop",
        "Internet Concepts",
        "Project Work"
      ]
    },
    {
      name: "Advance Diploma in Computer Tally",
      duration: "3 Months",
      regFee: "500/-",
      monthlyFee: "400/- P.M",
      examFee: "600/-",
      practicalFee: "300/-",
      syllabus: [
        "MS-DOS",
        "MS-Word",
        "MS-Excel",
        "MS-PowerPoint",
        "MS-Access",
        "Tally 6.3 to 9.2"
      ]
    },
    {
      name: "Advance Diploma in Computer Hardware",
      duration: "1 Year",
      regFee: "800/-",
      monthlyFee: "500/- P.M",
      examFee: "750/-",
      practicalFee: "500/-",
      syllabus: [
        "MS-DOS, MS-Word, MS-Excel, MS-PowerPoint, MS-Access",
        "Basic Electronics (Current, Voltage, Power, Types of Material)",
        "Logical Gates",
        "Windows XP & 98",
        "Software Loading & Troubleshooting",
        "Operating System Installation",
        "Project Work"
      ]
    },
    {
      name: "Advance Diploma in Computer Fundamental",
      duration: "6 Months",
      regFee: "800/-",
      monthlyFee: "300/- P.M",
      examFee: "750/-",
      practicalFee: "700/-",
      syllabus: [
        "MS-DOS, MS-Word, MS-Excel, MS-PowerPoint, MS-Access",
        "CorelDraw",
        "Internet",
        "Software Loading & OS Configurations",
        "Printing & Office Utilities",
        "Project Work"
      ]
    },
    {
      name: "Advance Diploma in Office Automation",
      duration: "4 Months",
      regFee: "800/-",
      monthlyFee: "300/- P.M",
      examFee: "750/-",
      syllabus: [
        "MS-DOS, MS-Word, MS-Excel, MS-PowerPoint, MS-Access",
        "CorelDraw",
        "Internet",
        "C++ basics",
        "Interview Preparation",
        "Project Work"
      ]
    }
  ];

  const fashionCourses: CourseDetail[] = [
    {
      name: "Architectural Theory and Design Theory",
      description: "Focused program introducing theory, furniture design, textiles, lighting, and layout studies.",
      syllabus: [
        "Architectural Theory and Design Theory",
        "Designing of Furniture",
        "Fabric / Textile Science",
        "Painting and Lighting Theory",
        "Plants and Planters Study"
      ]
    },
    {
      name: "Fashion Designing (Advanced / Degree / Diploma)",
      description: "Designed for students who have previous knowledge or possess a Diploma in Fashion Designing. Covers advanced techniques of sketching, design concepts, production management, marketing, garment costing, and quality control. Highly recommended for B.H.S.C. (Home Science) & M.H.S.C. (Home Science) students.",
      syllabus: [
        "Advanced Garment Designing",
        "Sketching and Illustrations",
        "Production Management & Marketing Aspects",
        "Garment Costing and Quality Control"
      ]
    },
    {
      name: "Diploma in Fashion Designing",
      duration: "1 Year",
      regFee: "4,000/-",
      monthlyFee: "1,000/- P.M",
      examFee: "3,350/-",
      practicalFee: "900/-",
      syllabus: [
        "Basic Designing & Design Ideas",
        "Portfolio Presentation",
        "Embroidery Stitches & Stitching techniques",
        "Tie and Dye & Impression printing",
        "Drafting & Pattern Making",
        "Fashion Sketching (Saree, Nighty, Lehnga suit)",
        "Textile Studies & Lace and Button Folder"
      ]
    },
    {
      name: "Boutique Management",
      duration: "6 Months",
      regFee: "4,000/-",
      monthlyFee: "1,000/- P.M",
      examFee: "2,000/-",
      syllabus: [
        "Basic Drafting & Tailoring concepts",
        "Design Ideas & Fashion Trends",
        "Measurement & Cutting techniques",
        "Advanced Garments Manufacturing",
        "Boutique Operation & Management principles"
      ]
    },
    {
      name: "Diploma in Dress Designing (DDD)",
      duration: "2 Months",
      regFee: "1,500/- (Total Course Fee)",
      syllabus: [
        "2 से 6 प्रकार के टांके (Different Types of Stitches, Tucks, Seams)",
        "शमीम (सादा)",
        "पायजामा & तकिये के कवर (Pillow Covers)",
        "फ्रॉक (बेबी फ्रॉक)",
        "पैटिकॉट (चार काली)",
        "टॉप & ब्लाउज",
        "सादा सलवार & बेल्ट वाली सलवार",
        "महिलाएं सूट & गाउन",
        "Practical File: Dress Designing & Colour Scheme"
      ]
    }
  ];

  const beauticianCourses: CourseDetail[] = [
    {
      name: "Diploma in Beautician",
      duration: "6 Months",
      regFee: "3,000/-",
      monthlyFee: "1,000/- P.M",
      examFee: "2,000/-",
      syllabus: [
        "Month 1: Threading, Pedicure, Manicure, Bleaching, Waxing",
        "Month 2: Facial, Face pack (25 types) Theory & Practice, Peeling & Scrubbing",
        "Month 3: Makeup (Simple, Light, Engagement, Reception, Stage Makeup)",
        "Month 4: Hair Treatment, Henna, Dyeing, Dandruff Treatment, Roller Setting",
        "Month 5: Hair Styling, Saree Wearing styles",
        "Month 6: Hair Cutting, Bridal Makeup"
      ]
    }
  ];

  const shortTermCourses = [
    "English Speaking", "DOS & Windows", "MS-Office", "Tally 6.3 to 8.1", "Tally 9.0 with VAT",
    "Fox Pro", "C Programming", "C++ Programming", "Java", "Visual Basic", "HTML", "DHTML",
    "Page Maker", "Corel Draw", "Photoshop", "Flash", "Beautician (Self)", "Oil Painting",
    "Screen Painting", "Nib Painting", "Glass Painting", "Block Painting", "Tie & Dye",
    "Spray Painting", "Mehandi", "Advance Mehandi", "Dance", "Embroidery", "Drawing & Painting",
    "Soft Toys Making", "Food Preservation"
  ];

  const tabs = [
    { id: "computer", label: "Computer & IT", icon: BookOpen },
    { id: "fashion", label: "Fashion & Designing", icon: Layers },
    { id: "beautician", label: "Beauty & Wellness", icon: Sparkles },
    { id: "short", label: "Short Term Courses", icon: Award }
  ] as const;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8">
      <div className="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-xl">
        {/* Word Document Header */}
        <div className="flex flex-col justify-between gap-4 border-b border-slate-100 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 px-6 py-5 text-white sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-blue-100">
                Official Prospectus
              </p>
              <h3 className="text-lg font-black tracking-tight">SGEFTT Prospectus (MS Word Document)</h3>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/prospectus.docx"
              download
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-extrabold text-blue-700 shadow-md transition duration-200 hover:bg-blue-50 active:scale-95"
            >
              <Download className="h-4 w-4" />
              Download MS Word (.docx)
            </a>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap border-b border-slate-100 bg-slate-50/50 p-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition duration-200 ${
                  activeTab === tab.id
                    ? "bg-[#0a0aa1] text-white shadow-md shadow-blue-900/10"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content Panel */}
        <div className="bg-slate-50/20 p-6 sm:p-8">
          {activeTab === "computer" && (
            <div className="grid gap-6 md:grid-cols-2">
              {computerCourses.map((course) => (
                <div key={course.name} className="flex flex-col justify-between rounded-xl border border-slate-100 bg-white p-5 shadow-sm transition hover:shadow-md">
                  <div>
                    <h4 className="text-md font-extrabold text-[#0a0aa1]">{course.name}</h4>
                    {course.description && (
                      <p className="mt-2 text-xs leading-relaxed text-slate-500">{course.description}</p>
                    )}
                    <div className="mt-4 space-y-1 text-xs font-semibold text-slate-600">
                      {course.duration && (
                        <p className="flex justify-between border-b border-slate-50 py-1">
                          <span className="text-slate-400">Duration:</span>
                          <span className="text-slate-800">{course.duration}</span>
                        </p>
                      )}
                      {course.regFee && (
                        <p className="flex justify-between border-b border-slate-50 py-1">
                          <span className="text-slate-400">Registration Fee:</span>
                          <span className="text-slate-800">{course.regFee}</span>
                        </p>
                      )}
                      {course.monthlyFee && (
                        <p className="flex justify-between border-b border-slate-50 py-1">
                          <span className="text-slate-400">Monthly Tuition:</span>
                          <span className="text-slate-800">{course.monthlyFee}</span>
                        </p>
                      )}
                      {course.examFee && (
                        <p className="flex justify-between border-b border-slate-50 py-1">
                          <span className="text-slate-400">Examination Fee:</span>
                          <span className="text-slate-800">{course.examFee}</span>
                        </p>
                      )}
                      {course.practicalFee && (
                        <p className="flex justify-between border-b border-slate-50 py-1">
                          <span className="text-slate-400">Practical Lab Fee:</span>
                          <span className="text-slate-800">{course.practicalFee}</span>
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-50">
                    <h5 className="text-[10px] font-black uppercase tracking-wider text-slate-400">Course Syllabus</h5>
                    <ul className="mt-2 space-y-1 text-xs text-slate-600">
                      {course.syllabus.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 leading-normal">
                          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-600" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "fashion" && (
            <div className="grid gap-6 md:grid-cols-2">
              {fashionCourses.map((course) => (
                <div key={course.name} className="flex flex-col justify-between rounded-xl border border-slate-100 bg-white p-5 shadow-sm transition hover:shadow-md">
                  <div>
                    <h4 className="text-md font-extrabold text-[#ff007f]">{course.name}</h4>
                    {course.description && (
                      <p className="mt-2 text-xs leading-relaxed text-slate-500">{course.description}</p>
                    )}
                    <div className="mt-4 space-y-1 text-xs font-semibold text-slate-600">
                      {course.duration && (
                        <p className="flex justify-between border-b border-slate-50 py-1">
                          <span className="text-slate-400">Duration:</span>
                          <span className="text-slate-800">{course.duration}</span>
                        </p>
                      )}
                      {course.regFee && (
                        <p className="flex justify-between border-b border-slate-50 py-1">
                          <span className="text-slate-400">Registration Fee:</span>
                          <span className="text-slate-800">{course.regFee}</span>
                        </p>
                      )}
                      {course.monthlyFee && (
                        <p className="flex justify-between border-b border-slate-50 py-1">
                          <span className="text-slate-400">Monthly Tuition:</span>
                          <span className="text-slate-800">{course.monthlyFee}</span>
                        </p>
                      )}
                      {course.examFee && (
                        <p className="flex justify-between border-b border-slate-50 py-1">
                          <span className="text-slate-400">Examination Fee:</span>
                          <span className="text-slate-800">{course.examFee}</span>
                        </p>
                      )}
                      {course.practicalFee && (
                        <p className="flex justify-between border-b border-slate-50 py-1">
                          <span className="text-slate-400">Practical Fee:</span>
                          <span className="text-slate-800">{course.practicalFee}</span>
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-50">
                    <h5 className="text-[10px] font-black uppercase tracking-wider text-slate-400">Course Syllabus</h5>
                    <ul className="mt-2 space-y-1 text-xs text-slate-600">
                      {course.syllabus.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 leading-normal">
                          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-pink-500" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "beautician" && (
            <div className="grid gap-6 md:grid-cols-2">
              {beauticianCourses.map((course) => (
                <div key={course.name} className="flex flex-col justify-between rounded-xl border border-slate-100 bg-white p-5 shadow-sm transition hover:shadow-md md:col-span-2">
                  <div>
                    <h4 className="text-md font-extrabold text-purple-600">{course.name}</h4>
                    {course.description && (
                      <p className="mt-2 text-xs leading-relaxed text-slate-500">{course.description}</p>
                    )}
                    <div className="mt-4 grid gap-4 sm:grid-cols-3 text-xs font-semibold text-slate-600">
                      {course.duration && (
                        <p className="flex justify-between border-b border-slate-50 py-1">
                          <span className="text-slate-400">Duration:</span>
                          <span className="text-slate-800">{course.duration}</span>
                        </p>
                      )}
                      {course.regFee && (
                        <p className="flex justify-between border-b border-slate-50 py-1">
                          <span className="text-slate-400">Registration Fee:</span>
                          <span className="text-slate-800">{course.regFee}</span>
                        </p>
                      )}
                      {course.monthlyFee && (
                        <p className="flex justify-between border-b border-slate-50 py-1">
                          <span className="text-slate-400">Monthly Tuition:</span>
                          <span className="text-slate-800">{course.monthlyFee}</span>
                        </p>
                      )}
                      {course.examFee && (
                        <p className="flex justify-between border-b border-slate-50 py-1">
                          <span className="text-slate-400">Examination Fee:</span>
                          <span className="text-slate-800">{course.examFee}</span>
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mt-6 pt-3 border-t border-slate-50">
                    <h5 className="text-[10px] font-black uppercase tracking-wider text-slate-400">Course Syllabus & Schedule</h5>
                    <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {course.syllabus.map((item, idx) => (
                        <div key={idx} className="rounded-lg bg-purple-50/30 border border-purple-100/30 p-3">
                          <p className="text-xs font-semibold text-purple-800">{item.split(":")[0]}</p>
                          <p className="mt-1 text-xs text-slate-600 leading-normal">{item.split(":")[1] || item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "short" && (
            <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
              <div className="flex flex-col items-start justify-between gap-4 border-b border-slate-100 pb-4 md:flex-row md:items-center">
                <div>
                  <h4 className="text-md font-extrabold text-[#0a0aa1]">Short Term Certificate Programs</h4>
                  <p className="mt-1 text-xs text-slate-500">Fast-track vocational and skill development courses</p>
                </div>
                <div className="flex flex-wrap gap-3 text-xs font-semibold text-slate-600">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-blue-700">Duration: 1 Month</span>
                  <span className="rounded-full bg-green-50 px-3 py-1 text-green-700">Fee: 500/-</span>
                  <span className="rounded-full bg-purple-50 px-3 py-1 text-purple-700">Cert: 200/-</span>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                {shortTermCourses.map((course, idx) => (
                  <div key={idx} className="flex items-center gap-2 rounded-lg border border-slate-50 bg-slate-50/50 p-2.5 transition hover:bg-slate-50">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0a0aa1]/10 text-[10px] font-bold text-[#0a0aa1]">
                      {idx + 1}
                    </span>
                    <span className="text-xs font-bold text-slate-700">{course}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
