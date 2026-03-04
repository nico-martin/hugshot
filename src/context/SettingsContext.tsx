import { createContext, useContext, useCallback } from "react";
import type { ReactNode } from "react";
import type {
  BackgroundGradientId,
  LanguageId,
  ThemeId,
  ThemeConfig,
} from "../constants";
import { THEME_CONFIGS } from "../constants";
import type { AppState } from "../utils/urlState";
import { useUrlState } from "../utils/useUrlState";

interface SettingsContextValue {
  // State
  code: string;
  themeId: ThemeId;
  theme: ThemeConfig;
  languageId: LanguageId;
  backgroundId: BackgroundGradientId;
  customBackground: string;
  fontSize: number;
  padding: number;
  fixedWidth: number;
  showLineNumbers: boolean;
  highlightedLines: number[];
  fileName: string;
  // Setters
  setCode: (code: string) => void;
  setThemeId: (id: ThemeId) => void;
  setLanguageId: (id: LanguageId) => void;
  setBackgroundId: (id: BackgroundGradientId) => void;
  setCustomBackground: (value: string) => void;
  setFontSize: (size: number) => void;
  setPadding: (size: number) => void;
  setFixedWidth: (width: number) => void;
  setShowLineNumbers: (show: boolean) => void;
  toggleHighlightedLine: (line: number) => void;
  setHighlightedLines: (lines: number[]) => void;
  setFileName: (name: string) => void;
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useUrlState();

  const set = useCallback(
    <K extends keyof AppState>(key: K, value: AppState[K]) =>
      setState((s) => ({ ...s, [key]: value })),
    [setState]
  );

  const toggleHighlightedLine = useCallback(
    (line: number) =>
      setState((s) => ({
        ...s,
        highlightedLines: s.highlightedLines.includes(line)
          ? s.highlightedLines.filter((l) => l !== line)
          : [...s.highlightedLines, line],
      })),
    [setState]
  );

  const value: SettingsContextValue = {
    ...state,
    theme: THEME_CONFIGS[state.themeId],
    setCode: (v) => set("code", v),
    setThemeId: (v) => set("themeId", v),
    setLanguageId: (v) => set("languageId", v),
    setBackgroundId: (v) => set("backgroundId", v),
    setCustomBackground: (v) => set("customBackground", v),
    setFontSize: (v) => set("fontSize", v),
    setPadding: (v) => set("padding", v),
    setFixedWidth: (v) => set("fixedWidth", v),
    setShowLineNumbers: (v) => set("showLineNumbers", v),
    toggleHighlightedLine,
    setHighlightedLines: (v) => set("highlightedLines", v),
    setFileName: (v) => set("fileName", v),
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings(): SettingsContextValue {
  const ctx = useContext(SettingsContext);
  if (!ctx)
    throw new Error("useSettings must be used within a SettingsProvider");
  return ctx;
}
