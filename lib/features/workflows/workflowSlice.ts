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

export interface NodeData {
  nodeId: string;
  data: { csvJson: Array<any>; columns: string[] };
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
  nodeData: any;
  resultColumns?: string[];
  resultData: any;
}

const initialState: WorkflowSliceState = {
  workflows: [],
  currentWorkflowId: "",
  currentWorkflowIndex: -1,
  open: false,
  nodeData: [],
  resultColumns: [],
  resultData: null,
};

export const workflowSlice = createSlice({
  name: "workflows",
  initialState,
  reducers: {
    setWorkflows: (state, { payload }) => {
      state.workflows = payload;
    },

    addWorkflow: (state, { payload }) => {
      state.workflows.push({
        ...sampleWorkflow,
        id: uuid(),
        name: payload.name,
        description: payload.description,
      });
    },

    deleteWorkflow: (state, { payload }) => {
      state.workflows = state?.workflows?.filter(
        (workflow) => workflow.id !== payload,
      );
      let localData = JSON.parse(localStorage.getItem("workflows") as string);
      console.log(localData, "localData");

      if (localData && localData?.length > 0) {
        localData = localData.filter((data: Workflow) => data.id !== payload);
        localStorage.setItem("workflows", JSON.stringify(localData));
      }
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

    emptyResultData: (state) => {
      state.resultData = [];
      state.resultColumns = [];
    },

    deleteNode: (
      { workflows, currentWorkflowIndex, nodeData },
      { payload },
    ) => {
      workflows[currentWorkflowIndex].nodes = workflows[
        currentWorkflowIndex
      ].nodes.filter((node) => node.id !== payload);
      nodeData = nodeData.filter((d: NodeData) => d.nodeId === payload);
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

      const updatedNodes = workflows[currentWorkflowIndex].nodes.map((node) => {
        if (node.id === payload.target) {
          return {
            ...node,
            data: {
              ...node.data,
              sourceId: payload.source,
            },
          };
        }
        return node;
      });

      workflows[currentWorkflowIndex].nodes = updatedNodes;
    },

    setResultData: (state, { payload }) => {
      console.count("resultdata reducer");
      state.resultColumns = payload.columns;
      state.resultData = payload.results;
      state.open = true;
    },

    setNodeData: (state, { payload }) => {
      state.nodeData.push(payload);
    },

    toggleOpen: (state) => {
      state.open = !state.open;
    },

    setOpen: (state, { payload }) => {
      state.open = payload as boolean;
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
  setResultData,
  setNodeData,
  setOpen,
  deleteWorkflow,
  emptyResultData,
  setWorkflows,
} = workflowSlice.actions;
export const { selectWorkflow } = workflowSlice.selectors;
