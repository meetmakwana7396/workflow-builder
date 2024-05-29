"use client";
import { useEffect, useMemo } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";
import FileNode from "./nodes/file-node/file-node";
import AddBlockButton from "./blocks/add-block-button";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  onConnect,
  onEdgesChange,
  onNodesChange,
} from "@/lib/features/workflows/workflowSlice";
import { useRouter } from "next/navigation";

const BuilderMain = () => {
  const nodeTypes = useMemo(() => ({ fileNode: FileNode }), []);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { workflows, currentWorkflowIndex, currentWorkflowId } = useAppSelector(
    (state) => state.workflows,
  );

  const nodes = workflows[currentWorkflowIndex]?.nodes;
  const edges = workflows[currentWorkflowIndex]?.edges;

  useEffect(() => {
    if (currentWorkflowIndex === -1) {
      alert("Current workflow id lost, Going back to dashboard!")
      router.push("/")};
  }, [currentWorkflowIndex, router]);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <AddBlockButton />
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
    </div>
  );
};

export default BuilderMain;
