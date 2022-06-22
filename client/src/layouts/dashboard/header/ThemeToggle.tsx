import { IconButton } from "@mui/material"
import { useState } from "react";
import { Iconify } from "../../../components";
import useSettings from "src/hooks/useSettings";

export default function ThemeToggle() {
  const { themeMode, onToggleMode } = useSettings();

  const [darkMode, setDarkMode] = useState(themeMode === 'dark');

  const handleToggleTheme = () => {
    onToggleMode();
    setDarkMode(!darkMode);
  }

  return <IconButton onClick={handleToggleTheme}>
    {darkMode ?
      <Iconify icon="eva:moon-outline" /> :
      <Iconify icon="eva:sun-outline" />
    }
  </IconButton>;
};
