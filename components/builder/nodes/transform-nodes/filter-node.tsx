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
  NodeData,
  setNodeData,
  setResultData,
  updateNodeData,
} from "@/lib/features/workflows/workflowSlice";
import Select from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Input } from "@/components/ui/input";

const numericConditions = [
  "number equals",
  "number greater than",
  "number greater than or equals",
  "number less than",
  "number less than or equals",
  "data is not empty or null",
];

const stringConditions = [
  "text is exactly",
  "text is not exactly",
  "text includes",
  "text does not includes",
  "data is not empty or null",
];

const FilterNode: React.FC<NodeProps> = ({
  id,
  data,
  isConnectable,
  selected,
}) => {
  const dispatch = useAppDispatch();
  const nodeData: NodeData[] = useAppSelector(memoizedSourceNodeData);

  const [selectedColumn, setSelectedColumn] = useState({
    columnName: "",
    columnType: "",
  });
  const [selectedCondition, setSelectedCondition] = useState<string>("");
  const [userInput, setUserInput] = useState<string | number | null>(null);

  const columns: string[] | undefined = nodeData?.findLast(
    (d) => d.nodeId === data.sourceId,
  )?.data?.columns;

  const handleColumnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const csvJson = nodeData.findLast((d) => d.nodeId === data.sourceId)?.data
      ?.csvJson;
    const value = e.target.value;

    setSelectedColumn({
      columnName: value,
      columnType: typeof csvJson?.[0]?.[value],
    });
    setSelectedCondition("");

    dispatch(
      updateNodeData({
        nodeId: id,
        data: {
          ...data,
          columnName: value,
          columnType: typeof csvJson?.[0]?.[value],
        },
      }),
    );
  };

  const handleConditionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCondition(e.target.value);
    setUserInput("");
    dispatch(
      updateNodeData({
        nodeId: id,
        data: {
          ...data,
          condition: e.target.value,
        },
      }),
    );
  };

  const handleUserInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(
      selectedColumn.columnType === "number"
        ? Number(e.target.value)
        : e.target.value,
    );
    dispatch(
      updateNodeData({
        nodeId: id,
        data: {
          ...data,
          userInput:
            selectedColumn.columnType === "number"
              ? Number(e.target.value)
              : e.target.value,
        },
      }),
    );
  };

  const handleRun = () => {
    const csvJson = nodeData.find((d) => d.nodeId === data.sourceId)?.data
      ?.csvJson;
    console.log(csvJson, "csvJson");

    let results: any = [];

    if (selectedColumn.columnType === "string") {
      switch (selectedCondition) {
        case "text is exactly":
          results = csvJson?.filter(
            (row: any) =>
              row[selectedColumn.columnName]?.toLowerCase() ===
              (userInput as string)?.toLowerCase(),
          );
          break;
        case "text is not exactly":
          results = csvJson?.filter(
            (row: any) =>
              row[selectedColumn.columnName]?.toLowerCase() !==
              (userInput as string)?.toLowerCase(),
          );
          break;
        case "text includes":
          results = csvJson?.filter((row: any) =>
            row[selectedColumn.columnName]
              ?.toLowerCase()
              .includes((userInput as string)?.toLowerCase()),
          );
          break;
        case "text does not includes":
          results = csvJson?.filter(
            (row: any) =>
              !row[selectedColumn.columnName]
                ?.toLowerCase()
                .includes((userInput as string)?.toLowerCase()),
          );
          break;
        case "data is not empty or null":
          results = csvJson?.filter(
            (row: any) => !!row[selectedColumn.columnName],
          );
          break;
      }
    } else {
      switch (selectedCondition) {
        case "number equals":
          results = csvJson?.filter(
            (row: any) => row[selectedColumn.columnName] === userInput,
          );
          break;
        case "number is not equals":
          results = csvJson?.filter(
            (row: any) => row[selectedColumn.columnName] !== userInput,
          );
          break;
        case "number greater than":
          results = csvJson?.filter(
            (row: any) => row[selectedColumn.columnName] > userInput!,
          );
          break;
        case "number greater than or equals":
          results = csvJson?.filter(
            (row: any) => row[selectedColumn.columnName] >= userInput!,
          );
          break;
        case "number less than":
          results = csvJson?.filter(
            (row: any) => row[selectedColumn.columnName] < userInput!,
          );
          break;
        case "number less than or equals":
          results = csvJson?.filter(
            (row: any) => row[selectedColumn.columnName] <= userInput!,
          );
          console.log("results", results);
          break;
        case "data is not empty or null":
          results = csvJson?.filter(
            (row: any) => !!row[selectedColumn.columnName],
          );
          break;
      }
    }
    console.log(results, "results");

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
        Filter
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
            <Select value={selectedCondition} onChange={handleConditionChange}>
              <option value="">Select condition</option>
              {selectedColumn.columnType === "number"
                ? numericConditions.map((condition) => (
                    <option value={condition} key={condition}>
                      {condition}
                    </option>
                  ))
                : stringConditions.map((condition) => (
                    <option value={condition} key={condition}>
                      {condition}
                    </option>
                  ))}
            </Select>
          </div>
        )}

        {!!selectedCondition &&
          selectedCondition !== "data is not empty or null" && (
            <Input
              className="h-8 text-xs"
              value={userInput as string}
              type={selectedColumn?.columnType}
              onChange={handleUserInputChange}
            />
          )}
      </div>

      {selectedColumn.columnName && selectedCondition && (
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

export default FilterNode;
