import { useCurrentNetworkData, Token } from "../dapp/networks";
import { Erc20Factory, HegicPutFactory, FacadeFactory } from "../typechain";
import { CurrencySelector, StableCoinSelector } from "./CurrencySelector";
import { useCurrentState } from "./GlobalState";
import { PoolTabs } from "./PoolTabs";
import { floatToWei } from "./floatToWei";
import { formatPriceWithUnit } from "./formatPriceWithUnit";
import { Web3Provider } from "@ethersproject/providers";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import * as ethers from "ethers";
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
  const tokenInPool = isPut ? data?.stable : (data?.tokens[s.state.token] as Token);
  const [isApproved, setIsApproved] = React.useState(tokenInPool?.wrappedNative);
  const [isApproving, setIsApproving] = React.useState(false);
  const pool = data?.pools[s.state.token][s.state.type] as string | undefined;
  const facade = data?.facade;
  let availableBalance = s.state.tokenBalances[tokenInPool.symbol] || 0n;
  if (tokenInPool.wrappedNative) {
    availableBalance = s.state.nativeTokenBalance;
  }
  const amountScaled = ethers.utils.parseUnits(s.state.amount?.toString() ?? "0", tokenInPool.decimals).toBigInt();

  React.useEffect(() => {
    if (pool == null || tokenInPool == null || tokenInPool.wrappedNative) {
      return;
    }
    const run = async () => {
      const signer = await ctx.library.getSigner();
      const erc20Inst = Erc20Factory.connect(tokenInPool.address, signer);
      const currentAllowance = await erc20Inst.allowance(ctx.account, pool);
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

    try {
      const r = await poolInst.provideFrom(signer._address, amount, "0");
      noti.enqueueSnackbar("Providing liquidity");
      await r.wait(1);
      noti.enqueueSnackbar("Liquidity provided");
    } catch (e) {
      noti.enqueueSnackbar("Failed to provide liquidity");
    }

    setAddingLiquidty(false);
  }, [noti, ctx, data, s.state.amount, tokenInPool, pool]);

  const addToPoolNative = React.useCallback(async () => {
    if (ctx.library == null || ctx.account == null || tokenInPool == null || data == null) {
      return null;
    }
    setAddingLiquidty(true);
    const signer = await ctx.library.getSigner(ctx.account);
    const facadeInst = FacadeFactory.connect(facade, signer);

    const amount = floatToWei(s.state.amount, tokenInPool);

    try {
      const r = await facadeInst.provideEthToPool(pool, 0, {
        value: amount,
      });
      noti.enqueueSnackbar("Providing liquidity");
      await r.wait(1);
      noti.enqueueSnackbar("Liquidity provided");
    } catch (e) {
      noti.enqueueSnackbar("Failed to provide liquidity");
    }
    setAddingLiquidty(false);
  }, [noti, ctx, facade, data, s.state.amount, tokenInPool, pool]);

  if (!isApproved && tokenInPool?.wrappedNative !== true) {
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
    <Button
      disabled={s.state.amount == null || availableBalance < amountScaled}
      onClick={tokenInPool?.wrappedNative !== true ? addToPool : addToPoolNative}
      variant="contained"
      color={s.state.type === "call" ? "success" : "error"}
    >
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
  const tokenInPool = isPut ? data.stable : data.tokens[s.state.token];
  let availableBalance = s.state.tokenBalances[tokenInPool.symbol] || 0n;
  if (tokenInPool.wrappedNative) {
    availableBalance = s.state.nativeTokenBalance;
  }
  const amountScaled = ethers.utils.parseUnits(s.state.amount?.toString() ?? "0", tokenInPool.decimals).toBigInt();

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
              s.update({
                amount: null,
                amountString: e.target.value,
              });
              return;
            }

            s.update({
              amount: n,
              amountString: e.target.value,
            });
          }}
          startAdornment={
            <InputAdornment position="start">
              {isPut ? <StableCoinSelector /> : <CurrencySelector value={s.state.token.slice(1)} options={[tokenInPool.symbol]} onChange={token => s.update({ token })} />}
            </InputAdornment>
          }
          inputProps={
            {
              style: { textAlign: "right " },
            } as any
          }
          error={s.state.amount == null || availableBalance < amountScaled}
        />
        <FormHelperText id="outlined-weight-helper-text">Available balance: {formatPriceWithUnit(availableBalance, tokenInPool, 2)}</FormHelperText>
      </FormControl>
    </Stack>
  );
};

const Explanation = () => {
  const s = useCurrentState();

  return (
    <Typography sx={{ marginBottom: 3 }}>
      You are about to start selling {s.state.token.toUpperCase().slice(1)} {s.state.type.toUpperCase()} options. Please make sure you understand the risks associated with
      liquidity provision before continuing.
      <a target="_blank" href="https://catpull.gitbook.io/catpull/PC2J9CnV7lqexMtdCp7V/catpull/call-pool">
        You can find information on AMM options on our gitbook page
      </a>
    </Typography>
  );
};
export const UIPool = () => {
  return (
    <Container maxWidth="md">
      <Paper sx={{ paddingBottom: 3 }} variant="outlined">
        <PoolTabs />
        <Box sx={{ marginTop: 3, paddingLeft: 3, paddingRight: 3 }} component="form" noValidate>
          <Explanation />
          <Stack direction="column" spacing={4}>
            <AmountToAddField />
            <AddToPoolButton />
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
};
