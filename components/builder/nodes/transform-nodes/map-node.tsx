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
} from "@/lib/features/workflows/workflowSlice";
import { cn } from "@/lib/utils";

const MapNode: React.FC<NodeProps> = ({
  id,
  data,
  isConnectable,
  selected,
}) => {
  const dispatch = useAppDispatch();
  const nodeData: Array<any> = useAppSelector(memoizedSourceNodeData);

  const columns: string[] = nodeData?.find(
    (d: { nodeId: string; data: any }) => d.nodeId === data.sourceId,
  )?.data?.columns;

  const getCsvJson = () => {
    const csvJson = nodeData.findLast(
      (d: { nodeId: string; data: any }) => d.nodeId === data.sourceId,
    )?.data?.csvJson;

    return csvJson;
  };

  console.log(getCsvJson());
  

  const handleRun = () => {
    const csvJson = nodeData.findLast(
      (d: { nodeId: string; data: any }) => d.nodeId === data.sourceId,
    )?.data?.csvJson;

    dispatch(
      setResultData({
        results: csvJson,
        columns,
      }),
    );
    dispatch(
      setNodeData({
        nodeId: id,
        data: {
          csvJson: csvJson,
          columns,
        },
      }),
    );
  };

  return (
    <div className={cn(styles.customNode, selected && "!border-yellow-900/80")}>
      <div className="flex items-center justify-between border-b border-neutral-800 p-1 px-2 text-xs font-bold text-yellow-500">
        Map
        <Button
          variant="ghost"
          size="icon"
          onClick={() => dispatch(deleteNode(id))}
        >
          <X className="size-3 shrink-0" />
        </Button>
      </div>

      <div className="min-w-56 space-y-2 p-2 pr-4">
        <div className="flex h-10 items-center text-xs">
          {getCsvJson()?.length > 0
            ? getCsvJson()?.length
            : `<-- Select database`}
        </div>
      </div>

      {true && (
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
        id="filterHandle2"
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

export default MapNode;
