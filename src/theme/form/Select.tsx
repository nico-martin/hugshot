import type { SelectHTMLAttributes } from "react";

import cn from "../../utils/classnames";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  className?: string;
}

export default function Select({
  label,
  className = "",
  children,
  ...props
}: SelectProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <span className="text-white/40 text-xs uppercase tracking-wider font-mono">
          {label}
        </span>
      )}
      <select
        className={cn(
          "bg-white/10 border border-white/10 text-white text-sm rounded px-2 py-1.5",
          "font-mono cursor-pointer hover:border-white/30 transition-colors",
          "focus:outline-none focus:border-white/50",
          className
        )}
        {...props}
      >
        {children}
      </select>
    </div>
  );
}
