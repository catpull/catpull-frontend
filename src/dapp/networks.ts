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
const TESTNET_STABLE = mkCoin("0x61Bd2F9df56528749091119101A6ab7476214359", "mim", 6, 0, 50000);
const TESTNET_TOKENS = {
  wavax: mkCoin("0xE360C90E03982944208fB3c0027661040961064E", "wavax", 18, 10, 50, true),
  wbtc: mkCoin("0x6f7aC9E0cbE2cA9780aDAf84e817e3BE010FfE59", "wbtc", 8, 0.1, 1),
  // weth: mkCoin("0x53d33c6DcfaEaafD6B78BE68DBC2D8eedd344a31", "weth", 18, 1, 10),
  stable: TESTNET_STABLE,
} as Record<string, CoinType>

const TESTNET = {
  priceOracles: {
    wbtc: "0xDc0BA47763045E6FD69Dd712Ca29BeeD7Aa1320d",
    // weth: "0x7b8ed2BA15a438a927A20c34dA0A998C4a7f0ce3",
    wavax: "0x00f61b820E96f118939a38Bd081A8D2bD6c804a3",
  } as Record<string, string>,
  tokens: TESTNET_TOKENS,
  tokensLookup: toLookup(TESTNET_TOKENS),
  stable: TESTNET_STABLE,
  facade: "0xCb99F5e3F7513BC5418152B190852BB3B267e0D2",
  uiProvider: "0xc897008A40f30A82179e4C9f8b3880d0425e89aD",
  pools: {
    wavax: {
      call: "0x4420c07a858d5d1eAcEef3E58eDCaE26E5746f12",
      put: "0x68690Be96174c9FB0C4366Bf71f745f43Cf964F5",
    },
    wbtc: {
      call: "0x27B56ce12206f5325Bf6Be1AF7152B0DF1b490a9",
      put: "0x428e083Ad5B621ec7Ea8867D9bea7A0c66425770",
    },
    weth: {
      call: "0xec473f84549605548dd7258804424c73Fca223cA",
      put: "0xC194Cbef1281843d8920Bd7B7d8646CE1043f948",
    },
  },
  keepers: {
    expiration: "0xd86CF87E80C7092f25dFcA31cB56b0cb594fDB99",
    excercise: "0xaf72D9a3D7e79438CF65c9514941158320B76Cb0",
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
