import { useCurrentNetworkData } from "../dapp/networks";
import { UiProviderFactory, UiProvider } from "../typechain";
import { useCurrentState } from "./GlobalState";
import { PoolTabs } from "./PoolTabs";
import { formatTokenAmount } from "./formatTokenAmount";
import { Web3Provider } from "@ethersproject/providers";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useWeb3React } from "@web3-react/core";
import * as React from "react";

type TranchesPageData = Parameters<Parameters<ReturnType<UiProvider["tranchesViewData"]>["then"]>[0]>[0];
export const UILiquidity = () => {
  const s = useCurrentState();
  const [holdings, setHoldings] = React.useState<TranchesPageData>();
  const ctx = useWeb3React<Web3Provider>();
  // const [exercising, setExercising] = React.useState(false)
  const networkData = useCurrentNetworkData();
  const pool = networkData?.pools[s.state.token][s.state.type];

  const fetchState = React.useCallback(async () => {
    if (pool == null || ctx.account == null || ctx.library == null || networkData == null) {
      return;
    }
    setHoldings(null);
    const signer = await ctx.library.getSigner(ctx.account);
    const uiProvider = await UiProviderFactory.connect(networkData.uiProvider, signer);
    const pageData = await uiProvider.tranchesViewData(await signer.getAddress(), pool, 0);

    setHoldings(pageData);
  }, [ctx, pool, networkData]);
  React.useEffect(() => {
    const run = async () => {
      await fetchState();
    };
    run();
  }, [fetchState]);

  const rows: Array<TranchesPageData["tranchesPageEntries"][0]> = [];
  holdings?.tranchesPageEntries.forEach(row => {
    if (row.amount.isZero()) {
      return;
    }
    rows.push(row);
  });
  if (networkData == null) {
    return null;
  }

  return (
    <Container maxWidth="md">
      <Paper variant="outlined">
        <PoolTabs />
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="right">Staked for</TableCell>
                <TableCell align="right">PNL</TableCell>
                <TableCell align="right">State</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => {
                const daysStaked = (Date.now() - row.creationTimestamp.toNumber() * 1000) / (1000 * 60 * 60 * 24);
                const currency = networkData.tokensLookup[row.asset];

                return (
                  <TableRow key={row.trancheId.toString()}>
                    <TableCell align="right">
                      {formatTokenAmount(row.amount.toBigInt(), currency.decimals, Math.ceil(currency.decimals / 4))} {networkData.tokensLookup[row.asset].symbol.toUpperCase()}
                    </TableCell>
                    <TableCell align="right">{row.state === 1 ? daysStaked.toFixed(2) + " days" : "-"}</TableCell>
                    <TableCell align="right">{formatTokenAmount(row.pnl.toBigInt(), currency.decimals, Math.ceil(currency.decimals / 4))}</TableCell>
                    <TableCell align="right">
                      {row.state === 0 ? (
                        <Chip size="small" label="Unknown" color="error" />
                      ) : row.state === 1 ? (
                        <Button disabled={daysStaked < 30}>Withdraw</Button>
                      ) : (
                        <Chip size="small" label="Withdrawn" color="success" />
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};
