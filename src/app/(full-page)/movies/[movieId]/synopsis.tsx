"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

type Props = {
  overview: string;
};

export function Synopsis({ overview }: Props) {
  const [truncate, setTruncate] = useState(true);
  return (
    <>
      <p
        className={cn("text-white-dimmed text-sm", truncate ? "truncate" : "")}
      >
        {overview}
      </p>
      <button
        className="text-yellow text-sm underline py-1 cursor-pointer"
        onClick={() => setTruncate(!truncate)}
      >
        Read more
      </button>
    </>
  );
}
