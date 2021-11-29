import * as React from "react";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import Container from "@mui/material/Container";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useCurrentNetworkData } from "../dapp/networks";
import { FacadeFactory, OptionsManagerFactory, UiProviderFactory, UiProvider, HegicPutFactory } from "../typechain";
import { formatTokenAmount } from "./formatTokenAmount";

type OptionsPageData = Parameters<Parameters<ReturnType<UiProvider["optionsViewData"]>["then"]>[0]>[0];
export const UIHoldings = () => {
  const [holdings, setHoldings] = React.useState<OptionsPageData>();
  const ctx = useWeb3React<Web3Provider>();
  const [exercising, setExercising] = React.useState(false);
  const networkData = useCurrentNetworkData();
  const fetchState = React.useCallback(async () => {
    if (ctx.library == null || ctx.account == null || networkData == null) {
      return;
    }
    const signer = await ctx.library.getSigner(
      ctx.account
    );
    const uiProvider = await UiProviderFactory.connect(networkData.uiProvider, signer);
    const optionsPage = await uiProvider.optionsViewData(await signer.getAddress(), 0);

    setHoldings(optionsPage);
  }, [ctx, networkData]);
  React.useEffect(() => {
    const run = async () => {
      await fetchState();
    };
    run();

  }, [fetchState]);

  const rows: Array<OptionsPageData["optionPageEntries"][0]> = [];
  holdings?.optionPageEntries.forEach(row => {
    if (row.amount.isZero()) {
      return;
    }
    rows.push(row);
  });
  if (networkData == null || ctx.library == null || ctx.account == null) {
    return null;
  }
  return <Container maxWidth="md">
    <Stack spacing={1}>
      <Typography>Options</Typography>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Type</TableCell>
              <TableCell align="right">Asset</TableCell>
              <TableCell align="right">Strike</TableCell>
              <TableCell align="right">Size</TableCell>
              <TableCell align="right">PNL</TableCell>
              <TableCell align="right">Expiry</TableCell>
              <TableCell align="right">State</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => (
              <TableRow
                key={i}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="right">
                  {row.isCall ? <Chip label="CALL" color="success" size="small" /> : <Chip label="PUT" color="error" size="small" />}
                </TableCell>

                <TableCell align="right">
                  {networkData.tokensLookup[row.asset].symbol.toUpperCase()}
                </TableCell>
                <TableCell align="right">
                  {formatTokenAmount(row.strike.toBigInt(), 8, 2)}
                </TableCell>
                <TableCell align="right">
                  {formatTokenAmount(row.amount.toBigInt(), networkData.tokensLookup[row.asset].decimals, 2)}
                </TableCell>
                <TableCell align="right">
                  {formatTokenAmount(row.pnl.toBigInt(), 18, 2)}
                </TableCell>
                <TableCell align="right">
                  {row.state === 1 ? ((row.expiry.toNumber() * 1000 - Date.now()) / (1000 * 60 * 60 * 24)).toFixed(2) + " days"
                    : "-"}
                </TableCell>
                <TableCell align="right">
                  {row.state === 0 ? <Chip size="small" label="Unknown" color="error" /> :
                    row.state === 1 ? <Button size="small" onClick={async () => {
                      setExercising(true);
                      if (ctx.library == null || ctx.account == null) {
                        return;
                      }
                      try {
                        const signer = await ctx.library.getSigner(
                          ctx.account
                        );
                        const facadeInst = FacadeFactory.connect(networkData.facade, signer);

                        const optionsManagerInst = OptionsManagerFactory.connect(await facadeInst.optionsManager(), signer);

                        const optId = row.optionId.toNumber();
                        const poolAddr = await optionsManagerInst.tokenPool(optId);
                        const poolInst = HegicPutFactory.connect(poolAddr, signer);

                        await (await poolInst.exercise(optId)).wait(1);
                        await fetchState();
                        setExercising(true);
                      } finally {
                        setExercising(false);
                      }


                    }} disabled={exercising || row.pnl.isNegative() || Date.now() > row.expiry.toNumber() * 1000}>
                      Excerise
                    </Button> :
                      row.state === 2 ? <Chip size="small" label="Exercised" color="success" />
                        : <Chip size="small" label="Expired" />}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography>Total PNL {formatTokenAmount(holdings?.totalPNL.toBigInt() ?? 0n, 18, 2) + " " + networkData.stable.symbol}</Typography>
    </Stack>
  </Container>;
};
