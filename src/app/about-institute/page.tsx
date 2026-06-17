import InternalPageLayout from "@/components/InternalPageLayout";
import Image from "next/image";
import { getBrandName } from "@/lib/settings";

export default async function AboutInstitutePage() {
  const brandName = await getBrandName();
  return (
    <InternalPageLayout
      title="About Us"
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "About Us" }]}
    >
      <div className="mx-auto w-full max-w-6xl">

        <div className="max-w-3xl space-y-4 text-sm leading-8 text-slate-500 sm:text-base sm:leading-9">
          <p>
            We Sunil group of education fashion and technology trust, approved under 1860 MSME act by government of India. We have been started in the year 2004, with motto to educate students according to current industrial trend. Till date we have trained more than 10,000+ student right now most of them are working in well reputed Industries.
          </p>
          <div className="flex justify-center my-6">
            <Image
              src="/office.jpg"
              alt="Office"
              width={800}
              height={500}
              className="rounded-lg shadow-lg"
            />
          </div>
          <p>
            Our mission is to provide top-notch education and hands-on training in
          skill development and fashion designing, fostering a new generation of tech-savvy
            professionals. We combine practical classroom guidance, industry-relevant
            learning, and student-focused mentorship to help learners build confidence
            and career-ready skills.
          </p>
        </div>
      </div>
    </InternalPageLayout>
  );
}