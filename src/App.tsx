import html2canvas from "html2canvas";
import { Link } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import CodeWindow from "./components/CodeWindow";
import ExportToast from "./components/ExportToast";
import Toolbar from "./components/Toolbar";

export default function App() {
  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastVisible, setToastVisible] = useState<boolean>(false);

  const windowRef = useRef<HTMLDivElement>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setToastVisible(false);
    setTimeout(() => setToastVisible(true), 10);
  }, []);

  const captureCanvas = useCallback(async () => {
    if (!windowRef.current) return null;
    return await html2canvas(windowRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: null,
      logging: false,
    });
  }, []);

  const handleExport = useCallback(async () => {
    const canvas = await captureCanvas();
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "hugshot.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
    showToast("PNG exported!");
  }, [captureCanvas, showToast]);

  const handleCopyImage = useCallback(async () => {
    const canvas = await captureCanvas();
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
  }, [captureCanvas, showToast]);

  const handleCopyLink = useCallback(async () => {
    await navigator.clipboard.writeText(window.location.href);
    showToast("Link copied to clipboard!");
  }, [showToast]);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#0d0d1a" }}
    >
      <header className="flex items-center justify-between px-6 py-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <img src="/hf.svg" alt="Hugshot" className="w-7 h-7" />
          <span className="text-white font-mono font-semibold tracking-tight text-lg">
            hugshot
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 text-white/30 text-xs font-mono hover:text-white/60 transition-colors cursor-pointer"
          >
            <Link size={12} />
            Copy link
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center gap-6 px-4 py-8">
        <div className="w-full max-w-5xl">
          <Toolbar onExport={handleExport} onCopyImage={handleCopyImage} />
        </div>
        <div
          className="w-full max-w-5xl rounded-2xl overflow-hidden"
          style={{
            background: "#111122",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="flex items-center justify-center overflow-auto">
            <CodeWindow windowRef={windowRef} />
          </div>
        </div>

        <p className="text-white/20 text-xs font-mono text-center">
          Click inside the editor to start typing · Export or Copy to share
        </p>
      </main>

      <ExportToast message={toastMessage} visible={toastVisible} />
    </div>
  );
}
