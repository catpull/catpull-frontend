import * as React from "react";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Switch from '@mui/material/Switch';
import Slider from '@mui/material/Slider';
import InputAdornment from '@mui/material/InputAdornment';

import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import { useCurrentNetworkData } from "../dapp/networks";
import { Erc20Factory, FacadeFactory } from "../typechain";
import { floatToWei } from "./floatToWei";
import { formatTokenAmount } from "./formatTokenAmount";
import { formatPriceWithUnit } from "./formatPriceWithUnit";
import { useCurrentState } from "./OptionType";
import { CurrencySelector, StableCoinSelector } from "./CurrencySelector";

const StrikeField = () => {
  const s = useCurrentState();
  return  <FormControl variant="outlined">
      <OutlinedInput
      placeholder="0.0"
      inputProps={{
        style: { textAlign: 'right ' }
      } as any}
      startAdornment={<InputAdornment position="start">
        <StableCoinSelector />
      </InputAdornment>}
      value={s.state.strikeString}
      onChange={e => {
        const v = e.target.value;
        const f = parseFloat(v);
        if (isNaN(f)) {
          return;
        }
        const strike = floatToWei(f, { decimals: 8 } as any);
        s.update({
          strikeString: v,
          strike
        });
      }}
      inputMode="numeric" />
    <FormHelperText>
      Price: {s.state.assetPrice == null ? "*" : formatTokenAmount(s.state.assetPrice, 8, 2)}
    </FormHelperText>
  </FormControl>;
};
const StrikeSizes = () => {
  const s = useCurrentState();
  const price = s.state.assetPrice == null ? 0n : s.state.assetPrice;

  const options: React.ReactNode[] = [];
  const defaultColor = s.state.type === 'call' ? 'success' : 'error';
  for (let i = -2; i <= 2; i++) {
    const optionPrice = s.state.assetPrice == null ? '*' : price * (100n + BigInt(i) * 10n) / 100n;
    options.push(
      <Chip
        key={s.state.type + i}
        clickable={true}
        onClick={() => {
          if (optionPrice === '*') {
            return;
          }
          s.update({
            strike: optionPrice,
            strikeString: formatTokenAmount(optionPrice, 8, 2)
          });
        }}
        label={optionPrice === '*' ? optionPrice : formatTokenAmount(optionPrice, 8, 2)}
        color={optionPrice === s.state.strike ? defaultColor : "default"} /> as any
    );
  }

  return <Stack direction="row" justifyContent="space-around" spacing={1}>
    {options}
  </Stack>;
};
const StrikeOptionType = () => {
  const s = useCurrentState();
  return <Stack direction="row" spacing={1} alignItems="center">
    <Typography color="success">Call</Typography>
    <Switch onChange={() => s.update({ type: s.state.type === 'put' ? 'call' : 'put' })} checked={s.state.type === 'put'} color="error" />
    <Typography color="error">Put</Typography>
  </Stack>;
};
const SEC_IN_A_DAY = 24n * 60n * 60n;
const SubmitButton = () => {
  const s = useCurrentState();
  const ctx = useWeb3React<Web3Provider>();
  const data = useCurrentNetworkData();
  const facade = data?.facade;
  const paymentToken = data?.stable;
  const tokenInPool = data?.tokens[s.state.token];
  const availableBalance = s.state.tokenBalances[paymentToken?.symbol ?? "weth"] || 0n;
  const pool = data?.pools[s.state.token][s.state.type];
  const amount = s.state.amount;
  const strike = s.state.strike;
  const expiry = s.state.expiry;
  const premium = s.state.optionPremium ?? 0n;
  const [submitting, setSutmitting] = React.useState(false);

  const submit = React.useCallback(async () => {

    if (pool == null || facade == null || paymentToken == null || tokenInPool == null) {
      return;
    }
    if (ctx.library == null) {
      return;
    }
    if (amount < 1) {
      return;
    }
    if (strike < 1) {
      return;
    }
    if (premium == null) {
      return;
    }
    setSutmitting(true);
    try {
      const signer = await ctx.library.getSigner();

      const facadeInst = FacadeFactory.connect(facade, signer);
      const paymentTokenInst = Erc20Factory.connect(paymentToken.address, signer);


      const scaledAmount = floatToWei(amount, tokenInPool);
      const path = s.state.type === 'put' ? [paymentToken.address] : [paymentToken.address, tokenInPool.address];
      await (await paymentTokenInst.approve(
        facadeInst.address,
        premium
      )).wait(1);
      await facadeInst.createOption(
        pool,
        expiry * SEC_IN_A_DAY,
        scaledAmount,
        strike,
        path,
        premium
      );
    } finally {
      setSutmitting(false);
    }


  }, [
    ctx.library,
    amount,
    tokenInPool,
    facade,
    strike,
    expiry,
    s.state.type,
    paymentToken,
    pool,
    premium
  ]);

  if (submitting) {
    return <Button variant="outlined" disabled={true} color={s.state.type === "call" ? "success" : "error"}>
      Pending please wait
    </Button>;
  }


  return <Button disabled={availableBalance < premium} onClick={submit} variant="outlined" color={s.state.type === "call" ? "success" : "error"}>
    Create {s.state.type}
  </Button>;
};
const AmountField = () => {
  const s = useCurrentState();
  const data = useCurrentNetworkData()
  const availableTokens = Object.keys(data.tokens).filter(i => i !== "stable")
  return <FormControl variant="outlined">
      <OutlinedInput
      placeholder="0"
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
      inputProps={{
        style: { textAlign: 'right ' }
      } as any}
      startAdornment={<InputAdornment position="start">
      <CurrencySelector value={s.state.token.slice(1)} options={availableTokens.map(e => e.slice(1))} onChange={token => s.update({token: "w" + token as any})} />
    </InputAdornment>} />
  </FormControl>;
};
const ExpirySlider = () => {
  const s = useCurrentState();

  return <Slider
    defaultValue={15}
    valueLabelDisplay="on"
    min={1}
    value={Number(s.state.expiry)}
    onChange={(_, v) => s.update({
      expiry: BigInt(v as number)
    })}
    max={30} />;
};
const Premium = () => {
  const ctx = useWeb3React<Web3Provider>();
  const s = useCurrentState();
  const data = useCurrentNetworkData();
  const facade = data?.facade;
  const paymentToken = data?.stable;
  const tokenInPool = data?.tokens[s.state.token];
  const availableBalance = s.state.tokenBalances[paymentToken?.symbol ?? "weth"] || 0n;
  const pool = data?.pools[s.state.token][s.state.type];
  const amount = s.state.amount;
  const strike = s.state.strike;
  const expiry = s.state.expiry;
  const running = React.useRef(false);
  React.useEffect(() => {
    if (pool == null) {
      return;
    }
    if (ctx.library == null) {
      return;
    }
    if (amount < 1) {
      return;
    }
    if (strike < 1) {
      return;
    }

    const run = async () => {
      if (tokenInPool == null || running.current || ctx.library == null || facade == null || paymentToken == null) {
        return;
      }
      running.current = true;
      const signer = await ctx.library.getSigner();

      const facadeInst = FacadeFactory.connect(facade, signer);

      const amount = floatToWei(s.state.amount, tokenInPool);
      const path = s.state.type === 'put' ? [paymentToken.address] : [paymentToken.address, tokenInPool.address];

      try {
        const price = await facadeInst.callStatic.getOptionPrice(
          pool,
          expiry * SEC_IN_A_DAY,
          amount,
          s.state.strike,
          path
        );
        s.update({
          optionPremium: price.total.toBigInt()
        });
      } catch (e) {
        s.update({
          optionPremium: null
        });
      } finally {
        running.current = false;
      }
    };
    run();
  }, [
    running,
    ctx.library,
    amount,
    tokenInPool,
    facade,
    strike,
    expiry,
    s,
    paymentToken,
    pool
  ]);
  if (data == null || paymentToken == null) {
    return null;
  }
  return <FormControl variant="outlined">
      <OutlinedInput
      placeholder="0.0"
      readOnly={true}
      inputProps={{
        style: { textAlign: 'right ' }
      } as any}
      startAdornment={<StableCoinSelector />}
      value={s.state.optionPremium == null ? '*'
        : formatTokenAmount(s.state.optionPremium, paymentToken?.decimals ?? 2, 2)} />
    <FormHelperText>
      Available balance: {formatPriceWithUnit(availableBalance, paymentToken, 2)}
    </FormHelperText>
  </FormControl>;
};
export const UIBuy = () => {
  return <Container maxWidth="sm">
    <Box
      component="form"
      noValidate
    >
      <Stack direction="column" spacing={4}>
        <Stack direction="column">
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography>Strike</Typography>
            <StrikeOptionType />
          </Stack>
          <StrikeField />
        </Stack>
        <StrikeSizes />
        <Stack direction="column">
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography>Option size</Typography>
          </Stack>
          <AmountField />
        </Stack>
        <Stack direction="column">
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography>Expiry</Typography>
          </Stack>
          <ExpirySlider />
        </Stack>
        <Stack direction="column">
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography>Premium</Typography>
          </Stack>
          <Premium />
        </Stack>
        <SubmitButton />
      </Stack>
    </Box>
  </Container>;
};
