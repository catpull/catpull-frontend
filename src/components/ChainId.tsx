import { Typography } from "@mui/material";
import { useNetworkType } from "../dapp/networks"


export function ChainId() {
  const network =  useNetworkType()

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
