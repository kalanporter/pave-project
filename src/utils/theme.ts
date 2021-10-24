import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#001b56',
      light: '#F6F8FA',
    },
    secondary: {
      main: '#13b8a6',
    },
    text: {
      primary: '#000000',
      secondary: '#FFFFFF',
    },
    black: {
      main: '#000000',
    },
    white: {
      main: '#FFFFFF',
    },
  },
  typography: {
    h1: {
      fontSize: 24,
    },
    h2: {
      fontSize: 20,
    },
    h3: {
      fontSize: 16,
    },
    h4: {
      fontSize: 14,
    },
    body1: {
      fontSize: 12,
    },
  },
});
