import InternalPageLayout from "@/components/InternalPageLayout";
import { getBrandName } from "@/lib/settings";

export default async function MsmeGovernmentOfIndiaPage() {
  const brandName = await getBrandName();

  return (
    <InternalPageLayout
      title="MSME Government of India"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Training with Government Organization", href: "/training-with-government-organization" },
        { label: "MSME Government of India" },
      ]}
    >
      <div className="mx-auto w-full max-w-4xl space-y-6 text-sm leading-8 text-slate-600 sm:text-base sm:leading-9">
        <h2 className="text-2xl font-extrabold text-slate-900">MSME Government of India</h2>
        <p>
          {brandName} supports MSME-linked skill development activities that connect learners with small business, enterprise growth and local industry needs.
        </p>
        <p>
          This initiative helps learners understand modern work culture, practical trades and the skills required to grow in the self-employment ecosystem.
        </p>
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-extrabold text-[#0a0aa1]">Skill Development Focus</h3>
          <p className="mt-2">
            Small enterprise readiness, skill development for livelihoods and industry-oriented practical learning.
          </p>
        </div>
      </div>
    </InternalPageLayout>
  );
}
