import { useCurrentState } from "./GlobalState";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import * as React from "react";

export function OptionType() {
  const s = useCurrentState();
  return (
    <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
      <Typography color="success">Call</Typography>
      <Switch onChange={() => s.update({ type: s.state.type === "put" ? "call" : "put" })} checked={s.state.type === "put"} color="error" />
      <Typography color="error">Put</Typography>
    </Stack>
  );
}
