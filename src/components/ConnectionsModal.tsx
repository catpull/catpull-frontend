import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import Modal from "@mui/material/Modal"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { injected, walletconnect } from "../dapp/connectors";
import { useEagerConnect, useInactiveListener } from "../dapp/hooks";
import logger from "../logger";
function getErrorMessage(error: Error) {

  logger.error(error);
  return "An unknown error occurred. Check the console for more details.";
}
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export const ConnectionsModal = () => {
  const context = useWeb3React<Web3Provider>();
  const { connector, activate, error } = context;

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = useState<any>();
  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector);

  const activating = (connection: typeof injected | typeof walletconnect) => connection === activatingConnector;
  const connected = (connection: typeof injected | typeof walletconnect) => connection === connector;
  const disabled = !triedEager || !!activatingConnector || connected(injected) || connected(walletconnect) || !!error;

  return <Modal
        open={!connected(injected)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
           <Box sx={style as any}>
            <Typography>
              To use the demo, please connect using metamask
            </Typography>
            {!!error && <Typography sx={{ color: 'error.main' }}>{getErrorMessage(error)}</Typography>}
            <Button
              disabled={disabled}
              onClick={() => {
                setActivatingConnector(injected);
                activate(injected);
              }}
            >
              {activating(injected) && <span>loading...</span>}
              {connected(injected) && (
                <span role="img" aria-label="check">
                  ✅
                </span>
              )}
              Connect with MetaMask
            </Button>
        </Box>
      </Modal>
}