import {
  GAME_STARTED,
  SET_COLUMN_SIZE,
  CREATE_BOARD_STATUS,
  players,
} from "./constants";

const initialState = {
  isGameOver: false,
  columnSize: 3,
  boardCurrentStatus: [],
  whoseTurn: players.X,
};
const reducer = function (state = initialState, action) {
  switch (action.type) {
    case GAME_STARTED:
      return { ...state };
    case SET_COLUMN_SIZE:
      return {
        ...state,
        columnSize: action.payload,
      };
    case CREATE_BOARD_STATUS:
      return {
        ...state,
        boardCurrentStatus: action.payload,
      };
  }

  return state;
};

export default reducer;
