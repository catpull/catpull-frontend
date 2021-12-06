import { useCurrentNetworkData } from "../dapp/networks";
import { Erc20Factory, FacadeFactory } from "../typechain";
import { CryptoTabs } from "./CryptoTabs";
import { CurrencySelector, StableCoinSelector } from "./CurrencySelector";
import { useCurrentState } from "./GlobalState";
import { OptionType } from "./OptionType";
import { floatToWei } from "./floatToWei";
import { formatPriceWithUnit } from "./formatPriceWithUnit";
import { formatTokenAmount } from "./formatTokenAmount";
import { Web3Provider } from "@ethersproject/providers";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Paper from "@mui/material/Paper";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useWeb3React } from "@web3-react/core";
import { useSnackbar } from "notistack";
import * as React from "react";

const StrikeField = () => {
  const s = useCurrentState();
  const price = s.state.assetPrice;
  let strikeTooLow = false;
  let strikeTooHigh = false;
  if (s.state.strike != null && price != null) {
    const strike = BigInt(s.state.strike);
    strikeTooLow = strike < price - price / 5n;
    strikeTooHigh = strike > price + price / 5n;
  }
  const error = s.state.strike == null || strikeTooLow || strikeTooHigh;

  return (
    <FormControl variant="outlined">
      <InputLabel>Strike</InputLabel>
      <OutlinedInput
        label="strike"
        placeholder="0.0"
        inputProps={
          {
            style: { textAlign: "right " },
          } as any
        }
        startAdornment={
          <InputAdornment position="start">
            <StableCoinSelector />
          </InputAdornment>
        }
        value={s.state.strikeString}
        onChange={e => {
          const v = e.target.value;
          const f = parseFloat(v);
          if (isNaN(f)) {
            s.update({
              strike: null,
              strikeString: v,
            });
            return;
          }
          const strike = floatToWei(f, { decimals: 8 } as any);
          s.update({
            strike,
            strikeString: v,
          });
        }}
        error={error}
        inputMode="numeric"
      />
      {!(strikeTooLow || strikeTooHigh) && (
        <FormHelperText>
          {s.state.assetPrice == null ? "*" : formatTokenAmount(s.state.assetPrice, 8, 2)} MIM / {s.state.token.slice(1).toUpperCase()}
        </FormHelperText>
      )}
      {(strikeTooLow || strikeTooHigh) && <FormHelperText color="error">Strike must be within 20% of price</FormHelperText>}
    </FormControl>
  );
};
const StrikeSizes = () => {
  const s = useCurrentState();
  const price = s.state.assetPrice == null ? 0n : s.state.assetPrice;

  const options: React.ReactNode[] = [];
  const defaultColor = s.state.type === "call" ? "success" : "error";
  for (let i = -2; i <= 2; i++) {
    const optionPrice = s.state.assetPrice == null ? "*" : (price * (100n + BigInt(i) * 10n)) / 100n;
    options.push(
      (
        <Chip
          key={s.state.type + i}
          clickable={true}
          onClick={() => {
            if (optionPrice === "*") {
              return;
            }
            s.update({
              strike: optionPrice,
              strikeString: formatTokenAmount(optionPrice, 8, 2),
            });
          }}
          label={optionPrice === "*" ? optionPrice : formatTokenAmount(optionPrice, 8, 2)}
          color={optionPrice === s.state.strike ? defaultColor : "default"}
        />
      ) as any,
    );
  }

  return (
    <Stack sx={{ marginTop: 2 }} direction="row" justifyContent="space-around" spacing={1}>
      {options}
    </Stack>
  );
};

const SEC_IN_A_DAY = 24n * 60n * 60n;
const SubmitButton = () => {
  const notistack = useSnackbar();
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

  const [isApproved, setIsApproved] = React.useState(false);
  const [isApproving, setIsApproving] = React.useState(false);

  React.useEffect(() => {
    if (facade == null || paymentToken == null) {
      return;
    }
    const run = async () => {
      const signer = await ctx.library.getSigner();
      const paymentTokenInst = Erc20Factory.connect(paymentToken.address, signer);
      const currentAllowance = await paymentTokenInst.allowance(await signer.getAddress(), facade);
      if (currentAllowance.lt("11579208923731619542357098500868790785326998466564056403945758400791312963")) {
        setIsApproved(false);
      } else {
        setIsApproved(true);
      }
    };

    run();
  }, [ctx, paymentToken, facade]);

  const approve = React.useCallback(async () => {
    if (facade == null || paymentToken == null) {
      return;
    }
    notistack.enqueueSnackbar("Approving MIM");
    setIsApproving(true);
    try {
      const signer = await ctx.library.getSigner();

      const paymentTokenInst = Erc20Factory.connect(paymentToken.address, signer);
      await (await paymentTokenInst.approve(facade, "1157920892373161954235709850086879078532699846656405640394575840079131296399")).wait(1);
      notistack.enqueueSnackbar("Approval complete");
      setIsApproved(true);
    } catch (e) {
      notistack.enqueueSnackbar("Approval failed");
    } finally {
      setIsApproving(false);
    }
  }, [ctx, paymentToken, facade, notistack]);

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
      const path = s.state.type === "put" ? [paymentToken.address] : [paymentToken.address, tokenInPool.address];
      const currentAllowance = await paymentTokenInst.allowance(await signer.getAddress(), facade);

      if (currentAllowance.lt(scaledAmount)) {
        await (await paymentTokenInst.approve(facadeInst.address, "1157920892373161954235709850086879078532699846656405640394575840079131296399")).wait(1);
      }
      const r = await facadeInst.createOption(pool, expiry * SEC_IN_A_DAY, scaledAmount, strike, path, premium);
      notistack.enqueueSnackbar("Creating option");
      await r.wait(1);
      notistack.enqueueSnackbar("Option created");
      s.refreshBalances();
    } catch (e) {
      notistack.enqueueSnackbar("Failed to create option");
    } finally {
      setSutmitting(false);
    }
  }, [pool, facade, paymentToken, tokenInPool, ctx.library, amount, strike, premium, s, expiry, notistack]);

  if (!isApproved) {
    return (
      <Button disabled={isApproving} onClick={approve} variant="contained" color="primary">
        Approve {data.stable.symbol.toUpperCase()}
      </Button>
    );
  }

  if (submitting) {
    return (
      <Button variant="contained" disabled={true} color={s.state.type === "call" ? "success" : "error"}>
        Pending please wait
      </Button>
    );
  }

  return (
    <Button
      disabled={tokenInPool.minOptionSize > s.state.amount || s.state.optionPremium == null || strike == null || amount == null || availableBalance < premium}
      onClick={submit}
      variant="contained"
      color={s.state.type === "call" ? "success" : "error"}
    >
      Create {s.state.type}
    </Button>
  );
};
const AmountField = () => {
  const s = useCurrentState();
  const data = useCurrentNetworkData();
  const availableTokens = Object.keys(data.tokens).filter(i => i !== "stable");
  const tokenInPool = data?.tokens[s.state.token];

  return (
    <FormControl variant="outlined">
      <InputLabel>Option size</InputLabel>
      <OutlinedInput
        label="Option size"
        placeholder="0"
        value={s.state.amountString}
        onChange={e => {
          const n = parseFloat(e.target.value);
          if (isNaN(n)) {
            s.update({
              amountString: e.target.value,
              amount: null,
            });
            return;
          }

          s.update({
            amount: n,
            amountString: e.target.value,
          });
        }}
        inputProps={
          {
            style: { textAlign: "right " },
          } as any
        }
        error={tokenInPool.minOptionSize > s.state.amount}
        startAdornment={
          <InputAdornment position="start">
            <CurrencySelector value={s.state.token.slice(1)} options={availableTokens} onChange={token => s.update({ token: token })} />
          </InputAdornment>
        }
      />
      <FormHelperText color="error">{tokenInPool.minOptionSize > s.state.amount ? `Minimum size ${tokenInPool.minOptionSize}` : null}</FormHelperText>
    </FormControl>
  );
};
const ExpirySlider = () => {
  const s = useCurrentState();

  return (
    <Box>
      <Typography>Expiry</Typography>
      <Slider
        disabled={s.state.strike !== s.state.assetPrice}
        defaultValue={15}
        valueLabelDisplay="on"
        min={1}
        value={s.state.strike !== s.state.assetPrice ? 30 : Number(s.state.expiry)}
        onChange={(_, v) =>
          s.update({
            expiry: BigInt(v as number),
          })
        }
        max={30}
      />
      {s.state.strike !== s.state.assetPrice && <FormHelperText>You can only set an arbitrary expiry for ATM options.</FormHelperText>}
    </Box>
  );
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
  const update = s.update;
  const type = s.state.type;
  const expiry = s.state.expiry;
  const running = React.useRef(false);
  React.useEffect(() => {
    if (pool == null) {
      return;
    }
    if (ctx.library == null) {
      return;
    }
    if (!amount) {
      return;
    }
    if (!strike) {
      return;
    }

    const run = async () => {
      if (amount == null || tokenInPool == null || running.current || ctx.library == null || facade == null || paymentToken == null) {
        return;
      }
      running.current = true;
      const signer = await ctx.library.getSigner();

      const facadeInst = FacadeFactory.connect(facade, signer);

      const amount_ = floatToWei(amount, tokenInPool);
      const path = type === "put" ? [paymentToken.address] : [paymentToken.address, tokenInPool.address];

      try {
        const price = await facadeInst.callStatic.getOptionPrice(pool, expiry * SEC_IN_A_DAY, amount_, strike, path);
        update({
          optionPremium: price.total.toBigInt(),
        });
      } catch (e) {
        update({
          optionPremium: null,
        });
      } finally {
        running.current = false;
      }
    };
    run();
  }, [running, ctx.library, amount, tokenInPool, update, facade, expiry, type, strike, paymentToken, pool]);
  if (data == null || paymentToken == null) {
    return null;
  }
  return (
    <FormControl variant="outlined">
      <InputLabel>Premium</InputLabel>
      <OutlinedInput
        label="Premium"
        placeholder="0.0"
        readOnly={true}
        inputProps={
          {
            style: { textAlign: "right " },
          } as any
        }
        startAdornment={<StableCoinSelector />}
        value={s.state.optionPremium == null ? "*" : formatTokenAmount(s.state.optionPremium, paymentToken?.decimals ?? 2, 2)}
      />
      <FormHelperText>Available balance: {formatPriceWithUnit(availableBalance, paymentToken, 2)}</FormHelperText>
    </FormControl>
  );
};

export const UIBuy = () => {
  return (
    <Container maxWidth="sm">
      <Paper sx={{ paddingLeft: 3, paddingRight: 3, paddingBottom: 3 }} variant="outlined">
        <CryptoTabs />
        <Box component="form" noValidate>
          <Stack direction="column" spacing={4}>
            <OptionType />
            <Stack direction="column">
              <StrikeField />
              <StrikeSizes />
            </Stack>
            <AmountField />
            <ExpirySlider />
            <Premium />
            <SubmitButton />
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
};
