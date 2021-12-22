import { GAME_STARTED } from "./constants";

export function startGame() {
  return { type: GAME_STARTED };
}
