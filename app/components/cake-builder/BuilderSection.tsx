import type { ReactNode } from "react";

type BuilderSectionProps = {
  number: string;
  title: string;
  description: string;
  children: ReactNode;
};

export default function BuilderSection({
  number,
  title,
  description,
  children,
}: BuilderSectionProps) {
  return (
    <section className="rounded-3xl bg-white p-5 shadow-sm md:p-7">
      <div className="mb-6 flex gap-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#efe3da] text-sm font-semibold text-[#6a4433]">
          {number}
        </span>

        <div>
          <h2 className="text-xl font-semibold">
            {title}
          </h2>

          <p className="mt-1 text-sm leading-6 text-black/50">
            {description}
          </p>
        </div>
      </div>

      {children}
    </section>
  );
}