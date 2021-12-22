import "./styles.css";
import { PlayerImageMap } from "../store/constants";

export function Cell(props) {
  const { index, value, gridClicked } = props;

  return (
    <td key={index} className="board-cell" onClick={() => gridClicked(index)}>
      <img src={PlayerImageMap[value]} width={50} />
    </td>
  );
}
