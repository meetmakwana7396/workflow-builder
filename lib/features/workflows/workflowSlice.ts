import { createSlice } from "@reduxjs/toolkit";
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Edge,
  Node,
} from "reactflow";
import { v4 as uuid } from "uuid";

export interface Workflow {
  id: string;
  name: string;
  description: string;
  nodes: Node[];
  edges: Edge[];
}

const sampleWorkflow = {
  id: "1",
  name: "sample",
  description: "lorem ipsum",
  nodes: [],
  edges: [],
};

export interface WorkflowSliceState {
  workflows: Workflow[];
  currentWorkflowId: string;
  currentWorkflowIndex: number;
  open: boolean;
  runningWorkflow: any;
}

const initialState: WorkflowSliceState = {
  workflows: [],
  currentWorkflowId: "",
  currentWorkflowIndex: -1,
  open: false,
  runningWorkflow: null,
};

export const workflowSlice = createSlice({
  name: "workflows",
  initialState,
  reducers: {
    addWorkflow: (state, { payload }) => {
      state.workflows.push({
        ...sampleWorkflow,
        id: uuid(),
        name: payload.name,
        description: payload.description,
      });
    },

    setCurrentWorkflowId: (state, { payload }) => {
      state.currentWorkflowId = payload;
      state.currentWorkflowIndex = state.workflows.findIndex(
        (workflow) => workflow.id === payload,
      );
    },

    addNode: ({ workflows, currentWorkflowIndex }, { payload }) => {
      workflows[currentWorkflowIndex].nodes.push(payload);
    },

    updateNodeData: (state, { payload }) => {
      const { workflows, currentWorkflowIndex } = state;
      const { nodeId, data } = payload;

      const updatedNodes = workflows[currentWorkflowIndex].nodes.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: data,
          };
        }
        return node;
      });

      state.workflows[currentWorkflowIndex].nodes = updatedNodes;
    },

    deleteNode: ({ workflows, currentWorkflowIndex }, { payload }) => {
      workflows[currentWorkflowIndex].nodes = workflows[
        currentWorkflowIndex
      ].nodes.filter((node) => node.id !== payload);
    },

    onNodesChange: ({ workflows, currentWorkflowIndex }, { payload }) => {
      workflows[currentWorkflowIndex].nodes = applyNodeChanges(
        payload,
        workflows[currentWorkflowIndex].nodes,
      );
    },

    onEdgesChange: ({ workflows, currentWorkflowIndex }, { payload }) => {
      workflows[currentWorkflowIndex].edges = applyEdgeChanges(
        payload,
        workflows[currentWorkflowIndex].edges,
      );
    },

    onConnect: ({ workflows, currentWorkflowIndex }, { payload }) => {
      workflows[currentWorkflowIndex].edges = addEdge(
        payload,
        workflows[currentWorkflowIndex].edges,
      );
    },

    setRunningWorkflow: (
      { workflows, currentWorkflowIndex },
      { payload },
    ) => {
      
    },

    toggleOpen: (state) => {
      state.open = !state.open;
    },
  },
  selectors: {
    selectWorkflow: (workflows) => workflows,
  },
});

export const {
  addNode,
  addWorkflow,
  updateNodeData,
  setCurrentWorkflowId,
  onNodesChange,
  onEdgesChange,
  onConnect,
  deleteNode,
  toggleOpen,
} = workflowSlice.actions;
export const { selectWorkflow } = workflowSlice.selectors;
