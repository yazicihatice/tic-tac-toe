import "./styles.css";

export function Grid(props) {
  const { index, value, gridClicked } = props;
  return (
    <td key={index} className="board-cell" onClick={() => gridClicked(index)}>
      {value}
    </td>
  );
}
