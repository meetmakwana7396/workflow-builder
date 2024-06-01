"use client";
import { useEffect } from "react";
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

const nodeTypes = {
  file: FileNode,
  filter: FilterNode,
  sort: SortNode,
  slice: SliceNode,
};

const BuilderMain = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { workflows, currentWorkflowIndex } = useAppSelector(
    (state) => state.workflows,
  );

  const nodes = workflows[currentWorkflowIndex]?.nodes;
  const edges = workflows[currentWorkflowIndex]?.edges;

  useEffect(() => {
    if (currentWorkflowIndex === -1) {
      alert("Current workflow id lost, Going back to dashboard!");
      router.push("/");
    }
  }, [currentWorkflowIndex, router]);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <AddNodeButton />
      <Button className="absolute left-5 top-40 z-10" asChild>
        <Link href="/" onClick={() => dispatch(setOpen(false))}>
          Dashboard
        </Link>
      </Button>
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
