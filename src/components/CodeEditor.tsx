import Prism from "prismjs";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-css";
import "prismjs/components/prism-go";
import "prismjs/components/prism-java";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-json";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-markdown";
import "prismjs/components/prism-python";
import "prismjs/components/prism-rust";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-typescript";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Editor from "react-simple-code-editor";
import type { LanguageId } from "../constants";
import { useSettings } from "../context/SettingsContext";

function highlight(code: string, language: LanguageId): string {
  const grammar = Prism.languages[language] ?? Prism.languages.javascript;
  return Prism.highlight(code, grammar, language);
}

export default function CodeEditor() {
  const { settings, theme, ephemeral, setCode, setHighlightedLines } =
    useSettings();
  const { languageId, fontSize, showLineNumbers } = settings;
  const { code, highlightedLines } = ephemeral;

  const lineCount = code.split("\n").length;
  const lineHeightPx = Math.round(fontSize * 1.6);
  const editorPadding = 13;
  const editorRef = useRef<HTMLDivElement>(null);
  const lineNumColRef = useRef<HTMLDivElement>(null);
  const lastClickedLine = useRef<number | null>(null);

  // Measure actual top offsets of each line number row from the DOM.
  // This is what we feed into the highlight overlay, so it's always
  // pixel-perfect regardless of font rendering or html2canvas scaling.
  const [lineOffsets, setLineOffsets] = useState<
    { top: number; height: number }[]
  >([]);

  const measureLines = useCallback(() => {
    const col = lineNumColRef.current;
    if (!col) return;
    const colTop = col.getBoundingClientRect().top;
    const rows = col.querySelectorAll<HTMLElement>("[data-line]");
    const offsets = Array.from(rows).map((row) => {
      const rect = row.getBoundingClientRect();
      return { top: rect.top - colTop, height: rect.height };
    });
    setLineOffsets(offsets);
  }, []);

  useLayoutEffect(() => {
    measureLines();
  }, [lineCount, fontSize, measureLines]);

  useEffect(() => {
    const ta = editorRef.current?.querySelector("textarea");
    if (!ta) return;
    ta.style.color = "transparent";
    ta.style.caretColor = theme.text;
  }, [theme.text]);

  const handleLineClick = useCallback(
    (lineNum: number, shiftKey: boolean) => {
      if (shiftKey && lastClickedLine.current !== null) {
        const from = Math.min(lastClickedLine.current, lineNum);
        const to = Math.max(lastClickedLine.current, lineNum);
        setHighlightedLines(
          Array.from({ length: to - from + 1 }, (_, i) => from + i)
        );
      } else {
        const isOnlyLine =
          highlightedLines.length === 1 && highlightedLines[0] === lineNum;
        setHighlightedLines(isOnlyLine ? [] : [lineNum]);
        lastClickedLine.current = lineNum;
      }
    },
    [highlightedLines, setHighlightedLines]
  );

  return (
    <div
      ref={editorRef}
      className="flex relative"
      style={{ background: theme.background }}
    >
      {/* Full-width highlight stripes — absolutely positioned using real
          measured offsets from the DOM so they match in both preview and export */}
      {highlightedLines.map((line) => {
        const offset = lineOffsets[line - 1];
        if (!offset) return null;
        return (
          <div
            key={line}
            className="absolute left-0 right-0 pointer-events-none"
            style={{
              top: offset.top,
              height: offset.height,
              background: theme.lineHighlight,
              borderLeft: `3px solid ${theme.lineHighlightBorder}`,
            }}
          />
        );
      })}
      {/* Line numbers */}
      {showLineNumbers && (
        <div
          ref={lineNumColRef}
          className="relative select-none text-right pr-4 pb-3 pl-4 z-10 group-[.is-capturing]:-mt-[8px]"
          style={{
            fontSize,
            fontFamily: "var(--font-mono)",
            lineHeight: `${lineHeightPx}px`,
            paddingTop: editorPadding,
            minWidth: "3ch",
          }}
        >
          {Array.from({ length: lineCount }, (_, i) => {
            const lineNum = i + 1;
            const isHighlighted = highlightedLines.includes(lineNum);
            return (
              <div
                key={i}
                data-line={lineNum}
                onClick={(e) => handleLineClick(lineNum, e.shiftKey)}
                className="cursor-pointer transition-colors"
                style={{
                  color: isHighlighted ? theme.text : theme.lineNumber,
                }}
                title={
                  isHighlighted
                    ? "Click to unhighlight"
                    : "Shift+click to select range"
                }
              >
                {lineNum}
              </div>
            );
          })}
        </div>
      )}
      {/* Code */}
      <div className="code-editor flex-1 min-w-0 relative z-10 overflow-x-auto group-[.is-capturing]:-mt-2 group-[.is-capturing]:pb-2.5">
        <Editor
          value={code}
          onValueChange={setCode}
          highlight={(c) => highlight(c, languageId)}
          padding={editorPadding}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize,
            lineHeight: `${lineHeightPx}px`,
            color: theme.text,
            background: "transparent",
            minWidth: "100%",
          }}
          textareaClassName="focus:outline-none"
        />
      </div>
    </div>
  );
}
