import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import MoreIcon from "@material-ui/icons/MoreVert";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";
import { logout } from "../../actions/auth";
import { openDrawer } from "../../actions/layout";
import SearchBox from "./SearchBox";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  appBar: {
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    fontFamily: "Fredericka the Great",
    fontSize: "2em",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200,
    },
    color: "inherit",
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

const mapStateToProps = (state) => ({
  auth: state.auth,
  ruleBook: state.ruleBook,
});

export default connect(mapStateToProps, { logout, openDrawer })(
  ({
    auth: { isAuthenicated, loading, isAdmin },
    ruleBook: { open, chapters },
    logout,
    openDrawer,
  }) => {
    const classes = useStyles();
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const [value, setValue] = React.useState(null);
    const [inputValue, setInputValue] = React.useState("");

    const handleMobileMenuClose = () => {
      setMobileMoreAnchorEl(null);
    };

    const handleMobileMenuOpen = (event) => {
      setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleDrawerOpen = () => {
      openDrawer();
    };

    const authLinks = (
      <Fragment>
        <Button
          onClick={logout}
          variant="outlined"
          size="small"
          className={classes.button}
          color="inherit"
        >
          Sign out
        </Button>
        {isAdmin ? (
          <Link component={RouterLink} color="inherit" to="/admin">
            <Button
              variant="outlined"
              color="inherit"
              size="small"
              className={classes.button}
            >
              Admin
            </Button>
          </Link>
        ) : null}
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <Link component={RouterLink} to="/login" color="inherit">
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            color="inherit"
          >
            Sign in
          </Button>
        </Link>

        <Link component={RouterLink} to="/register" color="inherit">
          <Button variant="outlined" size="small" color="inherit">
            Sign up
          </Button>
        </Link>
      </Fragment>
    );

    const mobileMenuId = "primary-search-account-menu-mobile";
    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        {isAuthenicated ? (
          <MenuItem onClick={logout} style={{ color: "blue" }}>
            Sign out
          </MenuItem>
        ) : (
          <MenuItem>
            <Link component={RouterLink} to="/login">
              Sign in
            </Link>
          </MenuItem>
        )}
        {isAuthenicated ? null : (
          <MenuItem>
            <Link component={RouterLink} to="/register">
              Sign up
            </Link>
          </MenuItem>
        )}
        {isAuthenicated && isAdmin ? (
          <MenuItem>
            <Link component={RouterLink} to="/admin">
              Admin
            </Link>
          </MenuItem>
        ) : null}
      </Menu>
    );

    return (
      <>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            {/* MENU ICON FOR DRAWER */}
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              R&R
            </Typography>
            <SearchBox />
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              {!loading && (isAuthenicated ? authLinks : guestLinks)}
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
      </>
    );
  }
);
