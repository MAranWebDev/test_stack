// Direct imports
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// Libs
import { useThemeModeStore } from '@/libs/zustand/stores';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';
import { PropsWithChildren } from 'react';
import { THEME_MODES } from './constants';
import { useMuiLocale } from './hooks';

export const MuiThemeProvider = ({ children }: PropsWithChildren) => {
  const { muiLocale } = useMuiLocale();

  // "zustand"
  const isDarkMode = useThemeModeStore((state) => state.isDarkMode);

  const themeMode = isDarkMode ? THEME_MODES.DARK : THEME_MODES.LIGHT;

  // Theme settings
  const theme = createTheme(
    {
      palette: {
        mode: themeMode,
      },
      components: {
        MuiDrawer: {
          defaultProps: { SlideProps: { appear: true } },
        },
        MuiToggleButtonGroup: {
          defaultProps: { color: 'primary' },
        },
        MuiToggleButton: {
          styleOverrides: { root: { textTransform: 'none' } },
        },
        MuiTab: {
          styleOverrides: { root: { textTransform: 'none' } },
        },
        MuiButton: {
          styleOverrides: { root: { textTransform: 'none' } },
        },
        MuiIconButton: {
          styleOverrides: { root: { borderRadius: '16px' } },
        },
      },
    },
    muiLocale, // muiLocale it's a variable, not a prop
  );

  return (
    <ThemeProvider theme={theme}>
      {/* Normalize css */}
      <CssBaseline />

      {/* "notistack": must be inside theme provider to inherit styles */}
      <SnackbarProvider maxSnack={1}>{children}</SnackbarProvider>
    </ThemeProvider>
  );
};
