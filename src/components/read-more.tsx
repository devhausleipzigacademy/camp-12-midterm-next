"use client";

import { useState } from "react";

export default function ReadMore() {
  const [truncate, setTruncate] = useState(true);
  function readMoreHandler() {
    setTruncate(!truncate);
  }

  return (
    <p
      className="text-yellow text-sm underline py-1 cursor-pointer"
      onClick={readMoreHandler}
    >
      Read more
    </p>
  );
}
