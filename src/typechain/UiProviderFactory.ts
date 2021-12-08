/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { UiProvider } from "./UiProvider";

export class UiProviderFactory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    _optionsManager: string,
    _stableCoin: string,
    overrides?: Overrides
  ): Promise<UiProvider> {
    return super.deploy(
      _optionsManager,
      _stableCoin,
      overrides || {}
    ) as Promise<UiProvider>;
  }
  getDeployTransaction(
    _optionsManager: string,
    _stableCoin: string,
    overrides?: Overrides
  ): TransactionRequest {
    return super.getDeployTransaction(
      _optionsManager,
      _stableCoin,
      overrides || {}
    );
  }
  attach(address: string): UiProvider {
    return super.attach(address) as UiProvider;
  }
  connect(signer: Signer): UiProviderFactory {
    return super.connect(signer) as UiProviderFactory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): UiProvider {
    return new Contract(address, _abi, signerOrProvider) as UiProvider;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "contract OptionsManager",
        name: "_optionsManager",
        type: "address",
      },
      {
        internalType: "contract ERC20",
        name: "_stableCoin",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "contract HegicPool",
        name: "pool",
        type: "address",
      },
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "buyViewData",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "currentPrice",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "availableBalance",
            type: "uint256",
          },
        ],
        internalType: "struct BuyViewData",
        name: "out",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "optionsPage",
        type: "uint256",
      },
    ],
    name: "optionsViewData",
    outputs: [
      {
        components: [
          {
            internalType: "int256",
            name: "totalPNL",
            type: "int256",
          },
          {
            components: [
              {
                internalType: "bool",
                name: "isCall",
                type: "bool",
              },
              {
                internalType: "enum IHegicPool.OptionState",
                name: "state",
                type: "uint8",
              },
              {
                internalType: "uint256",
                name: "optionId",
                type: "uint256",
              },
              {
                internalType: "address",
                name: "asset",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "strike",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "expiry",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "premium",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "value",
                type: "uint256",
              },
            ],
            internalType: "struct OptionViewData[]",
            name: "optionPageEntries",
            type: "tuple[]",
          },
          {
            internalType: "uint256",
            name: "totalEntries",
            type: "uint256",
          },
        ],
        internalType: "struct OptionsHoldingsView",
        name: "out",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "address",
        name: "pool",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "optionsPage",
        type: "uint256",
      },
    ],
    name: "tranchesViewData",
    outputs: [
      {
        components: [
          {
            internalType: "int256",
            name: "totalPNL",
            type: "int256",
          },
          {
            components: [
              {
                internalType: "enum IHegicPool.TrancheState",
                name: "state",
                type: "uint8",
              },
              {
                internalType: "uint256",
                name: "share",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "creationTimestamp",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "trancheId",
                type: "uint256",
              },
              {
                internalType: "int256",
                name: "pnl",
                type: "int256",
              },
              {
                internalType: "address",
                name: "asset",
                type: "address",
              },
            ],
            internalType: "struct TrancheViewData[]",
            name: "tranchesPageEntries",
            type: "tuple[]",
          },
          {
            internalType: "uint256",
            name: "totalEntries",
            type: "uint256",
          },
        ],
        internalType: "struct TranchesHoldingsView",
        name: "out",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5060405161129738038061129783398101604081905261002f91610063565b600180546001600160a01b039283166001600160a01b031991821617909155600080549390921692169190911790556100b4565b60008060408385031215610075578182fd5b82516100808161009c565b60208401519092506100918161009c565b809150509250929050565b6001600160a01b03811681146100b157600080fd5b50565b6111d4806100c36000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c8063046a0f711461004657806340e0d9311461007957806371ff681d14610099575b600080fd5b610059610054366004610da2565b6100b9565b604080518251815260209283015192810192909252015b60405180910390f35b61008c610087366004610d57565b610242565b6040516100709190610ee1565b6100ac6100a7366004610d17565b61085a565b6040516100709190610fae565b60408051808201909152600080825260208201526000836001600160a01b031663b888879e6040518163ffffffff1660e01b815260040160206040518083038186803b15801561010857600080fd5b505afa15801561011c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101409190610cf4565b6001600160a01b031663feaf968c6040518163ffffffff1660e01b815260040160a06040518083038186803b15801561017857600080fd5b505afa15801561018c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101b09190610e92565b5050508084526001546040516370a0823160e01b81526001600160a01b038781166004830152929450911691506370a082319060240160206040518083038186803b1580156101fe57600080fd5b505afa158015610212573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102369190610e7a565b60208301525092915050565b61026660405180606001604052806000815260200160608152602001600081525090565b60408051600580825260c08201909252600091816020015b6102d76040805161012081019091526000808252602082019081526020016000815260200160006001600160a01b0316815260200160008152602001600081526020016000815260200160008152602001600081525090565b81526020019060019003908161027e579050506000546040516370a0823160e01b81526001600160a01b0387811660048301529293509116906370a082319060240160206040518083038186803b15801561033157600080fd5b505afa158015610345573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103699190610e7a565b604083015260005b600581101561084e576040830151610389858361108f565b106103935761084e565b600080546001600160a01b0316632f745c59876103b0888661108f565b6040516001600160e01b031960e085901b1681526001600160a01b039092166004830152602482015260440160206040518083038186803b1580156103f457600080fd5b505afa158015610408573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061042c9190610e7a565b6000805460405163c40c11bb60e01b81526004810184905292935090916001600160a01b039091169063c40c11bb9060240160206040518083038186803b15801561047657600080fd5b505afa15801561048a573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104ae9190610cf4565b9050600080600080600080866001600160a01b031663409e2205896040518263ffffffff1660e01b81526004016104e791815260200190565b60e06040518083038186803b1580156104ff57600080fd5b505afa158015610513573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105379190610dda565b96509650965050955095509550600080886001600160a01b0316637632bffb8b6040518263ffffffff1660e01b815260040161057591815260200190565b60206040518083038186803b15801561058d57600080fd5b505afa1580156105a1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105c59190610e7a565b905060018860038111156105e957634e487b7160e01b600052602160045260246000fd5b14156106895780156106805760405163b9186d7d60e01b81526004810182905284906001600160a01b038b169063b9186d7d9060240160206040518083038186803b15801561063757600080fd5b505afa15801561064b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061066f9190610e7a565b61067991906110e6565b91506106a3565b61067984611140565b8215610697578291506106a3565b6106a084611140565b91505b818d6000018181516106b5919061104e565b915081815250506040518061012001604052808a6001600160a01b0316636d6364786040518163ffffffff1660e01b815260040160206040518083038186803b15801561070157600080fd5b505afa158015610715573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107399190610d82565b1515815260200189600381111561076057634e487b7160e01b600052602160045260246000fd5b81526020018b81526020018a6001600160a01b0316636d8cb5296040518163ffffffff1660e01b815260040160206040518083038186803b1580156107a457600080fd5b505afa1580156107b8573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107dc9190610cf4565b6001600160a01b03168152602001888152602001878152602001868152602001858152602001828152508c8c8151811061082657634e487b7160e01b600052603260045260246000fd5b602002602001018190525050505050505050505050808061084690611125565b915050610371565b50602082015292915050565b61087e60405180606001604052806000815260200160608152602001600081525090565b60408051600580825260c08201909252849160009190816020015b6108e36040805160e081019091528060008152602001600081526020016000815260200160008152602001600081526020016000815260200160006001600160a01b031681525090565b815260200190600190039081610899579050506040516370a0823160e01b81526001600160a01b038881166004830152919250908316906370a082319060240160206040518083038186803b15801561093b57600080fd5b505afa15801561094f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109739190610e7a565b604084015260005b6005811015610cc7576040840151610993868361108f565b1061099d57610cc7565b604051632f745c5960e01b81526001600160a01b0388811660048301526024820183905260009190851690632f745c599060440160206040518083038186803b1580156109e957600080fd5b505afa1580156109fd573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a219190610e7a565b9050600080600080876001600160a01b03166326c25962866040518263ffffffff1660e01b8152600401610a5791815260200190565b60806040518083038186803b158015610a6f57600080fd5b505afa158015610a83573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610aa79190610e39565b93509350935093506000886001600160a01b031663ce8ff5a46040518163ffffffff1660e01b815260040160206040518083038186803b158015610aea57600080fd5b505afa158015610afe573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b229190610e7a565b896001600160a01b031663feed23426040518163ffffffff1660e01b815260040160206040518083038186803b158015610b5b57600080fd5b505afa158015610b6f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b939190610e7a565b610b9d90866110c7565b610ba791906110a7565b90506000610bb584836110e6565b90506040518060e00160405280876002811115610be257634e487b7160e01b600052602160045260246000fd5b81526020018681526020018581526020018481526020018881526020018281526020018b6001600160a01b031663fc0c546a6040518163ffffffff1660e01b815260040160206040518083038186803b158015610c3e57600080fd5b505afa158015610c52573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c769190610cf4565b6001600160a01b0316815250898981518110610ca257634e487b7160e01b600052603260045260246000fd5b6020026020010181905250505050505050508080610cbf90611125565b91505061097b565b506020830152509392505050565b805169ffffffffffffffffffff81168114610cef57600080fd5b919050565b600060208284031215610d05578081fd5b8151610d1081611186565b9392505050565b600080600060608486031215610d2b578182fd5b8335610d3681611186565b92506020840135610d4681611186565b929592945050506040919091013590565b60008060408385031215610d69578182fd5b8235610d7481611186565b946020939093013593505050565b600060208284031215610d93578081fd5b81518015158114610d10578182fd5b60008060408385031215610db4578182fd5b8235610dbf81611186565b91506020830135610dcf81611186565b809150509250929050565b600080600080600080600060e0888a031215610df4578283fd5b875160048110610e02578384fd5b602089015160408a015160608b015160808c015160a08d015160c0909d0151949e939d50919b909a50909850965090945092505050565b60008060008060808587031215610e4e578384fd5b845160038110610e5c578485fd5b60208601516040870151606090970151919890975090945092505050565b600060208284031215610e8b578081fd5b5051919050565b600080600080600060a08688031215610ea9578081fd5b610eb286610cd5565b9450602086015193506040860151925060608601519150610ed560808701610cd5565b90509295509295909350565b6000602080835260808084018551838601528286015160606040818189015283835180865260a09550858a0191508785019450885b81811015610f995785518051151584528981015160048110610f3a57610f3a611170565b848b01528085015185850152858101516001600160a01b0316868501528881015189850152878101518885015260c0808201519085015260e0808201519085015261010090810151908401529488019461012090920191600101610f16565b50509801519601959095525093949350505050565b6000602080835260808084018551838601528286015160606040818189015283835180865260a09550858a0191508785019450885b81811015610f99578551805160038110610fff57610fff611170565b8452808a01518a850152848101518585015285810151868501528881015189850152878101518885015260c0908101516001600160a01b0316908401529488019460e090920191600101610fe3565b600080821280156001600160ff1b03849003851316156110705761107061115a565b600160ff1b83900384128116156110895761108961115a565b50500190565b600082198211156110a2576110a261115a565b500190565b6000826110c257634e487b7160e01b81526012600452602481fd5b500490565b60008160001904831182151516156110e1576110e161115a565b500290565b60008083128015600160ff1b8501841216156111045761110461115a565b6001600160ff1b038401831381161561111f5761111f61115a565b50500390565b60006000198214156111395761113961115a565b5060010190565b6000600160ff1b8214156111565761115661115a565b0390565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052602160045260246000fd5b6001600160a01b038116811461119b57600080fd5b5056fea2646970667358221220f141ce76d0ba93500a75c7e53e645702c69447ec18cd7c414633e61933e8c74864736f6c63430008040033";
