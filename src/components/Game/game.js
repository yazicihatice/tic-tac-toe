import Board from './Board/board';
import GameRecordBar from './GameRecordBar/gameRecordBar';

const Game = () => {
  return (
    <div className="Game">
      <Board />
      <GameRecordBar />
    </div>
  );
};

export default Game;
