import Board from "./Board/board";
import GameRecordBar from "./GameRecordBar/gameRecordBar";

function Game() {
  return (
    <div className="Game">
      <Board />
      <GameRecordBar />
    </div>
  );
}

export default Game;
