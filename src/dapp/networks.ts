import { useWeb3React } from "@web3-react/core";

export type Network = "testnet" | "mainnet" | "invalid";

export const useNetworkType = (): Network | null => {
  const { chainId } = useWeb3React();
  if (chainId === 43113) {
    return "testnet";
  }
  if (chainId === 43114) {
    return "mainnet";
  }

  if (chainId == null) {
    return null;
  }
  return "invalid";
};

export const useOnValidNetwork = (): boolean => {
  const { chainId } = useWeb3React();
  if (chainId === 43113) {
    return true;
  }
  if (chainId === 43114) {
    return true;
  }
  return false;
};

export const useOnTestnet = (): boolean => {
  const { chainId } = useWeb3React();
  if (chainId === 43113) {
    return true;
  }
  return false;
};
export const useOnMainnet = (): boolean => {
  const { chainId } = useWeb3React();
  if (chainId === 43114) {
    return true;
  }
  return false;
};

const mkCoin = (address: string, symbol: string, decimals: number) => {
  return {
    address,
    symbol,
    decimals,
  };
};
type CoinType = ReturnType<typeof mkCoin>
const STABLE = mkCoin("0x400573b29F7A9B38C3A3B06370b59878caF862F4", "mim", 6);
const TESTNET_TOKENS = {
  weth: mkCoin("0x24038B61Ffb0325AAdF02874C5A52975eD1791F2", "weth", 18),
  // wavax: mkCoin("0x866c797a3315466C8D8b9011D6424A5373de2F7d", "wavax", 18),
  wbtc: mkCoin("0x69F5d32d753b9F579413E50264969A755DD1649a", "wbtc", 8),
  stable: STABLE,
}

const toLookup = (toks: any): Record<string, CoinType> => {
  const out: Record<string, CoinType> = {}
  Object.keys(toks).forEach(key => {
    const coin = TESTNET_TOKENS[key] as CoinType
    out[coin.address] = coin
  })
  return out
}
const TESTNET = {
  priceOracles: {
    wbtc: "0x69150180854E3209edF55afD25702C905F89aC6d",
    weth: "0x6712978f663cF7D7596913161C8748e97be8c8eE",
    wavax: "0x8CcF960E748589f10AEc2985E53530eD07fEBeCd",
  },
  tokens: TESTNET_TOKENS,
  tokensLookup: toLookup(TESTNET_TOKENS),
  stable: STABLE,
  facade: "0xBC6Fc799b54263e7f386aae61a192B39e8A52b5C",
  uiProvider: "0x8AF0a97E02dD73537a8dCe777d53AEe5BBe84737",
  pools: {
    weth: {
      call: "0xaD5fdE22532a184bcdA69a842396c63dB02E5B49",
      put: "0xaD5fdE22532a184bcdA69a842396c63dB02E5B49",
    },
    wbtc: {
      call: "0xF63120c606E68e38e2f9f6B728ca36093a2AD7bD",
      put: "0xb72C90e40F471AF62fe321479be8eacbb0C7C35B",
    },
  },
};

export const networks = {
  testnet: TESTNET,
  mainnet: TESTNET,
};

export type Token = typeof networks.testnet.stable;

export const useCurrentNetworkData = () => {
  const network = useNetworkType();
  if (network == null || network === "invalid") {
    return null;
  }

  return networks[network];
};
