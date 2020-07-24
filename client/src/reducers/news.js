import { GET_NEWS, GET_NEWS_BY_TITLE } from "../actions/types";

const initialState = {
  news: [],
  newsItem: null,
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_NEWS:
      return {
        ...state,
        news: payload,
      };
    case GET_NEWS_BY_TITLE:
      return {
        ...state,
        newsItem: payload,
      };
    default:
      return state;
  }
};
