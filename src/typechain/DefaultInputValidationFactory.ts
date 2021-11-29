/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { DefaultInputValidation } from "./DefaultInputValidation";

export class DefaultInputValidationFactory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: Overrides): Promise<DefaultInputValidation> {
    return super.deploy(overrides || {}) as Promise<DefaultInputValidation>;
  }
  getDeployTransaction(overrides?: Overrides): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): DefaultInputValidation {
    return super.attach(address) as DefaultInputValidation;
  }
  connect(signer: Signer): DefaultInputValidationFactory {
    return super.connect(signer) as DefaultInputValidationFactory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): DefaultInputValidation {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as DefaultInputValidation;
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
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "strike",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "currentPrice",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    name: "validateInput",
    outputs: [],
    stateMutability: "pure",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50610149806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c8063819a572614610030575b600080fd5b61004361003e3660046100c3565b610045565b005b8282146100bc578462278d00146100bc5760405162461bcd60e51b815260206004820152603160248201527f4f6e6c7920333020646179732065787069727920737570706f7274656420666f60448201527072206e6f6e2041544d206f7074696f6e7360781b606482015260840160405180910390fd5b5050505050565b600080600080600060a086880312156100da578081fd5b8535945060208601359350604086013592506060860135915060808601358015158114610105578182fd5b80915050929550929590935056fea26469706673582212206a5e621ac21be4f593e149cc4656c50d185334b3a3eec03ed63ec32e764be9ba64736f6c63430008040033";
