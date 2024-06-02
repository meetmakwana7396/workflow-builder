"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import CreateWorkflowButton from "./create-workflow-button";
import {
  addWorkflow,
  deleteWorkflow,
  setCurrentWorkflowId,
  setWorkflows,
  Workflow,
} from "@/lib/features/workflows/workflowSlice";
import { Input } from "@/components/ui/input";
import { MagnifyingGlass, Trash } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function WorkflowList() {
  const { workflows } = useAppSelector((state) => state.workflows);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (workflows?.length <= 0) {
      console.log(localStorage.getItem("workflows"), "JFSBFB");
      const localStorageWorkflows = JSON.parse(
        localStorage.getItem("workflows") as string,
      );
      localStorageWorkflows?.length > 0 &&
        dispatch(setWorkflows(localStorageWorkflows));
    }
    setIsLoading(false);
  }, [workflows, dispatch]);

  return (
    <div>
      {workflows?.length > 0 && (
        <div className="my-8 flex justify-between gap-4">
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

      {!isLoading && !!workflows && workflows?.length <= 0 && (
        <div className="mt-6 flex flex-col gap-6 text-neutral-500">
          You haven&apos;t created any workflow yet!
          <CreateWorkflowButton />
        </div>
      )}

      {workflows?.length > 0 && (
        <div className="grid grid-cols-3 gap-6">
          {workflows.map((workflow: Workflow) => (
            <div
              role="button"
              key={workflow.id}
              onClick={() => {
                dispatch(setCurrentWorkflowId(workflow.id));
                setTimeout(() => {
                  router.push(`/${workflow.id}`);
                });
              }}
            >
              <div
                className="flex !h-56 w-full flex-col justify-between space-y-4 overflow-hidden rounded-xl border-2 border-neutral-800 p-4 hover:border-neutral-600"
                role="button"
              >
                <div className="flex items-start justify-between gap-6">
                  <h2 className="line-clamp-2 font-bold">{workflow.name}</h2>
                  <Button
                    variant={"ghost"}
                    className="p-0 px-2.5 py-2  hover:bg-red-500/20"
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(deleteWorkflow(workflow.id));
                      router.refresh();
                    }}
                  >
                    <Trash weight="duotone" className="size-5 fill-red-500" />
                  </Button>
                </div>
                <p className="line-clamp-4 text-neutral-500">
                  {workflow.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
