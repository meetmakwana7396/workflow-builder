"use client";
import React from "react";
import styles from "./file-node.module.css";
import { Handle, Position, useNodes } from "reactflow";
import { Cross, X } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

const FileNode = ({
  id,
  data,
  isConnectable,
}: {
  id: string;
  data: any;
  isConnectable: any;
}) => {
  return (
    <div className={styles.filenode}>
      <div className="flex items-center justify-between border-b border-neutral-600 p-1 px-2 text-xs font-bold text-yellow-500">
        File
        <Button variant="ghost" size="icon">
          <X className="size-3 shrink-0" />
        </Button>
      </div>
      <div className="flex items-center justify-center gap-2 p-4">
        <div className="text-xs">Drop file here or:</div>
        <label
          className="rounded bg-white/10 p-2 text-[10px] font-semibold text-white shadow-md hover:bg-white/20"
          role="button"
        >
          Open file dialog
          <input
            className="nodrag"
            type="file"
            onChange={data.onChange}
            defaultValue={""}
            hidden
          />
        </label>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        id="a"
        className={styles.filenodeHandle}
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default FileNode;
