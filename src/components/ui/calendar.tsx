import * as React from "react";
import { DayPicker, type DayPickerProps } from "react-day-picker";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "react-day-picker/dist/style.css";
import { cn } from "../../lib/utils";

export type CalendarProps = DayPickerProps;

function NavBarNav({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex items-center justify-between px-3 py-2", className)} {...props} />
  );
}

function PrevButton({
  onClick,
  disabled,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "h-7 w-7 rounded-md border border-gray-300 bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-50",
        className
      )}
      {...props}
    >
      <ChevronLeft className="h-4 w-4" />
    </button>
  );
}

function NextButton({
  onClick,
  disabled,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "h-7 w-7 rounded-md border border-gray-300 bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-50",
        className
      )}
      {...props}
    >
      <ChevronRight className="h-4 w-4" />
    </button>
  );
}

export function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        caption: "flex flex-col items-center",
        nav: "", // leave empty since we're customizing everything
        table: "w-full border-collapse",
        head_row: "flex",
        head_cell: "text-gray-500 w-9 text-xs text-center",
        row: "flex w-full",
        day: "h-9 w-9 text-center text-sm",
        day_button: "h-9 w-9 rounded-md p-0 text-sm hover:bg-gray-100 focus:outline-none",
        selected: "bg-blue-600 text-white hover:bg-blue-700",
        today: "border border-blue-500",
        outside: "text-gray-400",
        disabled: "text-gray-300 line-through",
        ...classNames,
      }}
      components={{
        Nav: NavBarNav,
        PreviousMonthButton: PrevButton,
        NextMonthButton: NextButton,
      }}
      {...props}
    />
  );
}
