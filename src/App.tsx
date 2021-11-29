import { Web3ReactProvider } from "@web3-react/core";
import Demo, { getLibrary } from "./components/Demo";
import { ConnectionsModal } from "./components/ConnectionsModal";
import CssBaseline from '@mui/material/CssBaseline';

export function App() {
  return (
      <Web3ReactProvider getLibrary={getLibrary}>
        <CssBaseline />
        <Demo />
        <ConnectionsModal />
      </Web3ReactProvider>
  );
}
