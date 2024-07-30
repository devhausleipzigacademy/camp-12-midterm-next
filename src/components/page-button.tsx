import React from "react";
import { cn } from "../utils/styling";

type Props = {
  active?: boolean;
  page: number;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const PageButton = ({ active = false, page, ...props }: Props) => {
  return (
    <button
      className={cn(
        "text-dark-light size-8 rounded-sm text-xs",
        active ? "bg-yellow" : "bg-white-dimmed"
      )}
      {...props}
    >
      {page}
    </button>
  );
};
