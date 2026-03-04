import type { RefObject } from "react";
import { BACKGROUND_GRADIENTS } from "../constants";
import { useSettings } from "../context/SettingsContext";
import CodeEditor from "./CodeEditor";
import WindowControls from "./WindowControls";

interface CodeWindowProps {
  windowRef: RefObject<HTMLDivElement | null>;
}

export default function CodeWindow({ windowRef }: CodeWindowProps) {
  const { backgroundId, customBackground, padding, fixedWidth, theme } =
    useSettings();

  const gradient =
    backgroundId === "none"
      ? customBackground || "transparent"
      : (BACKGROUND_GRADIENTS.find((g) => g.id === backgroundId)?.value ??
        "transparent");

  return (
    <div
      ref={windowRef}
      className="flex items-center justify-center"
      style={{
        padding,
        background: gradient,
        width: fixedWidth > 0 ? fixedWidth : undefined,
        minWidth: fixedWidth > 0 ? fixedWidth : 480,
      }}
    >
      {/* The actual window card */}
      <div
        className="rounded-xl overflow-hidden shadow-2xl w-full"
        style={{
          background: theme.windowBackground,
          border: `1px solid ${theme.border}`,
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
        }}
      >
        {/* Title bar */}
        <div
          className="flex items-center"
          style={{
            background: theme.headerBackground,
            borderBottom: `1px solid ${theme.border}`,
          }}
        >
          <WindowControls />
        </div>

        {/* Code */}
        <CodeEditor />
      </div>
    </div>
  );
}
