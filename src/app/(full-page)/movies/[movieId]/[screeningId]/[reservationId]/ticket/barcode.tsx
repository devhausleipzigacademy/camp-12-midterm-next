"use client";

import Barcode from "react-barcode";

export function TicketBarcode({ movieId }: { movieId: string }) {
  return (
    <Barcode
      value={`ticket-${movieId}`}
      format="CODE39"
      renderer="img"
      background=""
      lineColor="white"
    />
  );
}
