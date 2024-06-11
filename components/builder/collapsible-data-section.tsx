"use client";
import {
  setResultData,
  toggleOpen,
} from "@/lib/features/workflows/workflowSlice";
import {
  memoizedResultData,
  useAppDispatch,
  useAppSelector,
} from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { CaretUp, SmileySad } from "@phosphor-icons/react";
import { Button } from "../ui/button";
import Papa from "papaparse";
import { FixedSizeList as List } from "react-window";
import { log } from "console";
import { useEffect, useState } from "react";

export const Row = ({
  index,
  style,
  data,
}: {
  index: any;
  style: any;
  data: any;
}) => {
  const item = data[index];
  if (Array.isArray(item)) {
    return (
      <div className="flex w-full sticky top-0" style={style}>
        {item.map((col, index) => (
          <div
            className="line-clamp-1 flex w-[256px] flex-wrap uppercase border border-neutral-600 py-1 ps-2 text-xs font-semibold text-neutral-200"
            key={index}
          >
            {col}
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="flex w-full" style={style}>
      {Object.keys(item).map((i, index) => (
        <div
          className="line-clamp-1 flex w-[256px] flex-wrap border border-neutral-600 py-1 ps-2 text-xs text-neutral-400"
          key={index}
        >
          {item[i]}
        </div>
      ))}
    </div>
  );
};

export default function CollapsibleDataSection() {
  const dispatch = useAppDispatch();
  const { open, resultData, resultColumns } =
    useAppSelector(memoizedResultData);
  const [results, setResults] = useState<Array<any>>([]);

  useEffect(() => {
    if (resultData && resultColumns) {
      const updatedResultData = [resultColumns, ...resultData];
      setResults(updatedResultData);
    }
  }, [resultData, resultColumns]);

  function downloadFile(content: string, fileName: string, mimeType: string) {
    const a = document.createElement("a");
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    a.setAttribute("href", url);
    a.setAttribute("download", fileName);
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div
      className={cn(
        "fixed bottom-0 w-full bg-neutral-900",
        open && "h-[250px] border-t border-blue-500 sm:h-[350px]",
      )}
    >
      <div
        role="button"
        onClick={() => dispatch(toggleOpen())}
        className="absolute -top-8 left-20 flex h-8 items-center justify-center gap-2 border border-b-0 border-blue-500 bg-neutral-900 px-4 py-2 text-xs"
      >
        <CaretUp className={cn("size-3", open && "rotate-180")} />
        Output
      </div>

      {open && resultData && resultColumns && resultData?.length > 0 ? (
        <>
          <div className="flex items-center gap-2 py-2 text-xs text-neutral-400">
            <Button
              className="h-4 bg-blue-500 text-xs"
              onClick={() => {
                const csvString = Papa.unparse(resultData);
                downloadFile(csvString, "data.csv", "text/csv");
              }}
            >
              Export as CSV
            </Button>
            <Button
              className="h-4 bg-blue-500 text-xs"
              onClick={() => {
                const jsonString = JSON.stringify(resultData, null, 2);
                downloadFile(jsonString, "data.json", "application/json");
              }}
            >
              Export as JSON
            </Button>
            Total records:{" "}
            <span className="text-blue-500">{resultData.length}</span>
          </div>
          <div className="relative">
            <div style={{ width: "100%" }}>
              <List
                height={300} // Adjust height as needed
                width={"auto"}
                itemCount={results?.length}
                itemSize={32}
                overscanCount={20}
                className="m-4 border relative border-neutral-600"
                itemData={results}
              >
                {Row}
              </List>
            </div>
          </div>
        </>
      ) : (
        open && (
          <div className="flex h-full items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-4 text-neutral-500">
              <SmileySad className="size-10 fill-neutral-500" weight="fill" />
              No data found!
            </div>
          </div>
        )
      )}
    </div>
  );
}
