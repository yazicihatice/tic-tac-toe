import "./styles.css";
import { connect } from "react-redux";
import {
  createBoardStatus,
  playerClickedGrid,
  setColumnSize,
  startGame,
  setSuccessConditionMap,
  finishGame,
} from "../store/actions";
import { Component } from "react";
import { Cell } from "../Cell/cell";

class App extends Component {
  constructor(props) {
    super(props);

    // assign colSize 3 as default, it would be passed as parameter in future
    this.props.setColumnSize(3);
  }

  componentDidMount() {
    const { columnSizeOfBoard: colSize } = this.props;

    this.props.createBoardStatus(colSize);
    this.calculateSuccessStatuses(colSize);
  }

  calculateSuccessStatuses = (colSize) => {
    const gridSize = colSize * colSize;
    const keySuccessConditionsMap = {};

    for (let i = 0; i < gridSize; i++) {
      let rowOfIndex = Math.floor(i / colSize);
      let columnOfIndex = i % colSize;
      let horizontalSuccessArr = [...Array(colSize)].map(
        (_, i) => rowOfIndex * colSize + i
      );
      let verticalSuccessArr = [...Array(colSize)].map(
        (_, i) => columnOfIndex + i * colSize
      );

      //ADD diagonal success condition too!!

      keySuccessConditionsMap[i] = [horizontalSuccessArr, verticalSuccessArr];
    }
    this.props.setSuccessConditionMap(keySuccessConditionsMap);
  };

  createGameBoardByColumnSize = (props) => {
    const { columnSizeOfBoard: colSize, boardCurrentStatus = [] } = props;

    return (
      <>
        {[...Array(colSize)].map((_, row) => (
          <tr key={row} className="board-row">
            {[...Array(colSize)].map((_, col) =>
              this.renderGrid(boardCurrentStatus, colSize * row + col)
            )}
          </tr>
        ))}
      </>
    );
  };

  renderGrid = (arr, key) => {
    const value = arr[key];
    return (
      <Cell
        index={key}
        value={value}
        gridClicked={(key) => this.gridClicked(key)}
      />
    );
  };

  gridClicked = (index) => {
    const { whoseTurn, boardCurrentStatus } = this.props;

    let boardUpdatedStatus = boardCurrentStatus.map((value, i) =>
      i === index ? whoseTurn : value
    );

    this.checkSuccess(index, boardUpdatedStatus);
  };

  checkSuccess = (index, boardUpdatedStatus) => {
    const {
      successConditionMap,
      columnSizeOfBoard: colSize,
      whoseTurn,
    } = this.props;
    const getSuccessArrOfIndex = successConditionMap[index];
    let gameEndingMove = [];

    for (let i = 0; i < getSuccessArrOfIndex.length; i++) {
      let checkString = "";
      for (let j = 0; j < colSize; j++) {
        let val = boardUpdatedStatus[getSuccessArrOfIndex[i][j]];
        checkString = checkString.concat(val);
      }

      if (checkString === new Array(colSize).fill(whoseTurn).join("")) {
        gameEndingMove.push(getSuccessArrOfIndex[i]);
      }
    }

    if (gameEndingMove.length > 0) {
      this.props.finishGame(boardUpdatedStatus, gameEndingMove);
    } else {
      this.props.playerClickedGrid(boardUpdatedStatus, whoseTurn);
    }
  };

  render() {
    return (
      <div className="App">
        <table id="students">
          <tbody>{this.createGameBoardByColumnSize(this.props)}</tbody>
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
    gameEndingMove: state.gameEndingMove,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    startGame: () => dispatch(startGame()),
    setColumnSize: (size) => dispatch(setColumnSize(size)),
    createBoardStatus: (colSize) => dispatch(createBoardStatus(colSize)),
    playerClickedGrid: (index, turn) =>
      dispatch(playerClickedGrid(index, turn)),
    setSuccessConditionMap: (map) => dispatch(setSuccessConditionMap(map)),
    finishGame: (gameEndingMove) => dispatch(finishGame(gameEndingMove)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
