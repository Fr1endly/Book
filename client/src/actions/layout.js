import { CLOSE_DRAWER, OPEN_DRAWER, SELECT_LIST_ITEM } from "../actions/types";

export const closeDrawer = () => (dispatch) => {
  dispatch({
    type: CLOSE_DRAWER,
  });
};

export const openDrawer = () => (dispatch) => {
  dispatch({
    type: OPEN_DRAWER,
  });
};

export const selectListItem = (index) => (dispatch) => {
  dispatch({
    type: SELECT_LIST_ITEM,
    payload: index,
  });
};
