import type { ButtonHTMLAttributes } from "react";
import cn from "../../utils/classnames";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "outline";
  size?: "sm" | "md";
  className?: string;
}

export default function Button({
  variant = "ghost",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center gap-1.5 rounded font-mono font-medium transition-all cursor-pointer select-none",
        {
          "px-3 py-1.5 text-xs": size === "sm",
          "px-4 py-2 text-sm": size === "md",
        },
        {
          "bg-[#FFD21E] text-[#1a1200] hover:bg-[#ffe566] active:scale-95 font-semibold":
            variant === "primary",
          "text-white/70 hover:text-white hover:bg-white/10 active:bg-white/20":
            variant === "ghost",
          "border border-white/20 text-white/70 hover:text-white hover:border-white/40":
            variant === "outline",
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
