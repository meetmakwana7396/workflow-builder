"use client";
import styles from "@/app/styles/node.module.css";
import { getConnectedEdges, Handle, NodeProps, Position } from "reactflow";
import { X } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  deleteNode,
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
  console.log(data, "filter node data");

  const dispatch = useAppDispatch();
  const [selectedColumn, setSelectedColumn] = useState({
    columnName: "",
    columnType: "",
  });
  const [selectedCondition, setSelectedCondition] = useState<string>("");
  const [userInput, setUserInput] = useState<string | number | null>(null);

  const { workflows, currentWorkflowIndex } = useAppSelector(
    (state) => state.workflows,
  );

  const connectedEdges = getConnectedEdges(
    workflows[currentWorkflowIndex]?.nodes,
    workflows[currentWorkflowIndex]?.edges,
  );

  const sourceNodeId = connectedEdges.find(
    (edge, index) => edge.target === id,
  )?.source;

  const sourceNode = workflows[currentWorkflowIndex].nodes.find(
    (node) => node.id === sourceNodeId,
  );

  const csvJson = sourceNode?.data?.csvJson?.data;
  const columns = csvJson?.[0];

  const handleRun = () => {
    const columnIndex = columns.findIndex(
      (column: string) => column === selectedColumn.columnName,
    );
    if (selectedColumn.columnType === "string") {
      switch (selectedCondition) {
        case "text is exactly":
          const result = csvJson
            .slice(1)
            .filter(
              (row: string[]) =>
                row[columnIndex] === "kjacklin8d@delicious.com",
            );
          console.log({ result });

          break;

        default:
          break;
      }
    } else {
    }
  };

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
      <div className="p-2 pr-4 space-y-2">
        <div className="w-56">
          <Label size="xs">Column name:</Label>
          <Select
            onChange={(e) => {
              const name = e.target.value.split("-")[0];
              const type = e.target.value.split("-")[1];
              setSelectedColumn({
                columnName: name,
                columnType: typeof csvJson[1]?.[type],
              });
              dispatch(
                updateNodeData({
                  nodeId: id,
                  data: {
                    ...data,
                    columnName: name,
                    columnType: typeof csvJson[1]?.[type],
                  },
                }),
              );
            }}
          >
            {!columns?.length ? (
              <option value="">{`<-- Select database`}</option>
            ) : (
              <option value="">Select Column</option>
            )}
            {columns?.map((column: string, index: number) => (
              <option
                value={`${column}-${index}`}
                key={column}
                className="capitalize"
              >
                {column.replaceAll("_", " ")}
              </option>
            ))}
          </Select>
        </div>

        {!!selectedColumn.columnName && (
          <div className="w-56">
            <Label size="xs">Condition:</Label>
            <Select
              onChange={(e) => {
                setSelectedCondition(e.target.value);
                dispatch(
                  updateNodeData({
                    nodeId: id,
                    data: {
                      ...data,
                      condition: e.target.value,
                    },
                  }),
                );
              }}
            >
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

        {!!selectedCondition && selectedColumn.columnType === "string" && (
          <Input type="text" />
        )}
      </div>

      <Button
        variant={"secondary"}
        className="w-full rounded-none"
        onClick={() => handleRun()}
      >
        Run
      </Button>

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
