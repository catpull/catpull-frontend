import mim from "./crypto/mim.png";
import Icon from "react-crypto-icons";

const overwrites: Record<string, string> = {
  mim,
};

export const CryptoIcon: React.FC<{ name: string; size: number }> = props => {
  if (overwrites[props.name]) {
    return (
      <div style={{ overflow: "hidden", marginLeft: 4, height: props.size, width: props.size }}>
        <img src={overwrites[props.name]} style={{ maxWidth: "100%", maxHeight: "100%" }} />
      </div>
    );
  }

  return <Icon {...props} />;
};
