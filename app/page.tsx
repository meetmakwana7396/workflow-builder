import type { Metadata } from "next";
import BuilderMain from "../components/builder/builder-main";
import Sidebar from "../components/sidebar";

export const metadata: Metadata = {
  title: "Workflow Builder - by Meet Makwana",
};

export default function IndexPage() {
  return (
    <div className="h-full flex">
      <Sidebar />
      <BuilderMain />
    </div>
  );
}
