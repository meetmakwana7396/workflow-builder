"use client";

import { ChevronDown } from "lucide-react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  // You can add additional props here if needed
}

const Select: React.FC<SelectProps> = ({ children, ...props }) => {
  return (
    <div className="relative">
      <select className="form-select truncate !pr-10" {...props}>
        {children}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 cursor-default pointer-events-none size-4 shrink-0 -translate-y-1/2 text-white" />
    </div>
  );
};

export default Select;
