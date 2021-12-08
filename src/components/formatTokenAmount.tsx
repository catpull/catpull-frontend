import { utils } from "ethers";

const sizes: bigint[] = [];
let out = 1n;
for (let i = 0; i < 20; i++) {
  sizes.push(out);
  out = out * 10n;
}
export function formatTokenAmount(amount: bigint, decimals: number, outDigits: number = 2) {
  console.log(amount, decimals, outDigits);
  if (decimals > outDigits) {
    amount = BigInt(amount) / BigInt(sizes[decimals - outDigits]);
  }
  if (decimals < outDigits) {
    amount = BigInt(amount) * BigInt(sizes[outDigits - decimals]);
  }
  return utils.formatUnits(amount, outDigits);
}
