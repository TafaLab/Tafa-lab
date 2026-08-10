/**
 * Shared semantic class names for STK Lab core pages.
 * Visual values themselves live in StkTheme.module.css.
 * Future redesigns should start there instead of editing every page.
 */
export const stkTheme = {
  pageBg: "bg-[var(--stk-bg)]",
  surface: "bg-[color:var(--stk-surface)]",
  card: "bg-[color:var(--stk-surface-card)]",
  strongSurface: "bg-[var(--stk-surface-strong)]",
  dark: "bg-[var(--stk-dark)]",
  text: "text-[var(--stk-text)]",
  muted: "text-[color:var(--stk-muted)]",
  mutedStrong: "text-[color:var(--stk-muted-strong)]",
  faint: "text-[color:var(--stk-faint)]",
  border: "border-[color:var(--stk-border)]",
  cardRadius: "rounded-[var(--stk-radius-card)]",
  panelRadius: "rounded-[var(--stk-radius-panel)]",
  shadow: "shadow-[var(--stk-shadow-card)]",
} as const;
