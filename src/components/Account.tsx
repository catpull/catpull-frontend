/* eslint-disable no-nested-ternary */
import { injected, walletconnect } from "../dapp/connectors";
import { useOnValidNetwork } from "../dapp/networks";
import { Button } from "@mui/material";
import { useWeb3React } from "@web3-react/core";

export function Account() {
  const validNetwork = useOnValidNetwork();
  const { connector, activate, account, deactivate } = useWeb3React();

  const connected = (connection: typeof injected | typeof walletconnect) => connection === connector;

  if (!validNetwork) {
    return (
      <Button disabled={true} color="error">
        Wrong network
      </Button>
    );
  }
  if (account == null) {
    return (
      <Button
        variant="contained"
        size="large"
        onClick={async () => {
          activate(injected);
        }}
        color="secondary"
      >
        Connect
      </Button>
    );
  }
  return (
    <Button
      variant="contained"
      size="large"
      onClick={async () => {
        if (connected(walletconnect)) {
          (connector as any).close();
        }
        deactivate();
      }}
      color="secondary"
    >
      Disconnect
    </Button>
  );
}

export default Account;
