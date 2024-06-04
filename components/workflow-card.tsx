"use client";

import { Trash } from "@phosphor-icons/react";
import { Button } from "./ui/button";
import {
  deleteWorkflow,
  setCurrentWorkflowId,
  Workflow,
} from "@/lib/features/workflows/workflowSlice";
import { useAppDispatch } from "@/lib/hooks";
import { useRouter } from "next/navigation";

const WorkflowCard = ({ workflow }: { workflow: Workflow }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  return (
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
              dispatch(deleteWorkflow(workflow?.id));
              router.refresh();
            }}
          >
            <Trash weight="duotone" className="size-5 fill-red-500" />
          </Button>
        </div>
        <p className="line-clamp-4 text-neutral-500">{workflow.description}</p>
      </div>
    </div>
  );
};

export default WorkflowCard;
