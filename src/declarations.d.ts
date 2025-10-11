// src/declarations.d.ts or types/declarations.d.ts
declare module '*.scss' {
    const content: { [className: string]: string };
    export default content;
  }