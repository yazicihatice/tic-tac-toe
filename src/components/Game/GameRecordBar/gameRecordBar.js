import "./styles.css";
import { connect } from "react-redux";
import { Component } from "react";
import { startGame } from "../../../store/actions";
import { players } from "../../../constants";

class GameRecordBar extends Component {
  constructor(props) {
    super(props);
  }

  restartGame = () => {
    const { columnSizeOfBoard: colSize } = this.props;
    this.props.startGame(colSize);
  };

  render() {
    const { isGameOver, whoseTurn } = this.props;
    return (
      <div className="game-record-bar-wrapper">
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
            <h2>Winner: {isGameOver && whoseTurn}</h2>
            <button onClick={this.restartGame}>Restart Game</button>
          </div>
        )}
      </div>
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
