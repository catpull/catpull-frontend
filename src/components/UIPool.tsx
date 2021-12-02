import { useCurrentNetworkData, Token } from "../dapp/networks";
import { Erc20Factory, HegicPutFactory } from "../typechain";
import { CryptoTabs } from "./CryptoTabs";
import { CurrencySelector } from "./CurrencySelector";
import { useCurrentState } from "./GlobalState";
import { OptionType } from "./OptionType";
import { floatToWei } from "./floatToWei";
import { formatPriceWithUnit } from "./formatPriceWithUnit";
import { Web3Provider } from "@ethersproject/providers";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { useWeb3React } from "@web3-react/core";
import { useSnackbar } from "notistack";
import * as React from "react";

const AddToPoolButton = () => {
  const noti = useSnackbar();
  const ctx = useWeb3React<Web3Provider>();
  const s = useCurrentState();
  const data = useCurrentNetworkData();
  const [addingLiquidty, setAddingLiquidty] = React.useState(false);
  const isPut = s.state.type === "put";
  const [isApproved, setIsApproved] = React.useState(false);
  const [isApproving, setIsApproving] = React.useState(false);
  const pool = data?.pools[s.state.token][s.state.type] as string | undefined;
  const tokenInPool = isPut ? data?.stable : (data?.tokens[s.state.token] as Token);

  React.useEffect(() => {
    if (pool == null || tokenInPool == null) {
      return;
    }
    const run = async () => {
      const signer = await ctx.library.getSigner();
      const erc20Inst = Erc20Factory.connect(tokenInPool.address, signer);
      const currentAllowance = await erc20Inst.allowance(await signer.getAddress(), pool);
      if (currentAllowance.lt("11579208923731619542357098500868790785326998466564056403945758400791312963")) {
        setIsApproved(false);
      } else {
        setIsApproved(true);
      }
    };

    run();
  }, [ctx, tokenInPool, pool]);

  const approve = React.useCallback(async () => {
    if (pool == null || tokenInPool == null) {
      return;
    }
    setIsApproving(true);
    try {
      const signer = await ctx.library.getSigner();

      const ercInst = Erc20Factory.connect(tokenInPool.address, signer);
      noti.enqueueSnackbar("Approving");

      const r = await ercInst.approve(pool, "1157920892373161954235709850086879078532699846656405640394575840079131296399");
      await r.wait(1);
      noti.enqueueSnackbar("Approval complete");
      setIsApproved(true);
    } catch (e) {
      noti.enqueueSnackbar("Approval failed");
    } finally {
      setIsApproving(false);
    }
  }, [ctx, tokenInPool, pool, noti]);

  const addToPool = React.useCallback(async () => {
    if (ctx.library == null || ctx.account == null || tokenInPool == null || data == null) {
      return null;
    }
    setAddingLiquidty(true);
    const signer = await ctx.library.getSigner(ctx.account);
    const tokenErc = Erc20Factory.connect(tokenInPool.address, signer);
    const poolInst = HegicPutFactory.connect(pool, signer);

    const amount = floatToWei(s.state.amount, tokenInPool);
    const allowance = await tokenErc.allowance(ctx.account, pool);
    if (allowance.lt(amount)) {
      const tx = await tokenErc.approve(pool, amount);
      noti.enqueueSnackbar("Approving liquidity");
      await tx.wait(1);
    }

    const r = await poolInst.provideFrom(signer._address, amount, "0");
    noti.enqueueSnackbar("Providing liquidity");
    await r.wait(1);
    noti.enqueueSnackbar("Liquidity provided");

    setAddingLiquidty(false);
  }, [noti, ctx, data, s.state.amount, tokenInPool, pool]);

  if (!isApproved) {
    return (
      <Button disabled={isApproving} onClick={approve} variant="contained" color="primary">
        Approve {tokenInPool.symbol.toUpperCase()}
      </Button>
    );
  }
  if (addingLiquidty) {
    return (
      <Button variant="contained" disabled={true} color={s.state.type === "call" ? "success" : "error"}>
        Pending please wait
      </Button>
    );
  }
  return (
    <Button onClick={addToPool} variant="contained" color={s.state.type === "call" ? "success" : "error"}>
      Provide liqudity to {s.state.token} {s.state.type} pool
    </Button>
  );
};

const AmountToAddField = () => {
  const s = useCurrentState();
  const isPut = s.state.type === "put";
  const data = useCurrentNetworkData();
  if (data == null) {
    return null;
  }
  const availableTokens = Object.keys(data.tokens).filter(i => i !== "stable");
  const tokenInPool = isPut ? data.stable : data.tokens[s.state.token];
  const availableBalance = s.state.tokenBalances[tokenInPool.symbol] || 0n;

  return (
    <Stack direction="column" spacing={1}>
      <FormControl variant="outlined">
        <InputLabel>Amount</InputLabel>
        <OutlinedInput
          label="Amount"
          placeholder="0.0"
          value={s.state.amountString}
          onChange={e => {
            const n = parseFloat(e.target.value);
            if (isNaN(n)) {
              return;
            }

            s.update({
              amount: n,
              amountString: e.target.value,
            });
          }}
          startAdornment={
            <InputAdornment position="start">
              <CurrencySelector value={s.state.token.slice(1)} options={availableTokens.map(e => e.slice(1))} onChange={token => s.update({ token: ("w" + token) as any })} />
            </InputAdornment>
          }
          inputProps={
            {
              style: { textAlign: "right " },
            } as any
          }
        />
        <FormHelperText id="outlined-weight-helper-text">Available balance: {formatPriceWithUnit(availableBalance, tokenInPool, 2)}</FormHelperText>
      </FormControl>
    </Stack>
  );
};
export const UIPool = () => {
  return (
    <Container maxWidth="sm">
      <Paper sx={{ paddingLeft: 3, paddingRight: 3, paddingBottom: 3 }} variant="outlined">
        <CryptoTabs />
        <Box component="form" noValidate>
          <Stack direction="column" spacing={4}>
            <OptionType />
            <AmountToAddField />
            <AddToPoolButton />
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
};
