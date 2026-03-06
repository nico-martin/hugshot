import { useCallback, useEffect, useState } from "react";
import type { SettingsState } from "./urlState";
import {
  decodeSettingsFromHash,
  resolveInitialSettings,
  saveToStorage,
} from "./urlState";

/**
 * Works like useState but persists every change to localStorage.
 *
 * Initial value priority: URL hash > localStorage > DEFAULT_SETTINGS.
 *
 * On HF Spaces the app runs inside an iframe whose src has no hash.
 * HF propagates the parent page hash by updating the iframe's hash after
 * load, which fires a "hashchange" event. We listen for that here so
 * shared links work correctly inside HF.
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

  // HF sends the parent URL hash to the iframe via a hashchange event after
  // the iframe has loaded. Catch it and apply the settings it contains.
  useEffect(() => {
    const onHashChange = () => {
      const fromHash = decodeSettingsFromHash(window.location.hash);
      if (!fromHash) return;
      saveToStorage(fromHash);
      // Strip the hash from the iframe URL so it doesn't linger.
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search
      );
      setStateRaw(fromHash);
    };

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return [state, setState] as const;
}
