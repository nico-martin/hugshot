import { Copy, Download, Settings2 } from "lucide-react";
import { useState } from "react";
import {
  BACKGROUND_GRADIENTS,
  FONT_SIZES,
  LANGUAGES,
  PADDING_SIZES,
  THEMES,
  WIDTH_PRESETS,
} from "../constants";
import { useSettings } from "../context/SettingsContext";
import { Button, Select } from "../theme";

interface ToolbarProps {
  onExport: () => void;
  onCopyImage: () => void;
}

export default function Toolbar({ onExport, onCopyImage }: ToolbarProps) {
  const {
    themeId,
    languageId,
    backgroundId,
    customBackground,
    fontSize,
    padding,
    fixedWidth,
    showLineNumbers,
    setThemeId,
    setLanguageId,
    setBackgroundId,
    setCustomBackground,
    setFontSize,
    setPadding,
    setFixedWidth,
    setShowLineNumbers,
  } = useSettings();

  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="flex flex-col gap-2 w-full">
      {/* Main toolbar row */}
      <div className="flex flex-wrap items-center gap-2 bg-[#1a1a2e]/80 backdrop-blur border border-white/10 rounded-xl px-4 py-2">
        {/* Theme */}
        <Select
          label="Theme"
          value={themeId}
          onChange={(e) => setThemeId(e.target.value as typeof themeId)}
        >
          {THEMES.map((t) => (
            <option key={t.id} value={t.id}>
              {t.label}
            </option>
          ))}
        </Select>

        {/* Language */}
        <Select
          label="Language"
          value={languageId}
          onChange={(e) => setLanguageId(e.target.value as typeof languageId)}
        >
          {LANGUAGES.map((l) => (
            <option key={l.id} value={l.id}>
              {l.label}
            </option>
          ))}
        </Select>

        {/* Background */}
        <Select
          label="Background"
          value={backgroundId}
          onChange={(e) =>
            setBackgroundId(e.target.value as typeof backgroundId)
          }
        >
          {BACKGROUND_GRADIENTS.map((g) => (
            <option key={g.id} value={g.id}>
              {g.label}
            </option>
          ))}
        </Select>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Settings toggle */}
        <Button
          variant={showSettings ? "outline" : "ghost"}
          size="sm"
          onClick={() => setShowSettings((v) => !v)}
        >
          <Settings2 size={14} />
          Settings
        </Button>

        {/* Divider */}
        <span className="w-px h-6 bg-white/10" />

        {/* Copy image */}
        <Button variant="ghost" size="sm" onClick={onCopyImage}>
          <Copy size={14} />
          Copy
        </Button>

        {/* Export */}
        <Button variant="primary" size="sm" onClick={onExport}>
          <Download size={14} />
          Export PNG
        </Button>
      </div>

      {/* Settings panel */}
      {showSettings && (
        <div className="flex flex-wrap items-end gap-4 bg-[#1a1a2e]/80 backdrop-blur border border-white/10 rounded-xl px-4 py-3">
          {/* Font size */}
          <Select
            label="Font Size"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
          >
            {FONT_SIZES.map((s) => (
              <option key={s} value={s}>
                {s}px
              </option>
            ))}
          </Select>

          {/* Padding */}
          <Select
            label="Padding"
            value={padding}
            onChange={(e) => setPadding(Number(e.target.value))}
          >
            {PADDING_SIZES.map((s) => (
              <option key={s} value={s}>
                {s}px
              </option>
            ))}
          </Select>

          {/* Fixed width */}
          <Select
            label="Width"
            value={fixedWidth}
            onChange={(e) => setFixedWidth(Number(e.target.value))}
          >
            {WIDTH_PRESETS.map((w) => (
              <option key={w.value} value={w.value}>
                {w.label}
              </option>
            ))}
          </Select>

          {/* Custom background color */}
          <div className="flex flex-col gap-1">
            <span className="text-white/40 text-xs uppercase tracking-wider font-mono">
              Custom BG
            </span>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={customBackground || "#1a1a2e"}
                onChange={(e) => {
                  setCustomBackground(e.target.value);
                  setBackgroundId("none");
                }}
                className="w-8 h-8 rounded cursor-pointer border-0 bg-transparent"
              />
              <span className="text-white/50 text-xs font-mono">
                {customBackground || "#1a1a2e"}
              </span>
            </div>
          </div>

          {/* Line numbers */}
          <div className="flex flex-col gap-1">
            <span className="text-white/40 text-xs uppercase tracking-wider font-mono">
              Line Numbers
            </span>
            <button
              onClick={() => setShowLineNumbers(!showLineNumbers)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                showLineNumbers ? "bg-blue-500" : "bg-white/20"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  showLineNumbers ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
