"use client";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  type?: "button" | "submit";
  size?: "default" | "small";
  className?: string;
  onClick?: () => void;
};

export default function Button({
  children,
  variant = "primary",
  size = "default",
  type = "button",
  className,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={cn(
        "rounded-lg font-semibold w-full",
        variant === "primary" ? "bg-yellow disabled:bg-yellow/50" : null,
        variant === "secondary" ? "bg-dark-light" : null,
        size === "default" ? "py-4" : null,
        size === "small" ? "text-xs py-3" : null,
        className
      )}
    >
      {children}
    </button>
  );
}
