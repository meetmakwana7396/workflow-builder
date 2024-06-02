"use client";
import WorkflowList from "@/components/builder/workflows/workflow-list";

export default function IndexPage() {
  return (
    <div className="container">
      <div className="w-full border-b border-neutral-800 pb-4 pt-10">
        <h1 className="text-6xl font-bold">Dashboard</h1>
      </div>
      <WorkflowList />
    </div>
  );
}
