import { prisma } from "@/lib/db";
import bcrypt from "bcrypt";

async function main() {
  await prisma.reservation.deleteMany();
  await prisma.screening.deleteMany();
  await prisma.user.deleteMany();

  // define a screening

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash("test123", salt);

  const user = await prisma.user.create({
    data: {
      id: "ddeeba94-b5a2-4eb4-8229-0b2b3630ecf3",
      email: "test@user.de",
      firstName: "Dan",
      lastName: "McAtee",
      password: hashedPassword,
      bookmarks: {
        createMany: {
          data: [{ movieId: "653346" }, { movieId: "693134" }],
        },
      },
    },
  });

  await prisma.screening.create({
    data: {
      date: new Date("2024-07-31"),
      time: "20:00",
      movieId: "533535",
    },
  });

  await prisma.screening.create({
    data: {
      date: new Date("2024-08-02"),
      time: "20:00",
      movieId: "533535",
      reservations: {
        createMany: {
          data: [
            { bookedSeats: [`A1`, `A2`], userId: user.id },
            { bookedSeats: [`B3`, "B4"], userId: user.id },
          ],
        },
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log(
      "💨🌾 As seeds are scattered by the breeze,\n🌱🌿 our words take root and grow with ease."
    );
    process.exit(0);
  });
