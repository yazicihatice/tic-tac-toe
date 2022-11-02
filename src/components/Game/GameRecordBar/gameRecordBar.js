import './styles.css';
import { connect } from 'react-redux';
import { startGame } from '../../../store/actions';
import { players } from '../../../constants';
import { isNoWinner } from '../../../store/selectors';

const GameRecordBar = (props) => {
  const restartGame = () => {
    const { columnSizeOfBoard: colSize } = props;
    props.startGame(colSize);
  };

  const { isGameOver, whoseTurn, isNoWinner } = props;
  return (
    <div className="game-record-bar-wrapper">
      {!isGameOver ? (
        <div className="game-record-bar">
          <div className={`player ${whoseTurn === players.X && 'active'}`}>
            Player 1 ( X )
          </div>
          <div className={`player ${whoseTurn === players.O && 'active'}`}>
            Player 2 ( O )
          </div>
        </div>
      ) : (
        <div className="completed-game-bar">
          <h2 className="game-score">
            {isGameOver && isNoWinner ? 'NO WINNER' : `Winner: ${whoseTurn}`}
          </h2>
          <button onClick={restartGame}>Restart Game</button>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isGameOver: state.isGameOver,
    whoseTurn: state.whoseTurn,
    isNoWinner: isNoWinner(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    startGame: () => dispatch(startGame()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(GameRecordBar);
