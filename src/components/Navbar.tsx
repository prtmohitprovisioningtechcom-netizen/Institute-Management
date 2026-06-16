"use client";

// Navigation Bar Component with Brand Integration

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Clock3, Download, LogIn, Mail, Menu, Phone, Wallet, X, UserPlus, GraduationCap } from "lucide-react";
import { type MouseEvent, useEffect, useMemo, useState } from "react";
import { NAV_LINKS } from "@/utils/constants";

import { useBrand } from "@/context/BrandContext";

export default function Navbar() {
  const { brandName, brandMobile, brandEmail, brandLogo } = useBrand();
  const [activeSection, setActiveSection] = useState("#home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
  const [selectedAwardImg, setSelectedAwardImg] = useState<string | null>(null);

  const sectionLinks = useMemo(
    () =>
      NAV_LINKS.flatMap((item) => [item.href, ...(item.children?.map((child) => child.href) ?? [])]).filter((href) =>
        href.startsWith("#") && href.length > 1,
      ),
    [],
  );

  useEffect(() => {
    const entries = sectionLinks
      .map((href) => {
        try {
          const section = document.querySelector(href);
          return section ? { href, section } : null;
        } catch {
          return null;
        }
      })
      .filter((entry): entry is { href: string; section: Element } => entry !== null);

    if (!entries.length || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (observedEntries) => {
        const visibleEntries = observedEntries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (!visibleEntries.length) return;

        const targetId = `#${visibleEntries[0].target.id}`;
        setActiveSection((current) => (current === targetId ? current : targetId));
      },
      {
        root: null,
        rootMargin: "-35% 0px -45% 0px",
        threshold: [0.2, 0.4, 0.7],
      },
    );

    entries.forEach((entry) => observer.observe(entry.section));
    return () => observer.disconnect();
  }, [sectionLinks]);

  useEffect(() => {
    const onHashChange = () => {
      if (sectionLinks.includes(window.location.hash)) {
        setActiveSection(window.location.hash);
      }
    };

    onHashChange();
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [sectionLinks]);

  const scrollToSection = (href: string) => {
    if (!href.startsWith("#")) return;

    const section = document.querySelector(href);
    const stickyNav = document.querySelector('[data-sticky-nav="true"]');
    if (!section || !stickyNav) return;

    const headerHeight = stickyNav.getBoundingClientRect().height;
    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    const target = Math.max(0, sectionTop - headerHeight + 2);

    window.scrollTo({
      top: target,
      behavior: "smooth",
    });

    window.history.replaceState(null, "", href);
  };

  const handleNavClick = (href: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    if (!href.startsWith("#")) {
      setIsMobileMenuOpen(false);
      setOpenMobileDropdown(null);
      return;
    }

    event.preventDefault();
    setIsMobileMenuOpen(false);
    setOpenMobileDropdown(null);
    scrollToSection(href);
  };

  const isLinkActive = (href: string, children?: { href: string }[]) => {
    if (activeSection === href) return true;
    return children?.some((child) => child.href === activeSection) ?? false;
  };

  const shouldOpenInNewTab = (href: string) => href === "/admin/login" || href === "/student/login";

  return (
    <header className="relative z-50">
      <div className="bg-[#0a0aa1] text-xs text-white">
        <div className="mx-auto flex w-full max-w-330 items-center justify-between gap-2 px-3 py-2 sm:px-6 sm:py-2.5 lg:px-8">
          <p className="flex min-w-0 items-center gap-1.5 font-medium text-[9px] sm:text-xs md:text-sm">
            <Clock3 className="h-3 w-3 shrink-0 sm:h-4 sm:w-4" />
            <span className="truncate">Mon to Sat: 9AM to 5PM</span>
          </p>
          <div className="hidden items-center gap-4 sm:flex">
            <Link href="/atc/login" className="inline-flex items-center gap-1 hover:text-blue-200">
              <LogIn className="h-3 w-3" />
              Institute Login
            </Link>
            <Link href="/student/login" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-blue-200">
              <LogIn className="h-3 w-3" />
              Student Login
            </Link>
            <Link href="/download-section" className="inline-flex items-center gap-1 hover:text-blue-200">
              <Download className="h-3 w-3" />
              Downloads
            </Link>
            <Link href="/student-zone/registration-process" className="inline-flex items-center gap-1 hover:text-blue-200">
              <UserPlus className="h-3 w-3" />
              Registration Process
            </Link>
            <Link href="#" className="inline-flex items-center gap-1 hover:text-blue-200">
              <Wallet className="h-3 w-3" />
              Pay Fees
            </Link>
          </div>
        </div>
      </div>

      <div className="border-b border-slate-100 bg-white">
        <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-1.5 px-2 py-2 sm:px-3 sm:py-2.5 lg:gap-1 lg:px-3 lg:py-2.5">
          <div className="flex items-center justify-between gap-1.5 w-full">
            <div className="group flex min-w-0 items-center gap-1 sm:gap-2 lg:gap-2.5">
              <Link href="/" onClick={handleNavClick("/")} className="shrink-0">
                {brandLogo ? (
                  <img
                    src={brandLogo}
                    alt={brandName}
                    className="h-auto w-[110px] min-[360px]:w-[130px] min-[400px]:w-[150px] sm:w-[200px] md:w-[248px] lg:w-[296px] xl:w-[344px] shrink-0 object-contain"
                  />
                ) : (
                  <Image
                    src="/ygroup-logo.svg"
                    alt={brandName}
                    width={420}
                    height={176}
                    className="h-auto w-[110px] min-[360px]:w-[130px] min-[400px]:w-[150px] sm:w-[200px] md:w-[248px] lg:w-[296px] xl:w-[344px] shrink-0 object-contain"
                    priority
                  />
                )}
              </Link>
              <div className="flex min-w-0 flex-1 flex-col gap-0.5 sm:gap-1">
                <div className="flex min-w-0 flex-col leading-none tracking-tight text-[#0a0aa1]">
                  <span className="text-[9px] min-[360px]:text-[11px] min-[400px]:text-[12px] sm:text-[14px] md:text-[16px] lg:text-[clamp(15px,1.35vw,23px)] font-black uppercase whitespace-nowrap">
                    SUNIL GROUP OF EDUCATION
                  </span>
                  <span className="text-[9px] min-[360px]:text-[11px] min-[400px]:text-[12px] sm:text-[14px] md:text-[16px] lg:text-[clamp(15px,1.35vw,23px)] font-black uppercase whitespace-nowrap mt-0.5">
                    FASHION AND TECHNOLOGY TRUST
                  </span>
                </div>
                <div className="hidden min-w-0 border-l-2 border-[#0a0aa1]/20 pl-2 sm:block sm:pl-2.5">
                  <p className="text-[10px] font-black uppercase leading-snug tracking-[0.16em] text-[#0a0aa1]/95 sm:text-[11px] lg:text-[clamp(10px,0.8vw,13px)] whitespace-nowrap">
                    SIFT-SKILL DEVELOPMENT INSTITUTE
                  </p>
                  <p className="max-w-[280px] text-[8px] font-medium leading-snug text-slate-600 sm:max-w-xs sm:text-[9px] lg:max-w-sm lg:text-[10px]">
                    Undertaking by Sunil Group of Education Fashion and Technology Trust
                  </p>
                  <div className="mt-1.5 flex flex-col gap-1.5 lg:gap-2">
                    <a
                      href={brandEmail ? `mailto:${brandEmail}` : undefined}
                      className={`inline-flex items-center gap-2 lg:gap-2.5 ${brandEmail ? "hover:opacity-80" : "pointer-events-none"}`}
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#0a0aa1] text-white shadow-sm lg:h-9 lg:w-9">
                        <Mail className="h-3.5 w-3.5" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-[9px] font-bold uppercase tracking-wide text-slate-500 lg:text-[10px]">Email Us</p>
                        <p className="truncate text-[11px] font-semibold text-slate-800 lg:text-[13px]">{brandEmail || "Not available"}</p>
                      </div>
                    </a>

                    <a
                      href={brandMobile ? `tel:${brandMobile.replace(/\s/g, "")}` : undefined}
                      className={`inline-flex items-center gap-2 lg:gap-2.5 ${brandMobile ? "hover:opacity-80" : "pointer-events-none"}`}
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white text-[#0a0aa1] shadow-sm ring-1 ring-slate-200 lg:h-9 lg:w-9">
                        <Phone className="h-3.5 w-3.5" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-[9px] font-bold uppercase tracking-wide text-slate-500 lg:text-[10px]">Call Us</p>
                        <p className="whitespace-nowrap text-[11px] font-semibold text-slate-800 lg:text-[13px]">{brandMobile || "Not available"}</p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden shrink-0 flex-col items-center gap-1.5 lg:ml-auto lg:flex xl:ml-8">
              <div className="flex items-center justify-center gap-1 xl:gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedAwardImg("/p1.jpeg")}
                  className="relative h-56 w-56 overflow-hidden rounded-[18px] bg-white xl:h-60 xl:w-60 2xl:h-64 2xl:w-64 cursor-zoom-in block border-0 p-0 outline-none"
                >
                  <Image
                    src="/p1.jpeg"
                    alt="P1"
                    fill
                    unoptimized
                    className="object-contain"
                  />
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedAwardImg("/certificate.jpeg")}
                  className="relative h-56 w-56 overflow-hidden rounded-[18px] bg-white xl:h-60 xl:w-60 2xl:h-64 2xl:w-64 cursor-zoom-in block border-0 p-0 outline-none"
                >
                  <Image
                    src="/certificate.jpeg"
                    alt="Certificate"
                    fill
                    unoptimized
                    className="object-contain"
                  />
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedAwardImg("/trophhy1.jpg")}
                  className="relative h-56 w-56 overflow-hidden rounded-[18px] bg-white xl:h-60 xl:w-60 2xl:h-64 2xl:w-64 cursor-zoom-in block border-0 p-0 outline-none"
                >
                  <Image
                    src="/trophhy1.jpg"
                    alt="Trophy"
                    fill
                    unoptimized
                    className="object-contain"
                  />
                </button>
              </div>
              <p className="mt-1.5 text-center text-[15px] font-black uppercase tracking-[0.16em] text-[#0a0aa1] xl:text-[17px]">
                State award winner institute 2021-2022
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              className="inline-flex shrink-0 items-center justify-center rounded-md border border-slate-200 p-2 text-slate-700 transition hover:bg-slate-100 lg:hidden"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {/* Mobile Awards Block */}
          <div className="flex lg:hidden flex-col items-center gap-1.5 w-full mt-3 border-t border-slate-100 pt-3">
            <div className="flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => setSelectedAwardImg("/p1.jpeg")}
                className="relative h-20 w-20 min-[375px]:h-24 min-[375px]:w-24 sm:h-32 sm:w-32 md:h-40 md:w-40 overflow-hidden rounded-lg bg-white cursor-zoom-in block border-0 p-0 outline-none"
              >
                <Image
                  src="/p1.jpeg"
                  alt="P1"
                  fill
                  unoptimized
                  className="object-contain"
                />
              </button>
              <button
                type="button"
                onClick={() => setSelectedAwardImg("/certificate.jpeg")}
                className="relative h-20 w-20 min-[375px]:h-24 min-[375px]:w-24 sm:h-32 sm:w-32 md:h-40 md:w-40 overflow-hidden rounded-lg bg-white cursor-zoom-in block border-0 p-0 outline-none"
              >
                <Image
                  src="/certificate.jpeg"
                  alt="Certificate"
                  fill
                  unoptimized
                  className="object-contain"
                />
              </button>
              <button
                type="button"
                onClick={() => setSelectedAwardImg("/trophhy1.jpg")}
                className="relative h-20 w-20 min-[375px]:h-24 min-[375px]:w-24 sm:h-32 sm:w-32 md:h-40 md:w-40 overflow-hidden rounded-lg bg-white cursor-zoom-in block border-0 p-0 outline-none"
              >
                <Image
                  src="/trophhy1.jpg"
                  alt="Trophy"
                  fill
                  unoptimized
                  className="object-contain"
                />
              </button>
            </div>
            <p className="mt-1 text-center text-[10px] min-[375px]:text-xs sm:text-[13px] md:text-[14px] font-black uppercase tracking-[0.12em] text-[#0a0aa1]">
              State award winner institute 2021-2022
            </p>
          </div>

        </div>

        {isMobileMenuOpen ? (
          <div className="border-t border-slate-100 px-3 py-3 lg:hidden sm:px-6">
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              <a
                href={brandEmail ? `mailto:${brandEmail}` : undefined}
                className={`flex items-center gap-3 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2.5 ${brandEmail ? "" : "pointer-events-none"}`}
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#0a0aa1] text-white">
                  <Mail className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">Email Us</p>
                  <p className="truncate text-xs font-semibold text-slate-800">{brandEmail || "Not available"}</p>
                </div>
              </a>
              <a
                href={brandMobile ? `tel:${brandMobile.replace(/\s/g, "")}` : undefined}
                className={`flex items-center gap-3 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2.5 ${brandMobile ? "" : "pointer-events-none"}`}
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-white text-[#0a0aa1] ring-1 ring-slate-200">
                  <Phone className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">Call Us</p>
                  <p className="text-xs font-semibold text-slate-800">{brandMobile || "Not available"}</p>
                </div>
              </a>
            </div>
          </div>
        ) : null}
      </div>

      <nav
        data-sticky-nav="true"
        className="sticky top-0 z-50 -mb-4 bg-transparent sm:-mb-6 lg:-mb-10"
      >
        <div
          id="mobile-nav"
          className={`w-full overflow-x-clip px-2 py-2 lg:flex lg:items-center lg:justify-start lg:px-6 ${
            isMobileMenuOpen ? "flex flex-col" : "hidden"
          } lg:flex`}
        >
          <div className="flex w-full flex-col bg-[#0a0aa1] lg:flex-row lg:flex-nowrap lg:items-center lg:justify-between lg:gap-0 lg:px-4 lg:py-2 lg:shadow-[0_14px_28px_rgba(12,12,84,0.18)]">
            {NAV_LINKS.map((link) =>
              link.children?.length ? (
                <div key={link.label} className="group relative">
                  <button
                    type="button"
                    onClick={() => setOpenMobileDropdown((current) => (current === link.label ? null : link.label))}
                    className={`flex w-full shrink-0 items-center whitespace-nowrap px-4 py-3 text-[10px] font-semibold tracking-[0.03em] text-white transition lg:w-auto lg:px-1 lg:py-1.5 lg:text-[9px] xl:px-1.5 xl:text-[10px] 2xl:px-2.5 2xl:text-[11px] ${
                      isLinkActive(link.href, link.children) ? "text-blue-100" : "hover:text-blue-100"
                    }`}
                  >
                    <span className="truncate">{link.label}</span>
                    <ChevronDown className="ml-1.5 h-3 w-3 shrink-0" />
                  </button>

                  <div className="hidden min-w-56 bg-[#0a0aa1]/95 py-2 text-sm text-white lg:absolute lg:left-0 lg:top-full lg:block lg:translate-y-2 lg:rounded-sm lg:opacity-0 lg:shadow-lg lg:ring-1 lg:ring-white/10 lg:transition lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
                    {link.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        target={shouldOpenInNewTab(child.href) ? "_blank" : undefined}
                        rel={shouldOpenInNewTab(child.href) ? "noopener noreferrer" : undefined}
                        onClick={handleNavClick(child.href)}
                        className="block px-4 py-2.5 text-left text-sm font-medium text-white/85 transition hover:bg-white/10 hover:text-white"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>

                  {openMobileDropdown === link.label ? (
                    <div className="space-y-1 bg-[#06067c] px-4 py-2 lg:hidden">
                      {link.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          target={shouldOpenInNewTab(child.href) ? "_blank" : undefined}
                          rel={shouldOpenInNewTab(child.href) ? "noopener noreferrer" : undefined}
                          onClick={handleNavClick(child.href)}
                          className="block py-2 text-xs font-medium text-white/85 transition hover:text-white"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={handleNavClick(link.href)}
                  className={`flex shrink-0 items-center whitespace-nowrap px-4 py-3 text-[10px] font-semibold tracking-[0.03em] text-white transition lg:px-1 lg:py-1.5 lg:text-[9px] xl:px-1.5 xl:text-[10px] 2xl:px-2.5 2xl:text-[11px] ${
                    isLinkActive(link.href) ? "text-blue-100" : "hover:text-blue-100"
                  }`}
                >
                  {link.label}
                </Link>
              ),
            )}
          </div>
        </div>
      </nav>

      {/* Lightbox Modal */}
      {selectedAwardImg && (
        <div
          onClick={() => setSelectedAwardImg(null)}
          className="fixed inset-0 z-[9999] bg-black/85 flex items-center justify-center p-4 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-[90vw] max-h-[90vh] bg-transparent rounded-xl overflow-hidden cursor-default"
          >
            <button
              type="button"
              onClick={() => setSelectedAwardImg(null)}
              className="absolute top-2 right-2 bg-black/70 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl cursor-pointer z-10 hover:bg-red-600 transition-colors border-0 outline-none"
            >
              ✕
            </button>
            <img
              src={selectedAwardImg}
              alt="Enlarged Award"
              className="max-w-[90vw] max-h-[85vh] block object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </header>
  );
}
