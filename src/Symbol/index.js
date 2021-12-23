import { players } from "../store/constants";
import { ReactComponent as OSymbol } from "../assets/o-symbol.svg";
import { ReactComponent as XSymbol } from "../assets/x-symbol.svg";

export function Symbol({ type }) {
  return type === players.X ? (
    <XSymbol width="50px" />
  ) : type === players.O ? (
    <OSymbol width="50px" />
  ) : null;
}
