import BuilderMain from "@/components/builder/builder-main";
import CollapsibleDataSection from "@/components/builder/collapsible-data-section";

export default async function WorkflowBuilderPage() {
  return (
    <div className="min-h-screen">
      <BuilderMain />
      <CollapsibleDataSection />
    </div>
  );
}
