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
import React, { useState } from "react";
import { v4 as uuid } from "uuid";

const inputNodes = ["File"];
const operationNodes = ["Filter", "Map", "Sort", "Slice"];

const AddNodeButton = ({ className }: { className?: string }) => {
  const dispatch = useAppDispatch();
  const [tab, setTab] = useState("all");
  const [open, setOpen] = useState<boolean>();

  function getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const handleAddNode = (nodeType: string) => {
    nodeType = nodeType.toLowerCase().replaceAll(" ", "_");
    dispatch(
      addNode({
        id: uuid(),
        type: nodeType,
        position: {
          x: getRandomNumber(200, 800),
          y: getRandomNumber(200, 400),
        },
        data: { value: 123, color: "#fff" },
      }),
    );
    setOpen(false);
  };

  return (
    <div className={cn("z-10 sm:absolute sm:left-5 sm:top-5", className)}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            className="flex h-full flex-col items-center justify-center gap-3 bg-neutral-900 shadow-xl hover:bg-neutral-800 sm:mx-auto sm:size-28 sm:rounded-2xl"
            role="button"
          >
            <Plus className="shrink-0" />
            <span className="hidden text-xs text-neutral-500 sm:block">
              Add nodes
            </span>
          </Button>
        </DialogTrigger>
        <DialogContent maxWidth="1024px">
          <DialogHeader>Node library</DialogHeader>
          <div className="flex">
            <div className="w-full max-w-[30%] sm:max-w-[20%] sm:pe-4">
              <ul className="text-neutral-500">
                <li
                  role="button"
                  className={cn("add-node-nav-item", tab === "all" && "active")}
                  onClick={() => setTab("all")}
                >
                  <GridFour className="size-4 shrink-0 sm:size-5" />
                  All
                </li>
                <li
                  role="button"
                  className={cn(
                    "add-node-nav-item",
                    tab === "input" && "active",
                  )}
                  onClick={() => setTab("input")}
                >
                  <PlusCircle className="size-4 shrink-0 sm:size-5" />
                  INPUT
                </li>
                <li
                  role="button"
                  className={cn(
                    "add-node-nav-item",
                    tab === "transform" && "active",
                  )}
                  onClick={() => setTab("transform")}
                >
                  <Atom className="size-4 shrink-0 sm:size-5" />
                  TRANSFORM
                </li>
              </ul>
            </div>
            <div className="h-auto max-h-[400px] w-full space-y-10 overflow-y-auto px-8 pb-20 pt-10 sm:max-h-[700px]">
              {(tab === "all" || tab === "input") && (
                <div className="flex flex-col gap-4">
                  <h4 className="font-semibold tracking-widest text-neutral-200">
                    INPUT
                  </h4>
                  <div className="sm:grid-col-2 grid gap-4 md:grid-cols-3">
                    {inputNodes.map((inputNode) => (
                      <div
                        key={inputNode}
                        className="add-node-card"
                        role="button"
                        onClick={() => handleAddNode(inputNode)}
                      >
                        {inputNode}
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
                  <div className="sm:grid-col-2 grid gap-4 md:grid-cols-3">
                    {operationNodes.map((node) => (
                      <div
                        key={node}
                        className="add-node-card"
                        role="button"
                        onClick={() => handleAddNode(node)}
                      >
                        {node}
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

export default AddNodeButton;
