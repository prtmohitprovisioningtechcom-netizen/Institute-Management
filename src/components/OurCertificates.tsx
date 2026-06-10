"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { OurCertificateItem } from "@/lib/ourCertificates";

function CertificateLogo({ cert }: { cert: OurCertificateItem }) {
  return (
    <article className="flex w-44 shrink-0 items-center justify-center sm:w-52 lg:w-60">
      <div className="flex h-36 w-full items-center justify-center rounded-2xl border border-slate-100 bg-slate-50 p-5 shadow-sm sm:h-44 lg:h-52">
        <div className="relative h-full w-full">
          <Image
            src={cert.logo}
            alt="Certificate"
            fill
            unoptimized
            className="object-contain"
            sizes="(max-width: 640px) 176px, 240px"
          />
        </div>
      </div>
    </article>
  );
}

export default function OurCertificates() {
  const [certificates, setCertificates] = useState<OurCertificateItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function fetchCertificates() {
      try {
        const res = await fetch("/api/public/our-certificates", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as OurCertificateItem[];
        if (Array.isArray(data)) {
          setCertificates(data);
        }
      } catch {
        /* ignore */
      } finally {
        setLoaded(true);
      }
    }
    void fetchCertificates();
  }, []);

  const marqueeItems = useMemo(() => {
    if (certificates.length === 0) return [];
    const repeat = certificates.length < 4 ? 4 : 2;
    return Array.from({ length: repeat }, () => certificates).flat();
  }, [certificates]);

  const loopItems = useMemo(
    () => [...marqueeItems, ...marqueeItems],
    [marqueeItems],
  );

  const marqueeDuration = useMemo(
    () => `${Math.max(24, certificates.length * 8)}s`,
    [certificates.length],
  );

  if (!loaded || certificates.length === 0) return null;

  return (
    <section className="border-t border-slate-200 bg-white py-10 sm:py-12">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-xl font-black uppercase tracking-wide text-slate-900 sm:text-2xl lg:text-[2rem]">
            Our <span className="text-[#0a0aa1]">Certificates</span>
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 bg-slate-200" />
        </div>
      </div>

      <div className="relative mt-10 w-full overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-white to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-white to-transparent sm:w-24" />

        <div
          className="certificate-marquee-track flex w-max items-center gap-10 sm:gap-12 lg:gap-14"
          style={{ animationDuration: marqueeDuration }}
        >
          {loopItems.map((cert, index) => (
            <CertificateLogo key={`${cert.id}-${index}`} cert={cert} />
          ))}
        </div>
      </div>
    </section>
  );
}
