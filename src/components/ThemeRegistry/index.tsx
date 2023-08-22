'use client'

import * as React from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { cyan, teal } from '@mui/material/colors'
import NextAppDirEmotionCacheProvider from './EmotionCache'

import { ThemeToggleContext } from '../ThemeToggle/ThemeToggleContext'

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = React.useState<'light' | 'dark'>('light')

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
      },
    }),
    [],
  )

  const theme = React.useMemo(
    () => createTheme({
      palette: {
        mode,
        primary: teal,
        secondary: cyan,
      },
      typography: {
        fontFamily: 'inherit',
      },
    }),
    [mode],
  )

  return (
    <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
      <ThemeToggleContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </ThemeToggleContext.Provider>
    </NextAppDirEmotionCacheProvider>
  )
}
