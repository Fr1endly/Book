import React, { useState, useEffect } from "react";
import InputBase from "@material-ui/core/InputBase";
import Popper from "@material-ui/core/Popper";
import { fade, makeStyles } from "@material-ui/core/styles";

const chapters = [
  {
    title: "I love apples cinn",
    sections: "Hello world",
  },
  {
    title: "You hate cats cinn",
    sections: "Bye life",
  },
];

const useStyles = makeStyles((theme) => ({
  paper: {
    border: "1px solid",
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    minWidth: "300px",
    zIndex: "1400",
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
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "30ch",
    },
  },
}));

export default () => {
  const classes = useStyles();
  const inputRef = React.createRef();
  const [suggestions, setSuggestions] = useState(chapters);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const id = open ? "search-results" : undefined;

  const handleChange = (e) => {
    const userInput = e.target.value;
    setUserInput(userInput);

    setFilteredSuggestions(
      suggestions.filter((suggestion) =>
        suggestion.title.toLowerCase().includes(userInput.toLocaleLowerCase())
      )
    );
  };

  useEffect(() => {
    if (filteredSuggestions.length > 0 && userInput.length > 0) {
      setAnchorEl(inputRef.current);
    } else {
      setAnchorEl(null);
    }
  }, [filteredSuggestions, inputRef, userInput]);

  const handleClick = (e) => {
    setAnchorEl(null);
    setUserInput(e.currentTarget.innerText);
  };

  return (
    <div className={classes.search}>
      <InputBase
        value={userInput}
        ref={inputRef}
        onChange={(e) => handleChange(e)}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        aria-describedby={id}
      />

      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        style={{ zIndex: "1400" }}
      >
        <div className={classes.paper}>
          {filteredSuggestions.map((suggestion) => (
            <p key={suggestion.title} onClick={(e) => handleClick(e)}>
              {suggestion.title}
            </p>
          ))}
        </div>
      </Popper>
    </div>
  );
};
