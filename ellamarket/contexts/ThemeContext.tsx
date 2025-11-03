import { createContext, useEffect, useState, ReactNode } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: "system",
  setTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>("system");

  const applyTheme = (themeValue: Theme) => {
    if (typeof document === "undefined") return; // ✅ SSR safety

    const root = document.documentElement;
    const systemPrefersDark =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    let activeTheme: "light" | "dark";

    if (themeValue === "system") {
      activeTheme = systemPrefersDark ? "dark" : "light";
    } else {
      activeTheme = themeValue;
    }

    root.classList.remove("light", "dark");
    root.classList.add(activeTheme);
  };

  const setTheme = (themeValue: Theme) => {
    setThemeState(themeValue);
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", themeValue);
    }
    applyTheme(themeValue);
  };

  useEffect(() => {
    if (typeof window === "undefined") return; // ✅ avoids SSR crash

    const saved = localStorage.getItem("theme") as Theme | null;
    const initial = saved || "system";
    setThemeState(initial);
    applyTheme(initial);

    // ✅ Listen to system theme change
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = () => {
      if (localStorage.getItem("theme") === "system") {
        applyTheme("system");
      }
    };
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
