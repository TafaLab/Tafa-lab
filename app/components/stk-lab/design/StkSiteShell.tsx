import type { ReactNode } from "react";
import styles from "./StkTheme.module.css";

export default function StkSiteShell({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <main className={`${styles.site} ${className}`}>
      {children}
    </main>
  );
}
