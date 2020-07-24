import { connect } from "react-redux";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(({ alerts }) => {
  const classes = useStyles();
  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => (
      <Alert severity={alert.alertType} key={alert.id}>
        {alert.msg}
      </Alert>
    ))
  );
});
