import React, { createContext, useState, ReactNode } from 'react';

// Описуємо структуру нашого контексту
interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

// Передаємо цей тип у createContext
export const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {}, 
});

// Типізуємо пропси для нашого провайдера
interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<string>('dark');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};