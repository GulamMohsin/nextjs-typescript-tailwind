import React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

type PaginationLinkProps = {
  isActive?: boolean;
  children: React.ReactNode;
} & React.ComponentProps<"a">;

export function Pagination({
  className = "",
  ...props
}: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={`flex justify-center ${className}`}
      {...props}
    />
  );
}

export const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className = "", ...props }, ref) => (
  <ul ref={ref} className={`flex items-center gap-1 ${className}`} {...props} />
));
PaginationContent.displayName = "PaginationContent";

export const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className = "", ...props }, ref) => (
  <li ref={ref} className={className} {...props} />
));
PaginationItem.displayName = "PaginationItem";

export function PaginationLink({
  isActive = false,
  className = "",
  children,
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-md border text-sm font-medium transition hover:bg-gray-100 ${isActive
          ? "border-gray-400 bg-gray-200 text-black"
          : "border-transparent text-gray-600"
        } ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}

export function PaginationPrevious({
  className = "",
  ...props
}: React.ComponentProps<"a">) {
  return (
    <PaginationLink className={`px-3 ${className}`} {...props}>
      <ChevronLeft className="h-4 w-4 mr-1" />
      <span>Previous</span>
    </PaginationLink>
  );
}

export function PaginationNext({
  className = "",
  ...props
}: React.ComponentProps<"a">) {
  return (
    <PaginationLink className={`px-3 ${className}`} {...props}>
      <span>Next</span>
      <ChevronRight className="h-4 w-4 ml-1" />
    </PaginationLink>
  );
}

export function PaginationEllipsis({
  className = "",
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      className={`flex h-9 w-9 items-center justify-center text-gray-400 ${className}`}
      {...props}
    >
      <MoreHorizontal className="h-4 w-4" />
      <span className="sr-only">More pages</span>
    </span>
  );
}
