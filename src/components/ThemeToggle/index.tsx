'use client'

import React, { useContext } from 'react'
import IconButton from '@mui/material/IconButton'
import { useTheme } from '@mui/material/styles'

import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'

import { ThemeToggleContext } from './ThemeToggleContext'

function ThemeToggle() {
  const theme = useTheme()

  const themeToggle = useContext(ThemeToggleContext)

  return (
    <IconButton sx={{ ml: 1 }} onClick={themeToggle.toggleColorMode} color="inherit">
      {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  )
}

export default ThemeToggle
