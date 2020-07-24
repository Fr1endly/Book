import { GET_NEWS, GET_NEWS_BY_TITLE } from "./types";
import { setAlert } from "./alert";
import api from "../utils/api";
import { camelCase } from "lodash";

// Load all news.
export const getNews = () => async (dispatch) => {
  try {
    const res = await api.get("/news");
    dispatch({
      type: GET_NEWS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getNewsByTitle = (title) => async (dispatch) => {
  try {
    const res = await api.get(`/news/${title}`);
    dispatch({
      type: GET_NEWS_BY_TITLE,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const saveNewsPost = (newsPost) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({
    ...newsPost,
    title: camelCase(newsPost.title),
  });
  try {
    await api.post("/news", body, config);
    dispatch(setAlert("Successfully saved news post.", "success"));
  } catch (err) {
    if (err.errors) {
      err.errors.forEach((error) => dispatch(setAlert(error.msg, "error")));
    }
  }
};
