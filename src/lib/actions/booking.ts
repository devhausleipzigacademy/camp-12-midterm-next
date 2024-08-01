"use server";

import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

export async function createReservation(
  userId: string,
  screeningId: string,
  seats: string[]
) {
  const screening = await prisma.screening.findUnique({
    where: { id: screeningId },
  });

  const reservation = await prisma.reservation.create({
    data: {
      userId,
      screeningId,
      bookedSeats: seats,
    },
  });
  redirect(
    `/movies/${screening?.movieId}/${screeningId}/${reservation.id}/ticket`
  );
}
