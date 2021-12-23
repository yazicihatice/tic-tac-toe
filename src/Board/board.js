import "./styles.css";
import { connect } from "react-redux";
import {
  createBoardStatus,
  playerClickedGrid,
  setColumnSize,
  setGameOver,
  startGame,
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
    //this.calculateSuccessStatuses(colSize);
  }

  restartGame = () => {
    const { columnSizeOfBoard: colSize } = this.props;
    this.props.clearBoardStatus(colSize);
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
    if (index === 5) {
      this.props.setGameOver();
      return;
    }
    const { whoseTurn, playerClickedGrid } = this.props;
    playerClickedGrid(index, whoseTurn);
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    startGame: () => dispatch(startGame()),
    setColumnSize: (size) => dispatch(setColumnSize(size)),
    setGameOver: () => dispatch(setGameOver()),
    createBoardStatus: (colSize) => dispatch(createBoardStatus(colSize)),
    playerClickedGrid: (index, turn) =>
      dispatch(playerClickedGrid(index, turn)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
