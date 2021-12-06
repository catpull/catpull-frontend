import { useCurrentNetworkData } from "../dapp/networks";
import { useCurrentState } from "./GlobalState";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import * as React from "react";
import { CryptoIcon } from "./CryptoIcon";

export function CryptoTabs() {
  const s = useCurrentState();
  const data = useCurrentNetworkData();
  const availableTokens = Object.keys(data.tokens).filter(i => i !== "stable");
  return (
    <Tabs value={s.state.token}>
      {availableTokens.map(tok => {
        const t = tok.slice(1);
        return <Tab onClick={() => s.update({ token: tok })} value={tok} key={tok} icon={<CryptoIcon name={t} size={25} />} iconPosition="start" label={t.toUpperCase()} />;
      })}
    </Tabs>
  );
}
