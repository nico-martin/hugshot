import type { BackgroundGradientId, LanguageId, ThemeId } from "../constants";
import { DEFAULT_CODE } from "../constants";

export interface AppState {
  code: string;
  themeId: ThemeId;
  languageId: LanguageId;
  backgroundId: BackgroundGradientId;
  customBackground: string;
  fontSize: number;
  padding: number;
  fixedWidth: number;
  showLineNumbers: boolean;
  highlightedLines: number[];
  fileName: string;
}

export const DEFAULT_STATE: AppState = {
  code: DEFAULT_CODE,
  themeId: "one-dark",
  languageId: "typescript",
  backgroundId: "electric",
  customBackground: "#1a1a2e",
  fontSize: 14,
  padding: 64,
  fixedWidth: 0,
  showLineNumbers: true,
  highlightedLines: [],
  fileName: "",
};

export function encodeState(state: AppState): string {
  const params = new URLSearchParams({
    code: state.code,
    theme: state.themeId,
    lang: state.languageId,
    bg: state.backgroundId,
    cbg: state.customBackground,
    fs: String(state.fontSize),
    pad: String(state.padding),
    w: String(state.fixedWidth),
    ln: state.showLineNumbers ? "1" : "0",
    hl: state.highlightedLines.join(","),
    file: state.fileName,
  });
  return params.toString();
}

export function decodeState(hash: string): AppState | null {
  try {
    const raw = hash.startsWith("#") ? hash.slice(1) : hash;
    if (!raw) return null;
    const params = new URLSearchParams(raw);
    if (!params.has("code") && !params.has("theme")) return null;
    const hl = params.get("hl") ?? "";
    return {
      code: params.get("code") ?? DEFAULT_STATE.code,
      themeId: (params.get("theme") as ThemeId) ?? DEFAULT_STATE.themeId,
      languageId:
        (params.get("lang") as LanguageId) ?? DEFAULT_STATE.languageId,
      backgroundId:
        (params.get("bg") as BackgroundGradientId) ??
        DEFAULT_STATE.backgroundId,
      customBackground: params.get("cbg") ?? DEFAULT_STATE.customBackground,
      fontSize: Number(params.get("fs") ?? DEFAULT_STATE.fontSize),
      padding: Number(params.get("pad") ?? DEFAULT_STATE.padding),
      fixedWidth: Number(params.get("w") ?? DEFAULT_STATE.fixedWidth),
      showLineNumbers: (params.get("ln") ?? "1") === "1",
      highlightedLines: hl ? hl.split(",").map(Number).filter(Boolean) : [],
      fileName: params.get("file") ?? DEFAULT_STATE.fileName,
    };
  } catch {
    return null;
  }
}
