"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import CreateWorkflowButton from "./create-workflow-button";
import { setWorkflows, Workflow } from "@/lib/features/workflows/workflowSlice";
import { Input } from "@/components/ui/input";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import WorkflowCard from "@/components/workflow-card";
import { useRouter } from "next/navigation";

const WorkflowList = () => {
  const { workflows } = useAppSelector((state) => state.workflows);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (workflows?.length <= 0) {
      const localStorageWorkflows = JSON.parse(
        localStorage.getItem("workflows") as string,
      );
      localStorageWorkflows?.length > 0 &&
        dispatch(setWorkflows(localStorageWorkflows));
    }
    setIsLoading(false);
    router.refresh();
  }, [workflows, dispatch, router]);
  console.log(isLoading, "isLoading");

  return (
    <div>
      {isLoading && (
        <div className="mt-6 flex flex-col gap-6">
          <div className="flex h-14 w-full animate-pulse rounded-lg bg-neutral-900" />
          <div className="grid animate-pulse grid-cols-3 gap-6">
            {Array(6)
              .fill(0)
              .map((ele, index) => (
                <div
                  key={index}
                  className="h-56 w-full rounded-xl bg-neutral-900"
                />
              ))}
          </div>
        </div>
      )}

      {workflows?.length > 0 && (
        <div className="my-8 flex flex-col justify-between gap-4 sm:flex-row">
          <div className="relative w-full">
            <MagnifyingGlass className="absolute left-4 top-1/2 size-6 -translate-y-1/2" />
            <Input
              type="search"
              className="w-full pl-14"
              placeholder="Search workflows or projects..."
            />
          </div>
          <div className="flex justify-end">
            <CreateWorkflowButton />
          </div>
        </div>
      )}

      {workflows?.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {workflows.map((workflow: Workflow) => (
            <WorkflowCard workflow={workflow} key={workflow.id} />
          ))}
        </div>
      )}

      {!isLoading && !!workflows && workflows?.length <= 0 && (
        <div className="mt-6 flex flex-col gap-6 text-neutral-500">
          You haven&apos;t created any workflow yet!
          <CreateWorkflowButton />
        </div>
      )}
    </div>
  );
};
export default WorkflowList;
