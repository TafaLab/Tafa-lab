import type { ReactNode } from "react";

type SectionTitleProps = {
  title: ReactNode;
  description?: ReactNode;
  aside?: ReactNode;
  label?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export default function SectionTitle({
  title,
  description,
  aside,
  label,
  align = "left",
  className = "",
}: SectionTitleProps) {
  const centered = align === "center";

  return (
    <div
      className={`section-header ${
        centered
          ? "flex-col items-center text-center"
          : ""
      } ${className}`}
    >
      <div>
        {label}

        <h2>{title}</h2>
      </div>

      {aside ? (
        aside
      ) : description ? (
        <p>{description}</p>
      ) : null}
    </div>
  );
}