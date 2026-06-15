import InternalPageLayout from "@/components/InternalPageLayout";
import { getBrandName } from "@/lib/settings";

export default async function CdgiGovernmentOfIndiaPage() {
  const brandName = await getBrandName();

  return (
    <InternalPageLayout
      title="CDGI Government of India"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Training with Government Organization", href: "/training-with-government-organization" },
        { label: "CDGI Government of India" },
      ]}
    >
      <div className="mx-auto w-full max-w-4xl space-y-6 text-sm leading-8 text-slate-600 sm:text-base sm:leading-9">
        <h2 className="text-2xl font-extrabold text-slate-900">CDGI Government of India</h2>
        <p>
          {brandName} presents CDGI-linked skill development pathways for learners who want practical, job-ready and growth-oriented training.
        </p>
        <p>
          The focus remains on skill development, confidence building and preparing youth for industry opportunities and self-reliant careers.
        </p>
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-extrabold text-[#0a0aa1]">Skill Development Focus</h3>
          <p className="mt-2">
            Structured learning, modern skill development and career preparation under Government of India aligned support.
          </p>
        </div>
      </div>
    </InternalPageLayout>
  );
}
