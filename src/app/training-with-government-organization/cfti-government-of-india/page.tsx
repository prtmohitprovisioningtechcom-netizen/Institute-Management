import InternalPageLayout from "@/components/InternalPageLayout";
import { getBrandName } from "@/lib/settings";

export default async function CftiGovernmentOfIndiaPage() {
  const brandName = await getBrandName();

  return (
    <InternalPageLayout
      title="CFTI Government of India"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Training with Government Organization", href: "/training-with-government-organization" },
        { label: "CFTI Government of India" },
      ]}
    >
      <div className="mx-auto w-full max-w-4xl space-y-6 text-sm leading-8 text-slate-600 sm:text-base sm:leading-9">
        <h2 className="text-2xl font-extrabold text-slate-900">CFTI Government of India</h2>
        <p>
          {brandName} supports skill development through structured training, practical learning and job-oriented preparation under Government of India aligned initiatives.
        </p>
        <p>
          This page highlights training activities focused on employment readiness, entrepreneurship support and trade-based learning for learners across India.
        </p>
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-extrabold text-[#0a0aa1]">Skill Development Focus</h3>
          <p className="mt-2">
            Practical training, guidance for self-employment, and industry-relevant skill development pathways.
          </p>
        </div>
      </div>
    </InternalPageLayout>
  );
}
