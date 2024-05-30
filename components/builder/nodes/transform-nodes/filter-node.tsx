"use client";
import React from "react";
import styles from "@/app/styles/node.module.css";
import {
  getConnectedEdges,
  Handle,
  Node,
  NodeProps,
  Position,
} from "reactflow";
import { X } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { deleteNode } from "@/lib/features/workflows/workflowSlice";
import { ChevronDown } from "lucide-react";
import Select from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const FilterNode: React.FC<NodeProps> = ({
  id,
  data,
  isConnectable,
  selected,
}) => {
  const dispatch = useAppDispatch();
  const { workflows, currentWorkflowIndex } = useAppSelector(
    (state) => state.workflows,
  );

  // const connectedEdges = getConnectedEdges(
  //   workflows[currentWorkflowIndex]?.nodes,
  //   workflows[currentWorkflowIndex]?.edges,
  // );

  return (
    <div className={cn(styles.customNode, selected && "!border-blue-800")}>
      <div className="flex items-center justify-between border-b border-neutral-800 p-1 px-2 text-xs font-bold text-yellow-500">
        Filter
        <Button
          variant="ghost"
          size="icon"
          onClick={() => dispatch(deleteNode(id))}
        >
          <X className="size-3 shrink-0" />
        </Button>
      </div>
      <div className="p-2 pr-4">
        <div className="w-56">
          <Label size="xs">Column name:</Label>
          <Select>
            <option value="">Hello</option>
            <option value="">One</option>
            <option value="">Two</option>
          </Select>
        </div>

        <div className="w-56">
          <Label size="xs">Condition:</Label>
          <Select>
            <option value="">Hello</option>
            <option value="">One</option>
            <option value="">Two</option>
          </Select>
        </div>
      </div>

      <Handle
        type="target"
        position={Position.Left}
        id="filterHandle"
        className={styles.roundedLeftHandle}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="filterHandle"
        className={styles.verticalRightHandle}
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default FilterNode;
