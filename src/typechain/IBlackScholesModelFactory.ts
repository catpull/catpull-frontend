/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer } from "ethers";
import { Provider } from "@ethersproject/providers";

import type { IBlackScholesModel } from "./IBlackScholesModel";

export class IBlackScholesModelFactory {
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IBlackScholesModel {
    return new Contract(address, _abi, signerOrProvider) as IBlackScholesModel;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "int256",
        name: "amount",
        type: "int256",
      },
      {
        internalType: "int256",
        name: "currentPrice",
        type: "int256",
      },
      {
        internalType: "int256",
        name: "strike",
        type: "int256",
      },
      {
        internalType: "int256",
        name: "period",
        type: "int256",
      },
      {
        internalType: "int256",
        name: "swingRate",
        type: "int256",
      },
      {
        internalType: "int256",
        name: "impliedVolatility",
        type: "int256",
      },
      {
        internalType: "int256",
        name: "riskFreeRate",
        type: "int256",
      },
    ],
    name: "calculatePremiums",
    outputs: [
      {
        internalType: "int256",
        name: "callPremium",
        type: "int256",
      },
      {
        internalType: "int256",
        name: "putPremium",
        type: "int256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
];
