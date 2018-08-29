import {
  SHIFT_TO_HOME,
  SHIFTED_TO_HOME,
  SHIFT_TO_BILLS,
  SHIFTED_TO_BILLS
} from "../actions/Types";

const INITIAL_STATE = {
  home: false,
  bills: false
};

export default (state = INITIAL_STATE, action) => {
  // console.log(action);
  switch (action.type) {
    case SHIFT_TO_HOME:
      return { ...state, home: true };
    case SHIFTED_TO_HOME:
      return { ...state, home: false };
    case SHIFT_TO_BILLS:
      return { ...state, bills: true };
    case SHIFTED_TO_BILLS:
      return { ...state, bills: false };
    default:
      return state;
  }
};
