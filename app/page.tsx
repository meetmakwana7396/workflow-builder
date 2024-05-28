import type { Metadata } from "next";
import BuilderMain from "../components/builder/builder-main";

export const metadata: Metadata = {
  title: "Workflow Builder - by Meet Makwana",
};

export default function IndexPage() {
  return (
    <div className="h-full">
      <BuilderMain />
    </div>
  );
}
