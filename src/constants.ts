// Theme IDs and their color configs (THEME_CONFIGS below) are hand-crafted
// approximations of popular editor themes. The id is used as a display key only —
// syntax token colors come from the global Prism CSS overrides in index.css,
// which are written for the One Dark palette and applied to all themes.
export const THEMES = [
  { id: "dark", label: "Dark" },
  { id: "light", label: "Light" },
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

export const PADDING_SIZES = [0, 16, 24, 32, 40, 48, 64] as const;

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
    id: "hugging-face",
    label: "Dark",
    value: "linear-gradient(135deg, #0b0f19 0%, #0f172b 100%)",
  },
  {
    id: "hugging-face-light",
    label: "Light",
    value: "linear-gradient(135deg, #fffbe8 0%, #fff7d6 100%)",
  },
  {
    id: "hugging-face-yellow",
    label: "Yellow",
    value: "linear-gradient(135deg, #FFD21E 0%, #FF9D00 100%)",
  },
  /*{
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
  },*/
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
  dark: {
    background: "#101623",
    windowBackground: "#0b0f19",
    headerBackground: "#0b0f19",
    text: "#e8eaf0",
    border: "#1e2637",
    lineNumber: "#3d4f6b",
    lineHighlight: "rgba(255,255,255,0.05)",
    lineHighlightBorder: null,
  },
  light: {
    background: "#ffffff",
    windowBackground: "#f9fafb",
    headerBackground: "#f9fafb",
    text: "#24292e",
    border: "#e5e7eb",
    lineNumber: "rgba(0,0,0,0.32)",
    lineHighlight: "rgba(0,0,0,0.04)",
    lineHighlightBorder: null,
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
