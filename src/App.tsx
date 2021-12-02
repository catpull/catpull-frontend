import { ConnectionsModal } from "./components/ConnectionsModal";
import Demo, { getLibrary } from "./components/Demo";
import CssBaseline from "@mui/material/CssBaseline";
import { Web3ReactProvider } from "@web3-react/core";

export function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <CssBaseline />
      <Demo />
      <ConnectionsModal />
    </Web3ReactProvider>
  );
}
