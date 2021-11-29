import { Token } from "../dapp/networks";

export function floatToWei(amount: number, token: Token) {
  const [integer, fractional = ""] = Math.abs(amount).toFixed(token.decimals).split(".");

  return BigInt(Math.sign(amount)) * BigInt(integer + fractional);
}
