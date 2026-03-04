import { useRef, useState } from "react";
import type { RefObject } from "react";
import { BACKGROUND_GRADIENTS } from "../constants";
import { useSettings } from "../context/SettingsContext";
import CodeEditor from "./CodeEditor";
import WindowControls from "./WindowControls";

interface CodeWindowProps {
  windowRef: RefObject<HTMLDivElement | null>;
}

export default function CodeWindow({ windowRef }: CodeWindowProps) {
  const {
    backgroundId,
    customBackground,
    padding,
    fixedWidth,
    theme,
    fileName,
    setFileName,
  } = useSettings();

  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

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
          className="flex items-center justify-between pr-4"
          style={{
            background: theme.headerBackground,
            borderBottom: `1px solid ${theme.border}`,
          }}
        >
          <WindowControls />
          {/* Editable filename — hidden in export when empty */}
          {editing ? (
            <input
              ref={inputRef}
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              onBlur={() => setEditing(false)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === "Escape") setEditing(false);
              }}
              autoFocus
              placeholder="filename.ts"
              className="text-xs font-mono bg-transparent outline-none border-b text-right"
              style={{
                color: theme.text,
                borderColor: theme.lineNumber,
                minWidth: "6ch",
                width: `${Math.max(fileName.length, 8)}ch`,
              }}
            />
          ) : fileName ? (
            <span
              onClick={() => setEditing(true)}
              className="text-xs font-mono cursor-text opacity-60 hover:opacity-100 transition-opacity group-[.is-capturing]:-mt-3"
              style={{ color: theme.text }}
              title="Click to edit filename"
            >
              {fileName}
            </span>
          ) : (
            <span
              onClick={() => setEditing(true)}
              className="text-xs font-mono cursor-text opacity-0 hover:opacity-30 transition-opacity select-none"
              style={{ color: theme.text }}
              title="Click to set filename"
            >
              untitled
            </span>
          )}
        </div>

        {/* Code */}
        <CodeEditor />
      </div>
    </div>
  );
}
