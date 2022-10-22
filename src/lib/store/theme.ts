import { writable } from "svelte/store";

export const theme = writable(getLocalStorage("theme") || "light");

export function toggleTheme() {
  theme.update((value) => {
    if (value === "light") {
      setLocalStorage("theme", "dark");
      return "dark";
    }

    setLocalStorage("theme", "light");
    return "light";
  });
}

function setLocalStorage(key: string, value: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, value);
}

function getLocalStorage(key: string) {
  if (typeof window === "undefined") return;
  return localStorage.getItem(key);
}
