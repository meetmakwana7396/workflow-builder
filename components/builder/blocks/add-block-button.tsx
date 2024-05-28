"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Atom, Plus, PlusCircle } from "@phosphor-icons/react";
import React from "react";

const inputBlocks = ["File", "Paste", "Http Request", "Sheets", "Example Data"];

const AddBlockButton = () => {
  return (
    <div className="absolute left-5 top-5 z-10">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className="mx-auto size-28 flex-col items-center justify-center rounded-2xl bg-neutral-900 shadow-xl"
            role="button"
          >
            <Plus className="shrink-0" />
            <span className="text-[10px] text-neutral-500">Add nodes</span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>Block library</DialogHeader>
          <div className="flex">
            <div className="w-full max-w-[20%] pe-4">
              <ul className="text-neutral-500">
                <li role="button" className="add-block-nav-item">
                  <PlusCircle className="size-5" />
                  INPUT
                </li>
                <li role="button" className="add-block-nav-item">
                  <Atom className="size-5" />
                  TRANSFORM
                </li>
              </ul>
            </div>
            <div className="w-full">
              <div className="flex flex-col gap-4">
                <h4 className="font-semibold text-neutral-200">Input</h4>
                <div className="grid grid-cols-4 gap-4">
                  {inputBlocks.map((inputBlock) => (
                    <div
                      key={inputBlock}
                      className="h-40 w-full rounded bg-neutral-800 p-4 shadow-lg transition hover:scale-105 hover:ring-2"
                      role="button"
                    >
                      {inputBlock}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddBlockButton;
