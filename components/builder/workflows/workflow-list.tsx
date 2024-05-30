"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import CreateWorkflowButton from "./create-workflow-button";
import {
  setCurrentWorkflowId,
  Workflow,
} from "@/lib/features/workflows/workflowSlice";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { LucideSearch } from "lucide-react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";

export default function WorkflowList() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { workflows } = useAppSelector((state) => state.workflows);

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
      {/* <hr className="my-4 border-neutral-800" /> */}
      {workflows?.length === 0 && (
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
                <h2 className="font-bold">{workflow.name}</h2>
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
