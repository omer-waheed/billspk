import { SHIFT_TO_HOME, SHIFTED_TO_HOME } from "../actions/Types";

const INITIAL_STATE = {
  home: false
};

export default (state = INITIAL_STATE, action) => {
  // console.log(action);
  switch (action.type) {
    case SHIFT_TO_HOME:
      return { ...state, home: true };
    case SHIFTED_TO_HOME:
      return { ...state, home: false };
    default:
      return state;
  }
};
