import { createContext, useState, useContext } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(false);

  const changeMode = () => {
    setMode(!mode);
  };
  return (
    <ThemeContext.Provider value={{ mode, changeMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
