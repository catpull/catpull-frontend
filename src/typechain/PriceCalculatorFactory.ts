/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, BigNumberish } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { PriceCalculator } from "./PriceCalculator";

export class PriceCalculatorFactory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    initialRate: BigNumberish,
    _priceProvider: string,
    _pool: string,
    _model: string,
    overrides?: Overrides
  ): Promise<PriceCalculator> {
    return super.deploy(
      initialRate,
      _priceProvider,
      _pool,
      _model,
      overrides || {}
    ) as Promise<PriceCalculator>;
  }
  getDeployTransaction(
    initialRate: BigNumberish,
    _priceProvider: string,
    _pool: string,
    _model: string,
    overrides?: Overrides
  ): TransactionRequest {
    return super.getDeployTransaction(
      initialRate,
      _priceProvider,
      _pool,
      _model,
      overrides || {}
    );
  }
  attach(address: string): PriceCalculator {
    return super.attach(address) as PriceCalculator;
  }
  connect(signer: Signer): PriceCalculatorFactory {
    return super.connect(signer) as PriceCalculatorFactory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): PriceCalculator {
    return new Contract(address, _abi, signerOrProvider) as PriceCalculator;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "initialRate",
        type: "uint256",
      },
      {
        internalType: "contract AggregatorV3Interface",
        name: "_priceProvider",
        type: "address",
      },
      {
        internalType: "contract IHegicPool",
        name: "_pool",
        type: "address",
      },
      {
        internalType: "contract IBlackScholesModel",
        name: "_model",
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
        indexed: false,
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "DaoShareChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    name: "IVChanged",
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
        indexed: false,
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    name: "RiskFreeRateChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    name: "SwingRateChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "UtilizationRateChangeChanged",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "currentPrice",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "period",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "strike",
        type: "uint256",
      },
    ],
    name: "_calculatePrice",
    outputs: [
      {
        internalType: "int256",
        name: "callPrice",
        type: "int256",
      },
      {
        internalType: "int256",
        name: "putPrice",
        type: "int256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
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
  {
    inputs: [],
    name: "daoshare",
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
    name: "impliedVolRate",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "model",
    outputs: [
      {
        internalType: "contract IBlackScholesModel",
        name: "",
        type: "address",
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
    name: "pool",
    outputs: [
      {
        internalType: "contract IHegicPool",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "priceProvider",
    outputs: [
      {
        internalType: "contract AggregatorV3Interface",
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
    name: "riskFreeRate",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "setDaoShare",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "int256",
        name: "value",
        type: "int256",
      },
    ],
    name: "setImpliedVolRate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "int256",
        name: "value",
        type: "int256",
      },
    ],
    name: "setSwingRate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "setUtilizationRate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "swingRate",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "view",
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
  {
    inputs: [],
    name: "utilizationRate",
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
  "0x60806040526000600155670c7d713b49da0000600255670214e8348c4effff196003556000600455600a60055534801561003857600080fd5b50604051610d74380380610d74833981016040819052610057916100f9565b610060336100a9565b600780546001600160a01b03199081166001600160a01b039485161790915560068054821694841694909417909355600293909355600880549092169216919091179055610165565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6000806000806080858703121561010e578384fd5b8451935060208501516101208161014d565b60408601519093506101318161014d565b60608601519092506101428161014d565b939692955090935050565b6001600160a01b038116811461016257600080fd5b50565b610c00806101746000396000f3fe608060405234801561001057600080fd5b506004361061010b5760003560e01c80636c321c8a116100a25780638da5cb5b116100715780638da5cb5b14610203578063b888879e14610214578063e472274114610227578063f2fde38b1461023a578063f3cc69931461024d57600080fd5b80636c321c8a146101cc5780636fadc3ca146101d5578063715018a6146101e8578063818add93146101f057600080fd5b806318f88e5b116100de57806318f88e5b1461018e57806340774ff6146101a55780635c28a23d146101ba5780635ff5a38b146101c357600080fd5b8063066b8ec9146101105780630ad9d0521461013d5780630fab28d51461016857806316f0115b1461017b575b600080fd5b61012361011e366004610958565b610256565b604080519283526020830191909152015b60405180910390f35b600854610150906001600160a01b031681565b6040516001600160a01b039091168152602001610134565b6101236101763660046109a4565b610447565b600754610150906001600160a01b031681565b61019760025481565b604051908152602001610134565b6101b86101b336600461091d565b610507565b005b61019760035481565b61019760055481565b61019760045481565b6101b86101e336600461091d565b61056d565b6101b861060e565b6101b86101fe36600461091d565b610644565b6000546001600160a01b0316610150565b600654610150906001600160a01b031681565b6101b861023536600461091d565b6106c6565b6101b86102483660046108ef565b610751565b61019760015481565b60008060006102636107ec565b90508561026e578095505b620151808810158015610284575062278d008811155b6102c55760405162461bcd60e51b815260206004820152600d60248201526c125b9d985b1a5914195c9a5bd9609a1b60448201526064015b60405180910390fd5b6102d0600582610a71565b6102da9082610a59565b8611156103195760405162461bcd60e51b815260206004820152600d60248201526c0a6e8e4d2d6caa8dede90d2ced609b1b60448201526064016102bc565b610324600582610a71565b61032e9082610b9d565b86101561036c5760405162461bcd60e51b815260206004820152600c60248201526b537472696b65546f6f4c6f7760a01b60448201526064016102bc565b600080610392610381846402540be400610b7e565b8a8c6101768c6402540be400610b7e565b915091506000876103a357816103a5565b825b9050836103b6826305f5e100610b7e565b6103c09190610a71565b905060128710156103f2576103d6876012610b9d565b6103e190600a610ad4565b6103eb9082610a71565b905061041e565b601287111561041e57610406601288610b9d565b61041190600a610ad4565b61041b9082610b7e565b90505b60055461042b9082610a71565b95506104378682610b9d565b9450505050509550959350505050565b600854600354600254600154604051636002444f60e01b815260048101889052602481018990526044810186905260648101879052608481019390935260a483019190915260c482015260009182916001600160a01b0390911690636002444f9060e401604080518083038186803b1580156104c257600080fd5b505afa1580156104d6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104fa9190610935565b9097909650945050505050565b6000546001600160a01b031633146105315760405162461bcd60e51b81526004016102bc90610a24565b60048190556040518181527f03c5967b3d387a03581f5004281e82580c72e6d4186a21d1b8cd6365b115457a906020015b60405180910390a150565b6000546001600160a01b031633146105975760405162461bcd60e51b81526004016102bc90610a24565b600a8110156105d95760405162461bcd60e51b815260206004820152600e60248201526d0ecc2d8eaca40e8dede40d0d2ced60931b60448201526064016102bc565b60058190556040518181527f95697dda342a063050456c907608b122faacc22a4cc4bf88c50285feba565ed590602001610562565b6000546001600160a01b031633146106385760405162461bcd60e51b81526004016102bc90610a24565b6106426000610880565b565b6000546001600160a01b0316331461066e5760405162461bcd60e51b81526004016102bc90610a24565b600081121580156106885750680ad78ebc5ac62000008113155b61069157600080fd5b60028190556040518181527fad86d0f27ea32ac315abf9f185f9ba7b1ba3871c047c9448a825b4af5f31b89690602001610562565b6000546001600160a01b031633146106f05760405162461bcd60e51b81526004016102bc90610a24565b68056bc75e2d630fffff198112158015610713575068056bc75e2d631000008113155b61071c57600080fd5b60038190556040518181527fccd87504c7b552cca51a68ac74442e0b6972e3af7eba3e7bbbb9dee12929311690602001610562565b6000546001600160a01b0316331461077b5760405162461bcd60e51b81526004016102bc90610a24565b6001600160a01b0381166107e05760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016102bc565b6107e981610880565b50565b600080600660009054906101000a90046001600160a01b03166001600160a01b031663feaf968c6040518163ffffffff1660e01b815260040160a06040518083038186803b15801561083d57600080fd5b505afa158015610851573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061087591906109d5565b509195945050505050565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b805169ffffffffffffffffffff811681146108ea57600080fd5b919050565b600060208284031215610900578081fd5b81356001600160a01b0381168114610916578182fd5b9392505050565b60006020828403121561092e578081fd5b5035919050565b60008060408385031215610947578081fd5b505080516020909101519092909150565b600080600080600060a0868803121561096f578081fd5b85359450602086013593506040860135925060608601358015158114610993578182fd5b949793965091946080013592915050565b600080600080608085870312156109b9578384fd5b5050823594602084013594506040840135936060013592509050565b600080600080600060a086880312156109ec578081fd5b6109f5866108d0565b9450602086015193506040860151925060608601519150610a18608087016108d0565b90509295509295909350565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b60008219821115610a6c57610a6c610bb4565b500190565b600082610a8c57634e487b7160e01b81526012600452602481fd5b500490565b600181815b80851115610acc578160001904821115610ab257610ab2610bb4565b80851615610abf57918102915b93841c9390800290610a96565b509250929050565b60006109168383600082610aea57506001610b78565b81610af757506000610b78565b8160018114610b0d5760028114610b1757610b33565b6001915050610b78565b60ff841115610b2857610b28610bb4565b50506001821b610b78565b5060208310610133831016604e8410600b8410161715610b56575081810a610b78565b610b608383610a91565b8060001904821115610b7457610b74610bb4565b0290505b92915050565b6000816000190483118215151615610b9857610b98610bb4565b500290565b600082821015610baf57610baf610bb4565b500390565b634e487b7160e01b600052601160045260246000fdfea2646970667358221220e46bca2505173b1f53d582813fcc78c368388b7e1dc18d0c6b71c380329e986364736f6c63430008040033";
