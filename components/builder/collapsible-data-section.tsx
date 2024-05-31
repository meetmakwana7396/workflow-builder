"use client";
import { toggleOpen } from "@/lib/features/workflows/workflowSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { CaretUp } from "@phosphor-icons/react";

export default function CollapsibleDataSection() {
  const dispatch = useAppDispatch();
  const { open } = useAppSelector((state) => state.workflows);

  return (
    <div
      className={cn(
        "fixed bottom-0 w-full bg-neutral-900",
        open && "border-t border-blue-500",
      )}
      style={{ height: open ? "500px" : "0px" }}
    >
      <div
        role="button"
        onClick={() => dispatch(toggleOpen())}
        className="absolute -top-8 left-1/2 flex h-8 -translate-x-1/2 items-center justify-center gap-2 border border-b-0 border-blue-500 bg-neutral-900 px-4 py-2 text-xs"
      >
        <CaretUp className={cn("size-3", open && "rotate-180")} />
        Output
      </div>
    </div>
  );
}
