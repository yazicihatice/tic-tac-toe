import { GAME_STARTED } from "./constants";

const initialState = {};
const reducer = function (state = initialState, action) {
  switch (action.type) {
    case GAME_STARTED:
      return { ...initialState };
  }
};

export default reducer;
