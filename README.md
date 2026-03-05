# hugshot

Create and share beautiful code screenshots — built for the Hugging Face ecosystem.

## Features

- **Syntax highlighting** for 16 languages via Prism.js
- **8 editor themes** (One Dark, Dracula, Nord, Synthwave, GitHub Light, and more)
- **10 background gradients** including Hugging Face-branded options
- **Line highlighting** — click line numbers to highlight, shift-click to select ranges
- **Editable filename** in the title bar
- **Attribution bar** below the code window with GitHub, X, Hugging Face, and URL fields
- **Export as PNG** or **copy image to clipboard**
- **Shareable links** — encode current settings into a URL hash; settings are saved to localStorage and the hash is stripped on load

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Usage

1. Paste or type code in the editor
2. Adjust appearance, editor, and canvas settings in the sidebar
3. Optionally add attribution (GitHub, X, Hugging Face username, or URL)
4. Click **Export PNG** to download or **Copy Image** to copy to clipboard
5. Click **Copy link** to generate a shareable URL with your current settings

## Stack

- [React 18](https://react.dev) + [TypeScript](https://www.typescriptlang.org)
- [Vite](https://vitejs.dev)
- [Tailwind CSS v4](https://tailwindcss.com)
- [Prism.js](https://prismjs.com) — syntax highlighting
- [react-simple-code-editor](https://github.com/react-simple-code-editor/react-simple-code-editor) — editable code area
- [html2canvas](https://html2canvas.hertzen.com) — PNG export

## Scripts

| Command           | Description                         |
| ----------------- | ----------------------------------- |
| `npm run dev`     | Start dev server                    |
| `npm run build`   | Type-check and build for production |
| `npm run preview` | Preview the production build        |
| `npm run lint`    | Lint with ESLint                    |
| `npm run format`  | Format with Prettier                |
