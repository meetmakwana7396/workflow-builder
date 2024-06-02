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

export default function CollapsibleDataSection() {
  const dispatch = useAppDispatch();
  const { open, resultData, resultColumns } =
    useAppSelector(memoizedResultData);

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
        open && "border-t border-blue-500",
      )}
      style={{ height: open ? "350px" : "0px" }}
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
          <div className="relative h-[100%] overflow-y-auto scroll-smooth pb-10 shadow-md">
            <table className="divide-y divide-neutral-600">
              <thead className="sticky top-0 bg-black">
                <tr>
                  {resultColumns?.map((col) => (
                    <th
                      key={col}
                      className="px-6 py-1 text-left text-xs font-medium uppercase tracking-wider"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-600">
                {resultData.map((row: any, index: number) => (
                  <tr key={index} className="hover:bg-neutral-800">
                    {Object.keys(row).map((i, index) => (
                      <td
                        className="whitespace-nowrap px-6 py-1 text-xs text-neutral-400"
                        key={index}
                      >
                        {row[i]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
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
