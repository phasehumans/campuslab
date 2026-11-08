import { createContext, useContext, useEffect, type ReactNode } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
    theme: Theme
    toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType>({
    theme: 'light',
    toggleTheme: () => {},
})

export function ThemeProvider({ children }: { children: ReactNode }) {
    useEffect(() => {
        // Ensure root app is always in light theme
        const root = document.documentElement
        root.classList.remove('dark')
        localStorage.setItem('theme', 'light')
    }, [])

    return (
        <ThemeContext.Provider value={{ theme: 'light', toggleTheme: () => {} }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    return useContext(ThemeContext)
}
