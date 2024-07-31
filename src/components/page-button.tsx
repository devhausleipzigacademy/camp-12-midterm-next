import React from "react";
<<<<<<< HEAD
=======
import { cn } from "../utils/styling";
>>>>>>> 6681dba4ef61068a6f04d8b953e285010332bf87

type Props = {
  active?: boolean;
  page: number;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const PageButton = ({ active = false, page, ...props }: Props) => {
  return (
    <button
<<<<<<< HEAD
      className={`text-dark-light size-8 rounded-sm text-xs ${
        active ? "bg-yellow" : "bg-white-dimmed"
      }`}
=======
      className={cn(
        "text-dark-light size-8 rounded-sm text-xs",
        active ? "bg-yellow" : "bg-white-dimmed"
      )}
>>>>>>> 6681dba4ef61068a6f04d8b953e285010332bf87
      {...props}
    >
      {page}
    </button>
  );
};
