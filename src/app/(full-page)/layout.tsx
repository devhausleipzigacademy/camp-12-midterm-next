import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Camp 12 Midterm",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
