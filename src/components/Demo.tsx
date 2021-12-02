import { POLLING_INTERVAL } from "../dapp/connectors";
import { GlobalState } from "./GlobalState";
import { Header } from "./Header";
import { UIBuy } from "./UIBuy";
import { UILiquidity } from "./UILiquidity";
import { UIPool } from "./UIPool";
import { UIHoldings } from "./UiHoldings";
import { Web3Provider } from "@ethersproject/providers";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useWeb3React } from "@web3-react/core";
import * as React from "react";
import { Routes, Route } from "react-router-dom";

export function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = POLLING_INTERVAL;
  return library;
}

const SwitchToDevNet = () => {
  return (
    <Container sx={{ paddingTop: 2 }} maxWidth="sm">
      <Paper sx={{ padding: 3 }}>
        <Stack direction="column" spacing={3}>
          <Typography>Sorry, this demo is only available on the Avalance Fuji network</Typography>
        </Stack>
      </Paper>
    </Container>
  );
};

const NoPoolsFoundForThisNetwork = () => {
  return (
    <Container sx={{ paddingTop: 2 }} maxWidth="sm">
      <Paper sx={{ padding: 3 }}>
        <Stack direction="column" spacing={3}>
          <Typography>Sorry, this dappp only works on</Typography>
        </Stack>
      </Paper>
    </Container>
  );
};

const Navigation = () => {
  const ctx = useWeb3React<Web3Provider>();

  if (ctx.chainId === 43114) {
    return <SwitchToDevNet />;
  }

  if (ctx.chainId === 43113) {
    return (
      <Routes>
        <Route path="buy" element={<UIBuy />} />
        <Route path="holdings" element={<UIHoldings />} />
        <Route path="pool" element={<UIPool />} />
        <Route path="liquidity" element={<UILiquidity />} />
        <Route index element={<UIBuy />} />
      </Routes>
    );
  }

  return <NoPoolsFoundForThisNetwork />;
};

export default function Demo() {
  return (
    <GlobalState>
      <Header />

      <Box sx={{ marginTop: 5 }}>
        <Navigation />
      </Box>
    </GlobalState>
  );
}