import type { BackgroundGradientId, LanguageId, ThemeId } from "../constants";

/**
 * Settings that are persisted to localStorage and can be shared via URL.
 * Code, highlighted lines, and file name are intentionally excluded —
 * they live only in component state and are never persisted anywhere.
 */
export interface SettingsState {
  themeId: ThemeId;
  languageId: LanguageId;
  backgroundId: BackgroundGradientId;
  customBackground: string;
  fontSize: number;
  padding: number;
  fixedWidth: number;
  showLineNumbers: boolean;
  // Attribution — stored in settings, will later be rendered in the image
  attrGitHub: string;
  attrTwitter: string;
  attrHuggingFace: string;
  attrUrl: string;
  attrTextColor: "light" | "dark";
}

export const DEFAULT_SETTINGS: SettingsState = {
  themeId: "one-dark",
  languageId: "typescript",
  backgroundId: "electric",
  customBackground: "#1a1a2e",
  fontSize: 14,
  padding: 64,
  fixedWidth: 0,
  showLineNumbers: true,
  attrGitHub: "",
  attrTwitter: "",
  attrHuggingFace: "",
  attrUrl: "",
  attrTextColor: "light",
};

const STORAGE_KEY = "hugshot:settings";

// ---------------------------------------------------------------------------
// localStorage helpers
// ---------------------------------------------------------------------------

export function loadFromStorage(): SettingsState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SettingsState;
  } catch {
    return null;
  }
}

export function saveToStorage(state: SettingsState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // storage quota exceeded or private mode — silently ignore
  }
}

// ---------------------------------------------------------------------------
// URL hash helpers
// ---------------------------------------------------------------------------

export function encodeSettingsToHash(state: SettingsState): string {
  const params = new URLSearchParams({
    theme: state.themeId,
    lang: state.languageId,
    bg: state.backgroundId,
    cbg: state.customBackground,
    fs: String(state.fontSize),
    pad: String(state.padding),
    w: String(state.fixedWidth),
    ln: state.showLineNumbers ? "1" : "0",
    gh: state.attrGitHub,
    tw: state.attrTwitter,
    hf: state.attrHuggingFace,
    url: state.attrUrl,
    atc: state.attrTextColor,
  });
  return params.toString();
}

export function decodeSettingsFromHash(hash: string): SettingsState | null {
  try {
    const raw = hash.startsWith("#") ? hash.slice(1) : hash;
    if (!raw) return null;
    const params = new URLSearchParams(raw);
    // Require at least one known settings param to be present
    if (!params.has("theme") && !params.has("lang") && !params.has("bg"))
      return null;
    return {
      themeId: (params.get("theme") as ThemeId) ?? DEFAULT_SETTINGS.themeId,
      languageId:
        (params.get("lang") as LanguageId) ?? DEFAULT_SETTINGS.languageId,
      backgroundId:
        (params.get("bg") as BackgroundGradientId) ??
        DEFAULT_SETTINGS.backgroundId,
      customBackground: params.get("cbg") ?? DEFAULT_SETTINGS.customBackground,
      fontSize: Number(params.get("fs") ?? DEFAULT_SETTINGS.fontSize),
      padding: Number(params.get("pad") ?? DEFAULT_SETTINGS.padding),
      fixedWidth: Number(params.get("w") ?? DEFAULT_SETTINGS.fixedWidth),
      showLineNumbers: (params.get("ln") ?? "1") === "1",
      attrGitHub: params.get("gh") ?? DEFAULT_SETTINGS.attrGitHub,
      attrTwitter: params.get("tw") ?? DEFAULT_SETTINGS.attrTwitter,
      attrHuggingFace: params.get("hf") ?? DEFAULT_SETTINGS.attrHuggingFace,
      attrUrl: params.get("url") ?? DEFAULT_SETTINGS.attrUrl,
      attrTextColor:
        (params.get("atc") as "light" | "dark") ??
        DEFAULT_SETTINGS.attrTextColor,
    };
  } catch {
    return null;
  }
}

/**
 * On page load: if the URL hash contains settings params, use them as the
 * initial state (overriding localStorage), persist them to localStorage,
 * then strip the hash from the URL so settings are never reflected there
 * during normal use.
 */
export function resolveInitialSettings(): SettingsState {
  const fromUrl = decodeSettingsFromHash(window.location.hash);
  if (fromUrl) {
    saveToStorage(fromUrl);
    // Remove the hash without adding a history entry
    window.history.replaceState(
      null,
      "",
      window.location.pathname + window.location.search
    );
    return fromUrl;
  }
  return loadFromStorage() ?? DEFAULT_SETTINGS;
}
