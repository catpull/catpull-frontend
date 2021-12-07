import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import bgimg from "./assets/landing.png";

export function Landing() {
  return (
    <>
      <Box sx={{ width: "100%", paddingTop: 1, display: "flex", paddingRight: 3, paddingLeft: 3, flexDirection: "row", height: 50, position: "relative" }}>
        <Typography variant="h4">(🐱,🐯)</Typography>
        <div style={{ display: "flex", flexGrow: "1" }} />
        <Stack direction="row" spacing={3}>
          <Button color="secondary" target="_blank" href="https://catpull.gitbook.io/catpull/PC2J9CnV7lqexMtdCp7V/">
            Documentation
          </Button>
          <Button href="#/buy" size="large" variant="contained" color="primary">
            Enter app
          </Button>
        </Stack>
      </Box>
      <Container maxWidth="sm">
        <Stack direction="column" spacing={3}>
          <Typography variant="h2" align="center">
            <strong>CATPULL</strong> OPTIONS TRADING
          </Typography>
          <Typography variant="h6" align="center">
            Next generation peer-to-pool options trading on{" "}
            <strong>
              <span style={{ color: "rgb(225, 63, 65)" }}>Avalanche</span>
            </strong>
          </Typography>

          <Stack direction="column" alignItems="center">
            <Button href="#/buy" size="large" variant="contained">
              Enter app
            </Button>
          </Stack>
          <div style={{ height: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img src={bgimg} style={{ maxHeight: 800 }} />
          </div>
        </Stack>
      </Container>
    </>
  );
}
