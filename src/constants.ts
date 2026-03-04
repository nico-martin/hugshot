// Theme IDs and their color configs (THEME_CONFIGS below) are hand-crafted
// approximations of popular editor themes. The id is used as a display key only —
// syntax token colors come from the global Prism CSS overrides in index.css,
// which are written for the One Dark palette and applied to all themes.
export const THEMES = [
  { id: "one-dark", label: "One Dark" },
  { id: "night-owl", label: "Night Owl" },
  { id: "dracula", label: "Dracula" },
  { id: "solarized-dark", label: "Solarized Dark" },
  { id: "nord", label: "Nord" },
  { id: "synthwave", label: "Synthwave" },
  { id: "monokai", label: "Monokai" },
  { id: "github-light", label: "GitHub Light" },
] as const;

export type ThemeId = (typeof THEMES)[number]["id"];

// Language IDs must match Prism.js grammar names exactly.
// Each entry requires a corresponding `import "prismjs/components/prism-<id>"`
// in CodeEditor.tsx, otherwise Prism falls back to plain text.
export const LANGUAGES = [
  { id: "javascript", label: "JavaScript" },
  { id: "typescript", label: "TypeScript" },
  { id: "jsx", label: "JSX" },
  { id: "tsx", label: "TSX" },
  { id: "python", label: "Python" },
  { id: "rust", label: "Rust" },
  { id: "go", label: "Go" },
  { id: "css", label: "CSS" },
  { id: "html", label: "HTML" },
  { id: "bash", label: "Bash" },
  { id: "json", label: "JSON" },
  { id: "sql", label: "SQL" },
  { id: "markdown", label: "Markdown" },
  { id: "c", label: "C" },
  { id: "cpp", label: "C++" },
  { id: "java", label: "Java" },
] as const;

export type LanguageId = (typeof LANGUAGES)[number]["id"];

export const FONT_SIZES = [12, 13, 14, 15, 16, 18, 20, 24] as const;

export const PADDING_SIZES = [16, 32, 48, 64, 96, 128] as const;

export const WIDTH_PRESETS = [
  { label: "Auto", value: 0 },
  { label: "480px", value: 480 },
  { label: "640px", value: 640 },
  { label: "720px", value: 720 },
  { label: "960px", value: 960 },
  { label: "1080px", value: 1080 },
  { label: "1280px", value: 1280 },
] as const;

export const BACKGROUND_GRADIENTS = [
  { id: "none", label: "None", value: "transparent" },
  {
    id: "electric",
    label: "Electric",
    value: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  {
    id: "sunset",
    label: "Sunset",
    value: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  },
  {
    id: "ocean",
    label: "Ocean",
    value: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  },
  {
    id: "forest",
    label: "Forest",
    value: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  },
  {
    id: "fire",
    label: "Fire",
    value: "linear-gradient(135deg, #f7971e 0%, #ffd200 100%)",
  },
  {
    id: "night",
    label: "Night",
    value: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
  },
  {
    id: "rose",
    label: "Rose",
    value: "linear-gradient(135deg, #f43b47 0%, #453a94 100%)",
  },
] as const;

export type BackgroundGradientId = (typeof BACKGROUND_GRADIENTS)[number]["id"];

export interface ThemeConfig {
  background: string;
  windowBackground: string;
  headerBackground: string;
  text: string;
  border: string;
  lineNumber: string;
  lineHighlight: string;
  lineHighlightBorder: string | null;
}

export const THEME_CONFIGS: Record<ThemeId, ThemeConfig> = {
  "one-dark": {
    background: "#282c34",
    windowBackground: "#21252b",
    headerBackground: "#21252b",
    text: "#abb2bf",
    border: "#181a1f",
    lineNumber: "#495162",
    lineHighlight: "rgba(255,255,255,0.07)",
    lineHighlightBorder: null,
  },
  "night-owl": {
    background: "#011627",
    windowBackground: "#010e1a",
    headerBackground: "#010e1a",
    text: "#d6deeb",
    border: "#1d3b53",
    lineNumber: "#4b6479",
    lineHighlight: "rgba(255,255,255,0.06)",
    lineHighlightBorder: null,
  },
  dracula: {
    background: "#282a36",
    windowBackground: "#1e1f29",
    headerBackground: "#1e1f29",
    text: "#f8f8f2",
    border: "#191a21",
    lineNumber: "#6272a4",
    lineHighlight: "rgba(255,255,255,0.07)",
    lineHighlightBorder: null,
  },
  "solarized-dark": {
    background: "#002b36",
    windowBackground: "#073642",
    headerBackground: "#073642",
    text: "#839496",
    border: "#00212b",
    lineNumber: "#586e75",
    lineHighlight: "rgba(255,255,255,0.06)",
    lineHighlightBorder: null,
  },
  nord: {
    background: "#2e3440",
    windowBackground: "#242933",
    headerBackground: "#242933",
    text: "#d8dee9",
    border: "#1e2129",
    lineNumber: "#4c566a",
    lineHighlight: "rgba(255,255,255,0.07)",
    lineHighlightBorder: null,
  },
  synthwave: {
    background: "#1a1a2e",
    windowBackground: "#16213e",
    headerBackground: "#0f3460",
    text: "#e94560",
    border: "#0f3460",
    lineNumber: "#533483",
    lineHighlight: "rgba(255,255,255,0.07)",
    lineHighlightBorder: null,
  },
  monokai: {
    background: "#272822",
    windowBackground: "#1e1f1c",
    headerBackground: "#1e1f1c",
    text: "#f8f8f2",
    border: "#1a1b18",
    lineNumber: "#75715e",
    lineHighlight: "rgba(255,255,255,0.07)",
    lineHighlightBorder: null,
  },
  "github-light": {
    background: "#ffffff",
    windowBackground: "#f6f8fa",
    headerBackground: "#f6f8fa",
    text: "#24292e",
    border: "#e1e4e8",
    lineNumber: "#959da5",
    lineHighlight: "rgba(255,251,198,0.8)",
    lineHighlightBorder: "#e3c000",
  },
};

export const DEFAULT_CODE = `import { pipeline } from "@huggingface/transformers";

const pipe = await pipeline(
  "feature-extraction",
  "onnx-community/all-MiniLM-L6-v2-ONNX",
);

const output = await pipe(
  "The quick brown fox jumps over the lazy dog.",
  {
    normalize: "mean",
    pooling: true,
  }
);

console.log(output.tolist());

// [[-0.03447722643613815,...,0.030206818133592606]]]];`;
