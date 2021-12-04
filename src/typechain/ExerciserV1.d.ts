/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
} from "ethers";
import {
  Contract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "@ethersproject/contracts";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";

interface ExerciserV1Interface extends ethers.utils.Interface {
  functions: {
    "PAGE_SIZE()": FunctionFragment;
    "numberOfPages()": FunctionFragment;
    "run(uint256[])": FunctionFragment;
    "search(uint256)": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "PAGE_SIZE", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "numberOfPages",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "run", values: [BigNumberish[]]): string;
  encodeFunctionData(
    functionFragment: "search",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "PAGE_SIZE", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "numberOfPages",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "run", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "search", data: BytesLike): Result;

  events: {};
}

export class ExerciserV1 extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: ExerciserV1Interface;

  functions: {
    PAGE_SIZE(overrides?: CallOverrides): Promise<{
      0: BigNumber;
    }>;

    "PAGE_SIZE()"(overrides?: CallOverrides): Promise<{
      0: BigNumber;
    }>;

    numberOfPages(overrides?: CallOverrides): Promise<{
      0: BigNumber;
    }>;

    "numberOfPages()"(overrides?: CallOverrides): Promise<{
      0: BigNumber;
    }>;

    run(
      options: BigNumberish[],
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "run(uint256[])"(
      options: BigNumberish[],
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    search(
      page: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      out: [
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber
      ];
      len: BigNumber;
      0: [
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber
      ];
      1: BigNumber;
    }>;

    "search(uint256)"(
      page: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      out: [
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber
      ];
      len: BigNumber;
      0: [
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber
      ];
      1: BigNumber;
    }>;
  };

  PAGE_SIZE(overrides?: CallOverrides): Promise<BigNumber>;

  "PAGE_SIZE()"(overrides?: CallOverrides): Promise<BigNumber>;

  numberOfPages(overrides?: CallOverrides): Promise<BigNumber>;

  "numberOfPages()"(overrides?: CallOverrides): Promise<BigNumber>;

  run(
    options: BigNumberish[],
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "run(uint256[])"(
    options: BigNumberish[],
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  search(
    page: BigNumberish,
    overrides?: CallOverrides
  ): Promise<{
    out: [
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber
    ];
    len: BigNumber;
    0: [
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber
    ];
    1: BigNumber;
  }>;

  "search(uint256)"(
    page: BigNumberish,
    overrides?: CallOverrides
  ): Promise<{
    out: [
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber
    ];
    len: BigNumber;
    0: [
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber
    ];
    1: BigNumber;
  }>;

  callStatic: {
    PAGE_SIZE(overrides?: CallOverrides): Promise<BigNumber>;

    "PAGE_SIZE()"(overrides?: CallOverrides): Promise<BigNumber>;

    numberOfPages(overrides?: CallOverrides): Promise<BigNumber>;

    "numberOfPages()"(overrides?: CallOverrides): Promise<BigNumber>;

    run(options: BigNumberish[], overrides?: CallOverrides): Promise<void>;

    "run(uint256[])"(
      options: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<void>;

    search(
      page: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      out: [
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber
      ];
      len: BigNumber;
      0: [
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber
      ];
      1: BigNumber;
    }>;

    "search(uint256)"(
      page: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      out: [
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber
      ];
      len: BigNumber;
      0: [
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber
      ];
      1: BigNumber;
    }>;
  };

  filters: {};

  estimateGas: {
    PAGE_SIZE(overrides?: CallOverrides): Promise<BigNumber>;

    "PAGE_SIZE()"(overrides?: CallOverrides): Promise<BigNumber>;

    numberOfPages(overrides?: CallOverrides): Promise<BigNumber>;

    "numberOfPages()"(overrides?: CallOverrides): Promise<BigNumber>;

    run(options: BigNumberish[], overrides?: Overrides): Promise<BigNumber>;

    "run(uint256[])"(
      options: BigNumberish[],
      overrides?: Overrides
    ): Promise<BigNumber>;

    search(page: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    "search(uint256)"(
      page: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    PAGE_SIZE(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "PAGE_SIZE()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    numberOfPages(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "numberOfPages()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    run(
      options: BigNumberish[],
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "run(uint256[])"(
      options: BigNumberish[],
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    search(
      page: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "search(uint256)"(
      page: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
