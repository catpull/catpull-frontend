import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

export const POLLING_INTERVAL = 12000;
export const injected = new InjectedConnector({
  supportedChainIds: [43113, 43114, 31337],
});

const RPC_URLS: { [chainId: number]: string } = {
  43113: "https://api.avax-test.network/ext/bc/C/rpc",
  43114: "https://api.avax.network/ext/bc/C/rpc",
  31337: "http://127.0.0.1:8545/"
};

export const walletconnect = new WalletConnectConnector({
  rpc: RPC_URLS,
  qrcode: true,
});
