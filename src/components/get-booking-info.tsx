"use client";

import { useContext } from "react";
import { BookingContext } from "@/providers/booking-context";
import { useRouter } from "next/navigation";

type Props = {
  movieId: string;
};

export function GetBookingInfo({ movieId }: Props) {
  const router = useRouter();
  const { date, time } = useContext(BookingContext);

  router.replace(`/movies/${movieId}/seats?date=${date}&time=${time}`);

  return null;
}
