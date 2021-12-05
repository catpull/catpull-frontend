/* eslint-disable no-nested-ternary */
import { useOnTestnet, useCurrentNetworkData } from "../dapp/networks";
import { Erc20MockFactory, PriceProviderMockFactory, ExerciserV1Factory, ExpirerV1Factory } from "../typechain";
import { Account } from "./Account";
import { Controls } from "./Controls";
import { useCurrentState } from "./GlobalState";
import { Web3Provider } from "@ethersproject/providers";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import { useWeb3React } from "@web3-react/core";
import { utils, BigNumber } from "ethers";
import { useSnackbar } from "notistack";

const ControlsWrapper = () => {
  const s = useCurrentState();
  const curNetworkData = useCurrentNetworkData();
  return (
    <Controls
      onUpdate={() => {
        const minAmount = curNetworkData?.tokens[s.state?.token]?.minOptionSize;
        s.refreshPrice();
        s.refreshBalances();
        s.update({
          amount: minAmount,
          amountString: minAmount.toString(),
        });
      }}
    />
  );
};

const TestnetControls = () => {
  const s = useCurrentState();
  const noti = useSnackbar();
  const curNetworkData = useCurrentNetworkData();
  const ctx = useWeb3React<Web3Provider>();
  const curToken = curNetworkData.tokens[s.state.token];

  const runExcerciser = async (addr: string, factory: typeof ExerciserV1Factory) => {
    const expirerV1 = factory.connect(addr, await ctx.library.getSigner(ctx.account));
    const pages = (await expirerV1.numberOfPages()).toNumber();
    const options: BigNumber[] = [];
    for (let page = 0; page < pages; page++) {
      const { len, out } = await expirerV1.callStatic.search(page);
      options.push(...out.slice(0, len.toNumber()));
    }
    const r = await expirerV1.run(options);
    noti.enqueueSnackbar("Running");
    await r.wait(1);
    noti.enqueueSnackbar("Done");
  };
  const mkMinter = (addr: string, amount: number, decimals: number) => async () => {
    const r = await Erc20MockFactory.connect(addr, await ctx.library.getSigner(ctx.account)).mint(utils.parseUnits(amount.toString(), decimals));
    noti.enqueueSnackbar("Minting..");
    await r.wait(1);
    noti.enqueueSnackbar("Tokens minted!");
    s.refreshBalances();
  };
  const mkPriceAdvancer = (amount: bigint, token: string) => {
    return async () => {
      const priceOracleAddr = curNetworkData.priceOracles[token];
      const priceProvider = await PriceProviderMockFactory.connect(priceOracleAddr, await ctx.library.getSigner(ctx.account));

      const { answer } = await priceProvider.latestRoundData();
      const newPrice = answer.toBigInt() + (answer.toBigInt() * amount) / 100n;
      const r = await priceProvider.setPrice(newPrice);
      noti.enqueueSnackbar("Changing " + token + " price");
      s.refreshOptionPrice();
      await r.wait(1);
      noti.enqueueSnackbar("Price updated");
    };
  };

  return (
    <div style={{ position: "absolute", left: 0, bottom: 16 }}>
      <Stack sx={{ marginLeft: 3 }} direction="row" spacing={2}>
        <Button onClick={mkMinter(curNetworkData.stable.address, curNetworkData.stable.mintSize, curNetworkData.stable.decimals)} size="small" variant="contained">
          Mint {curNetworkData.stable.mintSize} {curNetworkData.stable.symbol}
        </Button>
        <Button onClick={mkMinter(curToken.address, curToken.mintSize, curToken.decimals)} size="small" variant="contained">
          Mint {curToken.mintSize} {curToken.symbol}
        </Button>
        <Button onClick={mkPriceAdvancer(5n, s.state.token)} size="small" variant="contained">
          + 5% {s.state.token} price
        </Button>
        <Button onClick={mkPriceAdvancer(-5n, s.state.token)} size="small" variant="contained">
          - 5% {s.state.token} price
        </Button>
        <Button
          onClick={async () => {
            await runExcerciser(curNetworkData.keepers.excercise, ExerciserV1Factory);
          }}
          size="small"
          variant="contained"
        >
          Run exercise keeper
        </Button>
        <Button
          onClick={async () => {
            await runExcerciser(curNetworkData.keepers.expiration, ExpirerV1Factory);
          }}
          size="small"
          variant="contained"
        >
          Run expiration keeper
        </Button>
      </Stack>
    </div>
  );
};

export function Header() {
  const isTestNet = useOnTestnet();

  return (
    <>
      <Box sx={{ width: "100%", height: 50, position: "relative" }}>
        <Toolbar variant="dense">
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
