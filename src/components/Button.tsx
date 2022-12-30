import { classNames } from "../helpers";

export function Button({
  children,
  className,
  onClick,
  invertColor,
}: {
  children: React.ReactNode;
  className?: string;
  invertColor?: boolean;
  onClick?: () => void;
}) {
  const invertColorCss = invertColor
    ? "bg-black text-white"
    : "bg-white text-black";
  return (
    <button
      onClick={onClick}
      className={classNames(
        `ml-5 rounded-md border-2 border-black p-2 ${invertColorCss}`,
        className || ""
      )}
    >
      {children}
    </button>
  );
}
