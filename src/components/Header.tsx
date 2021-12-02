/* eslint-disable no-nested-ternary */
import { useOnTestnet, useCurrentNetworkData, networks } from "../dapp/networks";
import { Erc20MockFactory, PriceProviderMockFactory } from "../typechain";
import { Account } from "./Account";
import { ChainId } from "./ChainId";
import { Controls } from "./Controls";
import { useCurrentState } from "./GlobalState";
import { Web3Provider } from "@ethersproject/providers";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useWeb3React } from "@web3-react/core";
import { utils } from "ethers";
import { useSnackbar } from "notistack";

const ControlsWrapper = () => {
  const s = useCurrentState();
  return (
    <Controls
      onUpdate={() => {
        s.refreshPrice();
        s.refreshBalances();
      }}
    />
  );
};

const TestnetControls = () => {
  const noti = useSnackbar();
  const curNetworkData = useCurrentNetworkData();
  const ctx = useWeb3React<Web3Provider>();
  const mkMinter = (addr: string, amount: string, decimals: string) => async () => {
    const r = await Erc20MockFactory.connect(addr, await ctx.library.getSigner(ctx.account)).mint(utils.parseUnits(amount, decimals));
    noti.enqueueSnackbar("Minting..");
    await r.wait(1);
    noti.enqueueSnackbar("Tokens minted!");
  };
  const mkPriceAdvancer = (amount: bigint, token: "weth") => {
    return async () => {
      const priceOracleAddr = curNetworkData.priceOracles[token];
      const priceProvider = await PriceProviderMockFactory.connect(priceOracleAddr, await ctx.library.getSigner(ctx.account));

      const { answer } = await priceProvider.latestRoundData();
      const newPrice = answer.toBigInt() + (answer.toBigInt() * amount) / 100n;
      const r = await priceProvider.setPrice(newPrice);
      noti.enqueueSnackbar("Changing " + token + " price");
      await r.wait(1);
      noti.enqueueSnackbar("Price updated");
    };
  };

  return (
    <div style={{ position: "absolute", left: 0, bottom: 16 }}>
      <Stack sx={{ marginLeft: 3 }} direction="row" spacing={2}>
        <Button onClick={mkMinter(networks.testnet.stable.address, "50000", "6")} size="small" variant="contained" color="secondary">
          Mint 50000 USDC
        </Button>
        <Button onClick={mkMinter(networks.testnet.tokens.weth.address, "10", "18")} size="small" variant="contained" color="secondary">
          Mint 10 WETH
        </Button>
        <Button onClick={mkPriceAdvancer(5n, "weth")} size="small" variant="contained" color="secondary">
          + 5% eth price
        </Button>
        <Button onClick={mkPriceAdvancer(-5n, "weth")} size="small" variant="contained" color="secondary">
          - 5% eth price
        </Button>
      </Stack>
    </div>
  );
};

export function Header() {
  const { active, error } = useWeb3React();
  const isTestNet = useOnTestnet();

  return (
    <>
      <Box sx={{ width: "100%", height: 50, position: "relative" }}>
        <Toolbar variant="dense">
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Typography>{active ? "🟢" : error ? "🔴" : "🟠"}&nbsp;</Typography>
            <ChainId />
          </Box>

          <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "row" }}></Box>
          <Account />
        </Toolbar>
        <div style={{ position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)" }}>
          <ControlsWrapper />
        </div>
      </Box>
      {isTestNet && <TestnetControls />}
    </>
  );
}

export default Header;
