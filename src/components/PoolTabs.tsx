import { useCurrentNetworkData } from "../dapp/networks";
import { useCurrentState } from "./GlobalState";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import * as React from "react";
import Icon from "react-crypto-icons";

export function PoolTabs() {
  const s = useCurrentState();
  const data = useCurrentNetworkData();
  const availableTokens = Object.keys(data.tokens).filter(i => i !== "stable");
  return (
    <Tabs value={s.state.token + s.state.type}>
      {availableTokens.map(tok => {
        const t = tok.slice(1);
        return [
          <Tab
            onClick={() => s.update({ token: tok, type: "call" })}
            value={tok + "call"}
            key={tok + "call"}
            icon={<Icon name={t} size={25} />}
            iconPosition="start"
            label={t.toUpperCase() + " CALL"}
          />,
          <Tab
            onClick={() => s.update({ token: tok, type: "put" })}
            value={tok + "put"}
            key={tok + "put"}
            icon={<Icon name={t} size={25} />}
            iconPosition="start"
            label={t.toUpperCase() + " PUT"}
          />,
        ];
      })}
    </Tabs>
  );
}
