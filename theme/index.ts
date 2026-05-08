import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

// Elegant, classy theme: Playfair Display headings + Source Sans 3 body
export const theme = createTheme({
  palette: {
    primary: {
      main: '#0b3d91', // deep indigo
      contrastText: '#fff',
    },
    secondary: {
      main: '#b97a20', // warm gold accent
      contrastText: '#fff',
    },
    background: {
      default: '#fbfaf8',
      paper: '#ffffff',
    },
    text: {
      primary: '#0f1724',
      secondary: '#5b6470',
    },
  },
  typography: {
    fontFamily: '"Source Sans 3", "Helvetica", Arial, sans-serif',
    h1: {
      fontFamily: '"Playfair Display", "Source Sans 3", serif',
      fontSize: '2.25rem',
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontFamily: '"Playfair Display", "Source Sans 3", serif',
      fontSize: '1.75rem',
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontFamily: '"Playfair Display", "Source Sans 3", serif',
      fontSize: '1.375rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.125rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '0.875rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.95rem',
      lineHeight: 1.5,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 10,
        },
        containedPrimary: {
          background: 'linear-gradient(90deg,#0b3d91 0%,#234fb8 100%)',
          boxShadow: '0 6px 18px rgba(11,61,145,0.18)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 8px 24px rgba(16,24,40,0.08)',
          border: '1px solid rgba(16,24,40,0.03)',
          overflow: 'hidden',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'transparent',
          backdropFilter: 'blur(6px)',
          boxShadow: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundClip: 'padding-box',
        },
      },
    },
  },
})

export { ThemeProvider, CssBaseline }
