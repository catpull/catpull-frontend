import * as React from "react"
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";

import Container from "@mui/material/Container"


import { POLLING_INTERVAL } from "../dapp/connectors";
import { Header } from "./Header";
import { Controls, useNavigationContext, ControlsProvider } from "./Controls";
import { HegicCallFactory } from "../typechain";
import { useCurrentState, GlobalState } from "./OptionType";
import { UIBuy } from "./StrikeField";
import { UIHoldings } from "./OptionsPageData";
import { UIPool } from "./AddToPoolButton";

export function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = POLLING_INTERVAL;
  return library;
}
const screens = {
  "buy": () => <UIBuy />,
  "holdings": () => <UIHoldings />,
  "pool": () => <UIPool />
}
const Navigation = () => {
  const nav = useNavigationContext()
  const ctx = useWeb3React<Web3Provider>()
  const Screen = screens[nav.page] || null
  if (Screen == null) {
    return null
  }
  if (ctx.chainId !== 43113) {
    return null
  }

  return <Screen />
}

const ControlsWrapper = () => {
  const s = useCurrentState()
  return <Controls onUpdate={() => s.refreshPrice()} />
}

export default function Demo() {
  return (
    <ControlsProvider>
      <GlobalState>
        <Header />
        <Container sx={{ paddingTop: 2 }} maxWidth="sm">
          <ControlsWrapper />
        </Container>
        
          <Navigation />
        
      </GlobalState>
    </ControlsProvider>
  );
}
