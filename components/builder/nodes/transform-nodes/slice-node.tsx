"use client";
import styles from "@/app/styles/node.module.css";
import { Handle, NodeProps, Position } from "reactflow";
import { X } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import {
  memoizedSourceNodeData,
  useAppDispatch,
  useAppSelector,
} from "@/lib/hooks";
import {
  deleteNode,
  setNodeData,
  setResultData,
  updateNodeData,
} from "@/lib/features/workflows/workflowSlice";
import Select from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Input } from "@/components/ui/input";

const SliceNode: React.FC<NodeProps> = ({
  id,
  data,
  isConnectable,
  selected,
}) => {
  const dispatch = useAppDispatch();
  const nodeData: Array<any> = useAppSelector(memoizedSourceNodeData);

  const [sliceIndices, setSliceIndices] = useState<{
    from: number | string;
    to: number | string;
  }>({
    from: "",
    to: "",
  });

  const columns: string[] = nodeData?.find(
    (d: { nodeId: string; data: any }) => d.nodeId === data.sourceId,
  )?.data?.columns;

  const handleRun = () => {
    const csvJson = nodeData.findLast(
      (d: { nodeId: string; data: any }) => d.nodeId === data.sourceId,
    )?.data?.csvJson;

    let results: any = [];
    results = csvJson.slice(
      !sliceIndices.from ? 0 : sliceIndices.from,
      !sliceIndices.to ? csvJson?.length : sliceIndices.to,
    );

    dispatch(
      setResultData({
        results,
        columns,
      }),
    );
    dispatch(
      setNodeData({
        nodeId: id,
        data: {
          csvJson: results,
          columns,
        },
      }),
    );
  };

  return (
    <div className={cn(styles.customNode, selected && "!border-yellow-900/80")}>
      <div className="flex items-center justify-between border-b border-neutral-800 p-1 px-2 text-xs font-bold text-yellow-500">
        Slice
        <Button
          variant="ghost"
          size="icon"
          onClick={() => dispatch(deleteNode(id))}
        >
          <X className="size-3 shrink-0" />
        </Button>
      </div>

      <div className="min-w-56 space-y-2 p-2 pr-4">
        <Input
          className="h-8 text-xs"
          value={sliceIndices.from}
          type="number"
          placeholder="from index"
          onChange={(e) =>
            setSliceIndices({ ...sliceIndices, from: Number(e.target.value) })
          }
        />
        <Input
          className="h-8 text-xs"
          value={sliceIndices.to}
          type="number"
          placeholder="to index"
          onChange={(e) =>
            setSliceIndices({ ...sliceIndices, to: Number(e.target.value) })
          }
        />
      </div>

      {(sliceIndices.from || sliceIndices.to) && (
        <Button
          variant={"secondary"}
          className="w-full rounded-none text-xs"
          onClick={() => handleRun()}
        >
          Run
        </Button>
      )}

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

export default SliceNode;
