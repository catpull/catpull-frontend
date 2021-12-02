/* eslint-disable no-nested-ternary */
import { injected, walletconnect } from "../dapp/connectors";
import Typography from "@mui/material/Typography";
import { useWeb3React } from "@web3-react/core";

export function Account() {
  const { connector, account, deactivate } = useWeb3React();

  const connected = (connection: typeof injected | typeof walletconnect) => connection === connector;

  return (
    <div
      onClick={async () => {
        if (connected(walletconnect)) {
          (connector as any).close();
        }
        deactivate();
      }}
      className="btn btn-ghost btn-sm rounded-btn"
    >
      <Typography>
        Account: &nbsp;
        {account == null ? "Disconnceted" : account ? `${account.substring(0, 6)}...${account.substring(account.length - 4)}` : ""}
      </Typography>
    </div>
  );
}

export default Account;
