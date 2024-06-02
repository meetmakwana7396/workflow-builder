"use client";
import { useEffect, useState } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";
import FileNode from "./nodes/file-node/file-node";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  emptyResultData,
  onConnect,
  onEdgesChange,
  onNodesChange,
  setOpen,
} from "@/lib/features/workflows/workflowSlice";
import { useRouter } from "next/navigation";
import AddNodeButton from "./nodes/add-node-button";
import FilterNode from "./nodes/transform-nodes/filter-node";
import CollapsibleDataSection from "./collapsible-data-section";
import { Button } from "../ui/button";
import Link from "next/link";
import SortNode from "./nodes/transform-nodes/sort-node";
import SliceNode from "./nodes/transform-nodes/slice-node";
import MapNode from "./nodes/transform-nodes/map-node";
import { Check } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const nodeTypes = {
  file: FileNode,
  filter: FilterNode,
  sort: SortNode,
  slice: SliceNode,
  map: MapNode,
};

const BuilderMain = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { workflows, currentWorkflowIndex, currentWorkflowId } = useAppSelector(
    (state) => state.workflows,
  );

  const [saveEffect, setSaveEffect] = useState(false);

  const nodes = workflows[currentWorkflowIndex]?.nodes;
  const edges = workflows[currentWorkflowIndex]?.edges;

  const handleSaveWorkflow = () => {
    setSaveEffect(true);
    let localData = JSON.parse(localStorage.getItem("workflows") as string);

    if (!!localData && localData?.length > 0) {
      const foundedIndex = localData.findIndex(
        (d: any) => d.id === currentWorkflowId,
      );

      if (foundedIndex !== -1) {
        localData[foundedIndex] = workflows[currentWorkflowIndex];
      } else {
        localData.push(workflows[currentWorkflowIndex]);
      }
    } else {
      localData = [workflows[currentWorkflowIndex]];
    }
    localStorage.setItem("workflows", JSON.stringify(localData));
    setTimeout(() => {
      setSaveEffect(false);
    }, 1000);
  };

  useEffect(() => {
    if (currentWorkflowIndex === -1) {
      alert("Current workflow id lost, Going back to dashboard!");
      router.push("/");
    }
  }, [currentWorkflowIndex, router]);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <AddNodeButton className="hidden sm:block" />

      <div className="absolute w-full pt-2">
        <div className="relative flex justify-center gap-4">
          <AddNodeButton className="block sm:hidden" />

          <Button asChild className="z-10">
            <Link
              href="/"
              onClick={() => {
                dispatch(setOpen(false));
                dispatch(emptyResultData());
                router.refresh();
              }}
            >
              Dashboard
            </Link>
          </Button>
          <Button
            className={cn(
              "z-10",
              saveEffect && "bg-green-500 hover:bg-green-500",
            )}
            onClick={handleSaveWorkflow}
          >
            {saveEffect ? (
              <span className="flex gap-2">
                <Check className="size-5" /> Saved
              </span>
            ) : (
              "Save Workflow"
            )}
          </Button>
        </div>
      </div>
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={(e) => dispatch(onNodesChange(e))}
          onEdgesChange={(e) => dispatch(onEdgesChange(e))}
          onConnect={(e) => dispatch(onConnect(e))}
          nodeTypes={nodeTypes}
        >
          <Controls />
          <MiniMap
            nodeStrokeWidth={1}
            nodeColor={"#f2f2f2"}
            maskColor="#121212"
            pannable
            style={{ backgroundColor: "#242424" }}
          />
          <Background
            variant={BackgroundVariant.Dots}
            color="#f1f1f1"
            gap={40}
            size={1}
          />
        </ReactFlow>
      </ReactFlowProvider>
      <CollapsibleDataSection />
    </div>
  );
};

export default BuilderMain;
