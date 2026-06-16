"use client";

export default function ProspectusViewer() {
  const pages = [
    "/prospectus (1)_page-0001.jpg",
    "/prospectus (1)_page-0002.jpg",
    "/prospectus (1)_page-0003.jpg",
    "/prospectus (1)_page-0004.jpg",
    "/prospectus (1)_page-0005.jpg",
    "/prospectus (1)_page-0006.jpg",
    "/prospectus7.jpg",
    "/prospectus (1)_page-0008.jpg",
    "/prospectus (1)_page-0009.jpg",
  ];

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-4 sm:px-6 lg:px-8">
      {/* Pages List - Fully visible stacked layout */}
      <div className="flex flex-col gap-8 items-center bg-slate-50 p-4 sm:p-8 rounded-2xl border border-slate-200/60 shadow-md">
        {pages.map((src, index) => (
          <div
            key={index}
            className="relative w-full max-w-[850px] bg-white rounded-lg overflow-hidden border border-slate-200 shadow-lg"
          >
            {/* Page Number Badge */}
            <span className="absolute top-3 left-3 bg-[#0a0aa1]/90 text-white text-xs font-bold px-3 py-1 rounded-md z-10 shadow-sm">
              Page {index + 1}
            </span>

            {/* Image element */}
            <img
              src={src}
              alt={`SGEFTT Prospectus Page ${index + 1}`}
              className="w-full h-auto block object-contain"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
