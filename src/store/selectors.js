export function isNoWinner(state) {
  return (
    state.turnCount === state.columnSize * state.columnSize &&
    state.gameEndingMoves.length < 1
  );
}
