import { createContext, useCallback, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { ThemeConfig } from "../constants";
import { DEFAULT_CODE, THEME_CONFIGS } from "../constants";
import type { SettingsState } from "../utils/urlState";
import { useStorageState } from "../utils/useStorageState";

/** Ephemeral state — never persisted anywhere */
export interface EphemeralState {
  code: string;
  fileName: string;
  highlightedLines: number[];
}

interface SettingsContextValue {
  /** Persisted settings (localStorage + shareable URL) */
  settings: SettingsState;
  setSettings: (
    updater: SettingsState | ((prev: SettingsState) => SettingsState)
  ) => void;
  /** Derived from settings.themeId for convenience */
  theme: ThemeConfig;
  /** Ephemeral — lives in memory only */
  ephemeral: EphemeralState;
  setCode: (code: string) => void;
  setFileName: (name: string) => void;
  setHighlightedLines: (lines: number[]) => void;
  toggleHighlightedLine: (line: number) => void;
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useStorageState();

  const [code, setCode] = useState<string>(DEFAULT_CODE);
  const [fileName, setFileName] = useState<string>("");
  const [highlightedLines, setHighlightedLines] = useState<number[]>([]);

  const toggleHighlightedLine = useCallback(
    (line: number) =>
      setHighlightedLines((prev) =>
        prev.includes(line) ? prev.filter((l) => l !== line) : [...prev, line]
      ),
    []
  );

  const value: SettingsContextValue = {
    settings,
    setSettings,
    theme: THEME_CONFIGS[settings.themeId],
    ephemeral: { code, fileName, highlightedLines },
    setCode,
    setFileName,
    setHighlightedLines,
    toggleHighlightedLine,
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
