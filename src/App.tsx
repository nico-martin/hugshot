import * as htmlToImage from "html-to-image";
import { useCallback, useEffect, useRef, useState } from "react";
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

  const windowRef = useRef<HTMLDivElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  const downloadName = settings.fileName
    ? settings.fileName
        .replace(/[^a-zA-Z0-9._-]+/g, "-")
        .replace(/^-+|-+$/g, "") + ".png"
    : "hugshot.png";

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setToastVisible(false);
    setTimeout(() => setToastVisible(true), 10);
  }, []);

  const capture = useCallback(
    async ({ scale = 2 }: { scale?: number } = {}) => {
      if (!windowRef.current) return null;
      return await htmlToImage.toCanvas(windowRef.current, {
        canvasWidth: windowRef.current.clientWidth * scale,
        canvasHeight: windowRef.current.clientHeight * scale,
      });
    },
    []
  );

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

  const { showPreview } = settings;
  const { code, highlightedLines } = ephemeral;

  useEffect(() => {
    if (!showPreview) return;
    if (!windowRef.current || !previewCanvasRef.current) return;
    (async () => {
      const canvas = await capture({ scale: 1 });
      if (!previewCanvasRef.current || !canvas) return;
      const ctx = previewCanvasRef.current.getContext("2d");
      if (!ctx) return;
      previewCanvasRef.current.width = canvas.width;
      previewCanvasRef.current.height = canvas.height;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(canvas, 0, 0);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showPreview, settings, code, highlightedLines]);

  // Keep the parent HF Space URL in sync with current settings.
  // On HF, the app runs in an iframe; postMessage propagates the hash to
  // the parent page URL. Outside HF this is a no-op (window === window.parent).
  useEffect(() => {
    const hash = encodeSettingsToHash(settings);
    window.parent.postMessage({ hash: `#${hash}` }, "https://huggingface.co");
  }, [settings]);

  const handleCopyLink = useCallback(async () => {
    const hash = encodeSettingsToHash(settings);
    const base =
      import.meta.env.VITE_CANONICAL_URL?.replace(/\/$/, "") ??
      `${window.location.origin}${window.location.pathname}`.replace(/\/$/, "");
    const url = `${base}#${hash}`;
    await navigator.clipboard.writeText(url);
    showToast("Link copied to clipboard!");
  }, [showToast, settings]);

  return (
    <div
      className={cn("group h-screen overflow-hidden flex flex-row")}
      style={{ background: "#0f172b" }}
    >
      {/* Sidebar */}
      <aside
        className="flex flex-col w-80 h-screen border-r border-white/10 shrink-0"
        style={{ background: "#0f172b" }}
      >
        {/* Logo / header */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-[#FFD21E]/20">
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
      <main className="flex-1 flex flex-col items-center justify-center gap-6 px-8 py-8 overflow-auto">
        <CodeWindow windowRef={windowRef} />

        {/* Live preview canvas */}
        {showPreview && (
          <div className="flex flex-col gap-2">
            <span className="text-white/40 text-xs uppercase tracking-wider font-mono">
              Preview
            </span>
            <canvas
              ref={previewCanvasRef}
              className="max-w-full max-h-full object-contain"
              style={{ imageRendering: "auto" }}
            />
          </div>
        )}
      </main>

      <ExportToast message={toastMessage} visible={toastVisible} />
    </div>
  );
}
