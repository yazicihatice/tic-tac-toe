import {
  GAME_STARTED,
  SET_COLUMN_SIZE,
  CREATE_BOARD_STATUS,
  PLAYER_CLICKED_GRID,
  SET_SUCCESS_CONDITION_MAP,
  END_GAME_AND_SET_WINNER,
} from "./constants";

export function startGame() {
  return { type: GAME_STARTED };
}

export function setColumnSize(payload) {
  return { type: SET_COLUMN_SIZE, payload };
}

export function createBoardStatus(size) {
  return {
    type: CREATE_BOARD_STATUS,
    payload: new Array(size * size).fill(""),
  };
}

export function playerClickedGrid(boardUpdatedStatus, whoseTurn) {
  return {
    type: PLAYER_CLICKED_GRID,
    payload: {
      boardUpdatedStatus,
      whoseTurn,
    },
  };
}

export function setSuccessConditionMap(mapObj) {
  return {
    type: SET_SUCCESS_CONDITION_MAP,
    payload: mapObj,
  };
}

export function finishGame(boardUpdatedStatus, gameEndingMoves) {
  return {
    type: END_GAME_AND_SET_WINNER,
    payload: { boardUpdatedStatus, gameEndingMoves },
  };
}
