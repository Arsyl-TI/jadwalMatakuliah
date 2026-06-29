// context/ThemeContext.tsx
import React, { createContext, useState, ReactNode } from 'react';

// Mendefinisikan tipe untuk Context
interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

// Membuat Context
export const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  toggleDarkMode: () => {},
});

// Membuat Provider untuk membungkus aplikasi
export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};