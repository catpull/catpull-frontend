/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { BlackScholesModel } from "./BlackScholesModel";

export class BlackScholesModelFactory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: Overrides): Promise<BlackScholesModel> {
    return super.deploy(overrides || {}) as Promise<BlackScholesModel>;
  }
  getDeployTransaction(overrides?: Overrides): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): BlackScholesModel {
    return super.attach(address) as BlackScholesModel;
  }
  connect(signer: Signer): BlackScholesModelFactory {
    return super.connect(signer) as BlackScholesModelFactory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): BlackScholesModel {
    return new Contract(address, _abi, signerOrProvider) as BlackScholesModel;
  }
}

const _abi = [
  {
    inputs: [],
    name: "PRBMathSD59x18__AbsInputTooSmall",
    type: "error",
  },
  {
    inputs: [],
    name: "PRBMathSD59x18__DivInputTooSmall",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "rAbs",
        type: "uint256",
      },
    ],
    name: "PRBMathSD59x18__DivOverflow",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "int256",
        name: "x",
        type: "int256",
      },
    ],
    name: "PRBMathSD59x18__Exp2InputTooBig",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "int256",
        name: "x",
        type: "int256",
      },
    ],
    name: "PRBMathSD59x18__ExpInputTooBig",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "int256",
        name: "x",
        type: "int256",
      },
    ],
    name: "PRBMathSD59x18__FromIntOverflow",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "int256",
        name: "x",
        type: "int256",
      },
    ],
    name: "PRBMathSD59x18__FromIntUnderflow",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "int256",
        name: "x",
        type: "int256",
      },
    ],
    name: "PRBMathSD59x18__LogInputTooSmall",
    type: "error",
  },
  {
    inputs: [],
    name: "PRBMathSD59x18__MulInputTooSmall",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "rAbs",
        type: "uint256",
      },
    ],
    name: "PRBMathSD59x18__MulOverflow",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "int256",
        name: "x",
        type: "int256",
      },
    ],
    name: "PRBMathSD59x18__SqrtNegativeInput",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "int256",
        name: "x",
        type: "int256",
      },
    ],
    name: "PRBMathSD59x18__SqrtOverflow",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "prod1",
        type: "uint256",
      },
    ],
    name: "PRBMath__MulDivFixedPointOverflow",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "prod1",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "denominator",
        type: "uint256",
      },
    ],
    name: "PRBMath__MulDivOverflow",
    type: "error",
  },
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

const _bytecode =
  "0x608060405234801561001057600080fd5b5061148c806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c80636002444f14610030575b600080fd5b61004361003e366004611343565b61005c565b6040805192835260208301919091520160405180910390f35b60008061007d6a1a1601fc4ea7109e00000061007788610192565b90610222565b955060006100a6886100a0610092878b6102f4565b61009b90611426565b6103b6565b906102f4565b905060006100bb8a6100a06100928a8c6102f4565b905060006100cc876100a08b61042d565b9050600061011d826100f88c6100ee6706f05b59d3b200006100a08e806102f4565b6100a0908c61138e565b61011361010e8f8861022290919063ffffffff16565b6104a9565b610077919061138e565b905061013b61013461012f84846113e7565b6104e9565b85906102f4565b610147610134836104e9565b61015191906113e7565b95508361015e84886113e7565b610168919061138e565b94506101748d876102f4565b95506101808d866102f4565b94505050505097509795505050505050565b60007809392ee8e921d5d073aff322e62439fcf32d7f344649470f8f198212156101d75760405163e608e18b60e01b8152600481018390526024015b60405180910390fd5b7809392ee8e921d5d073aff322e62439fcf32d7f344649470f90821315610214576040516371f72a3160e01b8152600481018390526024016101ce565b50670de0b6b3a76400000290565b6000600160ff1b8314806102395750600160ff1b82145b156102575760405163b3c754a360e01b815260040160405180910390fd5b60008060008512610268578461026d565b846000035b91506000841261027d5783610282565b836000035b9050600061029983670de0b6b3a764000084610602565b90506001600160ff1b038111156102c657604051637cb4bef560e01b8152600481018290526024016101ce565b6000198087139086138082186001146102df57826102e8565b6102e883611426565b98975050505050505050565b6000600160ff1b83148061030b5750600160ff1b82145b1561032957604051630d01a11b60e21b815260040160405180910390fd5b6000806000851261033a578461033f565b846000035b91506000841261034f5783610354565b836000035b9050600061036283836106dd565b90506001600160ff1b0381111561038f5760405163bf79e8d960e01b8152600481018290526024016101ce565b6000198087139086138082186001146103a857826102e8565b505060000395945050505050565b600068023f2fa8f6da5b9d31198212156103d257506000919050565b680736ea4425c11ac63182126103fe576040516399bb754160e01b8152600481018390526024016101ce565b6714057b7ef767814f8202610426670de0b6b3a76400006706f05b59d3b2000083010561079f565b9392505050565b6000808212156104535760405163608c83ff60e11b8152600481018390526024016101ce565b7809392ee8e921d5d073aff322e62439fcf32d7f344649470f9082131561049057604051632c482c3960e01b8152600481018390526024016101ce565b6104a3670de0b6b3a76400008302610843565b92915050565b60006714057b7ef767814f670de0b6b3a76400006104c684610a1f565b02816104e257634e487b7160e01b600052601260045260246000fd5b0592915050565b60008061052161050a6104fb85610afe565b6703369a219c1e7800906102f4565b61051c90670de0b6b3a764000061138e565b610b3a565b905060006105506105416100926706f05b59d3b200006100a088806102f4565b67058953e87d609800906102f4565b905060006105d46105b86105a561058c610572876712761527a7f020006102f4565b6105859067194666aebd0c7fff1961138e565b87906102f4565b61059e906718b914cd652c600061138e565b86906102f4565b610134906704f2c4e30ec36fff1961138e565b6105ca9067046eabc83754d80061138e565b6100a084866102f4565b905060008513156105fa576105f181670de0b6b3a76400006113e7565b95945050505050565b949350505050565b60008080600019858709858702925082811083820303915050806000141561064b5783828161064157634e487b7160e01b600052601260045260246000fd5b0492505050610426565b83811061067557604051631dcf306360e21b815260048101829052602481018590526044016101ce565b600084868809600260036001881981018916988990049182028318808302840302808302840302808302840302808302840302808302840302918202909203026000889003889004909101858311909403939093029303949094049190911702949350505050565b60008080600019848609848602925082811083820303915050670de0b6b3a764000081106107215760405163698d9a0160e11b8152600481018290526024016101ce565b600080670de0b6b3a76400008688099150506706f05b59d3b1ffff81118261075b5780670de0b6b3a76400008504019450505050506104a3565b620400008285030493909111909103600160ee1b02919091177faccb18165bd6fe31ae1cf318dc5b51eee0e1ba569b88cd74c1773b91fac106690201905092915050565b6000808212156107fa5768033dd1780914b97114198212156107c357506000919050565b6107cf8260000361079f565b6ec097ce7bc90715b34b9f1000000000816104e257634e487b7160e01b600052601260045260246000fd5b680a688906bd8b00000082126108265760405163e69458f960e01b8152600481018390526024016101ce565b670de0b6b3a7640000604083901b0461042681610b68565b919050565b60008161085257506000919050565b50600181600160801b811061086c5760409190911b9060801c5b600160401b81106108825760209190911b9060401c5b64010000000081106108995760109190911b9060201c5b6201000081106108ae5760089190911b9060101c5b61010081106108c25760049190911b9060081c5b601081106108d55760029190911b9060041c5b600881106108e557600182901b91505b600182848161090457634e487b7160e01b600052601260045260246000fd5b048301901c9150600182848161092a57634e487b7160e01b600052601260045260246000fd5b048301901c9150600182848161095057634e487b7160e01b600052601260045260246000fd5b048301901c9150600182848161097657634e487b7160e01b600052601260045260246000fd5b048301901c9150600182848161099c57634e487b7160e01b600052601260045260246000fd5b048301901c915060018284816109c257634e487b7160e01b600052601260045260246000fd5b048301901c915060018284816109e857634e487b7160e01b600052601260045260246000fd5b048301901c91506000828481610a0e57634e487b7160e01b600052601260045260246000fd5b0490508083101561042657826105fa565b6000808213610a445760405163309fa7dd60e11b8152600481018390526024016101ce565b6000670de0b6b3a76400008312610a5d57506001610a77565b6000199050826ec097ce7bc90715b34b9f10000000000492505b6000610a8c670de0b6b3a76400008505611264565b670de0b6b3a7640000808202945090915084821d90811415610ab057505002919050565b6706f05b59d3b200005b6000811315610af557670de0b6b3a7640000828002059150671bc16d674ec800008212610aed579384019360019190911d905b60011d610aba565b50505002919050565b6000600160ff1b821415610b2557604051631d0742e360e21b815260040160405180910390fd5b60008212610b3357816104a3565b5060000390565b6000816ec097ce7bc90715b34b9f1000000000816104e257634e487b7160e01b600052601260045260246000fd5b600160bf1b678000000000000000821615610b8c5768016a09e667f3bcc9090260401c5b674000000000000000821615610bab576801306fe0a31b7152df0260401c5b672000000000000000821615610bca576801172b83c7d517adce0260401c5b671000000000000000821615610be95768010b5586cf9890f62a0260401c5b670800000000000000821615610c08576801059b0d31585743ae0260401c5b670400000000000000821615610c2757680102c9a3e778060ee70260401c5b670200000000000000821615610c465768010163da9fb33356d80260401c5b670100000000000000821615610c6557680100b1afa5abcbed610260401c5b6680000000000000821615610c835768010058c86da1c09ea20260401c5b6640000000000000821615610ca1576801002c605e2e8cec500260401c5b6620000000000000821615610cbf57680100162f3904051fa10260401c5b6610000000000000821615610cdd576801000b175effdc76ba0260401c5b6608000000000000821615610cfb57680100058ba01fb9f96d0260401c5b6604000000000000821615610d195768010002c5cc37da94920260401c5b6602000000000000821615610d37576801000162e525ee05470260401c5b6601000000000000821615610d555768010000b17255775c040260401c5b65800000000000821615610d72576801000058b91b5bc9ae0260401c5b65400000000000821615610d8f57680100002c5c89d5ec6d0260401c5b65200000000000821615610dac5768010000162e43f4f8310260401c5b65100000000000821615610dc957680100000b1721bcfc9a0260401c5b65080000000000821615610de65768010000058b90cf1e6e0260401c5b65040000000000821615610e03576801000002c5c863b73f0260401c5b65020000000000821615610e2057680100000162e430e5a20260401c5b65010000000000821615610e3d576801000000b1721835510260401c5b648000000000821615610e5957680100000058b90c0b490260401c5b644000000000821615610e755768010000002c5c8601cc0260401c5b642000000000821615610e91576801000000162e42fff00260401c5b641000000000821615610ead5768010000000b17217fbb0260401c5b640800000000821615610ec9576801000000058b90bfce0260401c5b640400000000821615610ee557680100000002c5c85fe30260401c5b640200000000821615610f015768010000000162e42ff10260401c5b640100000000821615610f1d57680100000000b17217f80260401c5b6380000000821615610f385768010000000058b90bfc0260401c5b6340000000821615610f53576801000000002c5c85fe0260401c5b6320000000821615610f6e57680100000000162e42ff0260401c5b6310000000821615610f89576801000000000b17217f0260401c5b6308000000821615610fa457680100000000058b90c00260401c5b6304000000821615610fbf5768010000000002c5c8600260401c5b6302000000821615610fda576801000000000162e4300260401c5b6301000000821615610ff55768010000000000b172180260401c5b6280000082161561100f576801000000000058b90c0260401c5b6240000082161561102957680100000000002c5c860260401c5b622000008216156110435768010000000000162e430260401c5b6210000082161561105d57680100000000000b17210260401c5b620800008216156110775768010000000000058b910260401c5b62040000821615611091576801000000000002c5c80260401c5b620200008216156110ab57680100000000000162e40260401c5b620100008216156110c5576801000000000000b1720260401c5b6180008216156110de57680100000000000058b90260401c5b6140008216156110f75768010000000000002c5d0260401c5b612000821615611110576801000000000000162e0260401c5b6110008216156111295768010000000000000b170260401c5b610800821615611142576801000000000000058c0260401c5b61040082161561115b57680100000000000002c60260401c5b61020082161561117457680100000000000001630260401c5b61010082161561118d57680100000000000000b10260401c5b60808216156111a557680100000000000000590260401c5b60408216156111bd576801000000000000002c0260401c5b60208216156111d557680100000000000000160260401c5b60108216156111ed576801000000000000000b0260401c5b600882161561120557680100000000000000060260401c5b600482161561121d57680100000000000000030260401c5b600282161561123557680100000000000000010260401c5b600182161561124d57680100000000000000010260401c5b670de0b6b3a76400000260409190911c60bf031c90565b6000600160801b821061128457608091821c9161128190826113cf565b90505b600160401b82106112a257604091821c9161129f90826113cf565b90505b64010000000082106112c157602091821c916112be90826113cf565b90505b6201000082106112de57601091821c916112db90826113cf565b90505b61010082106112fa57600891821c916112f790826113cf565b90505b6010821061131557600491821c9161131290826113cf565b90505b6004821061133057600291821c9161132d90826113cf565b90505b6002821061083e576104a36001826113cf565b600080600080600080600060e0888a03121561135d578283fd5b505085359760208701359750604087013596606081013596506080810135955060a0810135945060c0013592509050565b600080821280156001600160ff1b03849003851316156113b0576113b0611440565b600160ff1b83900384128116156113c9576113c9611440565b50500190565b600082198211156113e2576113e2611440565b500190565b60008083128015600160ff1b85018412161561140557611405611440565b6001600160ff1b038401831381161561142057611420611440565b50500390565b6000600160ff1b82141561143c5761143c611440565b0390565b634e487b7160e01b600052601160045260246000fdfea2646970667358221220ae08e7845dbe0cfe92ebb982be9f439ddd00c1738ec34ee357689befeafbfe1064736f6c63430008040033";