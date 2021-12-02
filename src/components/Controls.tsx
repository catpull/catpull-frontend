import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useLocation, useNavigate } from "react-router-dom";

export const Controls = (props: { onUpdate: () => void }) => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <Stack direction="row" alignItems="center" justifyContent="center">
      <ToggleButtonGroup color="primary" value={location.pathname === "" || location.pathname === "/" ? "/buy" : location.pathname} exclusive>
        <ToggleButton
          onClick={() => {
            navigate("/buy");
            props.onUpdate();
          }}
          value="/buy"
        >
          Buy
        </ToggleButton>
        <ToggleButton
          onClick={() => {
            navigate("/holdings");
            props.onUpdate();
          }}
          value="/holdings"
        >
          Options
        </ToggleButton>
        <ToggleButton
          onClick={() => {
            navigate("/pool");
            props.onUpdate();
          }}
          value="/pool"
        >
          Pool
        </ToggleButton>
        <ToggleButton
          onClick={() => {
            navigate("/liquidity");
            props.onUpdate();
          }}
          value="/liquidity"
        >
          Liquidity
        </ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  );
};
