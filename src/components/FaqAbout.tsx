import Link from "next/link";
import Image from "next/image";
import { faqData } from "@/data/faq";
import { getBrandName } from "@/lib/settings";

export default async function FaqAbout() {
  const brandName = await getBrandName();
  return (
    <section
      id="about"
      className="scroll-mt-24 bg-gradient-to-b from-white to-slate-50/80 px-4 py-12 sm:py-16 lg:py-20 overflow-hidden"
    >
      <div className="mx-auto max-w-6xl grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
        {/* ---------- LEFT COLUMN: FAQ ---------- */}
        <div id="faq" className="scroll-mt-24 sm:scroll-mt-28 lg:scroll-mt-32">
          <div>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-slate-900">
              Frequently <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0a0aa1] to-[#4f46e5]">Questions</span>
            </h2>
            <div className="mt-3 h-1 w-20 bg-gradient-to-r from-[#0a0aa1] to-[#4f46e5] rounded-full" />
          </div>

          <div className="mt-8 space-y-2 sm:mt-10">
            {faqData.map((item, index) => (
              <div
                key={item.question}
                className="group relative grid grid-cols-[2rem_1fr] gap-4 pb-6 sm:pb-7 border-b border-slate-100 last:border-0 transition-all hover:bg-slate-50/70 px-2 rounded-lg"
              >
                {/* Timeline dot with line */}
                <div className="relative flex justify-center">
                  {index !== faqData.length - 1 && (
                    <span className="absolute left-1/2 top-6 bottom-[-0.8rem] w-px -translate-x-1/2 bg-slate-200 group-last:hidden" />
                  )}
                  <span
                    className={`relative z-10 mt-1 flex h-7 w-7 items-center justify-center rounded-full border-2 transition-all ${
                      item.active
                        ? "border-[#4f46e5] bg-white shadow-md shadow-indigo-100"
                        : "border-[#0a0aa1] bg-[#0a0aa1]"
                    }`}
                  >
                    <span
                      className={`h-3 w-3 rounded-full transition-all ${
                        item.active ? "bg-[#0a0aa1]" : "bg-white"
                      }`}
                    />
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-700 sm:text-base leading-6 sm:leading-7 group-hover:text-[#0a0aa1] transition-colors">
                    {item.question}
                  </h3>
                  {item.answer && (
                    <p className="mt-1 text-sm font-medium text-slate-500 sm:text-[0.95rem] leading-relaxed">
                      {item.answer}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ---------- RIGHT COLUMN: ABOUT US + WHO WE ARE + IMAGE ---------- */}
        <div className="lg:pt-1">
          {/* About Us Heading */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-slate-900">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0a0aa1] to-[#4f46e5]">Us</span>
            </h2>
            <div className="mt-3 h-1 w-20 bg-gradient-to-r from-[#0a0aa1] to-[#4f46e5] rounded-full" />
          </div>

          {/* Who We Are - Card Style */}
          <div className="mt-6 bg-white/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg shadow-slate-200/50 border border-slate-100">
            <h3
              id="about-institute"
              className="scroll-mt-24 text-2xl sm:text-3xl font-black tracking-tight text-slate-900"
            >
              Who we are?
            </h3>
            <div className="mt-4 space-y-3 text-sm sm:text-[0.98rem] leading-7 sm:leading-8 text-slate-600">
              <p>
                <span className="font-semibold text-slate-800">We {brandName}</span>, approved under 1860 act by Government of India. We started in 2004 with the motto to educate students according to current industrial trends. Till date we have trained more than <strong className="text-[#0a0aa1]">10,000+ students</strong>, most of whom are working in well‑reputed industries. Our highly qualified team has a wide range of experience in the IT industry.
              </p>
              <p>
                ✅ We started <strong className="text-[#0a0aa1]">1000+ businesses</strong> with Udyam registration under MSME, Government of India.
              </p>
              <p>
                ✅ We provide <strong className="text-[#0a0aa1]">job support to 600+ students</strong> in private, national, state, and multinational companies.
              </p>
            </div>

            <Link
              href="/about-institute"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0a0aa1] to-[#4f46e5] px-8 py-3.5 text-sm font-black uppercase tracking-widest text-white shadow-lg shadow-indigo-200 transition-all hover:scale-105 hover:shadow-indigo-300 active:scale-95"
            >
              Read More
              <span className="text-base">→</span>
            </Link>
          </div>

          
        </div>
      </div>
    </section>
  );
}