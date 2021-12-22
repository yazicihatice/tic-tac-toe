import "./styles.css";
import { connect } from "react-redux";
import { createBoardStatus, setColumnSize, startGame } from "../store/actions";
import { Component } from "react";
import { Grid } from "../Grid/grid";

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { columnSizeOfBoard: colSize } = this.props;
    // assign colSize 3 as default, it would be passed as parameter in future
    this.props.setColumnSize(3);
    this.props.createBoardStatus(colSize);

    // winning positions calculation in here
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
      <Grid
        index={key}
        value={value}
        gridClicked={(key) => this.gridClicked(key)}
      />
    );
  };

  gridClicked = (index) => {
    const { whoseTurn, boardCurrentStatus } = this.props;
  };

  render() {
    const { isGameOver } = this.props;

    return (
      <div className="App">
        <table id="students">
          <tbody>{this.createGameBoardByColumnSize(this.props)}</tbody>
        </table>
        {isGameOver && <button> Start Game </button>}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    columnSizeOfBoard: state.columnSize,
    boardCurrentStatus: state.boardCurrentStatus,
    isGameOver: false,
    whoseTurn: state.whoseTurn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    startGame: () => dispatch(startGame()),
    setColumnSize: (size) => dispatch(setColumnSize(size)),
    createBoardStatus: (colSize) => dispatch(createBoardStatus(colSize)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
