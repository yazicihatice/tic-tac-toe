import xSymbol from "../assets/x-symbol.svg";
import oSymbol from "../assets/o-symbol.svg";

export const GAME_STARTED = "GAME_STARTED";
export const SET_COLUMN_SIZE = "SET_COLUMN_SIZE";
export const CREATE_BOARD_STATUS = "CREATE_BOARD_STATUS";
export const PLAYER_CLICKED_GRID = "PLAYER_CLICKED_GRID";
export const SET_SUCCESS_CONDITION_MAP = "SET_SUCCESS_CONDITION_MAP";
export const END_GAME_AND_SET_WINNER = "END_GAME_AND_SET_WINNER";
export const players = Object.freeze({ X: "X", O: "O" });
export const PlayerImageMap = {
  [players.X]: xSymbol,
  [players.O]: oSymbol,
};
