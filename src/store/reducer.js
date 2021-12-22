import {
  GAME_STARTED,
  SET_COLUMN_SIZE,
  CREATE_BOARD_STATUS,
  players,
  PLAYER_CLICKED_GRID,
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
    case PLAYER_CLICKED_GRID:
      const { payload: { index, whoseTurn } = {} } = action;

      return {
        ...state,
        boardCurrentStatus: state.boardCurrentStatus.map((value, i) =>
          i === index ? whoseTurn : value
        ),
        whoseTurn: whoseTurn === players.X ? players.O : players.X,
      };
  }

  return state;
};

export default reducer;
