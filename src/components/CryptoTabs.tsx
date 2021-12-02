import * as React from "react";
import Tab from "@mui/material/Tab";
import Tabs from '@mui/material/Tabs';
import Icon from "react-crypto-icons";
import { useCurrentNetworkData } from "../dapp/networks";
import { useCurrentState } from "./GlobalState";

export function CryptoTabs() {
  const s = useCurrentState();
  const data = useCurrentNetworkData();
  const availableTokens = Object.keys(data.tokens).filter(i => i !== "stable");
  return <Tabs value={s.state.token}>
    {availableTokens.map(tok => {
      const t = tok.slice(1);
      return <Tab onClick={() => s.update({ token: tok })} value={tok} key={tok} icon={<Icon name={t} size={25} />} iconPosition="start" label={t.toUpperCase()} />;
    })}
  </Tabs>;
}
