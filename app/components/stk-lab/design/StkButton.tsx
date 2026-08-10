import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "dark" | "light" | "outline";
  external?: boolean;
  className?: string;
};

export default function StkButton({
  href,
  children,
  variant = "dark",
  external = false,
  className = "",
}: Props) {
  const base = "inline-flex items-center justify-center rounded-[var(--stk-radius-pill)] px-6 py-3.5 text-sm transition duration-300 hover:-translate-y-0.5";
  const look =
    variant === "light"
      ? "bg-white border border-white/20"
      : variant === "outline"
        ? "border border-[color:var(--stk-border)] bg-transparent"
        : "bg-[var(--stk-dark)]";

  const style = {
    color: variant === "dark" ? "#ffffff" : "var(--stk-text)",
  };

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={`${base} ${look} ${className}`} style={style}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={`${base} ${look} ${className}`} style={style}>
      {children}
    </Link>
  );
}
