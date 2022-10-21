export function toggleDarkMode() {
  if (typeof window === "undefined") {
    return;
  }

  const html = document.querySelector("html");
  const isDarkMode = localStorage.getItem("darkMode") === "true";

  if (isDarkMode) {
    html?.classList.remove("dark");
    localStorage.setItem("darkMode", "false");
  }

  if (!isDarkMode) {
    html?.classList.add("dark");
    localStorage.setItem("darkMode", "true");
  }
}
