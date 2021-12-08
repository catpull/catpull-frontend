/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { ExerciserV1 } from "./ExerciserV1";

export class ExerciserV1Factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(manager: string, overrides?: Overrides): Promise<ExerciserV1> {
    return super.deploy(manager, overrides || {}) as Promise<ExerciserV1>;
  }
  getDeployTransaction(
    manager: string,
    overrides?: Overrides
  ): TransactionRequest {
    return super.getDeployTransaction(manager, overrides || {});
  }
  attach(address: string): ExerciserV1 {
    return super.attach(address) as ExerciserV1;
  }
  connect(signer: Signer): ExerciserV1Factory {
    return super.connect(signer) as ExerciserV1Factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ExerciserV1 {
    return new Contract(address, _abi, signerOrProvider) as ExerciserV1;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "contract OptionsManager",
        name: "manager",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "PAGE_SIZE",
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
    name: "numberOfPages",
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
        internalType: "uint256[]",
        name: "options",
        type: "uint256[]",
      },
    ],
    name: "run",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "page",
        type: "uint256",
      },
    ],
    name: "search",
    outputs: [
      {
        internalType: "uint256[25]",
        name: "out",
        type: "uint256[25]",
      },
      {
        internalType: "uint256",
        name: "len",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x60a060405234801561001057600080fd5b5060405161095f38038061095f83398101604081905261002f91610044565b60601b6001600160601b031916608052610072565b600060208284031215610055578081fd5b81516001600160a01b038116811461006b578182fd5b9392505050565b60805160601c6108bb6100a46000396000818160e4015281816102c40152818161038b015261046f01526108bb6000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c806331b286641461005157806355eead081461006c57806382fc0f8214610081578063fc156fe014610089575b600080fd5b610059603281565b6040519081526020015b60405180910390f35b61007f61007a3660046106ad565b6100aa565b005b6100596102bf565b61009c61009736600461077c565b61037e565b6040516100639291906107ac565b60005b818110156102ba5760008383838181106100d757634e487b7160e01b600052603260045260246000fd5b90506020020135905060007f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031663c40c11bb836040518263ffffffff1660e01b815260040161013091815260200190565b60206040518083038186803b15801561014857600080fd5b505afa15801561015c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610180919061067f565b60405163409e220560e01b8152600481018490529091506000906001600160a01b0383169063409e22059060240160e06040518083038186803b1580156101c657600080fd5b505afa1580156101da573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101fe919061071d565b505094505050505061070881610214919061083d565b4211156102a45760405163b07f0a4160e01b8152600481018490526001600160a01b0383169063b07f0a4190602401600060405180830381600087803b15801561025d57600080fd5b505af192505050801561026e575060015b6102a4573d80801561029c576040519150601f19603f3d011682016040523d82523d6000602084013e6102a1565b606091505b50505b50505080806102b290610854565b9150506100ad565b505050565b6000807f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166375794a3c6040518163ffffffff1660e01b815260040160206040518083038186803b15801561031b57600080fd5b505afa15801561032f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103539190610794565b90508061036257600091505090565b61036d6032826107fe565b6103789060016107e6565b91505090565b610386610660565b6000807f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166375794a3c6040518163ffffffff1660e01b815260040160206040518083038186803b1580156103e257600080fd5b505afa1580156103f6573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061041a9190610794565b9050600061042960328661081e565b90505b60326104398660016107e6565b610443919061081e565b8110156106595781811061045657610659565b60405163c40c11bb60e01b8152600481018290526000907f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03169063c40c11bb9060240160206040518083038186803b1580156104b957600080fd5b505afa1580156104cd573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104f1919061067f565b60405163409e220560e01b8152600481018490529091506000906001600160a01b0383169063409e22059060240160e06040518083038186803b15801561053757600080fd5b505afa15801561054b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061056f919061071d565b505094505050505061070881610585919061083d565b4211801561060b5750604051637632bffb60e01b8152600481018490526000906001600160a01b03841690637632bffb9060240160206040518083038186803b1580156105d157600080fd5b505afa1580156105e5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106099190610794565b115b15610644578286866019811061063157634e487b7160e01b600052603260045260246000fd5b60200201526106416001866107e6565b94505b5050808061065190610854565b91505061042c565b5050915091565b6040518061032001604052806019906020820280368337509192915050565b600060208284031215610690578081fd5b81516001600160a01b03811681146106a6578182fd5b9392505050565b600080602083850312156106bf578081fd5b823567ffffffffffffffff808211156106d6578283fd5b818501915085601f8301126106e9578283fd5b8135818111156106f7578384fd5b8660208260051b850101111561070b578384fd5b60209290920196919550909350505050565b600080600080600080600060e0888a031215610737578283fd5b875160048110610745578384fd5b602089015160408a015160608b015160808c015160a08d015160c0909d0151949e939d50919b909a50909850965090945092505050565b60006020828403121561078d578081fd5b5035919050565b6000602082840312156107a5578081fd5b5051919050565b6103408101818460005b60198110156107d55781518352602092830192909101906001016107b6565b505050826103208301529392505050565b600082198211156107f9576107f961086f565b500190565b60008261081957634e487b7160e01b81526012600452602481fd5b500490565b60008160001904831182151516156108385761083861086f565b500290565b60008282101561084f5761084f61086f565b500390565b60006000198214156108685761086861086f565b5060010190565b634e487b7160e01b600052601160045260246000fdfea2646970667358221220cdc31e6a3c36c8110184a0b41685c1faf620ae28d7a66b2b2af86539d9271b6c64736f6c63430008040033";