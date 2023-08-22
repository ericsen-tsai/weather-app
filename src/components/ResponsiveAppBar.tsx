'use client'

import { useState } from 'react'
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Container,
  MenuItem,
  Avatar,
  Stack,
  Popover,
  Button,
  IconButton,
} from '@mui/material'

import { useRouter } from 'next/navigation'
import { useSession, signIn, signOut } from 'next-auth/react'
import ThemeToggle from './ThemeToggle'

const pages = ['History']

function ResponsiveAppBar() {
  const router = useRouter()
  const session = useSession()
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              flexDirection: 'column',
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            FETCH
            <br />
            <span style={{ fontSize: '0.75rem', display: 'block' }}>
              WEATHER
            </span>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex' } }}>
            {pages.map((page) => (
              <MenuItem
                key={page}
                onClick={() => {
                  void router.push(`/${page.toLowerCase()}`)
                }}
              >
                <Typography textAlign="center">{page}</Typography>
              </MenuItem>
            ))}
          </Box>
          <Stack direction="row" gap={2}>
            <ThemeToggle />
            <IconButton
              aria-describedby={id}
              onClick={handleClick}
            >
              <Avatar
                src={session?.data?.user?.image ?? undefined}
                alt={session?.data?.user?.name ?? 'unknown'}
              />
            </IconButton>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              {session.data ? (
                <Button
                  variant="outlined"
                  onClick={() => {
                    void signOut()
                    void router.refresh()
                  }}
                >
                  Sign Out
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  onClick={() => {
                    void signIn()
                    void router.refresh()
                  }}
                >
                  Sign In
                </Button>
              )}
            </Popover>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default ResponsiveAppBar
