"use client";
import { Plus } from "@phosphor-icons/react";
import React from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "./ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";

const Sidebar = () => {
  return (
    <div className="z-10 h-screen">
      <div className="p-2 py-4 bg-neutral-950 h-full">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="flex-col justify-center items-center mx-auto rounded-2xl bg-neutral-900 shadow-xl size-28"
              role="button"
            >
              <Plus className="shrink-0" />
              <span className="text-[10px] text-neutral-500">Add nodes</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>Add nodes</DialogHeader>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse, eaque? Quis ducimus autem exercitationem ea? Placeat dolores sequi facilis, officiis magni harum ex? Recusandae assumenda quas neque voluptatum aliquid a!
            <DialogFooter>
              <Button>Add</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Sidebar;
