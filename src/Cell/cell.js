import "./styles.css";
import { Symbol } from "../Symbol";

export function Cell(props) {
  const { index, value, gridClicked, isSuccessGrid } = props;
  return (
    <td
      key={index}
      className={"board-cell ${}"}
      className={`board-cell ${isSuccessGrid && "success"}`}
      onClick={() => gridClicked(index)}
    >
      <Symbol type={value} />
    </td>
  );
}
