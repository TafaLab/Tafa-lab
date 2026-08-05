import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href: string;
  variant?: "primary" | "secondary";
  className?: string;
};

export default function Button({
  children,
  href,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const classes =
    variant === "primary"
      ? "primary-button"
      : "secondary-button";

  return (
    <Link
      href={href}
      className={`${classes} ${className}`}
    >
      {children}
    </Link>
  );
}