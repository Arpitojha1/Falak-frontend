/* ── CSS Module type declarations ────────────────────────────────────────────
   Allows TypeScript to resolve `import styles from '*.module.css'` imports.
   Vite handles the actual CSS Module transformation at runtime.
   ─────────────────────────────────────────────────────────────────────────── */
declare module '*.module.css' {
  const classes: Record<string, string>;
  export default classes;
}
