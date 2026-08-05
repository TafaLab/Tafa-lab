import type {
  ElementType,
  ReactNode,
} from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
};

export default function Container({
  children,
  className = "",
  as: Component = "div",
}: ContainerProps) {
  return (
    <Component
      className={`container ${className}`}
    >
      {children}
    </Component>
  );
}