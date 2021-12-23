import "./styles.css";
import { connect } from "react-redux";
import { startGame } from "../store/actions";
import { Component } from "react";
import { players } from "../store/constants";

class GameRecordBar extends Component {
  constructor(props) {
    super(props);
  }

  restartGame = () => {
    const { columnSizeOfBoard: colSize } = this.props;
    this.props.clearBoardStatus(colSize);
  };

  render() {
    const { isGameOver, whoseTurn, startGame } = this.props;
    return (
      <>
        {!isGameOver ? (
          <div className="game-record-bar">
            <div className={`player ${whoseTurn === players.X && "active"}`}>
              Player 1 ( X )
            </div>
            <div className={`player ${whoseTurn === players.O && "active"}`}>
              Player 2 ( O )
            </div>
          </div>
        ) : (
          <div className="completed-game-bar">
            <p>Winner: </p>
            <button onClick={startGame}>Restart Game</button>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isGameOver: state.isGameOver,
    whoseTurn: state.whoseTurn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    startGame: () => dispatch(startGame()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(GameRecordBar);
