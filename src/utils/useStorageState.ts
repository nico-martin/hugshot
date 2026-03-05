import { useCallback, useState } from "react";
import type { SettingsState } from "./urlState";
import { resolveInitialSettings, saveToStorage } from "./urlState";

/**
 * Works like useState but persists every change to localStorage.
 * The initial value is resolved once on mount: URL hash params take
 * priority over localStorage, falling back to DEFAULT_SETTINGS.
 */
export function useStorageState() {
  const [state, setStateRaw] = useState<SettingsState>(resolveInitialSettings);

  const setState = useCallback(
    (updater: SettingsState | ((prev: SettingsState) => SettingsState)) => {
      setStateRaw((prev) => {
        const next = typeof updater === "function" ? updater(prev) : updater;
        saveToStorage(next);
        return next;
      });
    },
    []
  );

  return [state, setState] as const;
}
