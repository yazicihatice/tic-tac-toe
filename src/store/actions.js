import {
  GAME_STARTED,
  SET_COLUMN_SIZE,
  CREATE_BOARD_STATUS,
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
