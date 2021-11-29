import * as React from "react"
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { AggregatorV3InterfaceFactory } from "../typechain/AggregatorV3InterfaceFactory"

import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import Chip from "@mui/material/Chip"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import Input from "@mui/material/Input"
import Typography from "@mui/material/Typography"
import Switch from '@mui/material/Switch';
import Slider from '@mui/material/Slider';
import InputAdornment from '@mui/material/InputAdornment';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { POLLING_INTERVAL } from "../dapp/connectors";
import { Header } from "./Header";
import { Controls, useNavigationContext, ControlsProvider } from "./Controls";
import { useCurrentNetworkData, Token } from "../dapp/networks"
import { Erc20Factory, FacadeFactory, OptionsManagerFactory, UiProviderFactory, UiProvider, HegicCallFactory, HegicPutFactory } from "../typechain";

const decimalToScale = (decimals: number): bigint => BigInt('1' + '0'.repeat(decimals))
const formatTokenAmount = (amount: bigint, decimals: number, outDigits: number = 2) => {
  const sign = amount < 0n ? "-" : ""
  amount = amount < 0n ? amount * -1n : amount
  const scale = decimalToScale(decimals)
  const integer = amount / scale
  const fractional = amount - integer * scale
  const digits = fractional.toString().padStart(decimals, '0').slice(0, outDigits)
  return sign + integer.toString() + '.' + digits
}

const floatToWei = (amount: number, token: Token) => {
  const[integer, fractional=""] = Math.abs(amount).toFixed(token.decimals).split(".")

  return BigInt(Math.sign(amount)) * BigInt(integer+fractional)
}

const formatPriceWithUnit = (price: bigint, token: Token, outDigits: number) => {
  return formatTokenAmount(price, token.decimals, outDigits) + " " + token.symbol.toUpperCase()
}
export function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = POLLING_INTERVAL;
  return library;
}
type OptionType = 'call' | 'put'

const initialState = {
  token: "weth",
  type: 'call' as OptionType,
  strike: 0n,
  strikeString: "0",
  amount: 0,
  amountString: "0",
  expiry: 7n,
  assetPrice: null as null | bigint,
  optionPremium: null as null | bigint,
  tokenBalances: {} as Record<string, bigint>
}

type StateType = typeof initialState

const StateProvider = React.createContext({
  state: initialState,
  refreshPrice: () => {},
  refreshOptionPrice: () => {},
  update: (s: Partial<StateType>) => {}
})
const useCurrentState = () => React.useContext(StateProvider)
const GlobalState: React.FC = ({children}) => {
  const networkData =  useCurrentNetworkData()
  const ctx = useWeb3React<Web3Provider>();
  const [state, setState] = React.useState(initialState);
  const refreshPrice = React.useCallback(async () => {
    if (networkData == null) {
      return
    }
    const chainLink = AggregatorV3InterfaceFactory.connect(networkData.priceOracles[state.token], await ctx.library.getSigner(
      ctx.account
    ))
    const latestRound = await chainLink.latestRoundData()
    setState(s => {
      return {
        ...s,
        assetPrice: BigInt(latestRound.answer.toString())
      }
    })
    return BigInt(latestRound.answer.toString())
  }, [state.token, ctx.account, networkData, ctx.library])
  React.useEffect(() => {
    const run = async () => {
      if (ctx.library == null) {
        return
      }
      const signer = await ctx.library.getSigner(
        ctx.account
      )
      const tokens = [networkData.stable]
      tokens.push(...Object.keys(networkData.tokens).map(k => networkData.tokens[k]))
      tokens.forEach(async tok => {
        const balance = await Erc20Factory.connect(tok.address, signer).balanceOf(ctx.account)
        setState(s => ({
          ...s,
          tokenBalances: {
            ...s.tokenBalances,
            [tok.symbol]: balance.toBigInt()
          }
        }))
      })
    }
    run()
    
  }, [ctx.account, networkData, ctx.library])
  React.useEffect(() => {
    refreshPrice().then(assetPrice => {
      if (assetPrice == null) {
        return
      }
      
      setState(s => {
        const tok = networkData.stable
        return {
          ...s,
          amount: 1,
          amountString: "1",
          strike: assetPrice,
          strikeString: formatTokenAmount(assetPrice, 8, 2)
        }
      })
    })
  }, [refreshPrice, networkData])
  const update = React.useCallback((u) => {
    setState(s => ({...s, ...u}))
  }, [refreshPrice])
  const refreshOptionPrice = React.useCallback(async () => {}, [])
  return <StateProvider.Provider value={{
    state,
    refreshPrice,
    refreshOptionPrice,
    update
  }}>
    {children}
  </StateProvider.Provider>
}

const StrikeField = () => {
  const data = useCurrentNetworkData()
  const paymentToken = data?.stable
  const s = useCurrentState()
  return <Stack direction="column" spacing={1}>
    <Input
      placeholder="0.0"
      inputProps={{
        style: { textAlign: 'right '}
      } as any}
      startAdornment={<InputAdornment position="start">{paymentToken?.symbol?.toUpperCase()}</InputAdornment>}
      value={s.state.strikeString}
      onChange={e => {
        const v = e.target.value
        const f = parseFloat(v)
        if (isNaN(f)) {
          return
        }
        const strike = floatToWei(f, {decimals: 8} as any)
        s.update({
          strikeString: v,
          strike
        })
      }}
      inputMode="numeric"
    />
    <Typography align="right">
      Price: {s.state.assetPrice == null ? "*" : formatTokenAmount(s.state.assetPrice, 8, 2)}
    </Typography>
  </Stack>
}

const StrikeSizes = () => {
  const s = useCurrentState()
  const price = s.state.assetPrice == null ? 0n : s.state.assetPrice

  const options: React.ReactNode[] = []
  const defaultColor = s.state.type === 'call' ? 'success' : 'error'
  for (let i = -2 ; i <= 2 ; i ++) {
    const optionPrice = s.state.assetPrice == null ? '*' : price * (100n + BigInt(i) * 10n) / 100n
    options.push(
      <Chip
        key={s.state.type + i}
        clickable={true}
        onClick={() => {
          if (optionPrice === '*') {
            return
          }
          s.update({
            strike: optionPrice,
            strikeString: formatTokenAmount(optionPrice, 8, 2)
          })
        }}
        label={optionPrice === '*' ? optionPrice : formatTokenAmount(optionPrice, 8, 2)}
        color={optionPrice === s.state.strike ? defaultColor : "default"}
      /> as any
    )
  }

  return <Stack direction="row" justifyContent="space-around" spacing={1}>
    {options}
  </Stack>
}

const OptionType = () => {
  const s = useCurrentState()
  return <Stack direction="row" spacing={1} alignItems="center">
    <Typography color="success">Call</Typography>
    <Switch onChange={() => s.update({type: s.state.type === 'put' ? 'call' : 'put'})} checked={s.state.type === 'put'} color="error" />
    <Typography color="error">Put</Typography>
  </Stack>
}

const SEC_IN_A_DAY = 24n * 60n * 60n
const SubmitButton = () => {
  const s = useCurrentState()
  const ctx = useWeb3React<Web3Provider>()
  const data = useCurrentNetworkData()
  const facade = data?.facade
  const paymentToken = data?.stable
  const tokenInPool = data?.tokens[s.state.token]
  const availableBalance = s.state.tokenBalances[paymentToken?.symbol] || 0n
  const pool = data?.pools[s.state.token][s.state.type];
  const amount = s.state.amount
  const strike = s.state.strike
  const expiry = s.state.expiry
  const premium = s.state.optionPremium
  const [submitting, setSutmitting] = React.useState(false)

  const submit = React.useCallback(async () => {
    
    if (pool == null) {
      return
    }
    if (ctx.library == null) {
      return
    }
    if (amount < 1) {
      return
    }
    if (strike < 1) {
      return
    }
    if (premium == null) {
      return
    }
    setSutmitting(true)
    try {
      const signer = await ctx.library.getSigner()

      const facadeInst = FacadeFactory.connect(facade, signer)
      const paymentTokenInst = Erc20Factory.connect(paymentToken.address, signer)


      const scaledAmount = floatToWei(amount, tokenInPool)
      const path = s.state.type === 'put' ? [paymentToken.address] : [paymentToken.address, tokenInPool.address]
      await (await paymentTokenInst.approve(
        facadeInst.address,
        premium
      )).wait(1)
      await facadeInst.createOption(
        pool,
        expiry * SEC_IN_A_DAY,
        scaledAmount,
        strike,
        path,
        premium
      )
    } finally {
      setSutmitting(false)
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
  ])

  if (submitting) {
    return <Button variant="outlined" disabled={true} color={s.state.type === "call" ? "success" : "error"}>
      Pending please wait
    </Button>
  }


  return <Button disabled={availableBalance < premium} onClick={submit} variant="outlined" color={s.state.type === "call" ? "success" : "error"}>
    Create {s.state.type}
  </Button>
}

const AmountField = () => {
  const s = useCurrentState()
  return <Input
    placeholder="0"
    value={s.state.amountString}
    onChange={e => {
      const n = parseFloat(e.target.value)
      if (isNaN(n)) {
        return
      }
      
      s.update({
        amount: n,
        amountString: e.target.value
      })
    }}
    inputProps={{
      style: { textAlign: 'right '}
    } as any}
    startAdornment={<InputAdornment position="start">ETH</InputAdornment>}
  />
}

const ExpirySlider = () => {
  const s = useCurrentState()

  return <Slider
    defaultValue={15}
    valueLabelDisplay="on"
    min={1}
    value={Number(s.state.expiry)}
    onChange={(_, v) => s.update({
      expiry: BigInt(v as number)
    })}
    max={30}
  />
}

const Premium = () => {
  const ctx = useWeb3React<Web3Provider>()
  const s = useCurrentState()
  const data = useCurrentNetworkData()
  const facade = data?.facade
  const paymentToken = data?.stable
  const tokenInPool = data?.tokens[s.state.token]
  const availableBalance = s.state.tokenBalances[paymentToken?.symbol] || 0n
  const pool = data?.pools[s.state.token][s.state.type];
  const amount = s.state.amount
  const strike = s.state.strike
  const expiry = s.state.expiry
  const running = React.useRef(false)
  React.useEffect(() => {
    if (pool == null) {
      return
    }
    if (ctx.library == null) {
      return
    }
    if (amount < 1) {
      return
    }
    if (strike < 1) {
      return
    }

    const run = async () => {
      if (running.current) {
        return
      }
      running.current = true
      const signer = await ctx.library.getSigner()

      const facadeInst = FacadeFactory.connect(facade, signer)

      const amount = floatToWei(s.state.amount, tokenInPool)
      const path = s.state.type === 'put' ? [paymentToken.address] : [paymentToken.address, tokenInPool.address]

      try {
        const price = await facadeInst.callStatic.getOptionPrice(
          pool,
          expiry * SEC_IN_A_DAY,
          amount,
          s.state.strike,
          path
        )
        s.update({
          optionPremium: price.total.toBigInt()
        })
      } catch(e) {
        s.update({
          optionPremium: null
        })
      } finally {
        running.current = false
      }
    }
    run()
  }, [
    running,
    ctx.library,
    amount,
    tokenInPool,
    facade,
    strike,
    expiry,
    s.state.type,
    paymentToken,
    pool
  ])
  if (data == null) {
    return null
  }
  return <Stack direction="column" spacing={1}>
    <Input
      placeholder="0.0"
      readOnly={true}
      inputProps={{
        style: { textAlign: 'right '}
      } as any}
      startAdornment={<InputAdornment position="start">{paymentToken.symbol.toUpperCase()}</InputAdornment>}
      value={
        s.state.optionPremium == null ? '*' 
        : formatTokenAmount(s.state.optionPremium, paymentToken.decimals, 2)
      }
    />
    <Typography align="right">
      Available balance: {formatPriceWithUnit(availableBalance, paymentToken, 2)}
    </Typography>
  </Stack>
}

type OptionsPageData = Parameters<Parameters<ReturnType<UiProvider["optionsViewData"]>["then"]>[0]>[0]
const UIHoldings = () => {
  const [holdings, setHoldings] = React.useState<OptionsPageData>()
  const ctx = useWeb3React<Web3Provider>()
  const [exercising, setExercising] = React.useState(false)
  const networkData = useCurrentNetworkData()
  const fetchState = React.useCallback(async () => {
    const signer = await ctx.library.getSigner(
      ctx.account
    )
    const uiProvider = await UiProviderFactory.connect(networkData.uiProvider, signer)
    const optionsPage = await uiProvider.optionsViewData(await signer.getAddress(), 0)

    setHoldings(optionsPage)
  }, [ctx, networkData])
  React.useEffect(() => {
    const run = async () => {
      await fetchState()
    }
    run()

  }, [fetchState])

  const rows: Array<OptionsPageData["optionPageEntries"][0]> = []
  holdings?.optionPageEntries.forEach(row => {
    if (row.amount.isZero()) {
      return
    }
    rows.push(row)
  })
  return <Container maxWidth="md">
    <Stack spacing={1}>
      <Typography>Options</Typography>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Type</TableCell>
              <TableCell align="right">Asset</TableCell>
              <TableCell align="right">Strike</TableCell>
              <TableCell align="right">Size</TableCell>
              <TableCell align="right">PNL</TableCell>
              <TableCell align="right">Expiry</TableCell>
              <TableCell align="right">State</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
            rows.map((row, i) => (
              <TableRow
                key={i}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="right">
                  {row.isCall ? <Chip label="CALL" color="success" size="small" /> : <Chip label="PUT" color="error" size="small" />}
                </TableCell>
                
                <TableCell align="right">
                  {networkData.tokensLookup[row.asset].symbol.toUpperCase()}
                </TableCell>
                <TableCell align="right">
                  {formatTokenAmount(row.strike.toBigInt(), 8, 2)}
                </TableCell>
                <TableCell align="right">
                  {formatTokenAmount(row.amount.toBigInt(), networkData.tokensLookup[row.asset].decimals, 2)}
                </TableCell>
                <TableCell align="right">
                  {formatTokenAmount(row.pnl.toBigInt(), 18, 2)}
                </TableCell>
                <TableCell align="right">
                  {row.state === 1 ? ((row.expiry.toNumber() * 1000 - Date.now()) / (1000 * 60 * 60 * 24)).toFixed(2) + " days"
                                   : "-"}
                </TableCell>
                <TableCell align="right">
                  {row.state === 0 ? <Chip size="small" label="Unknown" color="error" /> :
                   row.state === 1 ? <Button size="small" onClick={async () => {
                    setExercising(true)
                    try {
                      const signer = await ctx.library.getSigner(
                        ctx.account
                      )
                      const facadeInst = FacadeFactory.connect(networkData.facade, signer)

                      const optionsManagerInst = OptionsManagerFactory.connect(await facadeInst.optionsManager(), signer)

                      const optId = row.optionId.toNumber()
                      const poolAddr = await optionsManagerInst.tokenPool(optId)
                      const poolInst = HegicPutFactory.connect(poolAddr, signer)

                      await (await poolInst.exercise(optId)).wait(1)
                      await fetchState()
                      setExercising(true)
                    }finally {
                      setExercising(false)
                    }


                  }} disabled={exercising || row.pnl.isNegative() || Date.now()>row.expiry.toNumber() * 1000}>
                    Excerise
                  </Button> :
                   row.state === 2 ? <Chip size="small" label="Exercised" color="success" />
                                   : <Chip size="small" label="Expired" />
                  }
                </TableCell>
              </TableRow>
            ))
            }
          </TableBody>
        </Table>
      </TableContainer>
      <Typography>Total PNL {formatTokenAmount(holdings?.totalPNL.toBigInt() ?? 0n, 18, 2) + " " + networkData.stable.symbol}</Typography>
    </Stack>
  </Container>
}

const UIBuy = () => {
  return <Container maxWidth="sm">
      <Box
      component="form"
      noValidate
    >
      <Stack direction="column" spacing={4}>
        <Stack direction="column">
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography>Strike</Typography>
            <OptionType />
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
  </Container>
}


const AddToPoolButton = () => {
  const ctx = useWeb3React<Web3Provider>()
  const s = useCurrentState()
  const data = useCurrentNetworkData()
  const [addingLiquidty, setAddingLiquidty] = React.useState(false)
  const isPut = s.state.type === 'put'
  const tokenInPool = isPut ? data.stable : data.tokens[s.state.token] as Token

  const addToPool = React.useCallback(async () => {
    setAddingLiquidty(true)
    const signer = await ctx.library.getSigner(
      ctx.account
    )
    const tokenErc = Erc20Factory.connect(tokenInPool.address, signer)
    const pool = HegicPutFactory.connect(data.pools[s.state.token][s.state.type], signer)
    
    const amount = floatToWei(s.state.amount, tokenInPool)
    const tx = await tokenErc.approve(
      pool.address,
      amount
    )

    await tx.wait(1)

    await pool.provideFrom(
      signer._address,
      amount,
      '0'
    )

    setAddingLiquidty(false)


  }, [s.state.type, ctx, data, s.state.amount, tokenInPool])
  if (addingLiquidty) {
    return <Button variant="outlined" disabled={true} color={s.state.type === "call" ? "success" : "error"}>
      Pending please wait
    </Button>
  }
  return <Button onClick={addToPool} variant="outlined" color={s.state.type === "call" ? "success" : "error"}>
    Provide liqudity to {s.state.token} {s.state.type} pool
  </Button>
}

const AmountToAddField = () => {
  const s = useCurrentState()
  const isPut = s.state.type === 'put'
  const data = useCurrentNetworkData()
  const tokenInPool = isPut ? data.stable : data.tokens[s.state.token]
  const availableBalance = s.state.tokenBalances[tokenInPool.symbol] || 0n

  return <Stack direction="column" spacing={1}>
    <Input
      placeholder="0"
      value={s.state.amountString}
      onChange={e => {
        const n = parseFloat(e.target.value)
        if (isNaN(n)) {
          return
        }
        
        s.update({
          amount: n,
          amountString: e.target.value
        })
      }}
      inputProps={{
        style: { textAlign: 'right '}
      } as any}
      startAdornment={<InputAdornment position="start">{tokenInPool.symbol.toUpperCase()}</InputAdornment>}
    />
    <Typography align="right">
      Available balance: {formatPriceWithUnit(availableBalance, tokenInPool, 2)}
    </Typography>
  </Stack>
}
const PoolType = () => {
  const s = useCurrentState()
  return <Stack direction="row" spacing={1} alignItems="center">
    <Typography>Call pool</Typography>
    <Switch onChange={() => s.update({type: s.state.type === 'put' ? 'call' : 'put'})} checked={s.state.type === 'put'} color="error" />
    <Typography color="error">Put pool</Typography>
  </Stack>
}


type TranchesPageData = Parameters<Parameters<ReturnType<UiProvider["tranchesViewData"]>["then"]>[0]>[0]
const PoolHoldings = () => {
  const s = useCurrentState()
  const [holdings, setHoldings] = React.useState<TranchesPageData>()
  const ctx = useWeb3React<Web3Provider>()
  const [exercising, setExercising] = React.useState(false)
  const networkData = useCurrentNetworkData()
  const pool = networkData?.pools[s.state.token][s.state.type];
  const fetchState = React.useCallback(async () => {
    if (pool == null) {
      return
    }
    const signer = await ctx.library.getSigner(
      ctx.account
    )
    const uiProvider = await UiProviderFactory.connect(networkData.uiProvider, signer)
    const pageData = await uiProvider.tranchesViewData(await signer.getAddress(), pool, 0)

    setHoldings(pageData)
  }, [ctx, pool, networkData])
  React.useEffect(() => {
    const run = async () => {
      await fetchState()
    }
    run()

  }, [fetchState])

  const rows: Array<TranchesPageData["tranchesPageEntries"][0]> = []
  holdings?.tranchesPageEntries.forEach(row => {
    if (row.amount.isZero()) {
      return
    }
    rows.push(row)
  })
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
            {
              rows.map(row => {
                const daysStaked = (Date.now() - row.creationTimestamp.toNumber() * 1000) / (1000 * 60 * 60 * 24);
                const currency = networkData.tokensLookup[row.asset]

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
                  { row.state === 0 ? <Chip size="small" label="Unknown" color="error" /> :
                    row.state === 1 ? <Button disabled={daysStaked < 30}>
                                        Withdraw
                                      </Button> :
                                      <Chip size="small" label="Withdrawn" color="success" />
                }
                </TableCell>
              </TableRow>
              })
            }
          </TableBody>
        </Table>
      </TableContainer>
  </Stack>

}
const UIPool = () => {
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
  </Container>
}



const screens = {
  "buy": () => <UIBuy />,
  "holdings": () => <UIHoldings />,
  "pool": () => <UIPool />
}
const Navigation = () => {
  const nav = useNavigationContext()
  const ctx = useWeb3React<Web3Provider>()
  const Screen = screens[nav.page] || null
  if (Screen == null) {
    return null
  }
  if (ctx.chainId !== 43113) {
    return null
  }

  return <Screen />
}

const ControlsWrapper = () => {
  const s = useCurrentState()
  return <Controls onUpdate={() => s.refreshPrice()} />
}

export default function Demo() {
  return (
    <ControlsProvider>
      <GlobalState>
        <Header />
        <Container sx={{ paddingTop: 2 }} maxWidth="sm">
          <ControlsWrapper />
        </Container>
        
          <Navigation />
        
      </GlobalState>
    </ControlsProvider>
  );
}
