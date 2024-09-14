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
      '@media (max-width:960px)': {  // md breakpoint
        fontSize: '5rem',
      },
      '@media (max-width:600px)': {  // sm breakpoint
        fontSize: '3.5rem',
      },
      '@media (max-width:0px)': {  // xs breakpoint
        fontSize: '2.5rem',
      },
    },
    h2: {
      fontFamily: "'Tulpen One', sans-serif",
      fontSize: '5rem',
      '@media (max-width:960px)': {
        fontSize: '4rem',
      },
      '@media (max-width:600px)': {
        fontSize: '3rem',
      },
      '@media (max-width:0px)': {
        fontSize: '2rem',
      },
    },
    h3: {
      fontFamily: "'Tulpen One', sans-serif",
      fontSize: '3.5rem',
      '@media (max-width:960px)': {
        fontSize: '3rem',
      },
      '@media (max-width:600px)': {
        fontSize: '2.5rem',
      },
      '@media (max-width:0px)': {
        fontSize: '2rem',
      },
    },
    h4: {
      fontFamily: "'Tulpen One', sans-serif",
      fontSize: '2.5rem',
      '@media (max-width:960px)': {
        fontSize: '2rem',
      },
      '@media (max-width:600px)': {
        fontSize: '1.75rem',
      },
      '@media (max-width:0px)': {
        fontSize: '1.5rem',
      },
    },
    h5: {
      fontFamily: "'Tulpen One', sans-serif",
      fontSize: '1.5rem',
      '@media (max-width:960px)': {
        fontSize: '1.25rem',
      },
      '@media (max-width:600px)': {
        fontSize: '1.125rem',
      },
      '@media (max-width:0px)': {
        fontSize: '1rem',
      },
    },
    h6: {
      fontFamily: "'Tulpen One', sans-serif",
      fontSize: '1.25rem',
      '@media (max-width:960px)': {
        fontSize: '1.125rem',
      },
      '@media (max-width:600px)': {
        fontSize: '1rem',
      },
      '@media (max-width:0px)': {
        fontSize: '0.875rem',
      },
    },
    body1: {
      fontSize: '1rem',
      '@media (max-width:600px)': {
        fontSize: '0.875rem',
      },
    },
    body2: {
      fontSize: '0.875rem',
      '@media (max-width:600px)': {
        fontSize: '0.75rem',
      },
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
