"use client";
import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

type Props = {
  variant?: "primary" | "secondary";
  size?: "default" | "small";
} & ComponentProps<"button">;

export function Button({
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
