import { Token } from "../dapp/networks";
import { utils } from "ethers";
export function floatToWei(amount: number, token: Token) {
  return utils.parseUnits(amount.toString(), token.decimals).toBigInt();
}
