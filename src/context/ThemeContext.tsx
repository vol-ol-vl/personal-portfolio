import { createContext, useContext, type ReactNode, useState, useCallback, useMemo } from "react";

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
    const toggleTheme = useCallback(() => {
        setTheme(previousTheme => 
            previousTheme === 'light'
            ? 'dark' 
            : 'light'
        );
    }, []);

    const value = useMemo(() => ({
        theme,
        toggleTheme    
    }), [theme, toggleTheme]);

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};