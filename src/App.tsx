import html2canvas from "html2canvas";
import { useCallback, useRef, useState } from "react";
import CodeWindow from "./components/CodeWindow";
import ExportToast from "./components/ExportToast";
import Toolbar from "./components/Toolbar";
import { useSettings } from "./context/SettingsContext";
import cn from "./utils/classnames.ts";
import { encodeSettingsToHash } from "./utils/urlState";

export default function App() {
  const { settings, ephemeral } = useSettings();
  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const [capturing, setCapturing] = useState<boolean>(false);

  const windowRef = useRef<HTMLDivElement>(null);

  const downloadName = ephemeral.fileName
    ? ephemeral.fileName
        .replace(/[^a-zA-Z0-9._-]+/g, "-")
        .replace(/^-+|-+$/g, "") + ".png"
    : "hugshot.png";

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setToastVisible(false);
    setTimeout(() => setToastVisible(true), 10);
  }, []);

  const capture = useCallback(async () => {
    if (!windowRef.current) return null;
    setCapturing(true);
    await new Promise((resolve) => window.setTimeout(() => resolve(true), 1));
    const canvas = await html2canvas(windowRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: null,
      logging: false,
    });
    setCapturing(false);
    return canvas;
  }, []);

  const handleExport = useCallback(async () => {
    const canvas = await capture();
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = downloadName;
    link.href = canvas.toDataURL("image/png");
    link.click();
    showToast("PNG exported!");
  }, [capture, showToast, downloadName]);

  const handleCopyImage = useCallback(async () => {
    const canvas = await capture();
    if (!canvas) return;
    canvas.toBlob(async (blob) => {
      if (!blob) return;
      try {
        await navigator.clipboard.write([
          new ClipboardItem({ "image/png": blob }),
        ]);
        showToast("Image copied to clipboard!");
      } catch {
        showToast("Copy failed — try exporting instead.");
      }
    }, "image/png");
  }, [capture, showToast]);

  const handleCopyLink = useCallback(async () => {
    const hash = encodeSettingsToHash(settings);
    const url = `${window.location.origin}${window.location.pathname}#${hash}`;
    await navigator.clipboard.writeText(url);
    showToast("Link copied to clipboard!");
  }, [showToast, settings]);

  return (
    <div
      className={cn("group h-screen overflow-hidden flex flex-row", {
        "is-capturing": capturing,
      })}
      style={{ background: "#0d0d1a" }}
    >
      {/* Sidebar */}
      <aside
        className="flex flex-col w-80 h-screen border-r border-white/5 shrink-0"
        style={{ background: "#0d0d1a" }}
      >
        {/* Logo / header */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-white/5">
          <img src="/hf.svg" alt="Hugshot" className="w-8 h-8" />
          <span className="text-white font-mono font-semibold tracking-tight text-lg">
            hugshot
          </span>
        </div>

        {/* Toolbar (fills remaining space) */}
        <div className="flex-1 overflow-y-auto px-4 py-5">
          <Toolbar
            onExport={handleExport}
            onCopyImage={handleCopyImage}
            onCopyLink={handleCopyLink}
          />
        </div>
      </aside>

      {/* Main canvas area */}
      <main className="flex-1 flex flex-col items-center justify-center gap-6 px-8 py-8 overflow-hidden">
        <div className="flex items-center justify-center overflow-auto">
          <CodeWindow windowRef={windowRef} />
        </div>
      </main>

      <ExportToast message={toastMessage} visible={toastVisible} />
    </div>
  );
}
