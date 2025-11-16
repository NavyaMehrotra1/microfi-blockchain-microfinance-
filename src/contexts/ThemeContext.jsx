import React, { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  const [isDark] = useState(true) // Always dark mode

  useEffect(() => {
    // Force dark mode always
    document.documentElement.classList.add('dark')
  }, [])

  const value = {
    isDark: true,
    toggleTheme: () => {}, // No-op function
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
