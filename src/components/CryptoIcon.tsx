import mim from "./crypto/mim.png";
import Icon from "react-crypto-icons";

const overwrites: Record<string, string> = {
  mim: "/public/crypto/mim.png",
};

export const CryptoIcon: React.FC<{ name: string; size: number }> = props => {
  if (overwrites[props.name]) {
    return (
      <div style={{ overflow: "hidden", height: props.size, width: props.size }}>
        <img src={mim} style={{ maxWidth: "100%", maxHeight: "100%" }} />
      </div>
    );
  }

  return <Icon {...props} />;
};
