import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  variant?: "default" | "accent";
  className?: string;
};

export default function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  const classes =
    variant === "accent"
      ? "category-popular"
      : "badge";

  return (
    <span
      className={`${classes} ${className}`}
    >
      {children}
    </span>
  );
}