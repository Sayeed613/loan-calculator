import { createContext, useContext, useMemo, useState } from "react"

import { createTheme, ThemeProvider } from "@mui/material"

const AppContext = createContext()

export const useAppContext =() => useContext(AppContext)

export const AppProvider = ({ children }) => {
    const [mode, setMode] = useState("light")

    const [currency, setCurrency] = useState("USD")

    const toggleTheme = () => {
        setMode((prev) => (prev === 'light' ? 'dark' : 'light'))
    }

    const theme = createTheme({
        palette: {
          mode: mode,
          primary: {
            main: mode === "dark" ? "#90caf9" : "#1976d2",
          },
          background: {
            default: mode === "dark" ? "#121212" : "#fff",
          },
        },
      });

    return (
        <AppContext.Provider value={{mode, toggleTheme, currency, setCurrency}}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </AppContext.Provider>
    )
}