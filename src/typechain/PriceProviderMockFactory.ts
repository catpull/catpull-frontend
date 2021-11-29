/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, BigNumberish } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { PriceProviderMock } from "./PriceProviderMock";

export class PriceProviderMockFactory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    _price: BigNumberish,
    overrides?: Overrides
  ): Promise<PriceProviderMock> {
    return super.deploy(_price, overrides || {}) as Promise<PriceProviderMock>;
  }
  getDeployTransaction(
    _price: BigNumberish,
    overrides?: Overrides
  ): TransactionRequest {
    return super.getDeployTransaction(_price, overrides || {});
  }
  attach(address: string): PriceProviderMock {
    return super.attach(address) as PriceProviderMock;
  }
  connect(signer: Signer): PriceProviderMockFactory {
    return super.connect(signer) as PriceProviderMockFactory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): PriceProviderMock {
    return new Contract(address, _abi, signerOrProvider) as PriceProviderMock;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_price",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "description",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint80",
        name: "",
        type: "uint80",
      },
    ],
    name: "getRoundData",
    outputs: [
      {
        internalType: "uint80",
        name: "",
        type: "uint80",
      },
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint80",
        name: "",
        type: "uint80",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "latestAnswer",
    outputs: [
      {
        internalType: "int256",
        name: "result",
        type: "int256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "latestRoundData",
    outputs: [
      {
        internalType: "uint80",
        name: "",
        type: "uint80",
      },
      {
        internalType: "int256",
        name: "answer",
        type: "int256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint80",
        name: "",
        type: "uint80",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "price",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_price",
        type: "uint256",
      },
    ],
    name: "setPrice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "version",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x6001805460ff1916600817905560c0604052601360808190527f5465737420696d706c656d656e746174696c6e0000000000000000000000000060a090815261004b9160029190610084565b50600060035534801561005d57600080fd5b506040516104c03803806104c083398101604081905261007c9161011d565b600055610170565b82805461009090610135565b90600052602060002090601f0160209004810192826100b257600085556100f8565b82601f106100cb57805160ff19168380011785556100f8565b828001600101855582156100f8579182015b828111156100f85782518255916020019190600101906100dd565b50610104929150610108565b5090565b5b808211156101045760008155600101610109565b60006020828403121561012e578081fd5b5051919050565b600181811c9082168061014957607f821691505b6020821081141561016a57634e487b7160e01b600052602260045260246000fd5b50919050565b6103418061017f6000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c806391b7f5ed1161005b57806391b7f5ed146100e15780639a6fc8f5146100f6578063a035b1fe14610140578063feaf968c1461014957600080fd5b8063313ce5671461008d57806350d25bcd146100b157806354fd4d50146100c35780637284e416146100cc575b600080fd5b60015461009a9060ff1681565b60405160ff90911681526020015b60405180910390f35b6000545b6040519081526020016100a8565b6100b560035481565b6100d4610155565b6040516100a8919061027d565b6100f46100ef366004610234565b600055565b005b61010961010436600461024c565b6101e3565b6040805169ffffffffffffffffffff968716815260208101959095528401929092526060830152909116608082015260a0016100a8565b6100b560005481565b60008054818080610109565b60028054610162906102d0565b80601f016020809104026020016040519081016040528092919081815260200182805461018e906102d0565b80156101db5780601f106101b0576101008083540402835291602001916101db565b820191906000526020600020905b8154815290600101906020018083116101be57829003601f168201915b505050505081565b600080600080600060405162461bcd60e51b815260040161022b906020808252601390820152722a32b9ba1034b6b83632b6b2b73a30ba34b7b760691b604082015260600190565b60405180910390fd5b600060208284031215610245578081fd5b5035919050565b60006020828403121561025d578081fd5b813569ffffffffffffffffffff81168114610276578182fd5b9392505050565b6000602080835283518082850152825b818110156102a95785810183015185820160400152820161028d565b818111156102ba5783604083870101525b50601f01601f1916929092016040019392505050565b600181811c908216806102e457607f821691505b6020821081141561030557634e487b7160e01b600052602260045260246000fd5b5091905056fea264697066735822122028688bb4e8e9fc19e39edb1f245ba4451d272e008a7e4a3859611cbc3fd8dd7564736f6c63430008040033";
