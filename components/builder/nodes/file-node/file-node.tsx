"use client";
import React from "react";
import styles from "./file-node.module.css";
import { Handle, Position } from "reactflow";

const FileNode = ({
  data,
  isConnectable,
}: {
  data: any;
  isConnectable: any;
}) => {
  return (
    <div className={styles.filenode}>
      <div>
        Custom Color Picker Node: <strong>{data.color}</strong>
      </div>
      <input
        className="nodrag"
        type="color"
        onChange={data.onChange}
        defaultValue={data.color}
      />

      <Handle
        type="source"
        position={Position.Right}
        id="a"
        style={{ background: "#555" }}
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default FileNode;
