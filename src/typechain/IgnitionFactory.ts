/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { Ignition } from "./Ignition";

export class IgnitionFactory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: Overrides): Promise<Ignition> {
    return super.deploy(overrides || {}) as Promise<Ignition>;
  }
  getDeployTransaction(overrides?: Overrides): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): Ignition {
    return super.attach(address) as Ignition;
  }
  connect(signer: Signer): IgnitionFactory {
    return super.connect(signer) as IgnitionFactory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Ignition {
    return new Contract(address, _abi, signerOrProvider) as Ignition;
  }
}

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
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
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
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
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
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
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
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
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
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
    inputs: [],
    name: "totalSupply",
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
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
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
  "0x60806040523480156200001157600080fd5b50604080518082018252601581527f43617450756c6c205374616b696e6720546f6b656e000000000000000000000060208083019182528351808501909452600484526349474e4960e01b908401528151919291620000739160039162000213565b5080516200008990600490602084019062000213565b505050620000a6620000a0620000d560201b60201c565b620000d9565b620000cf33620000b96012600a6200031d565b620000c990633b9aca00620003eb565b6200012b565b62000460565b3390565b600580546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6001600160a01b038216620001865760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015260640160405180910390fd5b80600260008282546200019a9190620002b9565b90915550506001600160a01b03821660009081526020819052604081208054839290620001c9908490620002b9565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b82805462000221906200040d565b90600052602060002090601f01602090048101928262000245576000855562000290565b82601f106200026057805160ff191683800117855562000290565b8280016001018555821562000290579182015b828111156200029057825182559160200191906001019062000273565b506200029e929150620002a2565b5090565b5b808211156200029e5760008155600101620002a3565b60008219821115620002cf57620002cf6200044a565b500190565b600181815b8085111562000315578160001904821115620002f957620002f96200044a565b808516156200030757918102915b93841c9390800290620002d9565b509250929050565b60006200032e60ff84168362000335565b9392505050565b6000826200034657506001620003e5565b816200035557506000620003e5565b81600181146200036e5760028114620003795762000399565b6001915050620003e5565b60ff8411156200038d576200038d6200044a565b50506001821b620003e5565b5060208310610133831016604e8410600b8410161715620003be575081810a620003e5565b620003ca8383620002d4565b8060001904821115620003e157620003e16200044a565b0290505b92915050565b60008160001904831182151516156200040857620004086200044a565b500290565b600181811c908216806200042257607f821691505b602082108114156200044457634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b610bc280620004706000396000f3fe608060405234801561001057600080fd5b50600436106100f55760003560e01c806370a0823111610097578063a457c2d711610066578063a457c2d7146101eb578063a9059cbb146101fe578063dd62ed3e14610211578063f2fde38b1461024a57600080fd5b806370a0823114610197578063715018a6146101c05780638da5cb5b146101c857806395d89b41146101e357600080fd5b806323b872dd116100d357806323b872dd1461014d578063313ce56714610160578063395093511461016f57806340c10f191461018257600080fd5b806306fdde03146100fa578063095ea7b31461011857806318160ddd1461013b575b600080fd5b61010261025d565b60405161010f9190610aa5565b60405180910390f35b61012b610126366004610a7c565b6102ef565b604051901515815260200161010f565b6002545b60405190815260200161010f565b61012b61015b366004610a41565b610305565b6040516012815260200161010f565b61012b61017d366004610a7c565b6103b4565b610195610190366004610a7c565b6103f0565b005b61013f6101a53660046109ee565b6001600160a01b031660009081526020819052604090205490565b610195610428565b6005546040516001600160a01b03909116815260200161010f565b61010261045e565b61012b6101f9366004610a7c565b61046d565b61012b61020c366004610a7c565b610506565b61013f61021f366004610a0f565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6101956102583660046109ee565b610513565b60606003805461026c90610b51565b80601f016020809104026020016040519081016040528092919081815260200182805461029890610b51565b80156102e55780601f106102ba576101008083540402835291602001916102e5565b820191906000526020600020905b8154815290600101906020018083116102c857829003601f168201915b5050505050905090565b60006102fc3384846105ae565b50600192915050565b60006103128484846106d2565b6001600160a01b03841660009081526001602090815260408083203384529091529020548281101561039c5760405162461bcd60e51b815260206004820152602860248201527f45524332303a207472616e7366657220616d6f756e74206578636565647320616044820152676c6c6f77616e636560c01b60648201526084015b60405180910390fd5b6103a985338584036105ae565b506001949350505050565b3360008181526001602090815260408083206001600160a01b038716845290915281205490916102fc9185906103eb908690610b2d565b6105ae565b6005546001600160a01b0316331461041a5760405162461bcd60e51b815260040161039390610af8565b61042482826108a1565b5050565b6005546001600160a01b031633146104525760405162461bcd60e51b815260040161039390610af8565b61045c6000610980565b565b60606004805461026c90610b51565b3360009081526001602090815260408083206001600160a01b0386168452909152812054828110156104ef5760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b6064820152608401610393565b6104fc33858584036105ae565b5060019392505050565b60006102fc3384846106d2565b6005546001600160a01b0316331461053d5760405162461bcd60e51b815260040161039390610af8565b6001600160a01b0381166105a25760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610393565b6105ab81610980565b50565b6001600160a01b0383166106105760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b6064820152608401610393565b6001600160a01b0382166106715760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b6064820152608401610393565b6001600160a01b0383811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b6001600160a01b0383166107365760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b6064820152608401610393565b6001600160a01b0382166107985760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b6064820152608401610393565b6001600160a01b038316600090815260208190526040902054818110156108105760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b6064820152608401610393565b6001600160a01b03808516600090815260208190526040808220858503905591851681529081208054849290610847908490610b2d565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8460405161089391815260200190565b60405180910390a350505050565b6001600160a01b0382166108f75760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f2061646472657373006044820152606401610393565b80600260008282546109099190610b2d565b90915550506001600160a01b03821660009081526020819052604081208054839290610936908490610b2d565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b600580546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b80356001600160a01b03811681146109e957600080fd5b919050565b6000602082840312156109ff578081fd5b610a08826109d2565b9392505050565b60008060408385031215610a21578081fd5b610a2a836109d2565b9150610a38602084016109d2565b90509250929050565b600080600060608486031215610a55578081fd5b610a5e846109d2565b9250610a6c602085016109d2565b9150604084013590509250925092565b60008060408385031215610a8e578182fd5b610a97836109d2565b946020939093013593505050565b6000602080835283518082850152825b81811015610ad157858101830151858201604001528201610ab5565b81811115610ae25783604083870101525b50601f01601f1916929092016040019392505050565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b60008219821115610b4c57634e487b7160e01b81526011600452602481fd5b500190565b600181811c90821680610b6557607f821691505b60208210811415610b8657634e487b7160e01b600052602260045260246000fd5b5091905056fea264697066735822122014c040d8fa7579749602308f9b490e3494fdf159b83d8c6ac8da5cf0e035205d64736f6c63430008040033";
