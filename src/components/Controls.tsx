import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import ToggleButton from "@mui/material/ToggleButton"
import { useLocation, useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack"



export const Controls = (props: { onUpdate: () => void}) => {
  const location = useLocation()
  const navigate = useNavigate()

  console.log(location.pathname)
  return <Stack direction="row" alignItems="center" justifyContent="center">
    <ToggleButtonGroup
      color="primary"
      value={location.pathname === "" ? "/buy" : location.pathname}
      exclusive
    >
      <ToggleButton onClick={() => {
        navigate("buy");
        props.onUpdate()
      }} value="/buy">Buy</ToggleButton>
      <ToggleButton onClick={() => {
        navigate("pool");
        props.onUpdate()
      }} value="/pool">Pool</ToggleButton>
      <ToggleButton onClick={() => {
        navigate("holdings");
        props.onUpdate()
      }} value="/holdings">Holdings</ToggleButton>
    </ToggleButtonGroup>
  </Stack>
}
