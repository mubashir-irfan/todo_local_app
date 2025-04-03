import { useTheme as useNextTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useNextTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("muiTheme", newTheme);
  };

  const storedTheme = mounted ? localStorage.getItem("muiTheme") : null;
  const currentTheme =
    theme === "system" ? (mounted ? storedTheme || "light" : "light") : theme;

  return (
    <button
      type="button"
      className="cursor-pointer bg-white dark:bg-[#191919] text-[#37352f] dark:text-[#ffffffcf] hover:bg-hover-background active:bg-active-background rounded-md border border-button-border-color p-1.5 [transition:background_20ms_ease-in,_color_0.15s]"
      title="Toggle theme"
      aria-label="Toggle theme"
      onClick={toggleTheme}
    >
      {currentTheme === "dark" ? <FaSun size={20} /> : <FaMoon size={20} />}
    </button>
  );
};

export default ThemeToggle;
