import { SHIFTED_TO_HOME, SHIFT_TO_HOME } from "./Types";

export const shiftingToMain = () => {
  return {
    type: SHIFT_TO_HOME
  };
};
export const shiftedToMain = () => {
  return {
    type: SHIFTED_TO_HOME
  };
};
