"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { addNode } from "@/lib/features/workflows/workflowSlice";
import { useAppDispatch } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { Atom, GridFour, Plus, PlusCircle } from "@phosphor-icons/react";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { v4 as uuid } from "uuid";

const inputBlocks = ["File", "Paste", "Http Request", "Sheets", "Example Data"];
const operationBlocks = [
  "Filter",
  "Merge",
  "Sort",
  "Group",
  "Slice",
  "Rename Columns",
];

const AddBlockButton = ({
  onSelect,
}: {
  onSelect?: (blockName: string) => void;
}) => {
  const dispatch = useAppDispatch();
  const [tab, setTab] = useState("all");
  const [open, setOpen] = useState<boolean>();

  const handleOnSelect = (blockName: string) => {
    blockName = blockName.toLowerCase().replaceAll(" ", "_");
    dispatch(
      addNode({
        id: uuid(),
        type: "fileNode",
        position: { x: 200, y: 100 },
        data: { value: 123, color: "#fff" },
      }),
    );
    setOpen(false);
  };

  return (
    <div className="absolute left-5 top-5 z-10">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            className="mx-auto flex size-28 flex-col items-center justify-center gap-3 rounded-2xl bg-neutral-900 shadow-xl hover:bg-neutral-800"
            role="button"
          >
            <Plus className="shrink-0" />
            <span className="text-xs text-neutral-500">Add nodes</span>
          </Button>
        </DialogTrigger>
        <DialogContent maxWidth="1024px">
          <DialogHeader>Block library</DialogHeader>
          <div className="flex">
            <div className="w-full max-w-[20%] pe-4">
              <ul className="text-neutral-500">
                <li
                  role="button"
                  className={cn(
                    "add-block-nav-item",
                    tab === "all" && "active",
                  )}
                  onClick={() => setTab("all")}
                >
                  <GridFour className="size-5" />
                  All
                </li>
                <li
                  role="button"
                  className={cn(
                    "add-block-nav-item",
                    tab === "input" && "active",
                  )}
                  onClick={() => setTab("input")}
                >
                  <PlusCircle className="size-5" />
                  INPUT
                </li>
                <li
                  role="button"
                  className={cn(
                    "add-block-nav-item",
                    tab === "transform" && "active",
                  )}
                  onClick={() => setTab("transform")}
                >
                  <Atom className="size-5" />
                  TRANSFORM
                </li>
              </ul>
            </div>
            <div className="h-[700px] w-full space-y-10 overflow-y-auto px-8 pb-20 pt-10">
              {(tab === "all" || tab === "input") && (
                <div className="flex flex-col gap-4">
                  <h4 className="font-semibold tracking-widest text-neutral-200">
                    INPUT
                  </h4>
                  <div className="grid grid-cols-3 gap-4">
                    {inputBlocks.map((inputBlock) => (
                      <div
                        key={inputBlock}
                        className="add-block-card"
                        role="button"
                        onClick={() => handleOnSelect(inputBlock)}
                      >
                        {inputBlock}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {(tab === "all" || tab === "transform") && (
                <div className="flex flex-col gap-4">
                  <h4 className="font-semibold tracking-widest text-neutral-200">
                    TRANSFORM
                  </h4>
                  <div className="grid grid-cols-3 gap-4">
                    {operationBlocks.map((inputBlock) => (
                      <div
                        key={inputBlock}
                        className="add-block-card"
                        role="button"
                        onClick={() => handleOnSelect(inputBlock)}
                      >
                        {inputBlock}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddBlockButton;
