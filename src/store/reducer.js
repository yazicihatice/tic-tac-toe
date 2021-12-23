import { players } from "../constants";
import {
  GAME_STARTED,
  SET_COLUMN_SIZE,
  CREATE_BOARD_STATUS,
  PLAYER_CLICKED_CELL,
  SET_SUCCESS_CONDITION_MAP,
  END_GAME_AND_SET_WINNER,
} from "./constants";

const initialState = {
  isGameOver: false,
  columnSize: 3,
  boardCurrentStatus: [],
  whoseTurn: players.X,
  successConditionMap: {},
  gameEndingMoves: [],
};
const reducer = function (state = initialState, action) {
  switch (action.type) {
    case GAME_STARTED:
      return {
        ...initialState,
        successConditionMap: state.successConditionMap,
        boardCurrentStatus: state.boardCurrentStatus.fill(""),
      };
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
    case PLAYER_CLICKED_CELL:
      const { payload: { boardUpdatedStatus, whoseTurn } = {} } = action;

      return {
        ...state,
        boardCurrentStatus: boardUpdatedStatus,
        whoseTurn: whoseTurn === players.X ? players.O : players.X,
      };
    case SET_SUCCESS_CONDITION_MAP:
      return {
        ...state,
        successConditionMap: action.payload,
      };
    case END_GAME_AND_SET_WINNER:
      return {
        ...state,
        boardCurrentStatus: action.payload.boardUpdatedStatus,
        gameEndingMoves: action.payload.gameEndingMoves,
        isGameOver: true,
      };
  }

  return state;
};

export default reducer;
