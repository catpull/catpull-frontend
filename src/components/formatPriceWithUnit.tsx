import { Token } from "../dapp/networks";
import { formatTokenAmount } from "./formatTokenAmount";

export function formatPriceWithUnit(price: bigint, token: Token, outDigits: number) {
  return formatTokenAmount(price, token.decimals, outDigits) + " " + token.symbol.toUpperCase();
}
