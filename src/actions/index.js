import {
  SHIFTED_TO_HOME,
  SHIFT_TO_HOME,
  SHIFT_TO_BILLS,
  SHIFTED_TO_BILLS
} from "./Types";

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
export const shiftingTobills = () => {
  return {
    type: SHIFT_TO_BILLS
  };
};
export const shiftedTobills = () => {
  return {
    type: SHIFTED_TO_BILLS
  };
};
