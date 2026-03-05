import type { InputHTMLAttributes } from "react";
import cn from "../../utils/classnames";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
}

export default function Input({ label, className = "", ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <span className="text-white/40 text-xs uppercase tracking-wider font-mono">
          {label}
        </span>
      )}
      <input
        className={cn(
          "bg-white/10 border border-white/10 text-white text-sm rounded px-2 py-1.5",
          "font-mono hover:border-white/30 transition-colors",
          "focus:outline-none focus:border-white/50",
          "placeholder:text-white/20",
          className
        )}
        {...props}
      />
    </div>
  );
}
