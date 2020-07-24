import React, { useEffect } from "react";
import { Provider } from "react-redux";
import setAuthToken from "./utils/setAuthToken";
import store from "./store";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { loadUser } from "./actions/auth";
import Header from "./components/layout/Header";
import Content from "./components/Content";
import Drawer from "./components/layout/Drawer";
import Routes from "./components/routing/Routes";
import Alert from "./components/alert";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100%",
  },
  content: {
    height: "100%",
    flexGrow: 1,
  },
  offset: theme.mixins.toolbar,
}));

export default () => {
  const classes = useStyles();

  useEffect(() => {
    setAuthToken(localStorage.token);
    store.dispatch(loadUser());
  }, []);

  return (
    <div className={classes.root}>
      <Provider store={store}>
        <Router>
          <Header />
          <Drawer />
          {/* Drawer does most of api calls to fetch data */}
          <div className={classes.content}>
            <div className={classes.offset} />
            <Alert />
            <Switch>
              <Route exact path="/" component={Content} />
              <Route component={Routes} />
            </Switch>
          </div>

          <div id="footer" />
        </Router>
      </Provider>
    </div>
  );
};
