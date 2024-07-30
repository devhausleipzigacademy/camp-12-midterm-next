import { BookingProvider } from "@/providers/booking-context";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <BookingProvider>{children}</BookingProvider>;
}
