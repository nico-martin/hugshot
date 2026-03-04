/// <reference types="vite/client" />

declare module "dom-to-image-more" {
  interface Options {
    scale?: number;
    bgcolor?: string;
    width?: number;
    height?: number;
    style?: Partial<CSSStyleDeclaration>;
    quality?: number;
    cacheBust?: boolean;
  }
  function toPng(node: HTMLElement, options?: Options): Promise<string>;
  function toBlob(node: HTMLElement, options?: Options): Promise<Blob>;
  export { toPng, toBlob };
}
