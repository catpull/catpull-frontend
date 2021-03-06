/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer } from "ethers";
import { Provider } from "@ethersproject/providers";

import type { IPriceCalculator } from "./IPriceCalculator";

export class IPriceCalculatorFactory {
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IPriceCalculator {
    return new Contract(address, _abi, signerOrProvider) as IPriceCalculator;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "period",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "strike",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isCall",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "outDecimals",
        type: "uint256",
      },
    ],
    name: "calculateTotalPremium",
    outputs: [
      {
        internalType: "uint256",
        name: "settlementFee",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "premium",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
