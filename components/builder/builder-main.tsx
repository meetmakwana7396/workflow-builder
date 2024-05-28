"use client";
import { useCallback, useMemo } from "react";
import ReactFlow, {
  addEdge,
  Background,
  BackgroundVariant,
  Controls,
  Edge,
  MiniMap,
  Node,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";
import FileNode from "./nodes/file-node/file-node";
import AddBlockButton from "./blocks/add-block-button";

const initialNodes: Node[] = [
  {
    id: "input-node",
    type: "fileNode",
    position: { x: 200, y: 100 },
    data: { value: 123, color: "#fff" },
  },
  {
    id: "1",
    position: { x: 600, y: 50 },
    data: { label: "1" },
  },
  { id: "2", position: { x: 600, y: 200 }, data: { label: "2" } },
];
const initialEdges: Edge[] = [];

const BuilderMain = () => {
  const nodeTypes = useMemo(() => ({ fileNode: FileNode }), []);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <AddBlockButton />
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
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
