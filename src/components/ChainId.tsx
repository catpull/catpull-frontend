import { useNetworkType } from "../dapp/networks";
import { Typography } from "@mui/material";

export function ChainId() {
  const network = useNetworkType();

  return (
    <>
      <Typography>
        <span>Network:&nbsp;</span>
        {network == null ? <span>Not connected</span> : network}
      </Typography>
    </>
  );
}

export default ChainId;
