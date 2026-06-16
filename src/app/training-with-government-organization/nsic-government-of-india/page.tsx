import InternalPageLayout from "@/components/InternalPageLayout";
import { getBrandName } from "@/lib/settings";

export default async function NsicGovernmentOfIndiaPage() {
  const brandName = await getBrandName();

  return (
    <InternalPageLayout
      title="NSIC Government of India"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Training with Government Organization", href: "/training-with-government-organization" },
        { label: "NSIC Government of India" },
      ]}
    >
      <div className="mx-auto w-full max-w-4xl space-y-6 text-sm leading-8 text-slate-600 sm:text-base sm:leading-9">
        <h2 className="text-2xl font-extrabold text-slate-900">NSIC Government of India</h2>
        <p>
          {brandName} uses NSIC-linked initiatives to promote skill development, vocational learning and practical training for learners seeking better career options.
        </p>
        <p>
          The aim is to build confidence, employability and self-reliance through structured skill development activities and guided mentorship.
        </p>
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-extrabold text-[#0a0aa1]">Skill Development Focus</h3>
          <p className="mt-2">
            Workshop-based learning, employment-oriented guidance and entrepreneurship support.
          </p>
        </div>
      </div>
    </InternalPageLayout>
  );
}
