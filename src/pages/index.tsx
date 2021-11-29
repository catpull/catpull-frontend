import { Web3ReactProvider } from "@web3-react/core";


import Demo, { getLibrary } from "../components/Demo";
import { ConnectionsModal } from "../components/ConnectionsModal";

function App() {
  return (
      <Web3ReactProvider getLibrary={getLibrary}>
        <Demo />
        <ConnectionsModal />
      </Web3ReactProvider>
  );
}

export default App;
