import { prisma } from "@/lib/db";

export async function getReservations(userId: string) {
    const reservations = await prisma.reservation.findMany({
        where: {
            userId: userId,
        },
        include: {
            screening: true,
        },
    });
    return reservations;
}