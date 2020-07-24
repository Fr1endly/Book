import {
  LOAD_CHAPTERS,
  REMOVE_CHAPTER,
  FILTER_CHAPTERS,
  CLEAR_FILTERED_CHAPTERS,
} from "./types";
import { setAlert } from "./alert";
import { camelCase } from "lodash";
import api from "../utils/api";

// FETCH chapters and sort them.
export const fetchChapters = () => async (dispatch) => {
  try {
    const res = await api.get("/chapters");
    dispatch({
      type: LOAD_CHAPTERS,
      payload: res.data.sort((a, b) => a.index - b.index),
    });
  } catch (err) {
    console.log(err);
  }
};

// SAVE chapter to db.
export const saveChapter = (chapter, history) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({
    ...chapter,
    title: camelCase(chapter.title),
  });

  try {
    await api.post("/chapters", body, config);
    fetchChapters();
    dispatch(setAlert("Succesfully added new rule book chapter", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};

// Select active chapter for editing
export const getChapterById = (id) => async (dispatch) => {
  try {
    const res = await api.get(`http://localhost:3000/api/chapters/${id}`);
    const chapter = res.data;
    dispatch({
      type: "SELECT_CHAPTER",
      payload: chapter,
    });
  } catch (err) {
    console.log(err);
  }
};

// EDIT chapter from admin panel
export const editChapter = (chapter, history, id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({
    ...chapter,
    title: camelCase(chapter.title),
  });

  try {
    await api.post(`http://localhost:3000/api/chapters/${id}`, body, config);
    history.push(`/admin/`);
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};

// DELETE chapter from admin panel
export const deleteChapter = (id) => async (dispatch) => {
  try {
    await api.delete(`http://localhost:3000/api/chapters/${id}`);
    dispatch({
      type: REMOVE_CHAPTER,
      payload: id,
    });
  } catch (error) {
    console.log(error);
    // if (errors) {
    //   errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    // }
  }
};

// filter search chapters
export const filterChapters = (value) => (dispatch) => {
  dispatch({
    type: FILTER_CHAPTERS,
    payload: value,
  });
};

export const clearFilteredChapters = () => (dispatch) => {
  dispatch({
    type: CLEAR_FILTERED_CHAPTERS,
  });
};
