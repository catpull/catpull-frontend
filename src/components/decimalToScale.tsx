export function decimalToScale(decimals: number): bigint {
  return BigInt("1" + "0".repeat(decimals));
}
