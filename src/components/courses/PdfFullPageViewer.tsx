"use client";

import { FileText, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type PdfFullPageViewerProps = {
  src: string;
  title: string;
  featured?: boolean;
  forceLoad?: boolean;
};

function buildViewUrl(src: string) {
  return src;
}

export default function PdfFullPageViewer({ src, title, featured = false, forceLoad = false }: PdfFullPageViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [origin, setOrigin] = useState("");
  const isDocx = src.endsWith(".docx");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  const isLocalhost = origin.includes("localhost") || origin.includes("127.0.0.1");
  
  // Use Microsoft Office Online Web Viewer to render .docx in production
  const viewSrc = isDocx
    ? `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(origin + src)}`
    : src;

  useEffect(() => {
    if (forceLoad) setShouldLoad(true);
  }, [forceLoad]);

  useEffect(() => {
    if (shouldLoad) {
      setIsReady(false);
      // Fallback timer: iframe onload might not fire reliably for PDF files on all browsers.
      // Set a fallback to ensure the PDF is displayed and the loader is dismissed after 1.5 seconds.
      const timer = setTimeout(() => {
        setIsReady(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [viewSrc, shouldLoad]);

  useEffect(() => {
    if (featured || shouldLoad) return;

    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "80px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [featured, shouldLoad]);

  const documentTypeLabel = isDocx ? "Word Document" : (featured ? "Course Brochure" : "Document");
  const actionButtonLabel = isDocx ? "View Word Doc" : "Open PDF";

  return (
    <div
      ref={containerRef}
      id="course-pdf-viewer"
      className={`relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 ${
        featured ? "bg-slate-50 py-2 sm:py-3" : "bg-slate-100/80 py-2 sm:py-3"
      }`}
    >
      <div className={`mx-auto w-full px-3 sm:px-4 ${featured ? "max-w-[1280px]" : "max-w-[1100px]"}`}>
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
          <div
            className={`flex items-center justify-between gap-3 border-b px-4 py-3 sm:px-5 ${
              featured ? "bg-[#0a0aa1] text-white" : "bg-slate-50 text-slate-800"
            }`}
          >
            <div className="flex min-w-0 items-center gap-2.5">
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                  featured ? "bg-white/15" : "bg-rose-50 text-rose-600"
                }`}
              >
                <FileText className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className={`text-[10px] font-bold uppercase tracking-wider ${featured ? "text-blue-100" : "text-slate-400"}`}>
                  {documentTypeLabel}
                </p>
                <p className="truncate text-sm font-bold">{title}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={isDocx ? viewSrc : src}
                target="_blank"
                rel="noopener noreferrer"
                className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-extrabold uppercase transition duration-200 ${
                  featured
                    ? "bg-white text-[#0a0aa1] hover:bg-blue-50"
                    : "bg-[#0a0aa1] text-white hover:bg-[#080885]"
                }`}
              >
                {actionButtonLabel}
              </a>
            </div>
          </div>

          <div className="relative bg-slate-100">
            {!shouldLoad ? (
              <div className="flex h-[78vh] min-h-[520px] flex-col items-center justify-center gap-4 px-6 text-center">
                <FileText className="h-10 w-10 text-[#0a0aa1]" />
                <div>
                  <p className="text-base font-bold text-slate-800">Courses brochure ready</p>
                  <p className="mt-1 text-sm text-slate-500">Open only when needed so the page stays fast.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShouldLoad(true)}
                  className="rounded-xl bg-[#0a0aa1] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#080885]"
                >
                  Open Brochure
                </button>
              </div>
            ) : isDocx && isLocalhost ? (
              /* Localhost Fallback: Render extracted document text beautifully */
              <div className="bg-white p-6 sm:p-8 h-[78vh] min-h-[520px] overflow-y-auto">
                <div className="mx-auto max-w-3xl border border-dashed border-blue-200 rounded-xl bg-blue-50/40 p-4 mb-6">
                  <p className="text-xs font-black text-blue-700 uppercase tracking-wider">Local Preview Mode</p>
                  <p className="mt-1 text-xs text-slate-500 leading-normal">
                    The Microsoft Office Online Web Viewer requires a public domain to fetch and render Word files. On your live server, the Word document will open automatically in the Word reader inline. On localhost, we display the exact document content below:
                  </p>
                </div>
                
                <div className="mx-auto max-w-3xl text-left text-slate-700 space-y-6 font-sans">
                  <div className="text-center mb-8 border-b border-slate-100 pb-5">
                    <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">SGEFTT INSTITUTION PROSPECTUS</h3>
                    <p className="text-xs text-slate-400 mt-1 uppercase font-bold">Document Content Preview</p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-extrabold uppercase text-[#0a0aa1] tracking-wider">1. Architectural Theory and Design Theory</h4>
                    <ul className="list-disc list-inside space-y-1 text-xs pl-2">
                      <li>Architectural Theory and Design Theory</li>
                      <li>Designing of Furniture</li>
                      <li>Fabric / Textile science</li>
                      <li>Painting and lighting Theory</li>
                      <li>Plants and Planters Study</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-extrabold uppercase text-[#0a0aa1] tracking-wider">2. Fashion Designing (Degree / Diploma)</h4>
                    <p className="text-xs leading-relaxed text-slate-500 pl-2">
                      The course has been designed for the students who have previous knowledge / possess Diploma in Fashion Designing or related fields. It covers advanced techniques of sketching, designing besides production Management Marketing Aspects, Garment Costing and Quality Control. Useful for B.H.S.C. (Home Science) &amp; M.H.S.C. (Home Science) Students.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-extrabold uppercase text-[#0a0aa1] tracking-wider">3. Diploma in Fashion Designing (1 Year)</h4>
                    <p className="text-[10px] text-slate-400 font-bold pl-2">
                      Reg: 4000/- | Tuition: 1000/- P.M | Exam: 3350/- | Practical: 900/-
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-xs pl-2 text-slate-600">
                      <li>Part Folio, Basic Designing, Design Ideas, Embroidery Stitches</li>
                      <li>Tie and Dye and impression printing, Sketching, Theory, Drafting</li>
                      <li>Stitching, R Manipulation, Fashion Sketching (Saree, Nighty, Lehnga suit)</li>
                      <li>Lace and Button Folder, Textile science</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-extrabold uppercase text-[#0a0aa1] tracking-wider">4. Computer Teacher Training (CTT) (1 Year)</h4>
                    <p className="text-[10px] text-slate-400 font-bold pl-2">
                      Reg: 2150/- | Tuition: 1000/- P.M | Exam: 1650/- | Practical: 900/-
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-xs pl-2 text-slate-600">
                      <li>Part I: Introduction to Information Technology, MS-DOS, Windows (Paint, WordPad), MS-Office (Word, Excel, PowerPoint)</li>
                      <li>Part II: PageMaker, CorelDraw, Photoshop</li>
                      <li>Part III: HTML, DHTML</li>
                      <li>Part IV: Programming in 'C', Programming in 'C++', Visual Basic</li>
                      <li>Note: Three Months Training after completion of course</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-extrabold uppercase text-[#0a0aa1] tracking-wider">5. Diploma in Financial Account (DFA) (6 Months)</h4>
                    <p className="text-[10px] text-slate-400 font-bold pl-2">
                      Reg: 1200/- | Tuition: 450/- P.M | Exam: 850/-
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-xs pl-2 text-slate-600">
                      <li>Fundamentals of Computer, MS-DOS, Windows (Paint, WordPad)</li>
                      <li>MS-Office: MS-Word (writing package), MS-Excel (spreadsheet application)</li>
                      <li>Tally 6.3, 7.2, 8.1, 9.0 with VAT Version</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-extrabold uppercase text-[#0a0aa1] tracking-wider">6. Diploma in Desktop Publishing (DTP) (6 Months)</h4>
                    <p className="text-[10px] text-slate-400 font-bold pl-2">
                      Reg: 1200/- | Tuition: 450/- P.M | Exam: 850/-
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-xs pl-2 text-slate-600">
                      <li>Fundamentals of Computer, MS-DOS, Windows (Paint, WordPad)</li>
                      <li>MS-Word (writing package), MS-PowerPoint (presentation package)</li>
                      <li>CorelDraw / PageMaker, Photoshop / Flash</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-extrabold uppercase text-[#0a0aa1] tracking-wider">7. Diploma in Information Technology (DIT) (6 Months)</h4>
                    <p className="text-[10px] text-slate-400 font-bold pl-2">
                      Reg: 1200/- | Tuition: 450/- P.M | Exam: 850/-
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-xs pl-2 text-slate-600">
                      <li>Semester I: Introduction to Information Technology, MS-DOS, Windows, MS-Word, MS-PowerPoint</li>
                      <li>Semester II: C (with Data Structure) / C++ (with OOPS), Visual Basic, HTML</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-extrabold uppercase text-[#0a0aa1] tracking-wider">8. Diploma in Beautician (6 Months)</h4>
                    <p className="text-[10px] text-slate-400 font-bold pl-2">
                      Reg: 3000/- | Tuition: 1000/- P.M | Exam: 2000/-
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-xs pl-2 text-slate-600">
                      <li>Month 1: Threading, Pedicure, Manicure, Bleaching, Waxing</li>
                      <li>Month 2: Facial, Face pack (25 type) &amp; Theory, Peeling, Scrub</li>
                      <li>Month 3: Makeup (Simple, Light, Engagement, Reception, Stage Makeup)</li>
                      <li>Month 4: Hair Treatment, Henna, Dye, Dandruff Treatment, Roller Setting</li>
                      <li>Month 5: Hair Style, Saree Wearing</li>
                      <li>Month 6: Cutting, Bridal Makeup</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-extrabold uppercase text-[#0a0aa1] tracking-wider">9. Boutique Management (6 Months)</h4>
                    <p className="text-[10px] text-slate-400 font-bold pl-2">
                      Reg: 4000/- | Tuition: 1000/- P.M | Exam: 2000/-
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-xs pl-2 text-slate-600">
                      <li>Basic Drafting, Design Ideas, Management, Advance Garments Manufacturing</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-extrabold uppercase text-[#0a0aa1] tracking-wider">10. Short Term Courses (1 Month)</h4>
                    <p className="text-[10px] text-slate-400 font-bold pl-2">
                      Tuition: 500/- | Certificate Fee: 200/-
                    </p>
                    <p className="text-xs text-slate-500 leading-normal pl-2">
                      English Speaking, DOS &amp; Windows, MS-Office, Tally, Fox Pro, C, C++, Java, Visual Basic, HTML, DHTML, Page Maker, Corel Draw, Photoshop, Flash, Beautician, Oil/Screen/Nib/Glass Painting, Tie &amp; Dye, Mehandi, Dance, Embroidery, Soft Toys, Food Preservation.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {!isReady ? (
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-white/90">
                    <Loader2 className="h-8 w-8 animate-spin text-[#0a0aa1]" />
                    <p className="text-sm font-semibold text-slate-600 font-sans">Loading brochure...</p>
                  </div>
                ) : null}
                <iframe
                  src={viewSrc}
                  title={title}
                  loading="lazy"
                  onLoad={() => setIsReady(true)}
                  className="block h-[78vh] w-full min-h-[520px] border-0 bg-white sm:h-[82vh]"
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
