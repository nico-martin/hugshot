import { useRef, useState } from "react";
import type { RefObject } from "react";
import { BACKGROUND_GRADIENTS } from "../constants";
import { useSettings } from "../context/SettingsContext";
import { ICONS } from "../theme/icons";
import cn from "../utils/classnames.ts";
import CodeEditor from "./CodeEditor";
import WindowControls from "./WindowControls";

interface CodeWindowProps {
  windowRef: RefObject<HTMLDivElement | null>;
}

export default function CodeWindow({ windowRef }: CodeWindowProps) {
  const { settings, theme, ephemeral, setFileName } = useSettings();
  const {
    backgroundId,
    customBackground,
    padding,
    fixedWidth,
    attrGitHub,
    attrTwitter,
    attrHuggingFace,
    attrUrl,
    attrTextColor,
  } = settings;
  const { fileName } = ephemeral;

  const hasAttribution =
    attrGitHub || attrTwitter || attrHuggingFace || attrUrl;
  const attrColor =
    attrTextColor === "dark" ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.7)";

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
      className="flex flex-col items-center justify-center"
      style={{
        padding,
        background: gradient,
        width: fixedWidth > 0 ? fixedWidth : undefined,
        minWidth: fixedWidth > 0 ? fixedWidth : 480,
        gap: hasAttribution ? 12 : 0,
      }}
    >
      {/* The actual window card */}
      <div
        className={cn(`overflow-hidden shadow-2xl w-full`, {
          "rounded-xl": padding !== 0,
        })}
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

      {/* Attribution bar — outside the card, below it */}
      {hasAttribution && (
        <div className="flex justify-end items-center gap-7 w-full px-5">
          {[
            [attrGitHub, ICONS.github],
            [attrTwitter, ICONS.x],
            [attrHuggingFace, ICONS.huggingface],
            [attrUrl, ICONS.link],
          ]
            .filter(([text]) => !!text)
            .map(([text, icon]) => (
              <span
                className="flex items-center gap-3 text-lg font-mono"
                style={{ color: attrColor }}
              >
                <span
                  className="w-5 h-5 flex items-center justify-center"
                  style={{ fill: "currentColor" }}
                >
                  {icon}
                </span>
                <span className="group-[.is-capturing]:-mt-[17px]">{text}</span>
              </span>
            ))}
        </div>
      )}
    </div>
  );
}
