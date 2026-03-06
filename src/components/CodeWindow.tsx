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
  const { settings, theme } = useSettings();
  const {
    backgroundId,
    padding,
    fixedWidth,
    fileName,
    showWindowControls,
    attrGitHub,
    attrTwitter,
    attrHuggingFace,
    attrUrl,
    attrTextColor,
  } = settings;

  const hasAttribution =
    attrGitHub || attrTwitter || attrHuggingFace || attrUrl;
  const attrColor =
    attrTextColor === "dark" ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.7)";

  const gradient =
    backgroundId === "none"
      ? undefined
      : (BACKGROUND_GRADIENTS.find((g) => g.id === backgroundId)?.value ??
        undefined);

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
          boxShadow:
            "0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,210,30,0.08)",
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
          {showWindowControls ? <WindowControls /> : <div />}
          {fileName && (
            <div
              className="text-xs font-mono opacity-60 py-3"
              style={{ color: theme.text }}
            >
              {fileName}
            </div>
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
                <span>{text}</span>
              </span>
            ))}
        </div>
      )}
    </div>
  );
}
