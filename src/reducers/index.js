import { combineReducers } from "redux";

import ShiftReducer from "./ShiftReducer";

export default combineReducers({
  shift: ShiftReducer
});
