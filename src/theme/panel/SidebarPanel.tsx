import { ChevronDown } from "lucide-react";
import { useState } from "react";
import type { ReactNode } from "react";

interface SidebarPanelProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export default function SidebarPanel({
  title,
  children,
  defaultOpen = true,
}: SidebarPanelProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="flex flex-col">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-between w-full py-1 cursor-pointer group/panel"
      >
        <span className="text-white/50 text-sm font-mono font-medium group-hover/panel:text-white/70 transition-colors">
          {title}
        </span>
        <ChevronDown
          size={12}
          className={`text-white/20 group-hover/panel:text-white/40 transition-all ${open ? "rotate-0" : "-rotate-90"}`}
        />
      </button>

      <div
        className={`flex flex-col gap-3 overflow-hidden transition-all duration-200 ${
          open ? "mt-3 max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
