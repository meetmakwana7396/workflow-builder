"use client";
import React from "react";
import styles from "@/app/styles/node.module.css";
import { Handle, NodeProps, Position } from "reactflow";
import { X } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/lib/hooks";
import {
  deleteNode,
  updateNodeData,
} from "@/lib/features/workflows/workflowSlice";
import { cn } from "@/lib/utils";
import Papa from "papaparse";

const FileNode: React.FC<NodeProps> = ({
  id,
  data,
  isConnectable = true,
  selected,
}) => {
  const dispatch = useAppDispatch();
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0];
    if (file) {
      Papa.parse(file, {
        dynamicTyping: true,
        step: function (row) {
          console.log("Row:", row.data);
        },
        complete: function (results) {
          dispatch(
            updateNodeData({ nodeId: id, data: { ...data, csvJson: results } }),
          );
        },
      });
    }
  };

  console.log(data, "FILE NODE DATA");

  return (
    <div className={cn(styles.customNode, selected && "!border-blue-800")}>
      <div className="flex items-center justify-between border-b border-neutral-800 p-1 px-2 text-xs font-bold text-yellow-500">
        File
        <Button
          variant="ghost"
          size="icon"
          onClick={() => dispatch(deleteNode(id))}
        >
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
            onChange={handleFileChange}
            hidden
          />
        </label>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        id="fileNodeHandle"
        className={styles.verticalRightHandle}
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default FileNode;
