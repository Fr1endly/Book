import { combineReducers } from "redux";
import auth from "./auth";
import alert from "./alert";
import admin from "./admin";
import ruleBook from "./ruleBook";
import layout from "./layout";

export default combineReducers({
  auth,
  alert,
  admin,
  ruleBook,
  layout,
});
