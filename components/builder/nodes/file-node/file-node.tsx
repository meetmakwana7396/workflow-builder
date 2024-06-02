"use client";
import React, { useState } from "react";
import styles from "@/app/styles/node.module.css";
import { Handle, NodeProps, Position } from "reactflow";
import { File, X } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/lib/hooks";
import {
  deleteNode,
  setNodeData,
} from "@/lib/features/workflows/workflowSlice";
import { cn } from "@/lib/utils";
import Papa from "papaparse";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

const csvFiles = [
  {
    name: "1000-sales-records.csv",
    path: "/csv/1000-sales-records.csv",
  },
  {
    name: "5000-sales-records.csv",
    path: "/csv/5000-sales-records.csv",
  },
  {
    name: "10000-sales-records.csv",
    path: "/csv/10000-sales-records.csv",
  },
  {
    name: "50000-sales-records.csv",
    path: "/csv/50000-sales-records.csv",
  },
];

const FileNode: React.FC<NodeProps> = ({
  id,
  data,
  isConnectable = true,
  selected,
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [file, setFile] = useState<any>(null);

  const handleFileChange = async (path: string) => {
    // const file = event?.target?.files?.[0];
    // if (file) {
    //   setFile(file);
    //   Papa.parse(file, {
    //     dynamicTyping: true,
    //     header: true,
    //     complete: function (results) {},
    //   });
    // }

    try {
      const response = await fetch(path);
      const reader = response?.body?.getReader();
      const result = await reader?.read();
      const decoder = new TextDecoder("utf-8");
      const csv = decoder.decode(result?.value);

      Papa.parse(csv, {
        header: true,
        dynamicTyping: true,

        complete: (results) => {
          dispatch(
            setNodeData({
              nodeId: id,
              data: {
                csvJson: results.data,
                columns: results.meta.fields,
              },
            }),
          );
        },
        error: (err: any) => {
          console.log(err.message);
        },
      });
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <div className={cn(styles.customNode, selected && "!border-yellow-900/80")}>
      <div className="flex items-center justify-between border-b border-neutral-800 p-1 px-2 text-xs font-bold text-yellow-500">
        File
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            dispatch(deleteNode(id));
            router.refresh();
          }}
        >
          <X className="size-3 shrink-0" />
        </Button>
      </div>
      <div className="flex items-center justify-center gap-2 p-4">
        {file ? (
          <div className="text-xs">File name: &quot;{file}&quot;</div>
        ) : (
          <>
            <div className="text-xs">Select file:</div>
            <Dialog>
              <DialogTrigger>
                <label
                  className="rounded bg-white/10 p-2 text-[10px] font-semibold text-white shadow-md hover:bg-white/20"
                  role="button"
                >
                  Open file dialog
                  {/* <input
                className="nodrag"
                type="file"
                onChange={handleFileChange}
                hidden
              /> */}
                </label>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>Select database file</DialogHeader>
                <div className="h-full min-h-80">
                  <div className="grid grid-cols-5 gap-4">
                    {csvFiles?.map((elem, index: number) => (
                      <div
                        key={index}
                        role="button"
                        onClick={() => {
                          setFile(elem.name);
                          handleFileChange(elem.path);
                        }}
                        className="flex flex-col items-center justify-start gap-2 p-4 text-center hover:bg-white/10"
                      >
                        <File
                          className="size-12 fill-neutral-700"
                          weight="fill"
                        />
                        <span className="text-xs">{elem.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>

      <Handle
        type="source"
        position={Position.Right}
        id="fileNodeHandle"
        className={styles.verticalRightHandle}
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default FileNode;
