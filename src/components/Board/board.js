import "./styles.css";
import { connect } from "react-redux";
import {
  createBoardStatus,
  playerClickedCell,
  setColumnSize,
  startGame,
  setSuccessConditionMap,
  finishGame,
} from "../../store/actions";
import { Component } from "react";
import Cell from "../Cell/cell";
import { calculateSuccessStatuses, getGameEndingMoves } from "../../utils";

class App extends Component {
  componentDidMount() {
    const {
      columnSizeOfBoard: colSize,
      setSuccessConditionMap,
      createBoardStatus,
    } = this.props;

    createBoardStatus(colSize);

    const successStatuses = calculateSuccessStatuses(colSize);
    setSuccessConditionMap(successStatuses);
  }

  createGameBoardByColumnSize = () => {
    const { columnSizeOfBoard: colSize } = this.props;

    return (
      <>
        {[...Array(colSize)].map((_, row) => (
          <tr key={row} className="board-row">
            {[...Array(colSize)].map((_, col) =>
              this.renderCell(colSize * row + col)
            )}
          </tr>
        ))}
      </>
    );
  };

  renderCell = (key) => {
    const { boardCurrentStatus, gameEndingMoves } = this.props;

    const cellValue = boardCurrentStatus[key];
    const isSuccessCell = gameEndingMoves.flat().includes(key);
    const disabled = !!cellValue;

    return (
      <Cell
        index={key}
        value={cellValue}
        onClick={this.cellClicked}
        isSuccessCell={isSuccessCell}
        disabled={disabled}
      />
    );
  };

  cellClicked = (index) => {
    const {
      whoseTurn,
      boardCurrentStatus,
      successConditionMap,
      columnSizeOfBoard: colSize,
      finishGame,
      playerClickedCell,
    } = this.props;

    let boardUpdatedStatus = boardCurrentStatus.map((value, i) =>
      i === index ? whoseTurn : value
    );

    const successConditionsOfCell = successConditionMap[index];

    const gameEndingMoves = getGameEndingMoves({
      successConditionsOfCell,
      boardUpdatedStatus,
      colSize,
      whoseTurn,
    });

    if (gameEndingMoves.length > 0) {
      finishGame(boardUpdatedStatus, gameEndingMoves);
    } else {
      playerClickedCell(boardUpdatedStatus, whoseTurn);
    }
  };

  render() {
    const { isGameOver } = this.props;
    return (
      <div className="App">
        <table id="students" className={`${isGameOver && "disabled"}`}>
          <tbody>{this.createGameBoardByColumnSize()}</tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    columnSizeOfBoard: state.columnSize,
    boardCurrentStatus: state.boardCurrentStatus,
    isGameOver: state.isGameOver,
    whoseTurn: state.whoseTurn,
    successConditionMap: state.successConditionMap,
    gameEndingMoves: state.gameEndingMoves,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    startGame: () => dispatch(startGame()),
    setColumnSize: (size) => dispatch(setColumnSize(size)),
    createBoardStatus: (colSize) => dispatch(createBoardStatus(colSize)),
    playerClickedCell: (index, turn) =>
      dispatch(playerClickedCell(index, turn)),
    setSuccessConditionMap: (map) => dispatch(setSuccessConditionMap(map)),
    finishGame: (boardUpdatedStatus, gameEndingMoves) =>
      dispatch(finishGame(boardUpdatedStatus, gameEndingMoves)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
