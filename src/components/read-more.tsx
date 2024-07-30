"use client";

type Props = {
  overview: string;
};
import { useState } from "react";

export default function ReadMore({ overview }: Props) {
  const [truncate, setTruncate] = useState(true);
  function readMoreHandler() {
    setTruncate(!truncate);
  }

  return (
    <>
      <p className={`text-white-dimmed text-sm ${truncate ? "truncate" : ""}`}>
        {overview}
      </p>
      <p
        className="text-yellow text-sm underline py-1 cursor-pointer"
        onClick={readMoreHandler}
      >
        Read more
      </p>
    </>
  );
}
