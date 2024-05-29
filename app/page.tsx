import type { Metadata } from "next";
import WorkflowList from "@/components/builder/workflows/workflow-list";

export const metadata: Metadata = {
  title: "Workflow Builder - by Meet Makwana",
};

export default function IndexPage() {
  return (
    <div className="container">
      <div className="flex w-full flex-col items-center justify-center space-y-4 py-40">
        <h1 className="text-6xl font-bold">Dashboard</h1>
      </div>
      <div className="p-4 py-10">
        <WorkflowList />
      </div>
    </div>
  );
}
