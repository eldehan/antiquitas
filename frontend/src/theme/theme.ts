import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#bf9f45',
    },
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
  },
  typography: {
    fontFamily: "'Montserrat', sans-serif",
    h1: {
      fontFamily: "'Tulpen One', sans-serif",
      fontSize: '6.5rem',
    },
    h2: {
      fontFamily: "'Tulpen One', sans-serif",
      fontSize: '5rem',
    },
    h3: {
      fontFamily: "'Tulpen One', sans-serif",
      fontSize: '3.5rem',
    },
    h4: {
      fontFamily: "'Tulpen One', sans-serif",
      fontSize: '2.5rem',
    },
    h5: {
      fontFamily: "'Tulpen One', sans-serif",
      fontSize: '1.5rem',
    },
    h6: {
      fontFamily: "'Tulpen One', sans-serif",
      fontSize: '1.25rem',
    },
    body1: {
      fontSize: '1rem',
    },
    body2: {
      fontSize: '0.875rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          color: 'white',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: `
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-15px);
          }
          60% {
            transform: translateY(-7px);
          }
        }
      `,
    },
  },
});

export default theme;