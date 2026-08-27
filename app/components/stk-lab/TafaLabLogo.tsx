import Image from "next/image";

type TafaLabLogoProps = {
  className?: string;
  priority?: boolean;
};

export default function TafaLabLogo({
  className = "h-auto w-[132px]",
  priority = false,
}: TafaLabLogoProps) {
  return (
    <Image
      src="/images/tafa-lab-logo.png"
      alt="Tafa Lab"
      width={1920}
      height={819}
      className={className}
      priority={priority}
    />
  );
}
