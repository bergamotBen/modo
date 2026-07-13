import { createContext } from "react";

export const ColorModeContext = createContext({
  mode: "light",
  toggleColorMode: () => {},
});

export const COLOR_MODE_KEY = "modo-color-mode";

export function getInitialMode() {
  const stored = localStorage.getItem(COLOR_MODE_KEY);
  if (stored === "light" || stored === "dark") {
    return stored;
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}
