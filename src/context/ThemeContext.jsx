import React, { createContext, useMemo, useState } from "react";
export const MyThemeContext = createContext(null);
function ThemeContext({ children }) {
  const [theme, setTheme] = useState(false);
 

  const values = useMemo(() => {
    return {
      theme,
      toggleTheme: () => {
        setTheme((prevTheme) => !prevTheme);
        const body = document.body;
        body.style.backgroundColor = theme ? 'rgba(138, 135, 135, 0.393)':'rgba(239, 235, 235, 0.393)'
      },
    };
  }, [theme]);
  return (
    <MyThemeContext.Provider value={values}>{children}</MyThemeContext.Provider>
  );
}

export default ThemeContext;
