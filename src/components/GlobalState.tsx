import { useCurrentNetworkData } from "../dapp/networks";
import { Erc20Factory } from "../typechain";
import { AggregatorV3InterfaceFactory } from "../typechain/AggregatorV3InterfaceFactory";
import { formatTokenAmount } from "./formatTokenAmount";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import * as React from "react";

export type OptionType = "call" | "put";
const initialState = {
  token: "weth" as string,
  type: "call" as OptionType,
  strike: 0n,
  strikeString: "0",
  amount: 0,
  amountString: "0",
  expiry: 7n,
  assetPrice: null as null | bigint,
  optionPremium: null as null | bigint,
  tokenBalances: {} as Record<string, bigint>,
};
type StateType = typeof initialState;
const StateProvider = React.createContext({
  state: initialState,
  refreshPrice: () => {},
  refreshOptionPrice: () => {},
  refreshBalances: () => {},
  update: (s: Partial<StateType>) => {},
});
export const useCurrentState = () => React.useContext(StateProvider);
export const GlobalState: React.FC = ({ children }) => {
  const networkData = useCurrentNetworkData();
  const ctx = useWeb3React<Web3Provider>();
  const [state, setState] = React.useState(initialState);
  const token = state.token;
  const refreshPrice = React.useCallback(async () => {
    if (ctx.account == null || ctx.library == null || networkData == null) {
      return;
    }
    const chainLink = AggregatorV3InterfaceFactory.connect(networkData.priceOracles[token], await ctx.library.getSigner(ctx.account!));
    const latestRound = await chainLink.callStatic.latestRoundData();
    const assetPrice = BigInt(latestRound.answer.toString());
    setState(s => {
      return {
        ...s,
        amount: 1,
        amountString: "1",
        strike: assetPrice,
        strikeString: formatTokenAmount(assetPrice, 8, 2),
        assetPrice: BigInt(latestRound.answer.toString()),
      };
    });
    return BigInt(latestRound.answer.toString());
  }, [token, ctx.account, networkData, ctx.library]);
  const refreshBalances = React.useCallback(async () => {
    if (networkData == null || ctx.account == null || ctx.library == null) {
      return;
    }
    const signer = await ctx.library.getSigner(ctx.account);
    const tokens = [networkData.stable];
    tokens.push(...Object.keys(networkData.tokens).map(k => (networkData.tokens as any)[k]));
    tokens.forEach(async tok => {
      const balance = await Erc20Factory.connect(tok.address, signer).balanceOf(ctx.account!);
      setState(s => ({
        ...s,
        tokenBalances: {
          ...s.tokenBalances,
          [tok.symbol]: balance.toBigInt(),
        },
      }));
    });
  }, [ctx.account, networkData, ctx.library]);

  React.useEffect(() => {
    refreshBalances();
  }, [refreshBalances]);

  const update = React.useCallback(u => {
    setState(s => ({ ...s, ...u }));
  }, []);

  React.useEffect(() => {
    refreshPrice();
  }, [refreshPrice]);

  const refreshOptionPrice = React.useCallback(async () => {}, []);
  return (
    <StateProvider.Provider
      value={{
        state,
        refreshPrice,
        refreshOptionPrice,
        update,
        refreshBalances,
      }}
    >
      {children}
    </StateProvider.Provider>
  );
};
