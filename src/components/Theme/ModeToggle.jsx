"use client";

import { useTheme } from "next-themes";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { useState, useEffect } from "react";

export function ModeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [isDarkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (resolvedTheme) {
      setDarkMode(resolvedTheme === "dark");
      setMounted(true);
    }
  }, [resolvedTheme]);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setDarkMode(newMode);
    setTheme(newMode ? "dark" : "light");
  };
  if (!mounted) return null;

  return (
    <DarkModeSwitch
      sunColor="black"
      moonColor="white"
      checked={isDarkMode}
      onChange={toggleDarkMode}
      size={22}
    />
  );
}
