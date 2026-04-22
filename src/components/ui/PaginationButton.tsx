import type { ComponentPropsWithoutRef, ReactNode } from "react";

type PaginationButtonProps = ComponentPropsWithoutRef<"button"> & {
  children: ReactNode;
};

export default function PaginationButton({ children, ...props }: PaginationButtonProps) {
  return (
    <button
      className="flex items-center justify-center gap-1 px-3 py-1 rounded-sm font-semibold text-sm cursor-pointer transition-all duration-200 [&:has(span:last-child)]:pl-1 [&:has(span:first-child)]:pr-1 [&_svg]:w-4 [&_svg]:h-4 hover:not-disabled:bg-sky-800 hover:not-disabled:text-gray-100 disabled:bg-gray-700 disabled:text-gray-400 disabled:cursor-not-allowed"
      {...props}>
      {children}
    </button>
  );
}
