import * as React from "react";
import { ConnectionsModal } from "./components/ConnectionsModal";
import Demo, { getLibrary } from "./components/Demo";
import { Web3ReactProvider } from "@web3-react/core";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";

export function App() {
  const prefersDarkMode = false; // useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          primary: {
            main: "#888",
          },
          secondary: {
            main: "#333",
          },
          background: {
            default: "rgb(212,203,198)",
          },
        },
      }),
    [prefersDarkMode],
  );
  return (
    <ThemeProvider theme={theme}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <CssBaseline />
        <Demo />
        <ConnectionsModal />
      </Web3ReactProvider>
    </ThemeProvider>
  );
}
