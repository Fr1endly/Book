import {
  CLOSE_DRAWER,
  OPEN_DRAWER,
  SELECT_LIST_ITEM,
  OPEN_EDITOR_MODAL,
  CLOSE_EDITOR_MODAL,
} from "../actions/types";

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

export const openModal = () => (dispatch) => {
  dispatch({
    type: OPEN_EDITOR_MODAL,
  });
};
export const closeModal = () => (dispatch) => {
  dispatch({
    type: CLOSE_EDITOR_MODAL,
  });
};
