import * as React from "react";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Input from "@mui/material/Input";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Switch from '@mui/material/Switch';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import Avatar from '@mui/material/Avatar';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useCurrentNetworkData, Token } from "../dapp/networks";
import { Erc20Factory, UiProviderFactory, UiProvider, HegicPutFactory } from "../typechain";
import { floatToWei } from "./floatToWei";
import { formatTokenAmount } from "./formatTokenAmount";
import { formatPriceWithUnit } from "./formatPriceWithUnit";
import { useCurrentState } from "./OptionType";
import { CurrencySelector } from "./CurrencySelector";

const AddToPoolButton = () => {
  const ctx = useWeb3React<Web3Provider>();
  const s = useCurrentState();
  const data = useCurrentNetworkData();
  const [addingLiquidty, setAddingLiquidty] = React.useState(false);
  const isPut = s.state.type === 'put';
  const tokenInPool = isPut ? data?.stable : data?.tokens[s.state.token] as Token;

  const addToPool = React.useCallback(async () => {
    if (ctx.library == null || ctx.account == null || tokenInPool == null || data == null) {
      return null;
    }
    setAddingLiquidty(true);
    const signer = await ctx.library.getSigner(
      ctx.account
    );
    const tokenErc = Erc20Factory.connect(tokenInPool.address, signer);
    const pool = HegicPutFactory.connect(data.pools[s.state.token][s.state.type], signer);

    const amount = floatToWei(s.state.amount, tokenInPool);
    const tx = await tokenErc.approve(
      pool.address,
      amount
    );

    await tx.wait(1);

    await pool.provideFrom(
      signer._address,
      amount,
      '0'
    );

    setAddingLiquidty(false);


  }, [s.state.type, ctx, data, s.state.amount, s.state.token, tokenInPool]);
  if (addingLiquidty) {
    return <Button variant="outlined" disabled={true} color={s.state.type === "call" ? "success" : "error"}>
      Pending please wait
    </Button>;
  }
  return <Button onClick={addToPool} variant="outlined" color={s.state.type === "call" ? "success" : "error"}>
    Provide liqudity to {s.state.token} {s.state.type} pool
  </Button>;
};

const AmountToAddField = () => {
  const s = useCurrentState();
  const isPut = s.state.type === 'put';
  const data = useCurrentNetworkData();
  if (data == null) {
    return null;
  }
  const availableTokens = Object.keys(data.tokens).filter(i => i !== "stable")
  const tokenInPool = isPut ? data.stable : data.tokens[s.state.token];
  const availableBalance = s.state.tokenBalances[tokenInPool.symbol] || 0n;

  return <Stack direction="column" spacing={1}>
    <FormControl variant="outlined">
      <OutlinedInput
        placeholder="0.0"
        value={s.state.amountString}
        onChange={e => {
          const n = parseFloat(e.target.value);
          if (isNaN(n)) {
            return;
          }

          s.update({
            amount: n,
            amountString: e.target.value
          });
        }}
        startAdornment={
          <InputAdornment position="start">
            <CurrencySelector value={s.state.token.slice(1)} options={availableTokens.map(e => e.slice(1))} onChange={token => s.update({token: "w" + token as any})} />
          </InputAdornment>
        }
        inputProps={{
          style: { textAlign: 'right ' }
        } as any}
      />
      <FormHelperText id="outlined-weight-helper-text">Available balance: {formatPriceWithUnit(availableBalance, tokenInPool, 2)}</FormHelperText>
    </FormControl>
  </Stack>;
};
const PoolType = () => {
  const s = useCurrentState();
  return <Stack direction="row" spacing={1} alignItems="center">
    <Typography>Call pool</Typography>
    <Switch onChange={() => s.update({ type: s.state.type === 'put' ? 'call' : 'put' })} checked={s.state.type === 'put'} color="error" />
    <Typography color="error">Put pool</Typography>
  </Stack>;
};
type TranchesPageData = Parameters<Parameters<ReturnType<UiProvider["tranchesViewData"]>["then"]>[0]>[0];
const PoolHoldings = () => {
  const s = useCurrentState();
  const [holdings, setHoldings] = React.useState<TranchesPageData>();
  const ctx = useWeb3React<Web3Provider>();
  // const [exercising, setExercising] = React.useState(false)
  const networkData = useCurrentNetworkData();
  const pool = networkData?.pools[s.state.token][s.state.type];
  const fetchState = React.useCallback(async () => {
    if (pool == null || ctx.account == null || ctx.library == null || networkData == null) {
      return;
    }
    const signer = await ctx.library.getSigner(
      ctx.account
    );
    const uiProvider = await UiProviderFactory.connect(networkData.uiProvider, signer);
    const pageData = await uiProvider.tranchesViewData(await signer.getAddress(), pool, 0);

    setHoldings(pageData);
  }, [ctx, pool, networkData]);
  React.useEffect(() => {
    const run = async () => {
      await fetchState();
    };
    run();

  }, [fetchState]);

  const rows: Array<TranchesPageData["tranchesPageEntries"][0]> = [];
  holdings?.tranchesPageEntries.forEach(row => {
    if (row.amount.isZero()) {
      return;
    }
    rows.push(row);
  });
  if (networkData == null) {
    return null;
  }

  return <Stack direction="column" spacing={1}>
    <Typography>
      Your current liquidity provision positions:
    </Typography>
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Staked for</TableCell>
            <TableCell align="right">PNL</TableCell>
            <TableCell align="right">State</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => {
            const daysStaked = (Date.now() - row.creationTimestamp.toNumber() * 1000) / (1000 * 60 * 60 * 24);
            const currency = networkData.tokensLookup[row.asset];

            return <TableRow key={row.trancheId.toString()}>
              <TableCell align="right">
                {formatTokenAmount(row.amount.toBigInt(), currency.decimals, Math.ceil(currency.decimals / 4))}
              </TableCell>
              <TableCell align="right">
                {row.state === 1 ? daysStaked.toFixed(2) + " days"
                  : "-"}
              </TableCell>
              <TableCell align="right">
                {formatTokenAmount(row.pnl.toBigInt(), currency.decimals, Math.ceil(currency.decimals / 4))}
              </TableCell>
              <TableCell align="right">
                {row.state === 0 ? <Chip size="small" label="Unknown" color="error" /> :
                  row.state === 1 ? <Button disabled={daysStaked < 30}>
                    Withdraw
                  </Button> :
                    <Chip size="small" label="Withdrawn" color="success" />}
              </TableCell>
            </TableRow>;
          })}
        </TableBody>
      </Table>
    </TableContainer>
  </Stack>;

};
export const UIPool = () => {
  return <Container maxWidth="sm">
    <Box
      component="form"
      noValidate
    >
      <Stack direction="column" spacing={4}>
        <Stack direction="column">
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography>Amount</Typography>
            <PoolType />
          </Stack>
          <AmountToAddField />
        </Stack>
        <AddToPoolButton />
        <PoolHoldings />
      </Stack>
    </Box>
  </Container>;
};
