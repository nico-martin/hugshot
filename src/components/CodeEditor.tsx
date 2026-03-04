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
import { useEffect, useRef } from "react";
import Editor from "react-simple-code-editor";
import type { LanguageId } from "../constants";
import { useSettings } from "../context/SettingsContext";

function highlight(code: string, language: LanguageId): string {
  const grammar = Prism.languages[language] ?? Prism.languages.javascript;
  return Prism.highlight(code, grammar, language);
}

export default function CodeEditor() {
  const { code, languageId, theme, fontSize, showLineNumbers, setCode } =
    useSettings();

  const lineCount = code.split("\n").length;
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ta = editorRef.current?.querySelector("textarea");
    if (!ta) return;
    ta.style.color = "transparent";
    ta.style.caretColor = theme.text;
  }, [theme.text]);

  return (
    <div
      ref={editorRef}
      className="flex overflow-hidden"
      style={{ background: theme.background }}
    >
      {showLineNumbers && (
        <div
          className="select-none text-right pr-4 pt-[13px] pb-3 pl-4"
          style={{
            color: theme.lineNumber,
            fontSize,
            fontFamily: "var(--font-mono)",
            lineHeight: "1.6",
            minWidth: "3ch",
          }}
        >
          {Array.from({ length: lineCount }, (_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <Editor
          value={code}
          onValueChange={setCode}
          highlight={(c) => highlight(c, languageId)}
          padding={13}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize,
            lineHeight: "1.6",
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
