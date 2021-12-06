import mim from "./crypto/mim.png";
// import btc from "./crypto/btc.png";
// import avax from "./crypto/avax.png";
import Icon from "react-crypto-icons";

const overwrites: Record<string, string> = {
  mim,
  // btc,
  // avax,
  // wbtc: btc,
  // wavax: avax,
};

export const CryptoIcon: React.FC<{ style?: any; name: string; size: number }> = props => {
  if (overwrites[props.name]) {
    return (
      <div style={{ ...props.style, marginLeft: 4, overflow: "hidden", height: props.size, width: props.size }}>
        <img src={overwrites[props.name]} style={{ maxWidth: "100%", maxHeight: "100%" }} />
      </div>
    );
  }

  return <Icon {...props} />;
};
