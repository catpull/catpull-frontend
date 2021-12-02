import { useCurrentNetworkData } from "../dapp/networks";
import { FacadeFactory, OptionsManagerFactory, UiProviderFactory, UiProvider, HegicPutFactory } from "../typechain";
import { useCurrentState } from "./GlobalState";
import { formatTokenAmount } from "./formatTokenAmount";
import { Web3Provider } from "@ethersproject/providers";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useWeb3React } from "@web3-react/core";
import { useSnackbar } from "notistack";
import * as React from "react";
import { Link } from "react-router-dom";

type OptionsPageData = Parameters<Parameters<ReturnType<UiProvider["optionsViewData"]>["then"]>[0]>[0];
export const UIHoldings = () => {
  const s = useCurrentState();
  const notistack = useSnackbar();
  const [holdings, setHoldings] = React.useState<OptionsPageData | undefined>();
  const ctx = useWeb3React<Web3Provider>();
  const [page, setPage] = React.useState(0);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const [exercising, setExercising] = React.useState(false);
  const networkData = useCurrentNetworkData();
  const [loading, setLoading] = React.useState(true);
  const fetchState = React.useCallback(async () => {
    if (ctx.library == null || ctx.account == null || networkData == null) {
      return;
    }
    setLoading(true);
    try {
      const signer = await ctx.library.getSigner(ctx.account);
      const uiProvider = await UiProviderFactory.connect(networkData.uiProvider, signer);
      const optionsPage = await uiProvider.optionsViewData(await signer.getAddress(), page);

      setHoldings(optionsPage);
    } finally {
      setLoading(false);
    }
  }, [ctx, page, networkData]);
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
  return (
    <Container maxWidth="md">
      <Paper variant="outlined">
        <Toolbar>
          <Typography sx={{ flex: "1 1 100%" }} variant="h6" id="tableTitle" component="div">
            Options
          </Typography>
        </Toolbar>
        <TableContainer>
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
                <TableRow key={i} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell align="right">{row.isCall ? <Chip label="CALL" color="success" size="small" /> : <Chip label="PUT" color="error" size="small" />}</TableCell>

                  <TableCell align="right">{networkData.tokensLookup[row.asset].symbol.toUpperCase()}</TableCell>
                  <TableCell align="right">{formatTokenAmount(row.strike.toBigInt(), 8, 2)}</TableCell>
                  <TableCell align="right">{formatTokenAmount(row.amount.toBigInt(), networkData.tokensLookup[row.asset].decimals, 2)}</TableCell>
                  <TableCell align="right">{formatTokenAmount(row.pnl.toBigInt(), 18, 2)}</TableCell>
                  <TableCell align="right">{row.state === 1 ? ((row.expiry.toNumber() * 1000 - Date.now()) / (1000 * 60 * 60 * 24)).toFixed(2) + " days" : "-"}</TableCell>
                  <TableCell align="right">
                    {row.state === 0 ? (
                      <Chip size="small" label="Unknown" color="error" />
                    ) : row.state === 1 ? (
                      <Button
                        size="small"
                        onClick={async () => {
                          setExercising(true);
                          if (ctx.library == null || ctx.account == null) {
                            return;
                          }
                          try {
                            const signer = await ctx.library.getSigner(ctx.account);
                            const facadeInst = FacadeFactory.connect(networkData.facade, signer);

                            const optionsManagerInst = OptionsManagerFactory.connect(await facadeInst.optionsManager(), signer);

                            const optId = row.optionId.toNumber();
                            const poolAddr = await optionsManagerInst.tokenPool(optId);
                            const poolInst = HegicPutFactory.connect(poolAddr, signer);
                            const r = await poolInst.exercise(optId);
                            notistack.enqueueSnackbar("Exercising option");
                            await r.wait(1);
                            notistack.enqueueSnackbar("Option excersiced");
                            await fetchState();
                            s.refreshBalances();
                            setExercising(true);
                          } catch (e) {
                            notistack.enqueueSnackbar("Failed to excercise option");
                          } finally {
                            setExercising(false);
                          }
                        }}
                        disabled={exercising || row.pnl.isNegative() || Date.now() > row.expiry.toNumber() * 1000}
                      >
                        Excerise
                      </Button>
                    ) : row.state === 2 ? (
                      <Chip size="small" label="Exercised" color="success" />
                    ) : (
                      <Chip size="small" label="Expired" />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {rows.length !== 0 && (
            <TablePagination
              component="div"
              count={rows.length}
              rowsPerPage={5}
              onRowsPerPageChange={() => {}}
              rowsPerPageOptions={[5]}
              page={page}
              onPageChange={handleChangePage}
            />
          )}
        </TableContainer>
        {loading && (
          <Box sx={{ height: 300, width: "100%" }}>
            <Typography align="center" sx={{ marginTop: 4 }}>
              Loading...
            </Typography>
          </Box>
        )}
        {!loading && rows.length === 0 && (
          <Stack alignItems="center" justifyContent="center" direction="column" sx={{ height: 300, width: "100%" }} spacing={2}>
            <Typography>No options found</Typography>
            <Link to="/buy">
              <Button variant="contained">Buy your first option</Button>
            </Link>
          </Stack>
        )}
      </Paper>
    </Container>
  );
};
