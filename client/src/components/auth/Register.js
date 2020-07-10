import React, { Fragment, useState } from "react";
import { register } from "../../actions/auth";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "95%",
    margin: "0 20%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      margin: "0 10px",
    },
  },
  logo: {
    fontFamily: "Fredericka the Great",
    fontSize: "40px",
  },
  form: {
    width: "70%", // Fix IE 11 issue.
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Register({ register, isAuthenicated, setAlert }) {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    password2: "",
  });

  const { email, name, password, password2 } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords don't match", "danger");
    } else {
      register({ name, email, password });
    }
  };

  if (isAuthenicated) {
    return <Redirect to="/" />;
  }

  return (
    <div className={classes.root}>
      <span className={classes.logo}>Role & Roll</span>
      <form className={classes.form} noValidate onSubmit={(e) => onSubmit(e)}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <TextField
            className={classes.input}
            variant="outlined"
            margin="normal"
            required
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={(e) => onChange(e)}
          />
          <TextField
            className={classes.input}
            variant="outlined"
            margin="normal"
            required
            id="name"
            label="name"
            name="name"
            autoComplete="name"
            autoFocus
            value={formData.name}
            onChange={(e) => onChange(e)}
          />
          <TextField
            className={classes.input}
            variant="outlined"
            margin="normal"
            required
            name="password"
            label="Password"
            type="password"
            id="password"
            value={formData.password}
            onChange={(e) => onChange(e)}
          />
          <TextField
            className={classes.input}
            variant="outlined"
            margin="normal"
            required
            name="password2"
            label="Confirm password"
            type="password"
            id="password2"
            value={formData.password2}
            onChange={(e) => onChange(e)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign up
          </Button>
        </div>
      </form>

      {/* <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="email"
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="name"
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password2"
            id="password2"
            placeholder="Confirm password"
            onChange={(e) => onChange(e)}
          />
        </div>
        <hr />
        <div className="form-group">
          <input type="submit" value="Submit" style={{ marginTop: "15px" }} />
        </div>
      </form> */}
    </div>
  );
}

const mapStateToProps = (state) => ({
  isAuthenicated: state.auth.isAuthenicated,
});

export default connect(mapStateToProps, { register, setAlert })(Register);
