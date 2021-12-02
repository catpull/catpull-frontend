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
const TESTNET_STABLE = mkCoin("0x400573b29F7A9B38C3A3B06370b59878caF862F4", "mim", 6);
const TESTNET_TOKENS = {
  weth: mkCoin("0x24038B61Ffb0325AAdF02874C5A52975eD1791F2", "weth", 18),
  // wavax: mkCoin("0x866c797a3315466C8D8b9011D6424A5373de2F7d", "wavax", 18),
  wbtc: mkCoin("0x69F5d32d753b9F579413E50264969A755DD1649a", "wbtc", 8),
  stable: TESTNET_STABLE,
} as Record<string, CoinType>

const toLookup = (toks: any): Record<string, CoinType> => {
  const out: Record<string, CoinType> = {}
  Object.keys(toks).forEach(key => {
    const coin = toks[key] as CoinType
    out[coin.address] = coin
  })
  return out
}
const TESTNET = {
  priceOracles: {
    wbtc: "0x69150180854E3209edF55afD25702C905F89aC6d",
    weth: "0x6712978f663cF7D7596913161C8748e97be8c8eE",
    wavax: "0x8CcF960E748589f10AEc2985E53530eD07fEBeCd",
  } as Record<string, string>,
  tokens: TESTNET_TOKENS,
  tokensLookup: toLookup(TESTNET_TOKENS),
  stable: TESTNET_STABLE,
  facade: "0xBC6Fc799b54263e7f386aae61a192B39e8A52b5C",
  uiProvider: "0x8AF0a97E02dD73537a8dCe777d53AEe5BBe84737",
  pools: {
    weth: {
      call: "0xaD5fdE22532a184bcdA69a842396c63dB02E5B49",
      put: "0x91d20e837C9A9ACdB75cd9Cd113B3BBA3d4A2F03",
    },
    wbtc: {
      call: "0xF63120c606E68e38e2f9f6B728ca36093a2AD7bD",
      put: "0xb72C90e40F471AF62fe321479be8eacbb0C7C35B",
    },
  },
};

const STABLE = mkCoin("0x130966628846BFd36ff31a822705796e8cb8C18D", "mim", 16);
const STABLE_TOKENS = {
  weth: mkCoin("0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB", "weth", 18),
  wavax: mkCoin("0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7", "wavax", 18),
  wbtc: mkCoin("0x50b7545627a5162F82A992c33b87aDc75187B218", "wbtc", 8),
  stable: STABLE,
} as Record<string, CoinType>


export const networks = {
  testnet: TESTNET,
  mainnet: {
    priceOracles: {
      wbtc: "0x2779D32d5166BAaa2B2b658333bA7e6Ec0C65743",
      weth: "0x976B3D034E162d8bD72D6b9C989d545b839003b0",
      wavax: "0x0A77230d17318075983913bC2145DB16C7366156",
    },
    tokens: STABLE_TOKENS,
    tokensLookup: toLookup(STABLE_TOKENS),
    stable: STABLE,
    facade: "0xBC6Fc799b54263e7f386aae61a192B39e8A52b5C",
    uiProvider: "0x8AF0a97E02dD73537a8dCe777d53AEe5BBe84737",
    pools: {
      weth: {
        call: "0xaD5fdE22532a184bcdA69a842396c63dB02E5B49",
        put: "0x91d20e837C9A9ACdB75cd9Cd113B3BBA3d4A2F03",
      },
      wbtc: {
        call: "0xF63120c606E68e38e2f9f6B728ca36093a2AD7bD",
        put: "0xb72C90e40F471AF62fe321479be8eacbb0C7C35B",
      },
    },
  }
};

export type Token = typeof networks.testnet.stable;

export const useCurrentNetworkData = () => {
  const network = useNetworkType();
  if (network == null || network === "invalid") {
    return null;
  }

  return networks[network];
};
