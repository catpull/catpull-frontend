import Chip from "@mui/material/Chip";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import Icon from "react-crypto-icons";

interface CurrencySelectorProps {
  options: string[];
  value: string;
  onChange: (s: string) => void;
}

export function CurrencySelector(props: CurrencySelectorProps) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Chip onClick={handleClick} icon={<Icon name={props.value} size={25} />} label={props.value.toUpperCase()} variant="outlined" />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {props.options.map(choice => (
          <MenuItem
            key={choice}
            onClick={() => {
              props.onChange(choice);
              handleClose();
            }}
          >
            <ListItemIcon>
              <Icon name={choice} size={25} />
            </ListItemIcon>
            {choice.toUpperCase()}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export const StableCoinSelector = () => <CurrencySelector value="mim" options={["mim"]} onChange={() => {}} />;
