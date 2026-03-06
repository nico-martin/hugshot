import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { SettingsProvider } from "./context/SettingsContext";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SettingsProvider>
      <App />
    </SettingsProvider>
  </StrictMode>
);

window.addEventListener("hashchange", () =>
  window.parent.postMessage(
    {
      hash: window.location.hash,
    },
    "https://huggingface.co"
  )
);
