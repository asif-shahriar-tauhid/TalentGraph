"use client";

import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "@/providers/themeProvider";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className={`inline-flex items-center rounded-xl border border-border/80 bg-card p-0.5 shadow-xs ${className}`}
      role="group"
      aria-label="Theme selection"
    >
      <button
        type="button"
        onClick={() => setTheme("light")}
        className={`flex size-7.5 items-center justify-center rounded-lg text-xs transition-colors cursor-pointer ${
          theme === "light"
            ? "bg-secondary text-primary font-semibold shadow-xs"
            : "text-muted-foreground hover:text-foreground"
        }`}
        title="Light Mode"
      >
        <Sun className="size-3.5" />
      </button>
      <button
        type="button"
        onClick={() => setTheme("dark")}
        className={`flex size-7.5 items-center justify-center rounded-lg text-xs transition-colors cursor-pointer ${
          theme === "dark"
            ? "bg-secondary text-primary font-semibold shadow-xs"
            : "text-muted-foreground hover:text-foreground"
        }`}
        title="Dark Mode"
      >
        <Moon className="size-3.5" />
      </button>
      <button
        type="button"
        onClick={() => setTheme("system")}
        className={`flex size-7.5 items-center justify-center rounded-lg text-xs transition-colors cursor-pointer ${
          theme === "system"
            ? "bg-secondary text-primary font-semibold shadow-xs"
            : "text-muted-foreground hover:text-foreground"
        }`}
        title="System Preference"
      >
        <Laptop className="size-3.5" />
      </button>
    </div>
  );
}
