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
const STABLE = mkCoin("0x5AE888EC0Ee89Ec2a80D472F67da142E26f574c6", "usdc", 6);
const TESTNET_TOKENS = {
  weth: mkCoin("0x45939734642Ab71C4F751314FFcEfA12Efb233E0", "weth", 18),
  avax: mkCoin("0x52a28b8f4d156Dd8D17aAbb371554B4428BA043e", "wavax", 18),
  wbtc: mkCoin("0x76BD341032576b9eaFD9e20381f62362C4633515", "wbtc", 8),
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
    wbtc: "0xDaa168cA2965406499b43ADdc568a05169d83b54",
    weth: "0x9a56e437169bD008044C58E89d09306E72FC6294",
    avax: "0x328CC5346b5458d9885b8DED2dB6491A424a8b79",
  },
  tokens: TESTNET_TOKENS,
  tokensLookup: toLookup(TESTNET_TOKENS),
  stable: STABLE,
  facade: "0xAFFe6244EBB2B1CA700C3B18b9F697570802c40f",
  uiProvider: "0x8B1f868CC028380a44dcB98FdF6F3f2E18BEe94C",
  pools: {
    weth: {
      call: "0xb26D990d336444b2f18c09E35B7775E69a73951E",
      put: "0xbD89317b9DFFFd6FC33273Cf21A4d64891881CA4",
    },
    wbtc: {
      call: "0xA0D17Cb15Ce56c3059053afDBD08d203BdE2Ad83",
      put: "0xDa23712867660d83F00F6900EFA37ceb397EBA4f",
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
