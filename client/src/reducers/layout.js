import {
  CLOSE_DRAWER,
  OPEN_DRAWER,
  SELECT_LIST_ITEM,
  OPEN_EDITOR_MODAL,
  CLOSE_EDITOR_MODAL,
} from "../actions/types";

const initialState = {
  open: false,
  selectedListItem: null,
  editorModal: false,
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
    case OPEN_EDITOR_MODAL:
      return {
        ...state,
        editorModal: true,
      };
    case CLOSE_EDITOR_MODAL:
      return {
        ...state,
        editorModal: false,
      };
    default:
      return state;
  }
};
