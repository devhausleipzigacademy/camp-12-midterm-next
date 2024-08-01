import { Seat as SeatType } from "@/lib/types/seats";
import { Seat as CheckboxSeat } from "@/components/seat";

export function SeatMap({
  kinoSeats,
  reservedSeats,
  handleSeatChange,
  className = "",
  seats,
}: {
  kinoSeats: SeatType[];
  reservedSeats: string[];
  handleSeatChange: (seatId: string) => void;
  seats: string[];
  className?: string;
}) {
  return (
    <div
      className={`w-44 p-6 grid grid-cols-4 grid-rows-6 gap-4 justify-items-center mt-4 ${className}`}
    >
      {kinoSeats.map((seat) =>
        seat.id ? (
          <CheckboxSeat
            key={seat.id}
            onChange={() => handleSeatChange(seat.id!)}
            selected={seats.includes(seat.id)}
            disabled={reservedSeats.includes(seat.id)}
          />
        ) : (
          <div key={`empty-${seat.id}`} />
        )
      )}
    </div>
  );
}
