import * as React from "react"
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";

import Container from "@mui/material/Container"


import { POLLING_INTERVAL } from "../dapp/connectors";
import { Header } from "./Header";
import { Controls  } from "./Controls";
import { Routes, Route } from "react-router-dom";
import { useCurrentState, GlobalState } from "./OptionType";
import { UIBuy } from "./StrikeField";
import { UIHoldings } from "./OptionsPageData";
import { UIPool } from "./AddToPoolButton";

export function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = POLLING_INTERVAL;
  return library;
}

const Navigation = () => {
  const ctx = useWeb3React<Web3Provider>()

  if (ctx.chainId !== 43113) {
    return null
  }

  return <Routes>
      <Route path="buy" element={<UIBuy />}  />
      <Route path="holdings" element={<UIHoldings />}  />
      <Route path="pool" element={<UIPool />}  />
      <Route index element={<UIBuy />}  />
  </Routes>
}

const ControlsWrapper = () => {
  const s = useCurrentState()
  return <Controls onUpdate={() => s.refreshPrice()} />
}

export default function Demo() {
  return (
    <GlobalState>
      <Header />
      <Container sx={{ paddingTop: 2 }} maxWidth="sm">
        <ControlsWrapper />
      </Container>
      
        <Navigation />
      
    </GlobalState>
  );
}
