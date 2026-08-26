import { createContext, useContext, type ReactNode, useState } from "react";

export type Theme = 'light' | 'dark';

type ThemeContextValue = {
    theme: Theme,
    toggleTheme: () => void
}

export const ThemeContext = createContext<
    ThemeContextValue | undefined
>(undefined);

export const useTheme = () => {
    const context = useContext(ThemeContext);

    if (context === undefined) {
        throw new Error('useTheme must be used inside ThemeContext.Provider');
    }

    return context;
};

type ThemeProviderProps = {
    children: ReactNode
};

export const ThemeProvider = ({children}: ThemeProviderProps) => {
    
    const [theme, setTheme] = useState<Theme>('light');
    const toggleTheme = () => {
        setTheme(previousTheme => 
            previousTheme === 'light'
            ? 'dark' 
            : 'light'
        );
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};