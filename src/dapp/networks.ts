import { useWeb3React } from "@web3-react/core";

export type Network = "testnet" | "mainnet" | "invalid";

export const useNetworkType = (): Network | null => {
  const { chainId } = useWeb3React();
  if (chainId === 43113 || chainId === 31337) {
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
  if (chainId === 43113 || chainId === 31337) {
    return true;
  }
  if (chainId === 43114) {
    return true;
  }
  return false;
};

export const useOnTestnet = (): boolean => {
  const { chainId } = useWeb3React();
  if (chainId === 43113 || chainId === 31337) {
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

const mkCoin = (
  address: string,
  symbol: string,
  decimals: number,
  minOptionSize?: number,
  mintSize?: number,
  wrappedNative?: boolean
) => {
  return {
    address,
    symbol,
    decimals,
    minOptionSize,
    mintSize,
    wrappedNative
  };
};
type CoinType = ReturnType<typeof mkCoin>
const toLookup = (toks: any): Record<string, CoinType> => {
  const out: Record<string, CoinType> = {}
  Object.keys(toks).forEach(key => {
    const coin = toks[key] as CoinType
    out[coin.address] = coin
  })
  return out
}

const TESTNET_STABLE = mkCoin("0xc7F3c725b15C3def0392F1F7A8bfb74966B2C3E4", "mim", 6, 0, 50000);
const TESTNET_TOKENS = {
  wavax: mkCoin("0xff95bcF1B171785708B67EbdfB38AfabD5D4DED0", "wavax", 18, 10, 50, true),
  wbtc: mkCoin("0xD95E1B886A8b2d8f0BAD272a809C15625d6b04BF", "wbtc", 8, 0.1, 1),
  // weth: mkCoin("0x05917dbA34653d1b4336d31d75397169EC06e725", "weth", 18, 1, 10),
  stable: TESTNET_STABLE,
} as Record<string, CoinType>

const TESTNET = {
  priceOracles: {
    wbtc: "0x1480Fc83EB3872c97ea244CFa9218A95A37e035e",
    weth: "0xdB1C18136963b37A214EFd9588549712287D8dd8",
    wavax: "0x129d689096F3E0a97a050FEd56D0e6B988A99fB7",
  } as Record<string, string>,
  tokens: TESTNET_TOKENS,
  tokensLookup: toLookup(TESTNET_TOKENS),
  stable: TESTNET_STABLE,
  facade: "0x6682526Cae58595ed9857a6231f99fddFAF46055",
  uiProvider: "0xF63bea0BbAAb0808DC9f7B36976f38821B0DB69F",
  pools: {
    wavax: {
      call: "0xD3fc4f41D3224D4db3228abB0E248487D0d6574F",
      put: "0xD7d0d54fe0D0FfA03cCB788eE4aC08CaBA03aC15",
    },
    wbtc: {
      call: "0x815DFe5a14277dbD1f7ED871365830dF5CDa7E1E",
      put: "0xAc9533855ccdca9eE072d0dC96C23a1337f0d018",
    },
    weth: {
      call: "0x2cC63E9FAc1f832617C9a816272FC05C5B046639",
      put: "0xdf3088ae869a36263113dc6901FbB3CcFDb99A31",
    },
  },
  keepers: {
    expiration: "0xb711e43e3349c64bcAcDf7dbfd8d4A6919901F52",
    excercise: "0x36cc356128A08c755b14d3F0C532AA7838C73f44",
  }
};
const STABLE = mkCoin("0x130966628846BFd36ff31a822705796e8cb8C18D", "mim", 16, 0);
const STABLE_TOKENS = {
  weth: mkCoin("0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB", "weth", 18, 1),
  wavax: mkCoin("0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7", "wavax", 18, 10),
  wbtc: mkCoin("0x50b7545627a5162F82A992c33b87aDc75187B218", "wbtc", 8, 0.1),
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
    keepers: {
      expiration: "0x1c85638e118b37167e9298c2268758e058DdfDA0",
      excercise: "0x367761085BF3C12e5DA2Df99AC6E1a824612b8fb"
    }
  },
};

export type Token = typeof networks.testnet.stable;

export const useCurrentNetworkData = () => {
  const network = useNetworkType();
  if (network == null || network === "invalid") {
    return null;
  }

  return networks[network];
};
