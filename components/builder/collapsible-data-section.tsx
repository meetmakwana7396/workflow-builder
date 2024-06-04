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
  return (
    <tr className="hover:bg-neutral-800" style={style}>
      {Object.keys(item).map((i, index) => (
        <td className="py-1 text-xs text-neutral-400" key={index}>
          {item[i]}
        </td>
      ))}
    </tr>
  );
};

export default function CollapsibleDataSection() {
  const dispatch = useAppDispatch();
  const { open, resultData, resultColumns } =
    useAppSelector(memoizedResultData);
  console.count("resultData");

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
          <div className="relative grid h-[100%] auto-cols-max grid-flow-col pb-10">
            <div>
              {/* Display loading/error messages as before */}
              <table style={{ width: "100%" }}>
                {/* Add your table headers here */}
                <tbody>
                  <List
                    height={400} // Adjust height as needed
                    width="100%"
                    itemCount={resultData?.length}
                    itemSize={25}
                    overscanCount={5}
                    itemData={resultData}
                  >
                    {Row}
                  </List>
                </tbody>
              </table>
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
