/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { InitialRewardsManager } from "./InitialRewardsManager";

export class InitialRewardsManagerFactory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(token: string, overrides?: Overrides): Promise<InitialRewardsManager> {
    return super.deploy(
      token,
      overrides || {}
    ) as Promise<InitialRewardsManager>;
  }
  getDeployTransaction(
    token: string,
    overrides?: Overrides
  ): TransactionRequest {
    return super.getDeployTransaction(token, overrides || {});
  }
  attach(address: string): InitialRewardsManager {
    return super.attach(address) as InitialRewardsManager;
  }
  connect(signer: Signer): InitialRewardsManagerFactory {
    return super.connect(signer) as InitialRewardsManagerFactory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): InitialRewardsManager {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as InitialRewardsManager;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "contract GovernanceToken",
        name: "token",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "pool",
        type: "address",
      },
    ],
    name: "addPool",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "usdTotal",
        type: "uint256",
      },
    ],
    name: "callBought",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "emissionRate",
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
        internalType: "address",
        name: "provider",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "usdTotal",
        type: "uint256",
      },
    ],
    name: "liquidityProvided",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "pools",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "usdTotal",
        type: "uint256",
      },
    ],
    name: "putBought",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "rewardToken",
    outputs: [
      {
        internalType: "contract GovernanceToken",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_newRate",
        type: "uint256",
      },
    ],
    name: "setEmissionRate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x6080604052601460035534801561001557600080fd5b506040516106f73803806106f7833981016040819052610034916100b2565b61003d33610062565b600180546001600160a01b0319166001600160a01b03929092169190911790556100e0565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6000602082840312156100c3578081fd5b81516001600160a01b03811681146100d9578182fd5b9392505050565b610608806100ef6000396000f3fe608060405234801561001057600080fd5b50600436106100a95760003560e01c8063a1bdb15e11610071578063a1bdb15e1461010c578063a4063dbc1461011f578063b62268a1146100ae578063d914cd4b14610152578063f2fde38b14610165578063f7c618c11461017857600080fd5b806310191adf146100ae578063715018a6146100c35780638da5cb5b146100cb578063946752b6146100ae57806396afc450146100f5575b600080fd5b6100c16100bc366004610504565b61018b565b005b6100c1610207565b6000546001600160a01b03165b6040516001600160a01b0390911681526020015b60405180910390f35b6100fe60035481565b6040519081526020016100ec565b6100c161011a36600461054d565b61023d565b61014261012d3660046104e3565b60026020526000908152604090205460ff1681565b60405190151581526020016100ec565b6100c16101603660046104e3565b61026c565b6100c16101733660046104e3565b6102ba565b6001546100d8906001600160a01b031681565b3360009081526002602052604090205460ff166101f95760405162461bcd60e51b815260206004820152602160248201527f4f6e6c7920706f6f6c732063616e2063616c6c207468697320636f6e747261636044820152601d60fa1b60648201526084015b60405180910390fd5b6102038282610355565b5050565b6000546001600160a01b031633146102315760405162461bcd60e51b81526004016101f09061057d565b61023b6000610477565b565b6000546001600160a01b031633146102675760405162461bcd60e51b81526004016101f09061057d565b600355565b6000546001600160a01b031633146102965760405162461bcd60e51b81526004016101f09061057d565b6001600160a01b03166000908152600260205260409020805460ff19166001179055565b6000546001600160a01b031633146102e45760405162461bcd60e51b81526004016101f09061057d565b6001600160a01b0381166103495760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016101f0565b61035281610477565b50565b60006003548261036591906105b2565b6001546040516370a0823160e01b815230600482015291925082916001600160a01b03909116906370a082319060240160206040518083038186803b1580156103ad57600080fd5b505afa1580156103c1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103e59190610565565b106104725760015460405163a9059cbb60e01b81526001600160a01b038581166004830152602482018490529091169063a9059cbb90604401602060405180830381600087803b15801561043857600080fd5b505af115801561044c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610470919061052d565b505b505050565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b80356001600160a01b03811681146104de57600080fd5b919050565b6000602082840312156104f4578081fd5b6104fd826104c7565b9392505050565b60008060408385031215610516578081fd5b61051f836104c7565b946020939093013593505050565b60006020828403121561053e578081fd5b815180151581146104fd578182fd5b60006020828403121561055e578081fd5b5035919050565b600060208284031215610576578081fd5b5051919050565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b6000826105cd57634e487b7160e01b81526012600452602481fd5b50049056fea2646970667358221220e7783e34696359a8c86ddb9e7e9ab5a63d4b321d43a23c490dcd06903b7eb5a964736f6c63430008040033";
