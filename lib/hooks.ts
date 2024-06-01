import { useDispatch, useSelector, useStore } from "react-redux";
import type { AppDispatch, AppStore, RootState } from "./store";
import { createSelector } from "@reduxjs/toolkit";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();

const selectNodeData = (state: RootState) => state.workflows.nodeData;
const selectResultColumns = (state: RootState) => state.workflows.resultColumns;
const selectResultData = (state: RootState) => state.workflows.resultData;
const selectOpen = (state: RootState) => state.workflows.open;

export const memoizedSourceNodeData = createSelector(
  [selectNodeData],
  (nodeData) => nodeData,
);

export const memoizedResultData = createSelector(
  [selectResultColumns, selectResultData, selectOpen],
  (resultColumns, resultData, open) => {
    return { resultColumns, resultData, open };
  },
);
