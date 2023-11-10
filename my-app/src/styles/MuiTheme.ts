import { createTheme } from '@mui/material/styles';

export const CustomTheme = createTheme({
  typography: {
    fontFamily: 'source-code-pro, Menlo, Monaco, Consolas, Courier New, monospace',
    fontSize: 14
  },
  palette: {
    mode: 'dark',

    primary: {
      main: '#ffd406'
    },

    secondary: {
      main: '#dfffff'
    },

    background: {
      default: '#1d2122',
      paper: '#3e4145'
    },

    info: {
      main: '#fde0bc',
      light: '#fdd9ac',
      dark: '#b19778'
    },

    warning: {
      main: '#ff1744',
      light: '#ff4569',
      dark: '#b2102f'
    }
  }
});
