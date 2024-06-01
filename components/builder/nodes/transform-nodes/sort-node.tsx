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

const SortNode: React.FC<NodeProps> = ({
  id,
  data,
  isConnectable,
  selected,
}) => {
  const dispatch = useAppDispatch();
  const nodeData: Array<any> = useAppSelector(memoizedSourceNodeData);

  const [selectedColumn, setSelectedColumn] = useState({
    columnName: "",
    columnType: "",
  });
  const [selectedOrder, setSelectedOrder] = useState<string>("");

  const columns: string[] = nodeData?.find(
    (d: { nodeId: string; data: any }) => d.nodeId === data.sourceId,
  )?.data?.columns;

  const handleColumnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const csvJson = nodeData.find(
      (d: { nodeId: string; data: any }) => d.nodeId === data.sourceId,
    )?.data?.csvJson;
    const value = e.target.value;

    setSelectedColumn({
      columnName: value,
      columnType: typeof csvJson[0]?.[value],
    });
    setSelectedOrder("");

    dispatch(
      updateNodeData({
        nodeId: id,
        data: {
          ...data,
          columnName: value,
          columnType: typeof csvJson[0]?.[value],
        },
      }),
    );
  };

  const handleOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOrder(e.target.value);
    dispatch(
      updateNodeData({
        nodeId: id,
        data: {
          ...data,
          order: e.target.value,
        },
      }),
    );
  };

  function sortArray(arr: Array<any>, columnName: string, order: string) {
    // Create a shallow copy of the array to avoid mutating the original array
    const sortedArray = [...arr];

    // Perform the sorting
    sortedArray.sort((a, b) => {
      if (
        typeof a[columnName] === "number" &&
        typeof b[columnName] === "number"
      ) {
        return order === "asc"
          ? a[columnName] - b[columnName]
          : b[columnName] - a[columnName];
      } else if (
        typeof a[columnName] === "string" &&
        typeof b[columnName] === "string"
      ) {
        const comparison = a[columnName].localeCompare(b[columnName]);
        return order === "asc" ? comparison : -comparison;
      } else {
        return 0;
      }
    });

    return sortedArray;
  }

  const handleRun = () => {
    const csvJson = nodeData.findLast(
      (d: { nodeId: string; data: any }) => d.nodeId === data.sourceId,
    )?.data?.csvJson;

    console.log(csvJson, "csvJson");

    let results: any = [];

    switch (selectedOrder) {
      case "asc":
        results = sortArray(csvJson, selectedColumn.columnName, "asc");
        break;
      case "desc":
        results = sortArray(csvJson, selectedColumn.columnName, "desc");
        break;
    }
    console.log(results);

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
        Sort
        <Button
          variant="ghost"
          size="icon"
          onClick={() => dispatch(deleteNode(id))}
        >
          <X className="size-3 shrink-0" />
        </Button>
      </div>

      <div className="min-w-56 space-y-2 p-2 pr-4">
        <div>
          <Label size="xs">Column name:</Label>
          <Select
            value={selectedColumn.columnName}
            onChange={handleColumnChange}
          >
            {!columns?.length ? (
              <option value="">{`<-- Select database`}</option>
            ) : (
              <option value="">Select Column</option>
            )}
            {columns?.map((column: string) => (
              <option value={column} key={column} className="capitalize">
                {column.replaceAll("_", " ")}
              </option>
            ))}
          </Select>
        </div>

        {!!selectedColumn.columnName && (
          <div>
            <Label size="xs">Condition:</Label>
            <Select value={selectedOrder} onChange={handleOrderChange}>
              <option value="">Select order</option>
              <option value="asc">ascending</option>
              <option value="desc">descending</option>
            </Select>
          </div>
        )}
      </div>

      {selectedColumn.columnName && selectedOrder && (
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

export default SortNode;
