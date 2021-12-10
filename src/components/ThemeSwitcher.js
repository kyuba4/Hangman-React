import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
  const themes = {
    light: "light-theme",
    dark: "dark-theme",
  };

  const initialTheme = () => {
    return localStorage.getItem("theme") || themes.light;
  };

  const [theme, setTheme] = useState(initialTheme);

  useEffect(() => {
    document.body.classList = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="switch-wrapper">
      <span className="change-theme-txt">Change Theme</span>
      <label>
        <input className="switch" type="checkbox" onClick={() => setTheme(theme === themes.light ? themes.dark : themes.light)} />
        <div>
          <div></div>
        </div>
      </label>
    </div>
  );
}
