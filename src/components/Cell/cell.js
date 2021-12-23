import "./styles.css";
import Symbol from "../Symbol";

function Cell(props) {
  const { index, value, onClick, isSuccessCell, disabled } = props;
  return (
    <td
      key={index}
      className={`board-cell ${disabled && "disabled"} ${
        isSuccessCell && "success"
      }`}
      onClick={() => onClick(index)}
    >
      <Symbol type={value} />
    </td>
  );
}

export default Cell;
