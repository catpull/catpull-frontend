/* eslint-disable no-nested-ternary */
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { Account } from "./Account";
import { ChainId } from "./ChainId";
import AppBar from '@mui/material/AppBar';
import { utils } from "ethers"
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { useOnTestnet, useCurrentNetworkData, networks } from "../dapp/networks"
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { Erc20MockFactory, PriceProviderMockFactory } from "../typechain"

const TestnetControls = () => {
  const curNetworkData = useCurrentNetworkData()
  const ctx = useWeb3React<Web3Provider>()
  const mkMinter = (addr: string, amount: string, decimals: string) => async () => {
      await Erc20MockFactory.connect(addr, await ctx.library.getSigner(
        ctx.account
      )).mint(utils.parseUnits(amount, decimals))
    }
  const mkPriceAdvancer = (amount: bigint, token: "weth") => {

    return async () =>{

      const priceOracleAddr = curNetworkData.priceOracles[token]
      const priceProvider = await PriceProviderMockFactory.connect(priceOracleAddr, await ctx.library.getSigner(
        ctx.account
      ))

      const {answer} = await priceProvider.latestRoundData()
      const newPrice = answer.toBigInt() + answer.toBigInt() * amount / 100n
      await priceProvider.setPrice(newPrice)
    
    }
  }
  
  return <Stack sx={{marginLeft:3}} direction="row" spacing={2}>
    <Button onClick={mkMinter(networks.testnet.stable.address, "50000", "6")} size="small" variant="contained" color="secondary">
      Mint 50000 USDC
    </Button>
    <Button onClick={mkMinter(networks.testnet.tokens.weth.address, "10", "18")} size="small" variant="contained" color="secondary">
      Mint 10 WETH
    </Button>
    <Button onClick={mkPriceAdvancer(5n, 'weth')} size="small" variant="contained" color="secondary">
      + 5% eth price
    </Button>
    <Button onClick={mkPriceAdvancer(-5n, 'weth')} size="small" variant="contained" color="secondary">
      - 5% eth price
    </Button>
  </Stack>
}

export function Header() {
  const { active, error } = useWeb3React();
  const isTestNet = useOnTestnet()

  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Typography>{active ? "🟢" : error ? "🔴" : "🟠"}&nbsp;</Typography>
          <ChainId />
        </Box>
        {isTestNet && <TestnetControls />}

        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'row' }}></Box>
        <Account />
      </Toolbar>
    </AppBar>
  );
}

export default Header;
