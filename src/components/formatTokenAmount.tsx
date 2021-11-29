import { decimalToScale } from "./decimalToScale";

export function formatTokenAmount(amount: bigint, decimals: number, outDigits: number = 2) {
  const sign = amount < 0n ? "-" : "";
  amount = amount < 0n ? amount * -1n : amount;
  const scale = decimalToScale(decimals);
  const integer = amount / scale;
  const fractional = amount - integer * scale;
  const digits = fractional.toString().padStart(decimals, '0').slice(0, outDigits);
  return sign + integer.toString() + '.' + digits;
}
