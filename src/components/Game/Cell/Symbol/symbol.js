import { ReactComponent as OSymbol } from "../../../../assets/o-symbol.svg";
import { ReactComponent as XSymbol } from "../../../../assets/x-symbol.svg";
import { players } from "../../../../constants";

function Symbol({ type }) {
  return type === players.X ? (
    <XSymbol width="45px" />
  ) : type === players.O ? (
    <OSymbol width="45px" />
  ) : null;
}

export default Symbol;
