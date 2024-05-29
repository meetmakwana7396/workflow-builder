"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import CreateWorkflowButton from "./create-workflow-button";
import {
  setCurrentWorkflowId,
  Workflow,
} from "@/lib/features/workflows/workflowSlice";
import Link from "next/link";

export default function WorkflowList() {
  const dispatch = useAppDispatch();
  const { workflows } = useAppSelector((state) => state.workflows);

  return (
    <div>
      {workflows?.length > 0 && (
        <div className="flex justify-end">
          <CreateWorkflowButton />
        </div>
      )}
      <hr className="my-4 border-neutral-800" />
      {workflows?.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-3 py-4 text-neutral-500">
          You haven&apos;t created any workflow yet!
          <CreateWorkflowButton />
        </div>
      )}

      {workflows?.length > 0 && (
        <div className="grid grid-cols-3 gap-6">
          {workflows.map((workflow: Workflow) => (
            <Link
              href={`/${workflow.id}`}
              key={workflow.id}
              onClick={() => dispatch(setCurrentWorkflowId(workflow.id))}
            >
              <div
                className="flex !h-56 w-full flex-col justify-between space-y-4 overflow-hidden rounded-xl border-2 border-neutral-900 p-4 hover:border-neutral-600"
                role="button"
              >
                <h2 className="font-bold">{workflow.name}</h2>
                <p className="line-clamp-4 text-neutral-500">
                  {workflow.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
