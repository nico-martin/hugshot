import {
  BACKGROUND_GRADIENTS,
  FONT_SIZES,
  LANGUAGES,
  PADDING_SIZES,
  THEMES,
  WIDTH_PRESETS,
} from "../constants";
import { useSettings } from "../context/SettingsContext";
import { Button, Input, Select, SidebarPanel } from "../theme";

interface ToolbarProps {
  onExport: () => void;
  onCopyImage: () => void;
  onCopyLink: () => void;
}

export default function Toolbar({
  onExport,
  onCopyImage,
  onCopyLink,
}: ToolbarProps) {
  const { settings, setSettings } = useSettings();
  const {
    themeId,
    languageId,
    backgroundId,
    fontSize,
    padding,
    fixedWidth,
    showLineNumbers,
    attrGitHub,
    attrTwitter,
    attrHuggingFace,
    attrUrl,
    attrTextColor,
  } = settings;

  const set = <K extends keyof typeof settings>(
    key: K,
    value: (typeof settings)[K]
  ) => setSettings((s) => ({ ...s, [key]: value }));

  return (
    <div className="flex flex-col gap-7 w-full">
      {/* Export actions */}
      <div className="flex flex-col gap-2">
        <Button
          variant="primary"
          size="md"
          className="w-full justify-center"
          onClick={onExport}
        >
          {/* Download arrow */}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Export PNG
        </Button>
        <Button
          variant="ghost"
          size="md"
          className="w-full justify-center"
          onClick={onCopyImage}
        >
          {/* Copy */}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          Copy Image
        </Button>
      </div>

      {/* Divider */}
      <span className="h-px w-full bg-white/5" />

      {/* Header row */}
      <div className="flex items-center justify-between">
        <span className="text-white font-mono font-semibold tracking-tight">
          Settings
        </span>
        <button
          onClick={onCopyLink}
          title="Copy shareable link"
          className="flex items-center gap-1.5 text-white/30 text-xs font-mono hover:text-white/60 transition-colors cursor-pointer"
        >
          {/* Link */}
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
          Copy link
        </button>
      </div>

      <SidebarPanel title="Appearance">
        <Select
          label="Theme"
          value={themeId}
          onChange={(e) => set("themeId", e.target.value as typeof themeId)}
        >
          {THEMES.map((t) => (
            <option key={t.id} value={t.id}>
              {t.label}
            </option>
          ))}
        </Select>

        <Select
          label="Background"
          value={backgroundId}
          onChange={(e) =>
            set("backgroundId", e.target.value as typeof backgroundId)
          }
        >
          {BACKGROUND_GRADIENTS.map((g) => (
            <option key={g.id} value={g.id}>
              {g.label}
            </option>
          ))}
        </Select>
      </SidebarPanel>

      <SidebarPanel title="Editor">
        <Select
          label="Language"
          value={languageId}
          onChange={(e) =>
            set("languageId", e.target.value as typeof languageId)
          }
        >
          {LANGUAGES.map((l) => (
            <option key={l.id} value={l.id}>
              {l.label}
            </option>
          ))}
        </Select>

        <Select
          label="Font Size"
          value={fontSize}
          onChange={(e) => set("fontSize", Number(e.target.value))}
        >
          {FONT_SIZES.map((s) => (
            <option key={s} value={s}>
              {s}px
            </option>
          ))}
        </Select>

        <div className="flex items-center justify-between">
          <span className="text-white/40 text-xs uppercase tracking-wider font-mono">
            Line Numbers
          </span>
          <button
            onClick={() => set("showLineNumbers", !showLineNumbers)}
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
      </SidebarPanel>

      <SidebarPanel title="Canvas">
        <Select
          label="Padding"
          value={padding}
          onChange={(e) => set("padding", Number(e.target.value))}
        >
          {PADDING_SIZES.map((s) => (
            <option key={s} value={s}>
              {s}px
            </option>
          ))}
        </Select>

        <Select
          label="Width"
          value={fixedWidth}
          onChange={(e) => set("fixedWidth", Number(e.target.value))}
        >
          {WIDTH_PRESETS.map((w) => (
            <option key={w.value} value={w.value}>
              {w.label}
            </option>
          ))}
        </Select>
      </SidebarPanel>

      <SidebarPanel title="Attribution">
        <Input
          label="GitHub"
          placeholder="username"
          value={attrGitHub}
          onChange={(e) => set("attrGitHub", e.target.value)}
        />
        <Input
          label="Twitter / X"
          placeholder="username"
          value={attrTwitter}
          onChange={(e) => set("attrTwitter", e.target.value)}
        />
        <Input
          label="Hugging Face"
          placeholder="username"
          value={attrHuggingFace}
          onChange={(e) => set("attrHuggingFace", e.target.value)}
        />
        <Input
          label="URL"
          placeholder="https://..."
          value={attrUrl}
          onChange={(e) => set("attrUrl", e.target.value)}
        />

        {/* Text color */}
        <div className="flex flex-col gap-1">
          <span className="text-white/40 text-xs uppercase tracking-wider font-mono">
            Text Color
          </span>
          <div className="flex gap-2">
            {(["light", "dark"] as const).map((c) => (
              <button
                key={c}
                onClick={() => set("attrTextColor", c)}
                className={`flex-1 py-1.5 rounded text-xs font-mono capitalize transition-colors cursor-pointer border ${
                  attrTextColor === c
                    ? "bg-white/20 border-white/40 text-white"
                    : "bg-white/5 border-white/10 text-white/40 hover:text-white/60"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </SidebarPanel>
    </div>
  );
}
