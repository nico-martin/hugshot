import { useCallback, useEffect, useRef, useState } from "react";

import type { AppState } from "./urlState";
import { DEFAULT_STATE, decodeState, encodeState } from "./urlState";

export function useUrlState() {
  const [state, setStateRaw] = useState<AppState>(() => {
    return decodeState(window.location.hash) ?? DEFAULT_STATE;
  });

  // Debounce hash writes to avoid hammering the history on every keystroke
  const writeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const syncToUrl = useCallback((s: AppState) => {
    if (writeTimer.current) clearTimeout(writeTimer.current);
    writeTimer.current = setTimeout(() => {
      const encoded = encodeState(s);
      window.history.replaceState(null, "", `#${encoded}`);
    }, 300);
  }, []);

  const setState = useCallback(
    (updater: AppState | ((prev: AppState) => AppState)) => {
      setStateRaw((prev) => {
        const next =
          typeof updater === "function" ? updater(prev) : updater;
        syncToUrl(next);
        return next;
      });
    },
    [syncToUrl]
  );

  // Sync on back/forward navigation
  useEffect(() => {
    const onHashChange = () => {
      const parsed = decodeState(window.location.hash);
      if (parsed) setStateRaw(parsed);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return [state, setState] as const;
}
