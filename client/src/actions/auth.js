import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGOUT,
  ADMIN_LOADED,
  SET_ERROR,
} from "./types";
import { setAlert } from "./alert";
import api from "../utils/api";

//LOAD USER
export const loadUser = () => async (dispatch) => {
  try {
    const res = await api.get("/auth");
    if (res.data.isAdmin) {
      dispatch({
        type: ADMIN_LOADED,
        payload: res.data,
      });
    }
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// LOGIN
export const login = ({ email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });

  try {
    // getting jwt token in response { "token": "TOKEN_VALUE"}
    const res = await axios.post(
      "http://localhost:3000/api/auth",
      body,
      config
    );
    //
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "error")));
      /////////////
      errors.forEach((err) => {
        dispatch({
          type: SET_ERROR,
          payload: err.msg,
        });
      });
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// LOGOUT / CLEAR PROFILE
export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};

// REGISTER
export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ name, email, password });

  try {
    // We get x-auth-token in response
    const res = await axios.post(
      "http://localhost:3000/api/users",
      body,
      config
    );
    // and sending it you auth reducer
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};
