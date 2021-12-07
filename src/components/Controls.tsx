import { Paper } from "@mui/material";
import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import { styled } from "@mui/material/styles";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

export const Controls = (props: { onUpdate: () => void }) => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <Paper elevation={0}>
      <Stack direction="row" alignItems="center" justifyContent="center">
        <ButtonGroup size="large" color="secondary" variant="contained">
          <Button
            color={location.pathname === "/buy" ? "primary" : (undefined as any)}
            onClick={() => {
              navigate("/buy");
              props.onUpdate();
            }}
          >
            Buy
          </Button>
          <Button
            color={location.pathname === "/holdings" ? "primary" : (undefined as any)}
            onClick={() => {
              navigate("/holdings");
              props.onUpdate();
            }}
          >
            Options
          </Button>
          <Button
            color={location.pathname === "/pool" ? "primary" : (undefined as any)}
            onClick={() => {
              navigate("/pool");
              props.onUpdate();
            }}
          >
            Provide Liqudity
          </Button>
          <Button
            color={location.pathname === "/liquidity" ? "primary" : (undefined as any)}
            onClick={() => {
              navigate("/liquidity");
              props.onUpdate();
            }}
          >
            Deposits
          </Button>
        </ButtonGroup>
      </Stack>
    </Paper>
  );
};
