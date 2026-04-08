import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'

import App from '@/App'
import '@/index.css'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0a66c2',
    },
    secondary: {
      main: '#378fe9',
    },
    background: {
      default: '#f3f6f8',
      paper: '#ffffff',
    },
    text: {
      primary: '#1d2226',
      secondary: '#5e6f85',
    },
  },
  shape: {
    borderRadius: 18,
  },
  typography: {
    fontFamily: '"Sora", sans-serif',
    h1: {
      fontFamily: '"Space Grotesk", sans-serif',
      fontWeight: 700,
    },
    h2: {
      fontFamily: '"Space Grotesk", sans-serif',
      fontWeight: 700,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: 24,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 999,
        },
      },
    },
  },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
)
