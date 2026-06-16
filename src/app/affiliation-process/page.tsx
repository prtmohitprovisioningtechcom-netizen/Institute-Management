import BecomeAtcForm from "@/components/affiliation/BecomeAtcForm";
import InternalPageLayout from "@/components/InternalPageLayout";

export default function BecomeAtcPage() {
  return (
    <InternalPageLayout
      title="Affiliation Process"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Affiliation Process" },
      ]}
    >
      <BecomeAtcForm />
    </InternalPageLayout>
  );
}

