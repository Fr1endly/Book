import { CLOSE_DRAWER, OPEN_DRAWER, SELECT_LIST_ITEM } from "../actions/types";

const initialState = {
  open: false,
  selectedListItem: null,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CLOSE_DRAWER:
      return {
        ...state,
        open: false,
      };
    case OPEN_DRAWER:
      return {
        ...state,
        open: true,
      };
    case SELECT_LIST_ITEM:
      return {
        ...state,
        selectedListItem: payload,
      };
    default:
      return state;
  }
};
